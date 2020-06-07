export default class Login {
  constructor(goToNext) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  render() {
    this.el.innerHTML = `
    <div>
    <h4 class='loginInstruction'> While NONE of your information is being stored</h4>
    <h4 class="loginSecInstruction">After login you will be required to: </br></h4>
    <p> 1) Select a contact emergency from your personal twitter contacts so <span class="dm"> a quick DM </span> can be sent in case something gets wrong.</br> 
    2) Select a bail fund near your location.</p> 
    </div>
    <h2>Login</h2>
    <a href="/bail/login">Login with Twitter</a>
    <button>Go To Next</button>
    `

    this.el.querySelector('button').addEventListener("click", this.goToNext);

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener("click", this.goToNext);
  }
} 
