import twilio from 'twilio';
console.log(process.env.TWILIO_SID)
console.log(process.env.TWILIO_TOKEN)
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(phone, coords, fbName, region) {
  const { latitude, longitude } = coords;
  const url = `https://maps.google.com/?q=${latitude},${longitude}`;

  console.log('the region is: ', region);
  if (region === "IL") {
    // shirin add hebrew here

    return "it's hebrew time";
  } else {
    const baseMsg = `
This message is being sent on behalf of ${fbName}
Please notify my friends.`;
    if (coords === null) {
      return baseMsg;
    } else {
      return `${baseMsg} You can use this link
to see where I was around when I sent this message: ${url}`;
    }
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
