const FormData = require('../models/FormData');
const emailService = require('../services/emailService');

// Controller method to handle form submission
const submitForm = async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();

    // Send confirmation email
    await emailService.sendConfirmationEmail(formData.email);

    const userConfig = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      project: formData.project
    };

    // Notify email
    await emailService.sendNotificationEmail(userConfig);

    res.status(200).json({ message: 'Form submitted successfully.', data: { submitted: true } });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form.', data: { submitted: false } });
  }
};

module.exports = { submitForm };
