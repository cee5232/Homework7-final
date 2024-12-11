import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CounterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      .counter {
        font-size: 2em;
        margin-bottom: var(--ddd-spacing-2);
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2);
      }
      button {
        padding: var(--ddd-spacing-2);
        font-size: 1em;
        cursor: pointer;
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      button:hover {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-accent);
      }
      .counter-18 {
        color: pink;
      }
      .counter-21 {
        color: green;
      }
      .counter-min,
      .counter-max {
        color: blue;
      }
    `];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="counter ${this.counter === 18 ? 'counter-18' : ''} ${this.counter === 21 ? 'counter-21' : ''} ${this.counter === this.min ? 'counter-min' : ''} ${this.counter === this.max ? 'counter-max' : ''}">
          ${this.counter}
        </div>
        <div class="buttons">
          <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        </div>
        <slot></slot>
        <confetti-container id="confetti"></confetti-container>
      </div>
    `;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
