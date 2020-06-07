export default class Welcome {
  constructor(goToNext) {
    console.log('instantiating a welcome view');
    this.handleClick = this.handleClick.bind(this);
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  handleClick() {
    console.log('go to next page');
    this.goToNext();
  }

  render() {
    this.el.innerHTML = `
      <div class="homePage">
        <div class="textHome">
          <h1 class="call">CALL</h1>
          <h1 class="bail">BAIL</h1>
          <h1 class="me">ME</h1>
        </div>
        <p class='homeInstruction' >to work best </br> in real time please</p>
        <button class="download">Install Locally</button>
      </div>
    `;

    this.el.querySelector('button').addEventListener('click', this.handleClick)

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
