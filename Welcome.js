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
        <p class='homeInstructionOne'> Contact emergency twitter friends & local bail funds at the push of a button
        <strong>in case</strong></p>
        <h1 class="shit">SHIT</h1>
        <h1 class="going">GOING</h1>
          <h1 class="down">DOWN</h1>
      </div>
      <p class='homeInstructionTwo' > <span class="before"> Before starting....</br> </span> Add the app to your mobile home-screen <strong>*</strong>.</br> 
      Then, activate the app in advance to best protect you and your contacts.</p>
      <button class="download"></button>
      <div>
        <h5 class="homeInstructionThree"><strong>*</strong> ANDROID USERS: look for this icon-> 
        <img class="icon" src="./images/androidAddHomeScreen_white.svg" alt="android" width="14" height="18"/> </br>then slide to the right and “Add to Home Screen.” 
        </br>
        <strong>*</strong> IOS USERS:, look for this icon-> 
        <img class="icon" src="./images/iosAddHomeScreen_white.svg" alt="ios" width="18" height="18" /> </br> then tap Settings on the top right corner and “Add to Home Screen.”</h5>
      </div>
    </div>
    `;

    this.el.querySelector('button').addEventListener('click', this.handleClick)

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
