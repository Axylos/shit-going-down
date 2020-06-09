export default class ContactSelect {
  constructor(cb) {
    this.cb = cb;
    this.el = document.createElement('div');
    this.loaded = false;
    this.contacts = [];
    this.loadContacts();
  }

  async loadContacts() {
    const resp = await fetch('https://shitgoingdown.com/api/contacts')
    if (resp.ok) {
      const data = await resp.json();
      this.contacts = data.users;
      this.render();
    }
  }
  listener() {
    console.log('button clicked');
    //this.cb();
  }

  getList() {
    if (this.loaded) {
      return `${this.contacts.map(contact => `<pre>${contact.name}</pre>`)}`;
    } else {
      return '';
    }
  }
  render() {
      this.el.innerHTML = `
      <p>hey there</p>
      <input type="text" name="contact" />
      <button>Click Me</button>
      <button class="remove">remove</button>
      ${this.getList()}
    `;

    this.el.querySelector('button').addEventListener('click', this.listener);
    this.el.querySelector('button.remove').addEventListener('click', () => this.remove());

    return this.el;
  }

  remove() {
    console.log('called');
    this.el.querySelector('button').removeEventListener('click', this.listener);
  }

  unmount() {
    this.el.querySelector('input').removeEventListener('click', this.listener);
  }
}
