export default class SelectContacts {
  constructor(goToNext, submitIds) {
    this.el = document.createElement('div');
    this.contentSelectedIds = [];
    this.handleSelect = this.handleSelect.bind(this);
    this.submitItds = submitIds;
    this.goToNext = goToNext;
    this.loaded = false;
    this.contacts = [];
    this.loadContacts();
  }

  async loadContacts() {
    const resp = await fetch('https://draketalley.com/bail/contacts')
    if (resp.ok) {
      const data = await resp.json();
      this.loaded = true;
      this.contacts = data.users;
      this.render();
    }
  }

  handleSelect(ev) {
    ev.preventDefault(); 
    const form = ev.target;
    const data = new FormData(form);
    const newContact = data.get('selectedContact');
    this.contentSelectedIds.push(newContact);
    this.render();
  }

  getList() {
    if (this.loaded) {
      return `${this.contacts.slice(0, 1).map(contact => `
          <pre>${JSON.stringify(contact)}</pre>
          <button class="message" value=${contact.id}>Send ${contact.name} a Message</pre>
          `).join('')}`

    } else {
      return '';
    }
  }
  render() {
    this.el.innerHTML = `
      <div class='thirdPage'>
        <form class="search-form" autocomplete="off">
          <p class="step">Step one:</br> Select emergency friend to DM in case of a need</p>
          <input name="selectedContact" type="text" required class="contactSearch" placeholder="Type ____ to start">
          <button value="submit">Select contact</button>
        </form>

        <button class="next">Next ► </button>
        ${this.contentSelectedIds.map(contact => `<div>${contact}</div>`)}
        <pre>test</pre>
        <div class="contact-list">
        ${this.getList()}
        </div>
      </div>
    `;

    this.el.querySelector('form').onsubmit = this.handleSelect;
    this.el.querySelector('.next').addEventListener('click', this.goToNext);
    this.el.querySelector('.contact-list').addEventListener('click', async (ev) => {
      if (ev.target.classList.contains('message')) {
        const id = ev.target.value;
        const resp = await fetch('https://draketalley.com/bail/message', {method: 'POST', body: JSON.stringify({recipientId: id}), headers: { 'Content-Type': 'application/json' }});
        if (resp.ok) {
          const data = await resp.json();
          console.log(data);
        }
      }
    })


    return this.el;
  }

  unmount() {
    this.el.querySelector('.next').removeEventListener('click', this.goToNext);
  }
}
