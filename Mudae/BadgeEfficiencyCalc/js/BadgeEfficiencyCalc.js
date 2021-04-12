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
		silverValue:2000,
		goldValue:3000,
		sapphireValue:5000,
		rubyValue:7000,
		emeraldValue:9000,
		timeWasted:10,
		hoursPerClaim:3,
		averageCharacterValue:150,
		averageValueOfKakera:191.35803561590,
		afterSapphireIV:379.33738561590
	},
	
	
	
	computed: {
		BadgeValues: function () {
			let lst = [
				this.bronzeValue,
				this.silverValue,
				this.goldValue,
				this.sapphireValue,
				this.rubyValue,
				this.emeraldValue
			];
			let values = [];
			for (let i = 0; i < lst.length; i++) {
				for (let j = 1; j <= 4; j++) {
					values.push(lst[i]*j);
				}
			}
			return values;
		},
		
		
		SumValues: function () {
			let list = [
				this.bronzeValue,
				this.silverValue,
				this.goldValue,
				this.sapphireValue,
				this.rubyValue,
				this.emeraldValue
			];
			let sumValues = [];
			for (let i = 0; i < list.length; i++) {
				sumValues.push(list[i], list[i]*3, list[i]*6, list[i]*10);
			}
			return sumValues;
		},
		
		
		TotalCost: function () {
			return this.BadgeValues.reduce((a, b) => a + b)
		},
		
		
		BaseDailyIncome: function () {
			return this.averageValueOfKakera*(this.timeWasted/5);
		},
		
		
		RubyBase: function () {
			let sumValues = this.SumValues;
			let Cost = sumValues[1]+sumValues[5]+sumValues[9]+sumValues[19];
			let Remaining = (this.TotalCost-Cost)*0.75;
			let Time = Cost/this.BaseDailyIncome;
			return [Cost, Remaining, Time]
		},
		
		
		EmeraldBase: function () {
			let sumValues = this.SumValues;
			let Cost = sumValues[2]+sumValues[6]+sumValues[10]+sumValues[19];
			let Remaining = this.TotalCost-Cost;
			let Time = Cost/this.BaseDailyIncome;
			return [Cost, Remaining, Time]
		},
		
		
		IncomeAfterRuby: function () {
			return this.averageValueOfKakera*(this.timeWasted/3);
		},
		
		
		RubyRouteIncome: function () {
			let lst = [];
			//Gold IV
			lst.push(this.averageValueOfKakera*(this.timeWasted/2));
			//Sapphire IV
			lst.push(this.afterSapphireIV*(this.timeWasted/3));
			//Gold & Sapphire IV
			lst.push(this.afterSapphireIV*(this.timeWasted/2));
			return lst
		},
		
		
		IncomeAfterEmerald: function () {
			return this.averageValueOfKakera*(this.timeWasted/3.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim);
		},
		
		
		EmeraldRouteIncome: function () {
			let lst = [];
			//Gold IV
			lst.push(this.averageValueOfKakera*(this.timeWasted/3) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Sapphire IV
			lst.push(this.afterSapphireIV*(this.timeWasted/3.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Ruby IV
			lst.push(this.averageValueOfKakera*(this.timeWasted/2.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Gold & Sapphire IV
			lst.push(this.afterSapphireIV*(this.timeWasted/3) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Gold & Ruby IV
			lst.push(this.averageValueOfKakera*(this.timeWasted/2) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Sapphire & Ruby IV
			lst.push(this.afterSapphireIV*(this.timeWasted/2.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			//Gold, Sapphire & Ruby IV
			lst.push(this.afterSapphireIV*(this.timeWasted/2) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
			return lst;
		}
	},
	mounted: function () {
		renderMathInElement(this.$refs.nerdShit);
		hljs.initHighlightingOnLoad();
	}
this.timeWasted/});
