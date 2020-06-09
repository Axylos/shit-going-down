export default class Login {
  constructor(goToNext) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  render() {
    this.el.innerHTML = `
    <div class="generalpage">
      <div class="upButtons">
        <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
      </div>
        
     <div class="loginPage">
      <div class="center">
        <button class="twitterLogin" onclick="location.href='/bail/login'"></button>
        <p class='loginInstruction'>to retrieve your contacts.</p>
        <p class='loginInstructionTwo'>Your information will not be shared outside this application.
        & your activties are not stored anywhere in this application. </p>
      </div>
      </div>
    </div>
 
    
    
    <button class="start">next</button>
    
    `

    this.el.querySelector('.start').addEventListener("click", this.goToNext);

    return this.el;
  }

  unmount() {
    this.el.querySelector('.start').removeEventListener("click", this.goToNext);
  }
} 
