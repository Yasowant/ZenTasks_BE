import { transporter } from './mailer';

export const sendResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const message = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: 'Password Reset - ZenTasks',
    html: `
      <h2>Password Reset Request</h2>
      <p>Hi there,</p>
      <p>You requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetUrl}" target="_blank" style="color: #5b21b6;">Reset Password</a>
      <p>If you didn’t request this, you can safely ignore it.</p>
      <p>— ZenTasks Team</p>
    `,
  };

  try {
    await transporter.sendMail(message);
    console.log(`📧 Reset link sent to ${email}: ${resetUrl}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Could not send password reset email');
  }
};
