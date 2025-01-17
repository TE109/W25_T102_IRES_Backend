const twilio = require("twilio");
const dotnev = require('dotenv').config(); // Required to acces env Variables

// Initialize Twilio client using environment variables
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send a message using Twillo API
exports.createMessage = async (req, res) => { 

    // Body is the message to be sent
    // To is the Phone number to send it to 
    // Extracting message from the body 
    const { body, to } = req.body; 
    
    try {
      const message = await client.messages.create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
      })

      res.status(200).json({
        status: "success",
        message: `Message sent successfully to ${to}.`,
        data: {
          messageBody: message.body
        },
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: `Failed to send message: ${error.message}`,
      });
    }
}
