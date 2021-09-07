const app = new Vue({
  el: '#app',
  data: {
    bundles: [],
    currentSort: 'Size',
    currentSortDir: 'desc'
  },
  created: function () {
    fetch('https://svessinn.github.io/Mudae/Bundles/Bundles.json')
      .then(res => res.json())
      .then(res => {
        this.bundles = res;
      })
  },
  methods: {
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'desc' ? 'asc' : 'desc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    sortedBundles: function () {
      return this.bundles.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (this.currentSort !== 'Bundle') {
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        } else {
          if (a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier;
          if (a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return 1 * modifier;
        }
        return 0;
      });
    }
  }
})
