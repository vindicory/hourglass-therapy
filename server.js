const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 18080;
const HOST = '0.0.0.0';

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create nodemailer transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Server-side validation
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  // Check if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP credentials not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    return res.status(500).json({
      success: false,
      error: 'Email service is not configured. Please contact us directly at hello@hourglasstherapy.co.uk'
    });
  }

  try {
    const transporter = createTransporter();

    // Email to the therapy practice
    const mailOptions = {
      from: `"Hourglass Therapy Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@hourglasstherapy.co.uk',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationOptions = {
      from: `"Hourglass Therapy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Hourglass Therapy',
      html: `
        <h2>Thank you for getting in touch, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, if you have any urgent queries, please don't hesitate to email us directly at <a href="mailto:hello@hourglasstherapy.co.uk">hello@hourglasstherapy.co.uk</a>.</p>
        <br>
        <p>Warm regards,</p>
        <p><strong>Hourglass Therapy</strong></p>
        <p>Taking Time for You</p>
      `,
      text: `
Thank you for getting in touch, ${name}!

We have received your message and will get back to you as soon as possible.

In the meantime, if you have any urgent queries, please don't hesitate to email us directly at hello@hourglasstherapy.co.uk.

Warm regards,
Hourglass Therapy
Taking Time for You
      `,
    };

    await transporter.sendMail(confirmationOptions);

    console.log(`Contact form submission from ${name} (${email})`);
    res.json({ success: true, message: 'Thank you for your message! We will be in touch soon.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'There was an error sending your message. Please try again or contact us directly at hello@hourglasstherapy.co.uk'
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
