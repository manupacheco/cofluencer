const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = (req, res) => {
// Definimos el transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cofluencer@gmail.com',
      pass: 'bretonespacheco',
    },
  });
  // Definimos el email
  const mailOptions = {
    from: 'cofluencer@gmail.com',
    to: 'mpachecopal@gmail.com',
    subject: 'Asunto',
    text: 'Contenido del email',
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(500, error.message);
    } else {
      console.log('Email sent');
      res.redirect('/');
    //   res.status(200).json(req.body);
    }
  });
};
