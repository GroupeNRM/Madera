import {User} from "../entity/User";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: '1025',
    secure: false
});

export async function sendMail(receivers: User, subject: string) {
    let encodedString = Buffer.from(`${receivers.id}&${receivers.randomHash}`).toString('base64');

    let info = await transporter.sendMail({
        from: '"Support Madera" <contact@madera.com>',
        to: receivers.email,
        subject: subject,
        text: `Bienvenue sur Madera !
            Pour activer votre compte veuillez cliquer sur le lien suivant : http://localhost:8000/mail-validation?qid=${encodedString}
            
            Merci pour votre confiance !`, // plain text body
        html: `Bienvenue sur Madera !
            Pour activer votre compte veuillez cliquer sur le lien suivant : <a href="http://localhost:8000/mail-validation?qid=${encodedString}">http://localhost:8000/mail-validation?qid=${encodedString}</a>
            
            Merci pour votre confiance !
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}