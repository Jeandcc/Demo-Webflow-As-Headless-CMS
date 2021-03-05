/* global $ */

/* eslint-disable no-new */

import { FireAuth } from '../../services/firebase';

import FBLoginForm from './forms/firebase/Login';
import FBSignUpForm from './forms/firebase/SignUp';
import FBRecoverForm from './forms/firebase/RecoverPass';
import JoinForm from './forms/JoinWithoutFirebase';

const loginForm = document.querySelector(
  'form#wf-form-login',
) as HTMLFormElement | null;

const signupForm = document.querySelector(
  'form#wf-form-signup',
) as HTMLFormElement | null;

const recoverForm = document.querySelector(
  'form#wf-form-recover',
) as HTMLFormElement | null;

const joinForm = document.querySelector(
  'form#wf-form-join',
) as HTMLFormElement | null;

if (!loginForm) throw new Error('Missing login form');
if (!signupForm) throw new Error('Missing signup form');
if (!recoverForm) throw new Error('Missing recover form');
if (!joinForm) throw new Error('Missing join form');

const formFadesDuration = 200;

if ((window as any).usesFirebase) {
  FireAuth.onAuthStateChanged(user => {
    if (!user) {
      new FBLoginForm(loginForm);
      new FBSignUpForm(signupForm);
      new FBRecoverForm(recoverForm);

      const showLoginForm = () => {
        $(loginForm).parent().delay(formFadesDuration).fadeIn();
        $(signupForm).parent().fadeOut(formFadesDuration);
        $(recoverForm).parent().fadeOut(formFadesDuration);
        $(joinForm).parent().fadeOut(formFadesDuration);
      };

      const showSignUpForm = () => {
        $(loginForm).parent().fadeOut(formFadesDuration);
        $(signupForm).parent().delay(formFadesDuration).fadeIn();
        $(recoverForm).parent().fadeOut(formFadesDuration);
        $(joinForm).parent().fadeOut(formFadesDuration);
      };

      const showRecoverForm = () => {
        $(loginForm).parent().fadeOut(formFadesDuration);
        $(signupForm).parent().fadeOut(formFadesDuration);
        $(recoverForm).parent().delay(formFadesDuration).fadeIn();
        $(joinForm).parent().fadeOut(formFadesDuration);
      };

      $("[data-elem='show-login']").on('click', () => {
        showLoginForm();
      });

      $("[data-elem='show-signup']").on('click', () => {
        showSignUpForm();
      });

      $("[data-elem='show-recover']").on('click', () => {
        showRecoverForm();
      });

      if (window.localStorage.getItem('previously-logged-in')) {
        showLoginForm();
      }
    }
  });
} else {
  new JoinForm(joinForm);

  $(loginForm).parent().fadeOut(formFadesDuration);
  $(signupForm).parent().fadeOut(formFadesDuration);
  $(recoverForm).parent().fadeOut(formFadesDuration);
  $(joinForm).parent().delay(formFadesDuration).fadeIn();
}
