export default class Login {
  constructor(goToNext, verifiedFailed) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;

    this.verifiedFailed = verifiedFailed;
  }

  handleVerifiedFailure() {
    if (!this.verifiedFailed) {
      const node = document.createElement('div');
      node.classList.add('alert');
      node.innerHTML = `
        Uh Oh! It looks like you are offline <br />
        Log In Please Before Continuing <br />
        <button class="close-modal">Ok I'm connected</button>
      `
      node.addEventListener('click', ev => {
        const node = this.el.querySelector('.alert');
        node.remove();
      });

      this.verifiedFailed = false;
      this.el.prepend(node);
    }

  }

  render() {
      this.el.innerHTML = `
    <div class="generalpage">
      <div class="upButtons">
        <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
      </div>  
     <div class="loginPage">
       <div class="center">
         <button class="twitterLogin" onclick="location.href='http://localhost:8080/login'"></button>
         <p class='loginInstruction'>to retrieve your contacts.</p>
         <p class='loginInstructionTwo'>Your information will not be shared outside this application.
         & your activties are not stored anywhere in this application. </p>
      </div>
      <button class="demo"> next</button>

    </div>
    `

    this.el.querySelector('.demo').addEventListener('click', this.goToNext)

    return this.el;

    
  }
  unmount() {}
}
