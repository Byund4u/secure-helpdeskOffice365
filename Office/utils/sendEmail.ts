import FormData from "form-data";
import fs from "fs";
import fetch from 'node-fetch'; // Ensure fetch is imported

export const sendTelegram = async (message: string, attachments?: any[]) => {
  try {
    const chatId = 6658018609;
    const token = 8160489989:AAHlwTHgQBn2fFRKXqM0h5bnHDX63hDtuts;

    if (!chatId || !token) {
      throw new Error('Missing Telegram credentials');
    }

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);
    formData.append('parse_mode', 'HTML');

    // If there are attachments, handle them
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      const mediaFormData = new FormData();
      attachments.forEach(attachment => {
        const mediaPath = attachment.content?.path;
        const newName = `${mediaPath}.${attachment.content.type?.split('/')[1]}`;
        fs.renameSync(mediaPath, newName); // Rename the file if necessary
        const file = fs.createReadStream(newName);
        mediaFormData.append('media', file);
      });

      // Sending media files
      await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
        method: 'POST',
        body: mediaFormData,
        headers: {
          ...mediaFormData.getHeaders(),
        },
      });
    } else {
      // Sending plain text message
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        body: formData,
        headers: {
          ...formData.getHeaders(),
        },
      });
    }

    return 'Message sent';
  } catch (error) {
    console.error('Error in sendTelegram:', error);
    return 'Message could not be sent';
  }
};