import { GoogleGenerativeAI } from '@google/generative-ai';

interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  body: string;
  recipientName: string;
  activities?: string[];
  answer: 'yes' | 'maybe' | null;
}

export async function generateEmailContent(
  answer: 'yes' | 'maybe' | null,
  selectedActivities: string[],
  recipientName: string = 'Kyleen Ysabelle'
): Promise<{ subject: string; body: string }> {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  if (answer === 'yes') {
    const activitiesStr = selectedActivities.length > 0 
      ? `their selected activities: ${selectedActivities.join(', ')}`
      : 'spending time together';

    const prompt = `
      Write a warm, romantic, and enthusiastic email from Johndel to ${recipientName} expressing gratitude for accepting a date invitation.
      Include the following ${activitiesStr}.
      The email should express genuine excitement, be personal and heartfelt, and feel like it's coming from someone who really cares.
      Keep it concise but meaningful - around 100-150 words.
      Start with a personal greeting and end with a signature.
    `;

    const response = await model.generateContent(prompt);
    const emailBody = response.response.text();

    return {
      subject: `💕 I can't wait to hangout with you!`,
      body: emailBody,
    };
  } else {
    const prompt = `
      Write a thoughtful email from Johndel to ${recipientName} thanking her for considering the invitation and expressing that he'll wait for her decision.
      Keep it warm, patient, and genuine - showing respect for her need for time. 
      Keep it concise - around 80-100 words.
      Make sure it is clear that the invitation is still open and that there's no pressure, while also expressing hope and excitement for the possibility of spending time together in the future.
      Start with a personal greeting and end with a signature.
    `;

    const response = await model.generateContent(prompt);
    const emailBody = response.response.text();

    return {
      subject: `💭 I'll wait for you`,
      body: emailBody,
    };
  }
}

import emailjs from '@emailjs/browser';

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  if (!serviceId || !templateId || !userId) {
    console.error('EmailJS configuration missing');
    return { success: false, error: 'Email service not configured' };
  }

  const templateParams = {
    email: payload.to,
    from_email: payload.from,
    subject: payload.subject,
    message: payload.body,
    recipient_name: payload.recipientName,
  };

  try {
    const result = await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('EmailJS result', result);
    return { success: true };
  } catch (err) {
    console.error('EmailJS error', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to send via EmailJS',
    };
  }
}
