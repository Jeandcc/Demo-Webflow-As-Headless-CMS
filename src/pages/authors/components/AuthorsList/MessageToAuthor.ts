import Vue from 'vue';
import { formatDistance } from 'date-fns';

export default Vue.component('message-to-author', {
  props: ['message'],

  computed: {
    time(): string {
      return formatDistance(this.message.createdAt, new Date(), {
        addSuffix: true,
      });
    },
  },

  template: document.querySelector('#message-to-author-template')?.outerHTML,
});
