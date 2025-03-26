# Capstone-Backend

### Members:
Margaret Terechtchenko 101297977<br />
Berlean Gregori 101465969<br />
Tomer Edelman 101400506<br />
Ryan Tran 101460443<br />
Akeen Zhong 101462287<br />

### SMS Implementation
The project includes an SMS feature implemented using the Twilio API.

### Overview
The createMessage function, exported from the smsController file, is responsible for sending SMS messages.<br /> It takes two parameters from the request body:
body: The content of the SMS message.
to: The recipient's phone number.

### How It Works
The createMessage function interacts with the Twilio API to send a text message to the specified recipient.<br />
This functionality is exposed via a defined route in smsRoutes and is integrated into the main application in app.js.

### Notes
For testing purposes, this API can be accessed through a specific URL defined in the smsRoutes.<br /> 
Also the Twilio account used in this project is on a free membership plan.<br /> As a result 
Only verified phone numbers can receive messages.

### Prerequisites

### Install Node.js, npm and express.
npm install

## Set up your .env file with the required Twilio credentials:

TWILIO_ACCOUNT_SID=your_account_sid<br />
TWILIO_AUTH_TOKEN=your_auth_token<br />
TWILIO_PHONE_NUMBER=your_twilio_phone_number<br />


## Clone the repository:
git clone https://github.com/TE109/Capstone-Backend.git

### Navigate to the project directory:
cd capstone-backend

### Running the Application
npm start