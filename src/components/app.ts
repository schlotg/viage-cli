import { Component } from 'viage';

export class App extends Component {

  title = "Hello from Viage";

  constructor() {
    super('app');
  }
  init() {
    document.querySelector('title').textContent = this.title;
    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">${this.title}</h1>
    `);
    return this;
  }
}