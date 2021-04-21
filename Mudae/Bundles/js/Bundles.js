import bundleData from '../Bundles.json';
const app = new Vue({
  el: '#app',
  data: {
    bundles: [],
    currentSort: 'Size',
    currentSortDir: 'asc'
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
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    sortedBundles: function () {
      return this.bundles.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    sortedData: function() {
     return this.data.sort(function(a, b) {
        return a.name > b.name;
     }
  }
  }
})
