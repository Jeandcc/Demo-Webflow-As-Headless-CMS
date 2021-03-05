import Vue from 'vue';

export default Vue.component('authors-listing', {
  props: ['author'],

  template: document.querySelector('#authors-list-item-template')?.outerHTML,
});
