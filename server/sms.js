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
export async function sendMsg(to, body, country) {
  const from = country === "USA" ? '+12058982370' : "+972527391473";
  logger.info(`from: ${from}`);
  try {
    const resp = await client.messages.create({
      body,
      to,
      from
    })
    logger.info('message sent');
  } catch (e) {
    logger.error(`${e.stack}`);
  }
} 
