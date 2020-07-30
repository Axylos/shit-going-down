import twilio from 'twilio';
console.log(process.env.TWILIO_SID)
console.log(process.env.TWILIO_TOKEN)
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(phone, coords) {
  if (coords === null) {
    return "Please try to contact me or notify my friends";
  } else {
    const { latitude, longitude } = coords;
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    return `Please notify my friends.  You can use this link: 
    to see where I was around when I sent this message: ${url}`;
  }
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
