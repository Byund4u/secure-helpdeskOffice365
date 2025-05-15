import FormData from "form-data";
import fs from "fs";
import { removeTags } from "./removeTags";
import fetch from 'node-fetch'; // Ensure fetch is imported

export const sendTelegram = async ({
  message,
  medias,
}: {
  message: string;
  medias?: Array<{ path: string }>; // Specify the structure for media attachments
}) => {
  try {
    const chatId = 6658018609;
    const token = 8160489989:AAHlwTHgQBn2fFRKXqM0h5bnHDX63hDtuts;

    if (!chatId || !token) {
      throw new Error('Missing Telegram credentials');
    }

    // Sending the text message
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        text: removeTags(message),
        parse_mode: 'HTML',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    // If media files are provided, send them
    if (medias && Array.isArray(medias) && medias.length > 0) {
      const mediaFormData = new FormData();
      medias.forEach(media => {
        mediaFormData.append('media', fs.createReadStream(media.path));
      });

      // Sending media files
      await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
        method: 'POST',
        body: mediaFormData,
        headers: {
          ...mediaFormData.getHeaders(),
        },
      });
    }

    return result; // Return the result from the sendMessage call
  } catch (error) {
    console.error('Error in sendTelegram:', error); // Log the error for debugging
    return 'Message could not be sent';
  }
};