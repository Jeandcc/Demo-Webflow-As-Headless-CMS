import { FireAuth } from '../../../../services/firebase';
import GAEventsEmitter from '../../../../services/ga';

import { loadIndicator } from '../../../../components/loadIndicator';

import BaseAuthForm from '../BaseAuthForm';

export default class LoginForm extends BaseAuthForm {
  dom: {
    email: HTMLInputElement | null;
    pass: HTMLInputElement | null;
  };

  gaEmitter = new GAEventsEmitter({ category: 'login' });

  constructor(form: HTMLFormElement) {
    super(form);

    this.dom = {
      email: document.querySelector('input#login-email'),
      pass: document.querySelector('input#login-pass'),
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
      await this.loginToFirebase();

      this.gaEmitter.emit({
        name: 'Login w/ Firebase',
        method: 'Firebase',
        label: FireAuth.currentUser?.uid,
      });
    } catch (error) {
      this.errorDispenser?.showMessage(error.message);
    } finally {
      loadIndicator.close();
    }
  }

  async loginToFirebase(): Promise<void> {
    if (!this.dom.email || !this.dom.pass) {
      this.errorDispenser?.showMessage('Missing page elements');
      return;
    }

    await FireAuth.signInWithEmailAndPassword(
      this.dom.email.value,
      this.dom.pass.value,
    );
  }
}
