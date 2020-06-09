export default class Instructions {
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
    
      <div class="InstructionPage">
      <div class="bgInstruction">
      <p class='homeInstructionTwo' > <span class="before"> Before starting</span> </br></br> Add the app to your mobile home-screen <strong>*</strong>.</br> 
      Then, activate the app in advance to best protect you and your contacts.</p>
      <button class="download"></button>
      <div>
        <h5 class="homeInstructionThree"><strong>*</strong> ANDROID USERS: look for this icon-> 
        <img class="icon" src="./images/androidAddHomeScreen.svg" alt="android" width="14" height="18"/>- then slide to the right and “Add to Home Screen.” 
        </br>
        <strong>*</strong> IOS USERS: look for this icon-> 
        <img class="icon" src="./images/iosAddHomeScreen.svg" alt="ios" width="18" height="18" />- then tap Settings on the top right and “Add to Home Screen.”</h5>
      </div>
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
