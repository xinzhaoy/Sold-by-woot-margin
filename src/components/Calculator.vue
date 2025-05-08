<template>
  <div class="calculator-container">
    <div class="about-section">
      <h2>About the Calculator</h2>
      <p>This cost calculator helps you calculate costs and profits under different sales models for Sold by Woot.</p>
      <p>How to use:</p>
      <ol>
        <li>Enter the Amazon retail price (MSRP)</li>
        <li>Enter the Amazon lowest price in the last 30 days</li>
        <li>Enter the SBW retail price (Deal Price)</li>
        <li>Enter the shipping cost</li>
        <li>Click the "Calculate Costs and Profits" button</li>
      </ol>
      <p>The calculator will automatically calculate results for all three models: Sold by Woot!, Amazon Deal, and Sold by Woot! 3PL.</p>
    </div>
    
    <div class="input-section">
      <h2>Input Parameters</h2>
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
        <label for="estShippingCost">Shipping Cost (FBA)</label>
        <input type="number" id="estShippingCost" v-model.number="inputs.estShippingCost">
      </div>
      
      <button @click="calculate">Calculate Costs and Profits</button>
    </div>
    
    <div class="results-section">
      <h2>Calculation Results</h2>
      <div v-if="!calculated">
        <p>Please enter parameters and click "Calculate Costs and Profits" button</p>
      </div>
      <div v-else>
        <h3>Model Comparison</h3>
        <table class="result-table comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Sold by Woot!</th>
              <th>Amazon Deal</th>
              <th>Sold by Woot! 3PL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MSRP (Amazon Retail Price)</td>
              <td>${{ formatNumber(results.sbw.msrp) }}</td>
              <td>${{ formatNumber(results.amazonDeal.msrp) }}</td>
              <td>${{ formatNumber(results.sbw3pl.msrp) }}</td>
            </tr>
            <tr>
              <td>Amazon Lowest Price (Last 30 Days)</td>
              <td>${{ formatNumber(results.sbw.sellingPrice) }}</td>
              <td>${{ formatNumber(results.amazonDeal.sellingPrice) }}</td>
              <td>${{ formatNumber(results.sbw3pl.sellingPrice) }}</td>
            </tr>
            <tr>
              <td>Deal Price (SBW Retail Price)</td>
              <td>${{ formatNumber(results.sbw.dealPrice) }}</td>
              <td>${{ formatNumber(results.amazonDeal.dealPrice) }}</td>
              <td>${{ formatNumber(results.sbw3pl.dealPrice) }}</td>
            </tr>
            <tr>
              <td>Shipping Cost</td>
              <td>${{ formatNumber(results.sbw.estShippingCost) }}</td>
              <td>${{ formatNumber(results.amazonDeal.estShippingCost) }}</td>
              <td>${{ formatNumber(results.sbw3pl.estShippingCost) }}</td>
            </tr>
            <tr>
              <td>Woot Margin</td>
              <td>${{ formatNumber(results.sbw.wootMargin) }}</td>
              <td>${{ formatNumber(results.amazonDeal.wootMargin) }}</td>
              <td>${{ formatNumber(results.sbw3pl.wootMargin) }}</td>
            </tr>
            <tr>
              <td>Woot Cost</td>
              <td>${{ formatNumber(results.sbw.wootCost) }}</td>
              <td>${{ formatNumber(results.amazonDeal.wootCost) }}</td>
              <td>${{ formatNumber(results.sbw3pl.wootCost) }}</td>
            </tr>
            <tr>
              <td>Deal Submission Cost</td>
              <td>${{ formatNumber(results.sbw.dealSubmissionCost) }}</td>
              <td>${{ formatNumber(results.amazonDeal.dealSubmissionCost) }}</td>
              <td>${{ formatNumber(results.sbw3pl.dealSubmissionCost) }}</td>
            </tr>
            <tr>
              <td>6Blu Margin</td>
              <td>${{ formatNumber(results.sbw.bbluMargin) }}</td>
              <td>${{ formatNumber(results.amazonDeal.bbluMargin) }}</td>
              <td>${{ formatNumber(results.sbw3pl.bbluMargin) }}</td>
            </tr>
            <tr>
              <td>Amazon Platform Fee</td>
              <td>${{ formatNumber(results.sbw.amazonPlatformFee) }}</td>
              <td>${{ formatNumber(results.amazonDeal.amazonPlatformFee) }}</td>
              <td>${{ formatNumber(results.sbw3pl.amazonPlatformFee) }}</td>
            </tr>
            <tr>
              <td>Net Income for Seller</td>
              <td :class="getProfitClass(results.sbw.netIncomeForSeller)">${{ formatNumber(results.sbw.netIncomeForSeller) }}</td>
              <td :class="getProfitClass(results.amazonDeal.netIncomeForSeller)">${{ formatNumber(results.amazonDeal.netIncomeForSeller) }}</td>
              <td :class="getProfitClass(results.sbw3pl.netIncomeForSeller)">${{ formatNumber(results.sbw3pl.netIncomeForSeller) }}</td>
            </tr>
            <tr>
              <td>Estimated Sales Quantity</td>
              <td>{{ formatNumber(results.sbw.estimatedSellThrough) }}</td>
              <td>{{ formatNumber(results.amazonDeal.estimatedSellThrough) }}</td>
              <td>{{ formatNumber(results.sbw3pl.estimatedSellThrough) }}</td>
            </tr>
            <tr>
              <td>Returns (5%)</td>
              <td>{{ formatNumber(results.sbw.returns5percent) }}</td>
              <td>{{ formatNumber(results.amazonDeal.returns5percent) }}</td>
              <td>{{ formatNumber(results.sbw3pl.returns5percent) }}</td>
            </tr>
            <tr>
              <td>Net Deal Sales / Net Receive</td>
              <td :class="getProfitClass(results.sbw.netDealSales)">${{ formatNumber(results.sbw.netDealSales) }}</td>
              <td :class="getProfitClass(results.amazonDeal.netDealSales)">${{ formatNumber(results.amazonDeal.netDealSales) }}</td>
              <td :class="getProfitClass(results.sbw3pl.netDealSales)">${{ formatNumber(results.sbw3pl.netDealSales) }}</td>
            </tr>
            <tr>
              <td>Net Receive Per Unit</td>
              <td :class="getProfitClass(results.sbw.netReceivePerUnit)">${{ formatNumber(results.sbw.netReceivePerUnit) }}</td>
              <td :class="getProfitClass(results.amazonDeal.netReceivePerUnit)">${{ formatNumber(results.amazonDeal.netReceivePerUnit) }}</td>
              <td :class="getProfitClass(results.sbw3pl.netReceivePerUnit)">${{ formatNumber(results.sbw3pl.netReceivePerUnit) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      tabs: ['Results', 'About'],
      activeTab: 'Results',
      calculated: false,
      inputs: {
        msrp: null,
        sellingPrice: null,
        dealPrice: null,
        estShippingCost: null
      },
      results: {
        sbw: {},
        amazonDeal: {},
        sbw3pl: {}
      }
    }
  },
  methods: {
    calculate() {
      // Calculate for Sold by Woot model
      this.results.sbw = this.calculateCostsExact(
        "Sold by woot",
        this.inputs.msrp,
        this.inputs.sellingPrice,
        this.inputs.dealPrice,
        this.inputs.estShippingCost,
        100, // Default deal submission cost for Sold by Woot
        500  // Default estimated sales
      );
      
      // Calculate for Amazon Deal model
      this.results.amazonDeal = this.calculateCostsExact(
        "Amazon deal",
        this.inputs.msrp,
        this.inputs.sellingPrice,
        this.inputs.dealPrice,
        this.inputs.estShippingCost,
        500, // Default deal submission cost for Amazon Deal
        500  // Default estimated sales
      );
      
      // Calculate for Sold by Woot 3PL model
      this.results.sbw3pl = this.calculateCostsExact(
        "Sold by woot 3pl",
        this.inputs.msrp,
        this.inputs.sellingPrice,
        this.inputs.dealPrice,
        this.inputs.estShippingCost,
        100, // Default deal submission cost for Sold by Woot 3PL
        500  // Default estimated sales
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
      
      // Woot margin 15% - same for all models
      result.wootMargin = dealPrice * 0.15;
      
      // Woot Cost
      if (sellingType === "Amazon deal") {
        result.wootCost = 0;
      } else {
        result.wootCost = dealPrice - result.estShippingCost - result.wootMargin;
      }
      
      // Bblu Margin (10%) - based on Woot Cost, not deal submission cost
      result.bbluMargin = result.wootCost * 0.1;
      
      // Amazon platform fee
      if (sellingType === "Amazon deal") {
        result.amazonPlatformFee = dealPrice * 0.84;
      } else {
        result.amazonPlatformFee = 0;
      }
      
      // Net income for seller
      if (sellingType === "Amazon deal") {
        result.netIncomeForSeller = result.amazonPlatformFee - result.estShippingCost;
      } else {
        result.netIncomeForSeller = result.wootCost - result.bbluMargin;
      }
      
      // Returns 5% - only for Amazon deal
      if (sellingType === "Amazon deal") {
        result.returns5percent = (result.netIncomeForSeller * result.estimatedSellThrough) * 0.05;
      } else {
        result.returns5percent = 0;
      }
      
      // Net deal sales/Net receive
      if (sellingType === "Amazon deal") {
        result.netDealSales = result.estimatedSellThrough * result.netIncomeForSeller - result.returns5percent;
      } else {
        result.netDealSales = result.estimatedSellThrough * result.netIncomeForSeller - result.dealSubmissionCost;
      }
      
      result.netReceive = result.netDealSales;
      
      // Net receive per unit
      result.netReceivePerUnit = (result.netReceive - result.dealSubmissionCost) / result.estimatedSellThrough;
      
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

.input-section, .results-section, .about-section {
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.about-section {
  flex-basis: 100%;
  margin-bottom: 20px;
}

.about-section ol {
  padding-left: 20px;
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

.comparison-table th,
.comparison-table td {
  text-align: center;
}

.comparison-table td:first-child {
  text-align: left;
  font-weight: 600;
}

.profit {
  color: var(--secondary-color);
  font-weight: bold;
}

.loss {
  color: var(--danger-color);
  font-weight: bold;
}

.mt-30 {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .calculator-container {
    flex-direction: column;
  }
  
  .input-section, .results-section {
    width: 100%;
  }
}
</style> 