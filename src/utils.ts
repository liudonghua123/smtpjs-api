import { createTransport } from 'nodemailer';

let startTime: Date = null;
export const getStartTime = () => startTime;
export const setStartTime = time => (startTime = time);

export async function sendMail({
  host,
  port,
  username,
  password,
  useSsl,
  encryptKey,
  to,
  cc,
  bcc,
  from,
  subject,
  body,
}) {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
      host,
      port,
      secure: useSsl,
      auth: {
        user: username,
        pass: password,
      },
      // https://github.com/nodemailer/nodemailer/issues/406
      tls: {
        rejectUnauthorized: false,
      },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: body, // plain text body
      html: `<p>${body}</p>`, // html body
    });
    return info;
  } catch (error) {
    throw error;
  }
}
