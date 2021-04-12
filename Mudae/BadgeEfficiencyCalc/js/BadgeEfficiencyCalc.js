Vue.component("value-input", {
	props: {
		id: String,
		label: String,
		faIcon: String,
		value: Number,
		minTick: Number,
		maxTick: Number,
		tickVals: Array,
		isRank: Boolean
	},
	template: `
                  <div class="value-input">
                    <div class="form-group">
                      <label :for="id">{{label}}</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i :class="'fas fa-' + faIcon"></i></span>
                        </div>
                        <input type="number" class="form-control" id="claimRank" :placeholder="label" :value="value" @input="updateValue" :min="minTick" pattern="\d+" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="btn-group d-flex">
                      <button v-for="tick of allTicks" type="button" class="btn btn-light" :value="tick.value" @click="changeValue">{{tick.label}}</button>
                    </div>
                    </div>
                  </div>
                `,
	computed: {
		allTicks: function () {
			this.tickVals.sort();
			ticks = [];
			tick_labels = [];

			for (let val of this.tickVals.reverse()) {
				tick = {
					value: this.isRank ? val : -1 * val
				};
				tick.label = tick.value > 0 ? `+${tick.value}` : tick.value;
				ticks.push(tick);
			}

			for (let val of this.tickVals.reverse()) {
				tick = {
					value: this.isRank ? -1 * val : val
				};
				tick.label = tick.value > 0 ? `+${tick.value}` : tick.value;
				ticks.push(tick);
			}

			if (this.maxTick) {
				if (this.isRank) {
					ticks.unshift({
						value: this.maxTick,
						label: `Max: ${this.maxTick}`
					});
					ticks.push({
						value: this.minTick,
						label: `Min: ${this.minTick}`
					});
				} else {
					ticks.unshift({
						value: this.minTick,
						label: `Min: ${this.minTick}`
					});
					ticks.push({
						value: this.maxTick,
						label: `Max: ${this.maxTick}`
					});
				}
			} else {
				ticks.splice(ticks.length / 2, 0, {
					value: this.minTick,
					label: this.minTick
				});
			}
			return ticks;
		}
	},
	methods: {
		updateValue: function (event) {
			this.$emit("input", event.target.value);
		},
		changeValue: function (event) {
			value_change = Number(event.target.value);
			label = event.target.innerText;
			if (label.startsWith("+") || label.startsWith("-")) {
				this.value = Math.max(this.value + value_change, this.minTick);
			} else {
				this.value = value_change;
			}
			this.$emit("input", this.value);
		}
	}
});

let app = new Vue({
	el: "#app",
	data: {
		bronzeValue:1000,
    silverValue:1000,
    goldValue:1000,
    sapphireValue:1000,
    rubyValue:1000,
    emeraldValue:1000,
    timeWasted:10,
    hoursPerClaim:3,
    averageCharacterValue:150,
    averageValueOfKakera:191.35803561590,
    afterSapphireIV:379.33738561590
	},
	
	
	
	computed: {
		BadgeValues: function () {
      let Costs = [
        this.bronzeValue, this.bronzeValue*2, this.bronzeValue*3, this.bronzeValue*4, 
        this.silverValue, this.silverValue*2, this.silverValue*3, this.silverValue*4,
        this.goldValue, this.goldValue*2, this.goldValue*3, this.goldValue*4, 
        this.sapphireValue, this.sapphireValue*2, this.sapphireValue*3, this.sapphireValue*4,
        this.rubyValue, this.rubyValue*2, this.rubyValue*3, this.rubyValue*4, 
        this.emeraldValue, this.emeraldValue*2, this.emeraldValue*3, this.emeraldValue*4,
                  ]
			return Costs[2]
		},
	mounted: function () {
		renderMathInElement(this.$refs.nerdShit);
		hljs.initHighlightingOnLoad();
	}
});
