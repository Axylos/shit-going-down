export default class SelectFund {
  constructor(selectHandler, goToNext, goBack) {
    this.el = document.createElement('div');
    this.funds = [];
    this.searchText = '';
    this.loadJSON('./phones.json')
      .then(data => this.funds.push(...data))
      .catch(err => console.error(err));
    this.selectedFund = null;
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

      <div class='secondPage'>
        <form class="search-form">
          <p class="step">Step two: </br>
          select local bail fund </br> near your location</p>
          <input type="text" class="search" placeholder="Type City or State">
        </form>
        <div class="list">
          <div class="suggestions"></div>
        </div>
      </div>
    </div>
    `

    const search = this.el.querySelector('.search');
    const suggestionsEl = this.el.querySelector('.suggestions');

    this.el.querySelector('.goBack').addEventListener('click', this.goBack);
    this.el.querySelector('.goToNext').addEventListener('click', this.goToNext);

    search.addEventListener("input", () => {
      const value = this.getValue();
      const suggestions = this.displayMatches(value);

      suggestionsEl.innerHTML = suggestions
      suggestionsEl.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          const id = parseInt(ev.target.value);
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
