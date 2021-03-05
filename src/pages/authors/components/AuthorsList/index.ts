import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import { FireDB } from '../../../../services/firebase';

import AuthorsListItem from './AuthorsListItem';

Vue.use(firestorePlugin);

export default Vue.component('authors-listing', {
  data() {
    return {
      authors: [],
    };
  },

  firestore: {
    authors: FireDB.collection(
      `${document.documentElement.getAttribute('data-wf-site')}-author`,
    ),
  },

  components: { AuthorsListItem },

  template: `
  <div class="g_people">
    <authors-list-item v-for="author in authors" :author="author" :key="author.slug"></authors-list-item>
  </div>
  `,
});
