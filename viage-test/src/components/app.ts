import { createRouter, Component } from 'viage';

export class App extends Component {
  constructor() {
    super('app');
    document.querySelector('title').textContent = "Hello From Viage ";

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">Hello from Viage</h1>
    `);
  }
}