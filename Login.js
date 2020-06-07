export default class Login {
  constructor(goToNext) {
    this.el = document.createElement('div');
    this.goToNext = goToNext;
  }

  render() {
    this.el.innerHTML = `
    <h2>Login</h2>
    <button>Go To Next</button>
    `

    this.el.querySelector('button').addEventListener("click", this.goToNext);

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener("click", this.goToNext);
  }
} 
