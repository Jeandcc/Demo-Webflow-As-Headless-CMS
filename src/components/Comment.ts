import Vue from 'vue';
import { formatDistance } from 'date-fns';

export default Vue.component('comment', {
  props: ['comment'],

  computed: {
    time(): string {
      return formatDistance(this.comment.createdAt, new Date(), {
        addSuffix: true,
      });
    },
  },

  template: document.querySelector('#comment-template')?.outerHTML,
});
