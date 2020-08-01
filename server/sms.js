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
    `
   ההודעה הזו נשלחת מטעם ${fbName}.
   הם סימנו אותך כאיש/ת קשר בשעת חירום.
   נדמה כי הם חווים (או יחוו בקרוב) התנקשויות עם החוק או אם אחרים, וזקוקים לעזרה.
   בבקשה נסה/י ליצור עימם קשר! מצורפים לינקים לפרופיל הפייסבוק והמיקום האחרון ממנו ההודעה נשלחה.

   ההודעה נשלחה על ידי: 
   www.shitgoingdown.com
    `

    return "it's hebrew time";
  } else {
    const baseMsg = `
This message is being sent on behalf of ${fbName}
They marked you as an emergency contact.  They may
have had (or will soon have) a confrontation with
law enforcement or others in a protest or mass gathering.
Please try to contact them. Here is their facebook profile
and the location from where the message was sent.

the message was sent via www.shitgoingdowm.com
      .`;
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
