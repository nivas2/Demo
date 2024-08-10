const express = require('express');
const { check, validationResult } = require('express-validator');
const Grievance = require('../models/Grievance');
const auth = require('../middleware/auth');
const router = express.Router();
const nodemailer = require('nodemailer');

// Middleware to authenticate and verify user token
router.use(auth);

// Grievance Submission Route
router.post(
    '/submit',
    [
        check('type', 'Grievance type is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { type, description } = req.body;

        try {
            // Create new grievance
            const newGrievance = new Grievance({
                user: req.user.id,
                type,
                description,
            });

            // Save grievance to the database
            const grievance = await newGrievance.save();

            // Send email notification to the admin
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password',
                },
            });

            const mailOptions = {
                from: 'your-email@gmail.com',
                to: 'admin-email@example.com',
                subject: 'New Grievance Submitted',
                text: `A new grievance has been submitted. \n\nType: ${type} \nDescription: ${description}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
            });

            res.status(201).json(grievance);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/all', async (req, res) => {
    try {
        const grievances = await Grievance.find().populate('user', ['name', 'email']).sort({ createdAt: -1 });
        res.json(grievances);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update grievance status
router.put('/status/:id', async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);

        if (!grievance) {
            return res.status(404).json({ msg: 'Grievance not found' });
        }

        grievance.status = req.body.status || grievance.status;
        grievance.updatedAt = Date.now();

        await grievance.save();

        res.json(grievance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
