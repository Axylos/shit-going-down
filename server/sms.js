import twilio from 'twilio';
console.log(process.env.TWILIO_SID)
console.log(process.env.TWILIO_TOKEN)
const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = new twilio(sid, token);

export function buildBody(shortUrl, fbName, region) {
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
    const baseMsg = `${fbName} listed you as an emergency contact and may be in distress at a protest
Please contact them
Their location: ${shortUrl}`;

    return baseMsg;
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
