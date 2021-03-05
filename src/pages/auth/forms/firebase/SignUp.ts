/* global $ */

import { FireAuth } from '../../../../services/firebase';
import GAEventsEmitter from '../../../../services/ga';

import EmailValidator from '../../../../controllers/validators/EmailValidator';
import { loadIndicator } from '../../../../components/loadIndicator';

import BaseAuthForm from '../BaseAuthForm';
import PasswordFieldWithRequirements from '../../../../components/formsFields/PasswordWithReq';

export default class SignUpForm extends BaseAuthForm {
  dom: {
    email: HTMLInputElement;
    pass: HTMLInputElement;
    fName: HTMLInputElement;
    lName: HTMLInputElement;
    tAndCCheck: HTMLInputElement;
  };

  alreadyAcceptedTAndC = false;

  passwordInput: PasswordFieldWithRequirements;

  gaEmitter = new GAEventsEmitter({ category: 'sign_up' });

  constructor(form: HTMLFormElement) {
    super(form);

    const email = document.querySelector('input#su-email');
    const pass = document.querySelector('input#su-pass');
    const fName = document.querySelector('input#su-fName');
    const lName = document.querySelector('input#su-lName');
    const tAndCCheck = document.querySelector('input#t-and-c-checkbox');

    if (!(email instanceof HTMLInputElement)) {
      throw new Error('Missing email field');
    }
    if (!(pass instanceof HTMLInputElement)) {
      throw new Error('Missing pass field');
    }
    if (!(fName instanceof HTMLInputElement)) {
      throw new Error('Missing first name field');
    }
    if (!(lName instanceof HTMLInputElement)) {
      throw new Error('Missing last name field');
    }
    if (!(tAndCCheck instanceof HTMLInputElement)) {
      throw new Error('Missing t-and-c field');
    }

    this.dom = {
      email,
      pass,
      fName,
      lName,
      tAndCCheck,
    };

    this.passwordInput = new PasswordFieldWithRequirements(pass);

    this.addListeners();
    this.checkIfAlreadyAgreedToAndC();
  }

  private addListeners() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit();
    });

    this.dom.email.addEventListener('input', () => {
      $(this.dom.email)
        .nextAll('[data-elem="invalid-work-email-message"]')
        .hide();
    });
  }

  private checkIfAlreadyAgreedToAndC() {
    this.alreadyAcceptedTAndC =
      window.localStorage.getItem('terms-and-conditions') === 'accepted';

    if (this.alreadyAcceptedTAndC) this.preselectTermsAndConditionCheckbox();
  }

  private preselectTermsAndConditionCheckbox() {
    this.dom.tAndCCheck.checked = true;
  }

  private async handleSubmit() {
    if (!this.passwordInput.testIfPassesRequirements()) {
      return;
    }

    try {
      loadIndicator.open();

      await this.signUpToFirebase();

      this.gaEmitter.emit({
        name: 'Signup w/ Firebase',
        method: 'Firebase',
        label: FireAuth.currentUser?.uid,
      });

      await this.saveDisplayName();

      // The below is required so global scripts run once again and
      // redirects users to welcome page
      window.location.href = '/authors';
    } catch (error) {
      this.errorDispenser?.showMessage(error.message);
    } finally {
      loadIndicator.close();
    }
  }

  private checkIfIsValidEmail() {
    if (!EmailValidator.isValidWorkEmail(this.dom.email.value)) {
      const ERROR_TEXT = 'Invalid work email provided';

      const errorMessageEl = $(this.dom.email).nextAll(
        '[data-elem="invalid-work-email-message"]',
      )[0];

      if (errorMessageEl instanceof HTMLElement) {
        $(errorMessageEl).find('div').text(ERROR_TEXT);
        $(errorMessageEl).css('display', 'flex');
      } else {
        this.errorDispenser?.showMessage(ERROR_TEXT);
      }

      throw new Error('Invalid Email');
    }
  }

  private async signUpToFirebase(): Promise<void> {
    try {
      this.checkIfIsValidEmail();
    } catch (e) {
      return;
    }

    await FireAuth.createUserWithEmailAndPassword(
      this.dom.email.value,
      this.dom.pass.value,
    );
  }

  private async saveDisplayName(): Promise<void> {
    await FireAuth.currentUser?.updateProfile({
      displayName: `${this.dom.fName.value} ${this.dom.lName.value}`,
    });
  }
}
