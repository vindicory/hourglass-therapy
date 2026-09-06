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
      from: `"Caroline at Hourglass Therapy" <${process.env.SMTP_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_EMAIL || 'hello@hourglasstherapy.co.uk',
      subject: 'Thank you for reaching out, ' + name.split(' ')[0],
      html: `
        <div style="margin:0;padding:24px;background-color:#d3e5f2;font-family:Georgia,'Times New Roman',serif;">
          <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;padding:40px 32px;color:#2f4a58;">
            <p style="margin:0 0 24px;font-size:22px;line-height:1.4;color:#2f4a58;">Hello ${name.split(' ')[0]},</p>

            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">Thank you for getting in touch. Reaching out is often the hardest part, and I am really glad you have.</p>

            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">Your message has come through safely and I will read it myself. I aim to reply personally within two working days, so please do keep an eye on your inbox, and your junk folder just in case.</p>

            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">There is no pressure and no obligation at this stage, and you are welcome to ask me anything before deciding whether to book.</p>

            <p style="margin:0 0 28px;font-size:16px;line-height:1.7;">In the meantime, take good care of yourself.</p>

            <p style="margin:0 0 4px;font-size:16px;line-height:1.7;">Warm wishes,</p>
            <p style="margin:0 0 2px;font-size:20px;color:#5a8298;">Caroline</p>
            <p style="margin:0 0 28px;font-size:14px;color:#5a8298;">Hourglass Therapy &middot; Taking Time for You</p>

            <div style="border-top:1px solid #d3e5f2;padding-top:20px;">
              <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#4a6b7d;"><strong>If you need support before I reply</strong></p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#4a6b7d;">This inbox is not monitored around the clock. If things feel urgent, please contact your GP, call NHS 111, or speak to the Samaritans free on <strong>116 123</strong>, any time of day or night. In an emergency, please call 999.</p>
            </div>
          </div>

          <p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.6;color:#4a6b7d;text-align:center;font-family:Arial,sans-serif;">You are receiving this because you contacted Hourglass Therapy through hourglasstherapy.co.uk. Just reply to this email if you need anything.</p>
        </div>
      `,
      text: `Hello ${name.split(' ')[0]},

Thank you for getting in touch. Reaching out is often the hardest part, and I am really glad you have.

Your message has come through safely and I will read it myself. I aim to reply personally within two working days, so please do keep an eye on your inbox, and your junk folder just in case.

There is no pressure and no obligation at this stage, and you are welcome to ask me anything before deciding whether to book.

In the meantime, take good care of yourself.

Warm wishes,
Caroline
Hourglass Therapy - Taking Time for You

---
If you need support before I reply
This inbox is not monitored around the clock. If things feel urgent, please contact your GP, call NHS 111, or speak to the Samaritans free on 116 123, any time of day or night. In an emergency, please call 999.

You are receiving this because you contacted Hourglass Therapy through hourglasstherapy.co.uk. Just reply to this email if you need anything.`,
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
