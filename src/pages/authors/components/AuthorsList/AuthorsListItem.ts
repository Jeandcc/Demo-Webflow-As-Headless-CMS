import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import firebase from 'firebase';
import { FireAuth, FireDB } from '../../../../services/firebase';

import MessageToAuthor from './MessageToAuthor';

Vue.use(firestorePlugin);

const authorMessagesCollection = FireDB.collection(
  `${document.documentElement.getAttribute('data-wf-site')}-author-messages`,
);

export default Vue.component('authors-listing', {
  props: ['author'],

  components: { MessageToAuthor },

  data() {
    return {
      messageToAuthor: '',
      authorMessages: null as null | { messages: any[] },
    };
  },

  computed: {
    messages(): any[] {
      return (
        this.authorMessages?.messages.sort(
          (a, b) => b.createdAt - a.createdAt,
        ) || []
      );
    },
  },

  watch: {
    author: {
      immediate: true,
      handler(author) {
        this.$bind('authorMessages', authorMessagesCollection.doc(author.id));
      },
    },
  },

  methods: {
    async sendMessage(e: Event): Promise<void> {
      e.preventDefault();

      if (!FireAuth.currentUser) return;

      await authorMessagesCollection.doc(this.author.id).set(
        {
          messages: firebase.firestore.FieldValue.arrayUnion({
            author: {
              name: FireAuth.currentUser.displayName,
              id: FireAuth.currentUser.uid,
            },
            text: this.messageToAuthor,
            createdAt: Date.now(),
          }),
        },
        { merge: true },
      );

      this.messageToAuthor = '';
    },
  },

  template: document.querySelector('#authors-list-item-template')?.outerHTML,
});
