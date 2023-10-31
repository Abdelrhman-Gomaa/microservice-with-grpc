
const style = `
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                  }
                  p {
                    font-size: 16px;
                    margin-bottom: 10px;
                    text-align: justify;
                  }
                  .verification-code {
                    font-weight: bold;
                    font-size: 18px;
                  }
              `;

export function getEmailMsg(
  verificationCode: string | number) {
  return `<html>
            <head>
              <style>${style}</style>
            </head>
            <body>
              <h1>Welcome to Our App</h1>
              <p>Thank you for signing up for Our App. To complete your registration, we need to verify your email address.</p>
              <p>Please enter the following OTP (One Time Password) in the app to verify your email address: <span class="verification-code">${verificationCode}</span></p>
              <p>If you did not sign up for Our App or did not request this OTP, please ignore this email.</p>
              <br>
              <p>Best regards,</p>
              <p>Our App Team</p>
            </body>
          </html>`;
}
