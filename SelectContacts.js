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
    this.goBack = goBack;
  }

  async loadContacts() {
    const resp = await fetch('https://shitgoingdown.com/api/contacts')
    if (resp.ok) {
      const data = await resp.json();
      this.loaded = true;
      this.contacts = data.users;
      this.render();
    }
  }

  filterContacts(term) {
    const regex = new RegExp(term, 'gi');
    return this.contacts.filter(contact => contact.name.match(regex) || contact.screen_name.match(regex))
      .filter(contact => this.contentSelectedIds.map(sel => sel.id_str).indexOf(contact.id_str) < 0);
  }

  getList(queryTerm) {
    if (this.loaded && queryTerm) {
      const contacts = this.filterContacts(queryTerm);
      
      return `${contacts.map(contact => {
        const regex = new RegExp(queryTerm, 'gi');
        const name = contact.name.replace(regex, `<span class="hl">${queryTerm}</span>`)
        const screen_name = contact.screen_name.replace(regex, `<span class="hl">${queryTerm}</span>`)
      
      return `
        <button value="${contact.id_str}" class="contact-detail">
          <p>Name: ${name}</p>
          <p>Username: ${screen_name}</p>
        </button>
          `}).join('')}`

    } else {
      return '';
    }
  }
  render() {
    this.el.innerHTML = `
    <div class="generalpage">
       <div class="upButtons">
         <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
       </div>
       <div class="navLinks">
          <a class="goToNext" href="#"> « next </a> 
          <a class="goBack" href="#"> back »</a> 
        </div>

       <div class='thirdPage'>
        <form class="search-form" autocomplete="off">
          <p class="step">Step one:</br> Select trusted friends to DM in case of a need</p>
          <input name="selectedContact" type="text" required class="contactSearch" placeholder="Type name or user name">
        </form>
        ${this.contentSelectedIds.map(contact => `<div>${contact}</div>`)}
        <div class="contact-list"></div>
        <div class="chosen-contacts"></div>
        <button class="goToNextTwo"> DONE </button> 
      </div>

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
    this.el.querySelector('.goToNextTwo').addEventListener('click', this.goToNext);
    this.el.querySelector('.goToNext').addEventListener('click', this.goToNext);
    this.el.querySelector('.goBack').addEventListener('click', this.goBack);
    this.el.querySelector('.contact-list').addEventListener('click', async (ev) => {
      if (ev.target.classList.contains('message')) {
        const id = ev.target.value;
        const resp = await fetch('https://shitgoingdown.com/api/message', {method: 'POST', body: JSON.stringify({recipientId: id}), headers: { 'Content-Type': 'application/json' }});
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
    const contact = this.contacts.find(contact => contact.id_str === id);
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
        <div class="chosen-contactsNames">
         <ui>
          <li>${contact.screen_name}: ${contact.name}
            <button class="remove" value="${contact.id_str}"><img src="./images/removeIcon.svg" alt="remove" height="22"/></button>
           </li>
          </ui>  
         </div>
      </div>
      `
    }).join('');
    this.el.querySelector('input').value = '';
    this.el.querySelector('.contact-list').innerHTML = ''; 
    el.innerHTML = markup;
    el.querySelectorAll('button.remove').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id_str = ev.currentTarget.value;
        this.contentSelectedIds = this.contentSelectedIds.filter(contact => contact.id_str !== id_str);
        this.updateContacts();
      });
    })
  }

  unmount() {
    // this.el.querySelector('.goToNext').removeEventListener('click', this.goToNext);
    // this.el.querySelector('.goBack').removeEventListener('click', this.goBack);
  }
}
