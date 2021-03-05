import Vue from 'vue';

import { FireAuth } from '../../services/firebase';

import AuthorsList from './components/AuthorsList';

new Vue({
  components: { AuthorsList },

  created() {
    FireAuth.onAuthStateChanged(user => {
      if (!user) window.location.href = '/';
    });
  },
}).$mount('#app');
