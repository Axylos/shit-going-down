import twilio from 'twilio';
import logger from './logger.js';
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(shortUrl, fbName, contactName, region, emptyCoords, logger) {
  const ending = emptyCoords ? "More Info:" : "Their location:";
  const baseMsg = `Hey ${contactName}, ${fbName} listed you as an emergency contact and may be in distress at a protest
Please contact them
${ending} ${shortUrl}`;

  return baseMsg;
}
export async function sendMsg(to, body) {
  logger.info('got to sendMsg');
  try {
    const resp = await client.messages.create({
      body,
      to,
      from: '+12058982370'
    })
    logger.info('message sent');
  } catch (e) {
    logger.error(`${e.stack}`);
  }
} 
