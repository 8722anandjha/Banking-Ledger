import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});
// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegisterationEmail= async(userEmail,name)=>{
  const subject= "Welcome to Our Platform 🚀",
   text=  `
Hi ${name},

Thank you for registering on our platform.

We're excited to have you onboard! Your account has been successfully created, and you can now explore all the features available to you.

If you have any questions or need support, feel free to reach out to us anytime.

Best Regards,
Your App Team
  `,
   html=`
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4F46E5;">Welcome to Our Platform 🚀</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for registering on our platform.
      </p>

      <p>
        We're excited to have you onboard! Your account has been successfully created,
        and you can now explore all the features available to you.
      </p>

      <div style="margin: 25px 0;">
        <a 
          href="https://yourwebsite.com/login"
          style="
            background-color: #4F46E5;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
          "
        >
          Login to Your Account
        </a>
      </div>

      <p>
        If you have any questions or need support, feel free to contact us anytime.
      </p>

      <hr />

      <p style="font-size: 14px; color: #666;">
        Best Regards,<br />
        <strong>Your App Team</strong>
      </p>
    </div>
  `
  await sendEmail(userEmail,subject,text,html);
}

export default sendRegisterationEmail;



