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
			return this.BadgeValues.reduce((a, b) => a + b);
		},
		
		
		BaseDailyIncome: function () {
			return Math.round(this.averageValueOfKakera*(this.timeWasted/5));
		},
		
	// Ruby Route
		RubyBase: function () {
			let cost = this.SumValues[1]+this.SumValues[5]+this.SumValues[9]+this.SumValues[19];
			let remaining = (this.TotalCost-cost)*0.75;
			let time = Math.round(cost/this.BaseDailyIncome*100)/100;
			let lst = [cost, remaining, time];
			return lst;
		},
		
		
		IncomeAfterRuby: function () {
			return Math.round(this.averageValueOfKakera*(this.timeWasted/3));
		},
		
		
		RubyRouteIncome: function () {
			let lst = [];
		//Gold IV
			lst.push(Math.round(this.averageValueOfKakera*(this.timeWasted/2)));
		//Sapphire IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/3)));
		//Gold & Sapphire IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/2)));
			return lst;
		},
		
		
		RubyRouteMid: function () {
			let lst = []
			let gold = this.SumValues[11]-this.SumValues[9];
			let sapphire = this.SumValues[15];
		// Gold -> Sapphire
			let nextBadgeCost = gold;
			let newRemaining = this.RubyBase[1]-nextBadgeCost;
			let time = Math.round(nextBadgeCost/this.IncomeAfterRuby*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = sapphire;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.RubyRouteIncome[0]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
		// Sapphire -> Gold
			nextBadgeCost = sapphire;
			newRemaining = this.RubyBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterRuby*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = gold;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.RubyRouteIncome[1]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
		// Times
			lst.push(Math.round((this.RubyBase[2]+lst[2]+lst[5])*100)/100)
			lst.push(Math.round((this.RubyBase[2]+lst[8]+lst[11])*100)/100)
			
			return lst;
		},
		
		
		RubyRouteEnd: function () {
			let remaining = this.RubyRouteMid[10];
			let time = Math.round(remaining/this.RubyRouteIncome[2]*100)/100;
			let lst = [remaining, time];
			lst.push(Math.round((this.RubyRouteMid[12]+time)*100)/100, Math.round((this.RubyRouteMid[13]+time)*100)/100);
			return lst;
		},
		
	// Emerald Route
		EmeraldBase: function () {
			let cost = this.SumValues[2]+this.SumValues[6]+this.SumValues[10]+this.SumValues[19];
			let remaining = this.TotalCost-cost;
			let time = Math.round(cost/this.BaseDailyIncome*100)/100;
			let lst = [cost, remaining, time];
			return lst;
		},
		
		
		IncomeAfterEmerald: function () {
			return Math.round(this.averageValueOfKakera*(this.timeWasted/3.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim));
		},
		
		
		EmeraldRouteIncome: function () {
			let lst = [];
		//Gold IV
			lst.push(Math.round(this.averageValueOfKakera*(this.timeWasted/3) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Sapphire IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/3.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Ruby IV
			lst.push(Math.round(this.averageValueOfKakera*(this.timeWasted/2.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Gold & Sapphire IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/3) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Gold & Ruby IV
			lst.push(Math.round(this.averageValueOfKakera*(this.timeWasted/2) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Sapphire & Ruby IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/2.5) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
		//Gold, Sapphire & Ruby IV
			lst.push(Math.round(this.afterSapphireIV*(this.timeWasted/2) + this.averageCharacterValue*Math.ceil(this.timeWasted/this.hoursPerClaim)));
			return lst;
		},
		
		
		EmeraldRouteMid: function () {
			let lst = [];
			let gold = this.SumValues[11]-this.SumValues[10];
			let sapphire = this.SumValues[15];
			let ruby = this.SumValues[19];
		// Gold -> Sapphire -> Ruby
			let nextBadgeCost = this.SumValues[11]-this.SumValues[10];
			let newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			let time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = sapphire;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[0]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = ruby;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[3]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
		// Gold -> Ruby -> Sapphire
			nextBadgeCost = gold;
			newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = ruby;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[0]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = sapphire;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[4]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);

		// Sapphire -> Gold -> Ruby
			nextBadgeCost = sapphire;
			newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = gold;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[1]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = ruby;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[3]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);

		// Sapphire -> Ruby -> Gold
			nextBadgeCost = sapphire;
			newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = ruby;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[1]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = gold;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[5]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);

		// Ruby -> Gold -> Sapphire
			nextBadgeCost = ruby;
			newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = gold;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[2]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = sapphire;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[4]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);

		// Ruby -> Sapphire -> Gold
			nextBadgeCost = ruby;
			newRemaining = this.EmeraldBase[1]-nextBadgeCost;
			time = Math.round(nextBadgeCost/this.IncomeAfterEmerald*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = sapphire;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[2]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
			nextBadgeCost = gold;
			newRemaining -= nextBadgeCost;
			time = Math.round(nextBadgeCost/this.EmeraldRouteIncome[5]*100)/100;
			lst.push(nextBadgeCost, newRemaining, time);
			
		// Times
			lst.push(Math.round((this.EmeraldBase[2]+lst[2]+lst[5]+lst[8])*100)/100)
			lst.push(Math.round((this.EmeraldBase[2]+lst[11]+lst[14]+lst[17])*100)/100)
			lst.push(Math.round((this.EmeraldBase[2]+lst[20]+lst[23]+lst[26])*100)/100)
			lst.push(Math.round((this.EmeraldBase[2]+lst[29]+lst[32]+lst[35])*100)/100)
			lst.push(Math.round((this.EmeraldBase[2]+lst[38]+lst[41]+lst[44])*100)/100)
			lst.push(Math.round((this.EmeraldBase[2]+lst[47]+lst[50]+lst[53])*100)/100)

			return lst;
		},
		
		
		EmeraldRouteEnd: function () {
			let remaining = this.EmeraldRouteMid[52];
			let time = Math.round(remaining/this.EmeraldRouteIncome[2]*100)/100;
			let lst = [remaining, time];
			for (let i = 54; i < 60; i++) {
				lst.push(Math.round((this.EmeraldRouteMid[i]+time)*100)/100)
			};
			return lst;
		},
		
		
		BestRoute: function () {
			let ruby = this.RubyRouteEnd;
			let emerald = this.EmeraldRouteEnd;
			let lst = [];
			lst.push(ruby[2], ruby[3]);
			for (let i = 2; i < 8; i++) {
				lst.push(emerald[i]);
			}
			let dct = [
				["Ruby IV -> Gold IV -> Sapphire IV", lst[0]],
				["Ruby IV -> Sapphire IV -> Gold IV", lst[1]],
				["Emerald IV -> Gold IV -> Sapphire IV -> Ruby IV", lst[2]],
				["Emerald IV -> Gold IV -> Ruby IV -> Sapphire IV", lst[3]],
				["Emerald IV -> Sapphire IV -> Gold IV -> Ruby IV", lst[4]],
				["Emerald IV -> Sapphire IV -> Ruby IV -> Gold IV", lst[5]],
				["Emerald IV -> Ruby IV -> Gold IV -> Sapphire IV", lst[6]],
				["Emerald IV -> Ruby IV -> Sapphire IV -> Gold IV", lst[7]]
			];
			let sorted = dct;
			
			sorted.sort((a,b) => a[1] - b[1]);
			
			
			return sorted;
		}
	},
	mounted: function () {
		hljs.initHighlightingOnLoad();
	}
});
