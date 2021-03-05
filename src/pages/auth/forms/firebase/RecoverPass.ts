import { FireAuth } from '../../../../services/firebase';
import GAEventsEmitter from '../../../../services/ga';

import { loadIndicator } from '../../../../components/loadIndicator';
import BaseAuthForm from '../BaseAuthForm';

export default class SignUpForm extends BaseAuthForm {
  dom: {
    email: HTMLInputElement | null;
    success: HTMLElement | null;
  };

  gaEmitter = new GAEventsEmitter({ category: 'Authentication' });

  constructor(form: HTMLFormElement) {
    super(form);

    this.dom = {
      email: document.querySelector('input#recover-email'),
      success: document.getElementById('recover-success'),
    };

    this.addListeners();
  }

  private addListeners() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  private async handleSubmit() {
    loadIndicator.open();

    try {
      await this.askForRecover();

      this.gaEmitter.emit({
        name: 'Asked for password recover w/ Firebase',
        method: 'Firebase',
        label: this.dom.email?.value,
      });

      this.successDispenser?.showMessage('Password reset email sent');
    } catch (error) {
      this.errorDispenser?.showMessage(error.message);
    } finally {
      loadIndicator.close();
    }
  }

  async askForRecover(): Promise<void> {
    if (!this.dom.email) return;
    await FireAuth.sendPasswordResetEmail(this.dom.email.value);
  }
}
