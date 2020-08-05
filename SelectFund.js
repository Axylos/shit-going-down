export default class SelectFund {
  constructor(selectHandler, goToNext, goBack, fund) {
    this.el = document.createElement('div');
    this.funds = [];
    this.searchText = '';
    this.loadJSON('./phones.json')
      .then(data => this.funds.push(...data))
      .catch(err => console.error(err));
    this.selectedFund = fund;
    this.selectHandler = selectHandler;
    this.goToNext = goToNext;
    this.goBack = goBack;
  }

  async loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
  }

  findMatches(wordToMatch, funds) {
    return funds.filter(fund => {
      const regex = new RegExp(wordToMatch, 'gi');
      return fund.city.match(regex) || fund.state.match(regex)
    })
  }

  getValue() {
    const input = this.el.querySelector('input')
    if (input === null) {
      return '';
    } else {
      return input.value;
    }
  }

  displayMatches(value) {
    const matchArray = this.findMatches(value, this.funds);
    const html = matchArray.map(fund => {
      const regex = new RegExp(value, 'gi');
      const cityName = fund.city.replace(regex, `<span class="hl">${value}</span>`)
      const stateName = fund.state.replace(regex, `<span class="hl">${value}</span>`)
      if (fund.number === null) {
        return '';
      } else {
        return `
      <p class='listResults'>
        <button class='selectFundBtn' value="${fund.id}">
          <span class='place'>${cityName}, ${stateName}:</br> </span>
          ${fund.name} -
          <span class='phone'>${fund.number}</span>
        </button>
      </p>
      `
      }
    }).join('');
    return html;
  }

  getFundDisplay() {
    return `
    <div>
    <h3 class="chosen-contacts-fund">You have selected: ${this.selectedFund.name}</h3>
    </div>
    `
  }

  render() {
    this.el.innerHTML = `
    <div class="generalpage">

       <div class="containNav">
      <div class="nav">
        <div class="upButtons">
          <a class="navQuestion" href="/info/about"> ? </a>
          <a class="logo" href="https://www.shitgoingdown.com">www.shitgoingdown.com</a>
          <a class="navBtn nextEnd" href="#"> ► </a>
        </div>
      </div>
      <a class="navBtn back" href="https://shitgoingdown.com">◄◄ </a>
    </div>

      <div class='secondPage'>
        <form class="search-form">
          <p class="step">Step two: </br>
          select local bail fund near your location</p>
          <input type="text" class="search" placeholder="Type City or State">
        </form>
        ${this.selectedFund !== null ? this.getFundDisplay() : ''}
        <div class="list">
          <div class="suggestions"></div>
          <button class="goToNextTwo"> SKIP </button> 

        </div>
      </div>
    </div>
    `

    const search = this.el.querySelector('.search');
    const suggestionsEl = this.el.querySelector('.suggestions');

    this.el.querySelector('.goToNextTwo').addEventListener('click', () => {
      if (this.selectedFund === null) {

      const fund = this.funds.find(currentFund => currentFund.id === 55);
      this.handleFundSelection(fund);
      }
      this.goToNext();
    });
    this.el.querySelector('.navBtn.back').addEventListener('click', this.goBack);
    this.el.querySelector('.navBtn.next').addEventListener('click', this.goToNext);

    search.addEventListener("input", () => {
      const value = this.getValue();
      const suggestions = this.displayMatches(value);

      suggestionsEl.innerHTML = suggestions
      suggestionsEl.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const id = parseInt(ev.currentTarget.value);
            const fund = this.funds.find(currentFund => currentFund.id === id);
            this.handleFundSelection(fund);
          this.goToNext()
        })
      });
    });
    return this.el;
  }

  handleFundSelection(fund) {
    this.selectedFund = fund.id;
    this.selectHandler(fund);
    console.log('the selected fund is: ', fund.id);
  }
  unmount() { }
}
