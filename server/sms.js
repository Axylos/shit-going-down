import twilio from 'twilio';
console.log(process.env.TWILIO_SID)
console.log(process.env.TWILIO_TOKEN)
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(phone, coords, fbName, fbId, region) {
  const { latitude, longitude } = coords;
  const url = `https://maps.google.com/?q=${latitude},${longitude}`;
  const fbUrl = `https://facebook.com/profile?id=${fbId}`;

  console.log('the region is: ', region);
  const ending = 'the message was sent via www.shitgoingdowm.com';

  if (region === "IL") {
    return `
   ההודעה הזו נשלחת מטעם ${fbName}.
   הם סימנו אותך כאיש/ת קשר בשעת חירום.
   נדמה כי הם חווים (או יחוו בקרוב) התנקשויות עם החוק או עם אחרים, וזקוקים לעזרה.
   בבקשה נסה/י ליצור עימם קשר! מצורפים לינקים לפרופיל הפייסבוק והמיקום האחרון ממנו ההודעה נשלחה.

   ההודעה נשלחה על ידי: 
   www.shitgoingdown.com
    `

  } else {
    const baseMsg = `
This message is being sent on behalf of ${fbName}
They marked you as an emergency contact.  They may
have had (or will soon have) a confrontation with
law enforcement or others in a protest or mass gathering.
Please try to contact them. Here is their facebook profile
${fbUrl}.
`;
    if (coords === null) {
      return `${baseMsg}
      ${ending}`;
    } else {
      return `${baseMsg} 
Here is their last known location:
${url}

${ending}`;
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
