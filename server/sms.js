import twilio from 'twilio';
console.log(process.env.TWILIO_SID)
console.log(process.env.TWILIO_TOKEN)
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(shortUrl, fbName, contactName, region, emptyCoords) {
  const ending = emptyCoords ? "More Info:" : "Their location:";
  const baseMsg = `${contactName}, ${fbName} listed you as an emergency contact and may need help at a protest
Please reach out
${ending} ${shortUrl}`;

  return baseMsg;
}
export async function sendMsg(to, body) {
  try {
    const resp = await client.messages.create({
      body,
      to,
      from: '+12058982370'
    })
    console.log(resp);
    console.log('message sent');
  } catch (e) {
    console.log(e);
  } finally {
    console.log('done');
  }
} 
