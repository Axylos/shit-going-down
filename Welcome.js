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
        <p class='homeInstruction' > Please make sure to install on you mobile device and activate the app
        in advance</br> to best protect you and your contacts.</p>
        <h5>After installing, add the app to your home screen to activate in offline mode☆</h5>
        <button class="download">Install Locally</button>
        
      </div>

      <div>
      <h4 class='mainInstruction'> callbail.me allows to store emergency contacts and local bail funds, to notify them in
      case of a need.</h4>
      </div>

      <div><h5 class="howTo">[☆How to add to home screen? easy! just press and drag the app to the Home screen page by lifting your finger to place the app]</h5></div>
    `;

    this.el.querySelector('button').addEventListener('click', this.handleClick)

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
