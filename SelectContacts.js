export default class SelectContacts {
  constructor(goToNext, submitIds) {
    this.el = document.createElement('div');
    this.contentSelectedIds = [];
    this.handleSelect = this.handleSelect.bind(this);
    this.submitItds = submitIds;
    this.goToNext = goToNext;
  }

  handleSelect(ev) {
    ev.preventDefault(); 
    const form = ev.target;
    const data = new FormData(form);
    const newContact = data.get('selectedContact');
    this.contentSelectedIds.push(newContact);
    this.render();
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
      </div>
    `;

    this.el.querySelector('form').onsubmit = this.handleSelect;
    this.el.querySelector('.next').addEventListener('click', this.goToNext);

    return this.el;
  }

  unmount() {
    this.el.querySelector('.next').removeEventListener('click', this.goToNext);
  }
}
