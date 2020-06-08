export default class SelectContacts {
  constructor(goToNext, submitIds, goBack) {
    this.el = document.createElement('div');
    this.contentSelectedIds = [];
    this.goToNext = () => {
      submitIds(this.contentSelectedIds);
      goToNext();
    }
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

  filterContacts(term) {
    return this.contacts.filter(contact => contact.name.match(term) || contact.screen_name.match(term));
  }

  getList(queryTerm) {
    if (this.loaded && queryTerm) {
      const contacts = this.filterContacts(queryTerm);
      return `${contacts.map(contact => `
        <button value="${contact.id}" class="contact-detail">
          <p>Name: ${contact.name}</p>
          <p>Username: ${contact.screen_name}</p>
        </button>
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
        </div>
        <div class="chosen-contacts"></div>
      </div>
    `;
    const search = this.el.querySelector('input');
    const contactList = this.el.querySelector('.contact-list');
    search.addEventListener("input", (ev) => {
      const suggestions = this.getList(ev.target.value);
      contactList.innerHTML = suggestions
      for (let child of contactList.children) {
        child.addEventListener('click', this.contactHandler.bind(this));
      }
    });

    contactList.addEventListener('click', ev => {
      if (ev.target.classList.contains('contact-list')) {
      }
    });

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

  contactHandler(ev) {
    const id = ev.currentTarget.value;
    const contact = this.contacts.find(contact => contact.id === parseInt(id));
    this.contentSelectedIds.push(contact);
    this.updateContacts();
  }

  chosenContacts() {
    return this.el.querySelector('.chosen-contacts');
  }

  updateContacts() {
    const el = this.chosenContacts();

    const markup = this.contentSelectedIds.map(contact => {
      return `
      <div class="chosen-contact">
        <div><strong>${contact.screen_name}:</strong> ${contact.name}</div>
        <button class="remove" value="${contact.id}">Remove ${contact.name}</button> 
      </div>
      `
    }).join('');
    this.el.querySelector('input').value = '';
    this.el.querySelector('.contact-list').innerHTML = ''; 
    el.innerHTML = markup;
  }

  unmount() {
    this.el.querySelector('.next').removeEventListener('click', this.goToNext);
  }
}
