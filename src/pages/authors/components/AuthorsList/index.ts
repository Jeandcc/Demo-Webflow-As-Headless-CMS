import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import AuthorsModel from '../../../../models/Authors';

import AuthorsListItem from './AuthorsListItem';

Vue.use(firestorePlugin);

export default Vue.component('authors-listing', {
  components: { AuthorsListItem },

  data() {
    return {
      authors: [],
    };
  },

  firestore: {
    authors: AuthorsModel.collectionRef,
  },

  template: `
  <div class="g_people">
    <authors-list-item v-for="author in authors" :author="author" :key="author.slug"></authors-list-item>
  </div>
  `,
});
