import GAEventsEmitter from '../../../services/ga';

import BaseAuthForm from './BaseAuthForm';

import { loadIndicator } from '../../../components/loadIndicator';

import HashingUtils from '../../../util/HashingUtils';

export default class JoinForm extends BaseAuthForm {
  dom: {
    fName: HTMLInputElement;
    lName: HTMLInputElement;
    tAndCCheck: HTMLInputElement;
  };

  alreadyAcceptedTAndC = false;

  gaEmitter = new GAEventsEmitter({ category: 'login' });

  constructor(form: HTMLFormElement) {
    super(form);

    const fName = document.querySelector('input#join-fName');
    const lName = document.querySelector('input#join-lName');
    const tAndCCheck = document.querySelector('input#join-t-and-c-checkbox');

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
      fName,
      lName,
      tAndCCheck,
    };

    this.addListeners();
    this.checkIfAlreadyAgreedToAndC();
  }

  private addListeners() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit();
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
    loadIndicator.open();

    try {
      const hash = await this.getUserNameHash();

      this.gaEmitter.emit({
        name: 'Login w/ first and last name',
        method: 'First and Last name',
        label: hash,
      });

      this.saveDataToLocalStorage(hash);

      window.location.href = '/authors';
    } catch (error) {
      this.errorDispenser?.showMessage(error.message);
      loadIndicator.close();
    }
  }

  private async getUserNameHash(): Promise<string> {
    const fullName = `${this.dom.fName.value} ${this.dom.lName.value}`;
    const hash = await HashingUtils.hashUserName(fullName);
    return hash;
  }

  private saveDataToLocalStorage(hash: string): void {
    const fullName = `${this.dom.fName.value} ${this.dom.lName.value}`;

    window.localStorage.setItem('user-name', fullName);
    window.localStorage.setItem('user-hash', hash);
  }
}
