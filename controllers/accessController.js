const twilio = require("twilio");

// Environment Variables in git ignored file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client =  twilio(accountSid, authToken);

// Send a message using Twillo API
exports.createMessage = async (req, res) => {    
    // Body is the message to be sent
    // To is the Phone number to send it to 
    // Extracting message from the body 
    const { body, to } = req.body; 

    console.log("Account SID:", process.env.TWILIO_ACCOUNT_SID);
    console.log("Auth Token:", process.env.TWILIO_AUTH_TOKEN);
    console.log("Phone Number:", process.env.TWILIO_PHONE_NUMBER);

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
