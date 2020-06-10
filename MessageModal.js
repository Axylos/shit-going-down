export default class MessageModal {
  constructor(contacts, onSubmit) {
    this.el = document.createElement('div');
    this.el.classList.add('modal');
    this.onSubmit = onSubmit;
    this.contacts = contacts;
  }

  getContactList() {
    return this.contacts.map(contact => {
      return `
      <div class="contact-reminder">
        ${contact.name} -- ${contact.screen_name}
      </div>
      `;
    }).join('');
  }

  render() {
    this.el.innerHTML = `
    <div class="alert">
      <h3 class="OnNo"><span class="oh">OH NO! </span></br>
      Are you sure you want to sent DM S.O.S?</h3>
      <p class='msgContent'><strong>Contact of the massege:</strong> </br>
        Hey, {name}! <br />
        I'm sending you this message as a trusted friend - I have reason to believe that I may very soon have an encounter with law enforcement. <br />
        Please cheack on me soon! If I'm not answering there is a chance I just got arrested. <br />
        I chose the local bail fund below in advance, please contact them on my behalf at <br />
        if you feel comfortable. <br />
        {fund contact info} <br />
      <div class="alertBtnDiv">
      <button class="alertBtnClose">Cancel</button>
      <button class="alertBtn">Send Alerts</button>
    </div>
    </div>
    `

    this.el.querySelector('.alertBtn').addEventListener('click', async () => {
      //await this.onSubmit();
      this.confirmSent();
    });

    this.el.querySelector('.alertBtnClose').addEventListener('click', () => this.close());
    return this.el;
  }

  close() {
    this.el.hidden = true;
  }

  confirmSent() {
    this.el.querySelector('.alert').innerHTML = `
    <h2 class="staySafe">Message Sent! </br> Stay Safe!</h2>
    <p class="closing">For your own safety -- the app will close itself in <strong>30 seconds</strong></p>
    `
  }
}
