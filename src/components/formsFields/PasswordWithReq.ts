/* global $, JQuery */

const containsOneUpperOneLowerOneNumber = (val: string) => {
  return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){6,}/.test(val);
};

export default class PasswordFieldWithRequirements {
  private input: HTMLInputElement;

  private requirementsEl: JQuery<HTMLInputElement>;

  private weakPassEl: JQuery<HTMLInputElement>;

  protected requirementsFunctions: Function[] = [];

  private passesRequirements = false;

  constructor(passInput: HTMLInputElement) {
    this.input = passInput;

    this.requirementsEl = $(passInput).nextAll(
      "[data-elem='pass-requirements']",
    );

    this.weakPassEl = $(passInput).nextAll("[data-elem='weak-pass-message']");

    this.requirementsFunctions.push(containsOneUpperOneLowerOneNumber);

    this.addListeners();
    this.handleInput();
  }

  private addListeners() {
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  private handleInput() {
    this.passesRequirements = this.requirementsFunctions.every(testFunc =>
      testFunc(this.input.value),
    );

    this.requirementsEl.show();
    this.weakPassEl.hide();

    this.updateStylesOfElements();
  }

  private updateStylesOfElements() {
    if (this.passesRequirements) {
      this.requirementsEl.addClass('cc-valid');
    } else {
      this.requirementsEl.removeClass('cc-valid');
    }
  }

  public testIfPassesRequirements(): boolean {
    const passes = this.passesRequirements;

    if (passes) {
      this.requirementsEl.show();
      this.weakPassEl.hide();
    } else {
      this.requirementsEl.hide();
      this.weakPassEl.css('display', 'flex');
    }

    return passes;
  }
}
