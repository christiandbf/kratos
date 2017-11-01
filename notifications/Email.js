const nodemailer = require('nodemailer')

class Email {
    constructor(to) {
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        })
        this._to = to
    }

    send(args, html) {
        let temp = JSON.parse(args)
        let options = {
            from: process.env.USER_EMAIL,
            to: this._to,
            subject: temp["message"] + ' - ' + temp["exchange"],
            html: html
        }
        this._transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }
}

module.exports = Email