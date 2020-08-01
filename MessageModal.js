export default class MessageModal {
  constructor(contacts, onSubmit) {
    this.el = document.createElement('div');
    this.el.classList.add('modal');
    this.el.classList.add('message-modal');
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
      Are you sure you want</br> to send this DM?</h3>
      <p class='msgContent'><strong>Content of the message:</strong> </br> 
        Hey, {name}! <br />
        I'm sending you this message as a trusted friend - I have reason to believe that I may very soon have an encounter with law enforcement. <br />
        Please check on me soon! If I'm not answering there is a chance I just got arrested. <br />
        I chose the local bail fund below in advance, please contact them on my behalf <br />
        if you feel comfortable. <br />
        {fund contact info} <br />
      <div class="alertBtnDiv">
      <button class="alertBtnClose">Cancel</button>
      <button class="alertBtn">Send Alerts</button>
    </div>
    </div>
    `

    this.el.querySelector('.alertBtn').addEventListener('click', async () => {
      try {
        await this.onSubmit();
        const errorEl = this.el.querySelector('.error-alert');
        !!errorEl &&  errorEl.remove();
        this.confirmSent();
      } catch (e) {
        const markup = `
        <p class="error-alert" style="color: red;">It looks like something went wrong.  Try re-submitting</p>
        `;
        this.el.querySelector('.msgContent').innerHTML = markup;
      }
    });

    this.el.querySelector('.alertBtnClose').addEventListener('click', () => this.close());
    return this.el;
  }

  close() {
    this.el.hidden = true;
  }

  confirmSent() {
    this.el.querySelector('.alert').innerHTML = `
    <h2 class="staySafe alert">Message Sent! </br> Stay Safe!</h2>
    <button class="alertBtnClose alert-two">Close</button>
    `;

    this.el.querySelector('.alert button').addEventListener('click', () => this.close());
  }
}
