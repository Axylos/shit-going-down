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
        <form class="search-form">
          <p class="step">Step two</p>
          <input name="selectedContact" type="text" required class="contactSearch" placeholder="Select Emergency contact">
          <button value="submit">Select Contact</button>
        </form>
        <div class="contactSuggestions"></div>
        <button class="next">Go To Select Fund</button>
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
