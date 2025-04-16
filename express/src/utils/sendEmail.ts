import * as nodemailer from 'nodemailer';

const MAILER_EMAIL="unimarket8@gmail.com"
const MAILER_PWD="bagpwxxqtjewjnan"

export const sendEmail = ({
  to,
  subject,
  text,
  html
}: {
  to: string,
  subject: string,
  text?: string,
  html?: string,
}): void => {
  if (MAILER_EMAIL && MAILER_PWD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAILER_EMAIL,
          pass: MAILER_PWD
        }
      });

      const mailOptions = {
        from: MAILER_EMAIL,
        to,
        subject,
        text,
        html
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error(`Email error: ${error}`);
        } else {
          console.info(`Email sent: ${info.response}`);
        }
      });
    } catch (e: any) {
      console.error(`Email error: ${e.message}`);
    }
  } else {
    console.error('Email not sent: mailer configs not configured.');
  }
};
