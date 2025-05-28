import emailSender from "../contract/emailSendContract";
import { ISubscribe } from "./subscribe.interface";
import Subscribe from "./subscribe.model";


const CreateSubscribe = async (data: ISubscribe) => {
  // Save contract data to the database
  const newContract = await Subscribe.create(data);

  // email HTML content
const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
    <h2 style="color: #4A90E2;">Thank you for subscribe Car Shop!</h2>
    <p>Hi <strong>${data.email}</strong>,</p>
    <p>We’ve received your inquiry and truly appreciate your interest in our services. One of our car experts will get in touch with you shortly to assist you further.</p>
    
    <hr style="margin: 20px 0;" />
    
    <h3 style="color: #333;">Your Contact Details:</h3>
  

    <hr style="margin: 20px 0;" />

    <p>If your inquiry is urgent, feel free to call us directly at <strong style="color:#4A90E2;">01726-606816</strong>.</p>
    <p>We look forward to helping you find your ideal vehicle!</p>

    <p style="margin-top: 30px;">Best regards, <br />
    <strong>Car Shop Team</strong><br />
    <a href="https://yourcarshopwebsite.com" style="color: #4A90E2; text-decoration: none;">www.yourcarshopwebsite.com</a>
    </p>
  </div>
`;


  // Send confirmation email to 
  await emailSender(data.email, emailHTML);

  return newContract;
};

export const SubscribeService = {
  CreateSubscribe,
};
