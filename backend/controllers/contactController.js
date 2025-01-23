    const Contact = require('../models/contact');

    const saveContactForm = async (req, res) => {
      try {
        const { full_name, mobile_number, message } = req.body;

        // Validation
        if (!full_name || !mobile_number || !message) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        // Save the data to the database
        const contact = await Contact.create({
          full_name,
          mobile_number,
          message,
        });

        res.status(201).json({ message: 'Contact form submitted successfully!', contact });
      } catch (error) {
        console.error('Error saving contact form:', error.message);
        res.status(500).json({ message: 'Failed to submit the contact form' });
      }
    };

    module.exports = { saveContactForm };
