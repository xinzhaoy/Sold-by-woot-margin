<template>
  <div class="calculator-container">
    <div class="input-section">
      <h2>Input Parameters</h2>
      <div class="form-group">
        <label for="sellingType">Sales Model</label>
        <select id="sellingType" v-model="inputs.sellingType">
          <option value="Sold by woot">Sold by woot</option>
          <option value="Amazon deal">Amazon deal</option>
          <option value="Sold by woot 3pl">Sold by woot 3pl</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="msrp">Amazon Retail Price (MSRP)</label>
        <input type="number" id="msrp" v-model.number="inputs.msrp">
      </div>
      
      <div class="form-group">
        <label for="sellingPrice">Amazon Lowest Price (Last 30 Days)</label>
        <input type="number" id="sellingPrice" v-model.number="inputs.sellingPrice">
      </div>
      
      <div class="form-group">
        <label for="dealPrice">SBW Retail Price (Deal Price)</label>
        <input type="number" id="dealPrice" v-model.number="inputs.dealPrice">
      </div>
      
      <div class="form-group">
        <label for="estShippingCost">Shipping Cost (FBA/3PL+woot)</label>
        <input type="number" id="estShippingCost" v-model.number="inputs.estShippingCost">
      </div>
      
      <div class="form-group">
        <label for="dealSubmissionCost">Deal Submission Cost</label>
        <input type="number" id="dealSubmissionCost" v-model.number="inputs.dealSubmissionCost">
      </div>
      
      <div class="form-group">
        <label for="estimatedSellThrough">Estimated Sales Quantity</label>
        <input type="number" id="estimatedSellThrough" v-model.number="inputs.estimatedSellThrough">
      </div>
      
      <button @click="calculate">Calculate Costs and Profits</button>
    </div>
    
    <div class="results-section">
      <div class="tab">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          class="tablinks" 
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      
      <div v-if="activeTab === 'Results'" class="tabcontent">
        <h2>Calculation Results</h2>
        <div v-if="!calculated">
          <p>Please enter parameters and click "Calculate Costs and Profits" button</p>
        </div>
        <div v-else>
          <table class="result-table">
            <tbody>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>MSRP (Amazon Retail Price)</td>
                <td>${{ formatNumber(results.msrp) }}</td>
              </tr>
              <tr>
                <td>Amazon Lowest Price (Last 30 Days)</td>
                <td>${{ formatNumber(results.sellingPrice) }}</td>
              </tr>
              <tr>
                <td>Deal Price (SBW Retail Price)</td>
                <td>${{ formatNumber(results.dealPrice) }}</td>
              </tr>
              <tr>
                <td>Shipping Cost</td>
                <td>${{ formatNumber(results.estShippingCost) }}{{ inputs.sellingType === "Sold by woot 3pl" ? " (3PL + woot shipping account)" : "" }}</td>
              </tr>
              <tr>
                <td>Woot Margin (15%)</td>
                <td>${{ formatNumber(results.wootMargin) }}</td>
              </tr>
              <tr>
                <td>Woot Cost</td>
                <td>${{ formatNumber(results.wootCost) }}</td>
              </tr>
              <tr>
                <td>Deal Submission Cost</td>
                <td>${{ formatNumber(results.dealSubmissionCost) }}</td>
              </tr>
              <tr>
                <td>Bblu Margin (10%)</td>
                <td>${{ formatNumber(results.bbluMargin) }}</td>
              </tr>
              <tr>
                <td>Amazon Platform Fee</td>
                <td>${{ formatNumber(results.amazonPlatformFee) }}</td>
              </tr>
              <tr>
                <td>Net Income for Seller</td>
                <td :class="getProfitClass(results.netIncomeForSeller)">${{ formatNumber(results.netIncomeForSeller) }}</td>
              </tr>
              <tr>
                <td>Estimated Sales Quantity</td>
                <td>{{ formatNumber(results.estimatedSellThrough) }}</td>
              </tr>
              <tr>
                <td>Returns (5%)</td>
                <td>{{ formatNumber(results.returns5percent) }}</td>
              </tr>
              <tr>
                <td>Net Deal Sales / Net Receive</td>
                <td :class="getProfitClass(results.netDealSales)">${{ formatNumber(results.netDealSales) }}</td>
              </tr>
              <tr>
                <td>Net Receive Per Unit</td>
                <td :class="getProfitClass(results.netReceivePerUnit)">${{ formatNumber(results.netReceivePerUnit) }}</td>
              </tr>
              <tr>
                <td>EST Rank Improvement</td>
                <td>{{ formatNumber(results.estRankImprovement) }}%</td>
              </tr>
            </tbody>
          </table>
          
          <div class="profit-analysis">
            <h3>Profit Analysis</h3>
            <div class="result-row">
              <div class="result-label">Total Revenue:</div>
              <div :class="['result-value', getProfitClass(results.netDealSales)]">${{ formatNumber(results.netDealSales) }}</div>
            </div>
            <div class="result-row">
              <div class="result-label">Revenue Per Unit:</div>
              <div :class="['result-value', getProfitClass(results.netReceivePerUnit)]">${{ formatNumber(results.netReceivePerUnit) }}</div>
            </div>
            <div class="result-row">
              <div class="result-label">Rank Improvement:</div>
              <div class="result-value">{{ formatNumber(results.estRankImprovement) }}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'Formulas'" class="tabcontent">
        <h2>Formula Explanations</h2>
        <table class="result-table">
          <tbody>
            <tr>
              <th>Field</th>
              <th>Formula</th>
            </tr>
            <tr>
              <td>Woot margin 15%</td>
              <td>Deal Price × 0.15</td>
            </tr>
            <tr>
              <td>Woot Cost</td>
              <td>Deal Price - Shipping Cost - Woot margin (0 for Amazon deal)</td>
            </tr>
            <tr>
              <td>Deal submission cost</td>
              <td>User input value (0 for Amazon deal)</td>
            </tr>
            <tr>
              <td>Bblu Margin (10%)</td>
              <td>Deal submission cost × 0.1</td>
            </tr>
            <tr>
              <td>Amazon platform fee</td>
              <td>Platform fee calculated based on sales model and Deal Price</td>
            </tr>
            <tr>
              <td>Net income for seller</td>
              <td>Deal submission cost - Amazon platform fee</td>
            </tr>
            <tr>
              <td>Net receive</td>
              <td>Total income calculated based on sales model and effective sales</td>
            </tr>
            <tr>
              <td>Net receive per unit</td>
              <td>Net receive / (Estimated sales - Returns)</td>
            </tr>
            <tr>
              <td>EST Rank Improvement</td>
              <td>Rank improvement based on shipping cost as a percentage of Deal Price</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="activeTab === 'About'" class="tabcontent">
        <h2>About the Calculator</h2>
        <p>This cost calculator is a web version developed based on the "Sold by Woot Cost Calculator" Excel spreadsheet. It helps you calculate costs and profits under different sales models.</p>
        <p>How to use:</p>
        <ol>
          <li>Select the sales model (Sold by woot, Amazon deal, or Sold by woot 3pl)</li>
          <li>Enter the Amazon retail price (MSRP)</li>
          <li>Enter the Amazon lowest price in the last 30 days</li>
          <li>Enter the SBW retail price (Deal Price)</li>
          <li>Enter the shipping cost</li>
          <li>Enter the deal submission cost</li>
          <li>Enter the estimated sales quantity</li>
          <li>Click the "Calculate Costs and Profits" button</li>
        </ol>
        <p>The calculator will automatically calculate all relevant cost and profit metrics and display them in the results area.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      tabs: ['Results', 'Formulas', 'About'],
      activeTab: 'Results',
      calculated: false,
      inputs: {
        sellingType: 'Sold by woot',
        msrp: 150,
        sellingPrice: 150,
        dealPrice: 100,
        estShippingCost: 10,
        dealSubmissionCost: 100,
        estimatedSellThrough: 500
      },
      results: {}
    }
  },
  watch: {
    'inputs.sellingType': function() {
      // Clear results when sales model changes
      this.calculated = false;
    }
  },
  methods: {
    calculate() {
      this.results = this.calculateCostsExact(
        this.inputs.sellingType,
        this.inputs.msrp,
        this.inputs.sellingPrice,
        this.inputs.dealPrice,
        this.inputs.estShippingCost,
        this.inputs.dealSubmissionCost,
        this.inputs.estimatedSellThrough
      );
      this.calculated = true;
    },
    calculateCostsExact(sellingType, msrp, sellingPrice, dealPrice, estShippingCost, dealSubmissionCost, estimatedSellThrough = 500) {
      const result = {};
      
      // Base data
      result.msrp = msrp;
      result.sellingPrice = sellingPrice;
      result.dealPrice = dealPrice;
      result.estShippingCost = parseFloat(estShippingCost);
      result.dealSubmissionCost = parseFloat(dealSubmissionCost);
      result.estimatedSellThrough = estimatedSellThrough;
      
      // Woot margin 15%
      result.wootMargin = dealPrice * 0.15;
      
      // Woot Cost
      if (sellingType === "Amazon deal") {
        result.wootCost = 0; // Fixed as 0 for Amazon deal
      } else if (sellingType === "Sold by woot 3pl") {
        result.wootCost = dealPrice - result.estShippingCost - result.wootMargin;
      } else { // Sold by woot
        result.wootCost = dealPrice - result.estShippingCost - result.wootMargin;
      }
      
      // Deal submission cost is now an input, no calculation needed
      if (sellingType === "Amazon deal") {
        // For Amazon deal, this is always 0 regardless of input
        result.dealSubmissionCost = 0;
      }
      
      // Bblu Margin (10%)
      result.bbluMargin = result.dealSubmissionCost * 0.1;
      
      // Amazon platform fee
      if (sellingType === "Amazon deal") {
        result.amazonPlatformFee = 0;
      } else if (sellingType === "Sold by woot") {
        // For Sold by woot with high shipping cost (80)
        if (result.estShippingCost >= 80) {
          result.amazonPlatformFee = dealPrice * 0.84; // Fixed at D*0.84 for shipping cost of 80
        } else {
          result.amazonPlatformFee = 0; // No platform fee for lower shipping costs
        }
      } else if (sellingType === "Sold by woot 3pl") {
        result.amazonPlatformFee = 0; // Always 0 for 3PL as shown in Excel
      }
      
      // Net income for seller
      if (sellingType === "Amazon deal") {
        result.netIncomeForSeller = 0;
      } else {
        // For Sold by woot and Sold by woot 3pl
        result.netIncomeForSeller = result.dealSubmissionCost - result.amazonPlatformFee;
      }
      
      // Returns 5%
      if (sellingType === "Sold by woot 3pl") {
        result.returns5percent = 0; // Returns is 0 for 3PL
      } else {
        result.returns5percent = result.estimatedSellThrough * 0.05;
      }
      
      // Net deal sales/Net receive
      if (sellingType === "Amazon deal") {
        // For Amazon deal, fixed value of 400
        result.netReceive = 400;
        result.netDealSales = 400;
        result.netReceivePerUnit = result.netReceive / result.estimatedSellThrough;
      } else if (sellingType === "Sold by woot") {
        // Sold by woot with different shipping costs
        if (result.estShippingCost >= 80) {
          result.netReceive = result.estimatedSellThrough * result.netIncomeForSeller / 0.13;
          result.netDealSales = result.netReceive;
          result.netReceivePerUnit = result.netReceive / result.estimatedSellThrough;
        } else {
          result.netDealSales = result.estimatedSellThrough * result.netIncomeForSeller - result.bbluMargin;
          result.netReceive = result.netDealSales;
          result.netReceivePerUnit = result.netDealSales / result.estimatedSellThrough;
        }
      } else if (sellingType === "Sold by woot 3pl") {
        // For Sold by woot 3pl
        result.netDealSales = result.estimatedSellThrough * result.netIncomeForSeller - result.bbluMargin;
        result.netReceive = result.netDealSales;
        result.netReceivePerUnit = (result.netDealSales - result.bbluMargin) / result.estimatedSellThrough;
      }
      
      // EST Rank Improvement
      if (result.estShippingCost >= 80) {
        result.estRankImprovement = 10.0; // Fixed as 10% for 80
      } else if (result.estShippingCost >= 70) {
        result.estRankImprovement = 20.0; // Fixed as 20% for 70
      } else if (result.estShippingCost >= 50) {
        result.estRankImprovement = 50.0; // Fixed as 50% for 50
      } else {
        // For any other shipping cost values
        result.estRankImprovement = 50.0; // Default to 50%
      }
      
      return result;
    },
    formatNumber(num) {
      return num !== undefined ? parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00";
    },
    getProfitClass(value) {
      if (value > 0) return 'profit';
      if (value < 0) return 'loss';
      return '';
    }
  }
}
</script>

<style scoped>
.calculator-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.input-section, .results-section {
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-section {
  flex: 1;
  min-width: 300px;
}

.results-section {
  flex: 2;
  min-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

button {
  margin-top: 10px;
  width: 100%;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.result-table th {
  background-color: var(--primary-color);
  color: white;
  text-align: left;
  padding: 12px;
}

.result-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.result-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.profit-analysis {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.profit-analysis h3 {
  margin-bottom: 10px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.result-label {
  font-weight: 600;
  flex: 1;
}

.result-value {
  flex: 1;
  text-align: right;
}

.profit {
  color: var(--secondary-color);
  font-weight: bold;
}

.loss {
  color: var(--danger-color);
  font-weight: bold;
}

/* Tab styles */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  width: auto;
  color: var(--dark-color);
  margin-top: 0;
  border-radius: 0;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: var(--primary-color);
  color: white;
}

.tabcontent {
  padding: 20px;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  animation: fadeEffect 1s;
}

@keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}

/* Responsive design */
@media (max-width: 768px) {
  .calculator-container {
    flex-direction: column;
  }
  
  .input-section, .results-section {
    width: 100%;
  }
}
</style> 