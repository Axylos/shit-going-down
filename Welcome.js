export default class Welcome {
  constructor(goToNext) {
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
        <p class='homeInstructionOne'> Contact emergency friends & local bail funds </br>at the push of a button
       </br> <strong>in case</strong></p>
        <h1 class="shit">SHIT</h1>
        <h1 class="going">GOING</h1>
        <h1 class="down">DOWN</h1>
      </div>
    </div>
    <button class="demo">next</button>
    `;

    this.el.querySelector('button').addEventListener('click', this.handleClick)

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
