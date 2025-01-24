const twilio = require("twilio");
const dotenv = require('dotenv').config(); // Required to access env Variables
const Access = require('./accessController'); // Import the Access Controller 

// Load environment variables
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send a message using Twillo API
exports.createMessage = async (req, res) => { 
  // Body is the message to be sent
  // To is the Phone number to send it to 
  // Extracting message from the body 

  // Body should look like Your custom verification code is: 
  // customCode Should be the verification Code 
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

// Function to verify the code provided by the user
exports.verifyCode = async (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  try {
    const accessRecord = await Access.findOne({ accessCode });
    res.status(200).json({
      status: "success",
      message: "Access code verified successfully.",
    });
  } catch (error) {
    console.error('Error verifying access code:', error.message);
    res.status(500).json({
      status: "error",
      message: `Failed to verify access code: ${error.message}`,
    });
  }
};
