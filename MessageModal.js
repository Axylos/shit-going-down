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
    <div>
      <h3>Are you Sure?</h3>
      <button class="send">Send Alerts</button>
      <button class="close">Cancel</button>
      <p class='msg'>Contact of massege: hey, I think I need you to check on me and contact...  </p>
      <div class="contact-list">
        ${this.getContactList()}
      </div>
    </div>
    `

    this.el.querySelector('.send').addEventListener('click', async () => {
      await this.onSubmit();
      this.close();
    });

    this.el.querySelector('.close').addEventListener('click', () => this.close());
    return this.el;
  }

  close() {
    this.el.hidden = true;
  }
}
