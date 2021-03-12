const nodemailer = require("nodemailer");

export async function sendMail(receivers: string, subject: string) {
    let transporter = nodemailer.createTransport({
        host: "127.0.0.1",
        port: '1025',
        secure: false
    });

    let info = await transporter.sendMail({
        from: '"Support Madera" <contact@madera.com>',
        to: receivers,
        subject: subject,
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}