const path = require('path')
const express = require('express')
const app = express()
const transporter = require('./config')
const dotenv = require('dotenv')
dotenv.config()

const buildPath = path.join(__dirname, '..', 'build')

app.use(express.json())
app.use(express.static(buildPath))

app.post('/send', (req, res) => {
  console.log(req.body)

  try {
    const mailOptions = {
      from: req.body.email, // sender address
      to: process.env.email, // list of receivers
      subject: req.body.subject,
      html: req.body.message // plain text body
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: 'Something went wrong. Try again later.'
        })
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly.'
        })
      }
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Something went wrong. Try again later.'
    })
  }
})

app.listen(3030, () => {
  console.log('Server start on port 3030')
})
