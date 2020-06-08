export default class Login {
  constructor(goToNext) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  render() {
    this.el.innerHTML = `
    <div>
    <h2>Going in</h2>
    <h4 class='loginInstruction'>To get you a quick aceess to your friends - we ask you to login via twitter. </br>
    & </br> 
    We will not share your information anywhere outside this application. </br>
    &</br>
     We are not storing your selection information anywhere in our application. </h4>
    <a href="/bail/login">Click to login with Twitter</a>
    
    <button>I'm all set</button>
    `

    this.el.querySelector('button').addEventListener("click", this.goToNext);

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener("click", this.goToNext);
  }
} 
