import FormMessageDispenser from '../../../components/formMessageDispenser';

export default class BaseAuthForm {
  protected form: HTMLFormElement;

  private formInputs: HTMLInputElement[] = [];

  private submitButton: HTMLElement | null;

  protected errorDispenser?: FormMessageDispenser;

  protected successDispenser?: FormMessageDispenser;

  constructor(form: HTMLFormElement) {
    this.form = form;

    this.submitButton = this.form.querySelector("input[type='submit']");

    const formInputs = this.form.querySelectorAll('input');
    formInputs.forEach(i => this.formInputs.push(i));

    const successContainer = this.form.parentElement?.children[1];
    if (successContainer instanceof HTMLElement)
      this.successDispenser = new FormMessageDispenser(successContainer);

    const errorContainer = this.form.parentElement?.children[2];
    if (errorContainer instanceof HTMLElement)
      this.errorDispenser = new FormMessageDispenser(errorContainer);

    this.addBaseListeners();
    this.handleAnyInput();
  }

  private addBaseListeners() {
    this.formInputs.forEach(i => {
      i.addEventListener('input', this.handleAnyInput.bind(this));
    });
  }

  private handleAnyInput() {
    this.updateSubmitButtonClasses();
    this.clearErrorMessage();
  }

  private clearErrorMessage(): void {
    this.errorDispenser?.hide();
    this.successDispenser?.hide();
  }

  private updateSubmitButtonClasses(): void {
    const canSubmit = this.formInputs.every(input => input.checkValidity());

    if (canSubmit) this.submitButton?.classList.remove('cc-disabled');
    else this.submitButton?.classList.add('cc-disabled');
  }
}
