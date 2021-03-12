import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import { FireAuth } from '../../../../services/firebase';

import UserInteractionsController from '../../../../controllers/UserInteractions';

import UserInteractionsModel, {
  IInteractionsWithAuthor,
} from '../../../../models/UserInteractions';

import Comment from '../../../../components/Comment';

Vue.use(firestorePlugin);

export default Vue.component('authors-listing', {
  props: ['author'],

  components: { Comment },

  data() {
    return {
      user: FireAuth.currentUser,
      interactionsWithAuthor: null as null | IInteractionsWithAuthor,
      messageToAuthor: '',
    };
  },

  computed: {
    messages(): any[] {
      if (!this.interactionsWithAuthor?.messages) return [];

      return this.interactionsWithAuthor.messages.sort(
        (a, b) => b.createdAt - a.createdAt,
      );
    },
  },

  watch: {
    author: {
      immediate: true,
      handler(author) {
        this.$bind(
          'interactionsWithAuthor',
          UserInteractionsModel.collectionRef.doc(author.id),
        );
      },
    },
  },

  methods: {
    async sendMessage(e: Event): Promise<void> {
      e.preventDefault();

      await UserInteractionsController.addComment({
        targetId: this.author.id,
        comment: this.messageToAuthor,
      });

      this.messageToAuthor = '';
    },

    async like(): Promise<void> {
      await UserInteractionsController.setLikeValue({
        targetId: this.author.id,
        value: 1,
      });
    },

    async dislike(): Promise<void> {
      await UserInteractionsController.setLikeValue({
        targetId: this.author.id,
        value: -1,
      });
    },

    async removeLikeAndDislike(): Promise<void> {
      await UserInteractionsController.setLikeValue({
        targetId: this.author.id,
        value: 0,
      });
    },
  },

  template: document.querySelector('#authors-list-item-template')?.outerHTML,
});
