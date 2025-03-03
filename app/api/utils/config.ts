
  const brevo = require('@getbrevo/brevo');
  let apiInstance = new brevo.TransactionalEmailsApi();
  

// Function to send verification email
export async function sendVerificationEmail(email: string, code: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Account Verification";
  sendSmtpEmail.htmlContent = `
  <html>
   <body>
    <h4 style="color: white;padding: 10px 20px; background: teal; font-size: 17px; border-radius: 8px; text-align: center;">ACCOUNT VERIFICATION</h4>
    <div style="color: gray; font-size: 14px; margin: 10px 0;">
     Dear ${name}, <br /> 
     It is pleasure to have you in contribution to Kamero Research Base, please verify your account to get started! 
     </div><br />
     <div style="background: silver; padding: 10px; font-size: 15px;">
      Verification code: <b>${code}</b>
     </div>
    <p style="margin: 10px 0; font-size: 14px; color: teal;">
     <br />
     Kamero Development Team
     <br />
     info@kamero.rw
     <br />
     +250781121117
    </p>
   </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "codereveur@gmail.com" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}


// Function to send verification email
export async function sendChangePasswordVerificationEmail(email: string, code: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Email Verification";
  sendSmtpEmail.htmlContent = `
  <html>
   <body>
    <h4 style="color: white;padding: 10px 20px; background: teal; font-size: 17px; border-radius: 8px; text-align: center;">EMAIL VERIFICATION</h4>
    <div style="color: gray; font-size: 14px; margin: 10px 0;">
      Hello! <br/> Your request to change password has been proccessed, please verify your email
     </div><br />
     <div style="background: silver; padding: 10px; font-size: 15px;">
      Verification code: <b>${code}</b>
     </div>
    <p style="margin: 10px 0; font-size: 14px; color: teal;">
     <br />
     Kamero Development Team
     <br />
     info@kamero.rw
     <br />
     +250781121117
    </p>
   </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "codereveur@gmail.com" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}

// Function to send verification email
export async function sendChangePasswordConfirmationEmail(email: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Password Change Confirmation";
  sendSmtpEmail.htmlContent = `
  <html>
   <body>
     
    <div style="font-size: 15px; margin: 10px 0; background: silver; padding: 15px;">
      Hi! <br />
      Your password has been changed successfully! Please visit your dashboard to learn more <a href="https://dashboard.kamero.rw"> Dashboard </a>
    </div>
    <p style="margin: 10px 0; font-size: 14px; color: teal;">
     <br />
     Kamero Development Team
     <br />
     info@kamero.rw
     <br />
     +250781121117
    </p>
   </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "codereveur@gmail.com" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}

// Function to send verification email
export async function sendContactEmail(email: string, message: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `New message from ${name}`;
  sendSmtpEmail.htmlContent = `
  <html>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #008080;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 24px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #008080;
            margin: 10px 0;
            font-style: italic;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }
    </style>
<body>
    <div class="container">
        <div class="header">New Contact Us Message</div>
        <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div class="message-box">${message}</div>
        </div>
        <div class="footer">
            <p>Thank you for reaching out to us. We will get back to you soon!</p>
        </div>
    </div>
</body>
</html>`;
  sendSmtpEmail.sender = { "name": name, "email": "codereveur@gmail.com"};
  sendSmtpEmail.to = [
    { "email": "codereveur@gmail.com", "name": "Research Base Support Team" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}


// Function to send verification email
export async function sendContactCopyEmail(email: string, message: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `Your message recieved!`;
  sendSmtpEmail.htmlContent = `
  <html>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #008080;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 24px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #008080;
            margin: 10px 0;
            font-style: italic;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }
    </style>
<body>
    <div class="container">
        <div class="header">Contact Us Details</div>
        <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div class="message-box">${message}</div>
        </div>
        <div class="footer">
            Thank you for reaching out to us! Our Kamero support team typically responds within 1 to 3 hours. We'll get back to you as soon as possible!
        </div>
    </div>
</body>
</html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "codereveur@gmail.com"};
  sendSmtpEmail.to = [
    { "email": email, "name": name }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}