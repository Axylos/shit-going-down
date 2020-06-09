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
      <h3 class="OnNo">OH NO! </br>
      Making you didn't pressed by mistake</br> Are you sure you want to sent DM S.O.S?</h3>
      <p class="contact-listAlert"> your message will be sent to the contacts you chooce: </br>
      ${this.getContactList()}
      </p>
      <p class='msgContent'><strong>Contact of the massege:</strong> </br> 
      hey {name}, I'm sending you this message as my emergency contact - I have a reason to believe that something is about to happened. </br>
      Please cheack on me soon! If I'm not answering there is a chance I just got arrested. </br>
      I chooce this local {bail fund} in advance, let them know about me please?</p>
      <button class="alertBtnClose">Cancel</button>
      <button class="alertBtn">Send Alerts</button>
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
    <h2>Message Sent</h2>
    <h3>Stay Safe!</h3>
    <p>The app will close in 30 seconds</p>
    `
  }
}
