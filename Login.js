export default class Login {
  constructor(goToNext) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  isInstalled() {
    return (
      window.matchMedia('(display-mode: standalone)').matches) ||
      (window.navigator.standalone) ||
      document.referrer.includes('android-app://');
  }

  render() {
    if (!this.isInstalled()) {

      this.el.innerHTML = `
    <div class="generalpage">
      <div class="upButtons">
        <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
      </div>  
     <div class="loginPage">
       <div class="center">
         <button class="twitterLogin" onclick="location.href='/api/login'"></button>
         <p class='loginInstruction'>to retrieve your contacts.</p>
         <p class='loginInstructionTwo'>Your information will not be shared outside this application.
         & your activties are not stored anywhere in this application. </p>
      </div>
    </div>
    `
    } else {
      this.el.innerHTML = `
    <div class="generalpage">
      <div style="color: red">Please install this app by adding it to home screen before continuing</div>
      <p><a style="color: lightgreen" href="https://natomasunified.org/kb/add-website-to-mobile-device-home-screen/">Instructions Here</a></p>
      </div>
      `
    }

    return this.el;
  }
}
