<template>
  <div class="calculator-container">
    <div class="view-toggle">
      <button 
        class="view-toggle-btn" 
        :class="{ active: currentView === 'calculator' }" 
        @click="switchView('calculator')"
      >
        {{ $t('calculator.views.calculator') }}
      </button>
      <button 
        class="view-toggle-btn" 
        :class="{ active: currentView === 'history' }" 
        @click="switchView('history')"
      >
        {{ $t('calculator.views.history') }}
      </button>
    </div>
    
    <!-- Calculator View -->
    <div v-if="currentView === 'calculator'">
      <div class="about-section">
        <h2>{{ $t('calculator.about.title') }}</h2>
        <p>{{ $t('calculator.about.description') }}</p>
        <p>{{ $t('calculator.about.howToUse') }}</p>
        <ol>
          <li>{{ $t('calculator.about.steps.step1') }}</li>
          <li>{{ $t('calculator.about.steps.step2') }}</li>
          <li>{{ $t('calculator.about.steps.step3') }}</li>
          <li>{{ $t('calculator.about.steps.step4') }}</li>
          <li>{{ $t('calculator.about.steps.step5') }}</li>
        </ol>
        <p>{{ $t('calculator.about.autoCalculation') }}</p>
      </div>
      
      <div class="products-section">
        <h2>{{ $t('calculator.products.title') }}</h2>
        
        <div class="product-tabs">
          <button 
            v-for="(product, index) in products" 
            :key="index" 
            class="product-tab" 
            :class="{ active: currentProductIndex === index }"
            @click="selectProduct(index)"
          >
            {{ product.name || `ASIN ${index + 1}` }}
          </button>
          <button class="add-product-btn" @click="addNewProduct">+ {{ $t('calculator.products.addNew') }}</button>
        </div>
        
        <div class="input-section">
          <div class="form-group">
            <label for="productName">ASIN</label>
            <input type="text" id="productName" v-model="currentProduct.name" :placeholder="$t('calculator.input.asinPlaceholder')">
          </div>
          
          <div class="form-group">
            <label for="msrp">{{ $t('calculator.input.msrp') }} <span class="required-indicator">*</span></label>
            <input 
              type="number" 
              id="msrp" 
              v-model.number="currentProduct.inputs.msrp"
              :class="{ 'error-input': validationErrors.msrp }"
              @input="clearValidationError('msrp')"
            >
          </div>
          
          <div class="form-group">
            <label for="sellingPrice">{{ $t('calculator.input.lowestPrice') }} <span class="required-indicator">*</span></label>
            <input 
              type="number" 
              id="sellingPrice" 
              v-model.number="currentProduct.inputs.sellingPrice"
              :class="{ 'error-input': validationErrors.sellingPrice }"
              @input="clearValidationError('sellingPrice')"
            >
          </div>
          
          <div class="form-group">
            <label for="dealPrice">{{ $t('calculator.input.dealPrice') }} <span class="required-indicator">*</span></label>
            <input 
              type="number" 
              id="dealPrice" 
              v-model.number="currentProduct.inputs.dealPrice"
              :class="{ 'error-input': validationErrors.dealPrice }"
              @input="clearValidationError('dealPrice')"
            >
          </div>
          
          <div class="form-group">
            <label for="estShippingCost">{{ $t('calculator.input.shippingCost') }} <span class="required-indicator">*</span></label>
            <input 
              type="number" 
              id="estShippingCost" 
              v-model.number="currentProduct.inputs.estShippingCost"
              :class="{ 'error-input': validationErrors.estShippingCost }"
              @input="clearValidationError('estShippingCost')"
            >
          </div>
          
          <button @click="calculate" class="calculate-btn">{{ $t('calculator.input.calculateButton') }}</button>
          <button @click="deleteProduct" class="delete-btn" v-if="products.length > 1">{{ $t('calculator.products.delete') }}</button>
        </div>
        
        <div class="results-section">
          <h2>{{ $t('calculator.results.title') }}</h2>
          <div v-if="!currentProduct.calculated">
            <p>{{ $t('calculator.results.pleaseEnter') }}</p>
          </div>
          <div v-else>
            <h3>{{ $t('calculator.results.modelComparison') }}</h3>
            <table class="result-table comparison-table">
              <thead>
                <tr>
                  <th>{{ $t('calculator.results.metrics.metric') }}</th>
                  <th>{{ $t('calculator.results.metrics.woot') }}</th>
                  <th>{{ $t('calculator.results.metrics.amazonDeal') }}</th>
                  <th>{{ $t('calculator.results.metrics.woot3PL') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t('calculator.results.metrics.msrp') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.msrp) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.msrp) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.msrp) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.lowestPrice') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.sellingPrice) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.sellingPrice) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.sellingPrice) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.dealPrice') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.dealPrice) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.dealPrice) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.dealPrice) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.shippingCost') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.estShippingCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.estShippingCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.estShippingCost) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.wootMargin') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.wootMargin) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.wootMargin) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.wootMargin) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.wootCost') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.wootCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.wootCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.wootCost) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.dealSubmissionCost') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.dealSubmissionCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.dealSubmissionCost) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.dealSubmissionCost) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.bbluMargin') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.bbluMargin) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.bbluMargin) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.bbluMargin) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.amazonPlatformFee') }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw.amazonPlatformFee) }}</td>
                  <td>{{ formatMoney(currentProduct.results.amazonDeal.amazonPlatformFee) }}</td>
                  <td>{{ formatMoney(currentProduct.results.sbw3pl.amazonPlatformFee) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.netIncomeForSeller') }}</td>
                  <td :class="getProfitClass(currentProduct.results.sbw.netIncomeForSeller)" class="net-income-cell">
                    {{ formatMoney(currentProduct.results.sbw.netIncomeForSeller) }}
                  </td>
                  <td :class="getProfitClass(currentProduct.results.amazonDeal.netIncomeForSeller)" class="net-income-cell">
                    {{ formatMoney(currentProduct.results.amazonDeal.netIncomeForSeller) }}
                  </td>
                  <td :class="getProfitClass(currentProduct.results.sbw3pl.netIncomeForSeller)" class="net-income-cell">
                    {{ formatMoney(currentProduct.results.sbw3pl.netIncomeForSeller) }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.estimatedSalesQuantity') }}</td>
                  <td>{{ formatNumber(currentProduct.results.sbw.estimatedSellThrough) }}</td>
                  <td>{{ formatNumber(currentProduct.results.amazonDeal.estimatedSellThrough) }}</td>
                  <td>{{ formatNumber(currentProduct.results.sbw3pl.estimatedSellThrough) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.returns') }}</td>
                  <td>{{ formatNumber(currentProduct.results.sbw.returns5percent) }}</td>
                  <td>{{ formatNumber(currentProduct.results.amazonDeal.returns5percent) }}</td>
                  <td>{{ formatNumber(currentProduct.results.sbw3pl.returns5percent) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.netDealSales') }}</td>
                  <td :class="getProfitClass(currentProduct.results.sbw.netDealSales)">{{ formatMoney(currentProduct.results.sbw.netDealSales) }}</td>
                  <td :class="getProfitClass(currentProduct.results.amazonDeal.netDealSales)">{{ formatMoney(currentProduct.results.amazonDeal.netDealSales) }}</td>
                  <td :class="getProfitClass(currentProduct.results.sbw3pl.netDealSales)">{{ formatMoney(currentProduct.results.sbw3pl.netDealSales) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('calculator.results.metrics.netReceivePerUnit') }}</td>
                  <td :class="getProfitClass(currentProduct.results.sbw.netReceivePerUnit)">{{ formatMoney(currentProduct.results.sbw.netReceivePerUnit) }}</td>
                  <td :class="getProfitClass(currentProduct.results.amazonDeal.netReceivePerUnit)">{{ formatMoney(currentProduct.results.amazonDeal.netReceivePerUnit) }}</td>
                  <td :class="getProfitClass(currentProduct.results.sbw3pl.netReceivePerUnit)">{{ formatMoney(currentProduct.results.sbw3pl.netReceivePerUnit) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- History View -->
    <div v-if="currentView === 'history'" class="history-view">
      <div class="history-header">
        <h2>{{ $t('calculator.history.title') }}</h2>
        
        <div class="filter-controls-container">
          <div class="filter-controls">
            <div class="form-group">
              <label for="modelFilter">{{ $t('calculator.history.filterByModel') }}</label>
              <select id="modelFilter" v-model="historyModelFilter">
                <option value="all">{{ $t('calculator.history.allModels') }}</option>
                <option value="sbw">{{ $t('calculator.results.metrics.woot') }}</option>
                <option value="amazonDeal">{{ $t('calculator.results.metrics.amazonDeal') }}</option>
                <option value="sbw3pl">{{ $t('calculator.results.metrics.woot3PL') }}</option>
              </select>
            </div>
          </div>
          
          <div class="export-controls">
            <div class="dropdown">
              <button class="export-btn" @click.prevent="toggleDropdown">Export <span class="dropdown-arrow">▼</span></button>
              <div class="dropdown-content" v-show="showDropdown">
                <a href="#" @click.prevent="exportToPDF">Export to PDF</a>
                <a href="#" @click.prevent="exportToExcel">Export to Excel</a>
                <a href="#" @click.prevent="sendEmail">Send via Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="calculatedProducts.length === 0" class="no-history">
        <p>{{ $t('calculator.history.noHistory') }}</p>
      </div>
      
      <div v-else class="history-table-container">
        <table class="result-table history-table">
          <thead>
            <tr>
              <th>ASIN</th>
              <th>{{ $t('calculator.results.metrics.msrp') }}</th>
              <th>{{ $t('calculator.results.metrics.dealPrice') }}</th>
              <th>{{ $t('calculator.results.metrics.shippingCost') }}</th>
              <th>{{ $t('calculator.history.model') }}</th>
              <th>{{ $t('calculator.results.metrics.netIncomeForSeller') }}</th>
              <th>{{ $t('calculator.results.metrics.netReceivePerUnit') }}</th>
              <th>{{ $t('calculator.history.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(product, productIndex) in calculatedProducts" :key="productIndex">
              <!-- Woot! model row -->
              <tr v-if="historyModelFilter === 'all' || historyModelFilter === 'sbw'" class="product-group">
                <!-- Product name cell -->
                <td :rowspan="getModelRowSpan(productIndex)" class="product-name">
                  {{ product.name || `ASIN ${productIndex + 1}` }}
                </td>
                <!-- MSRP -->
                <td>{{ formatMoney(product.inputs.msrp) }}</td>
                <!-- Deal price -->
                <td>{{ formatMoney(product.inputs.dealPrice) }}</td>
                <!-- Shipping cost -->
                <td>{{ formatMoney(product.inputs.estShippingCost) }}</td>
                <!-- Model type -->
                <td class="model-type-cell">
                  <div class="model-type-wrapper">
                    <span class="model-type">{{ $t('calculator.results.metrics.woot') }}</span>
                  </div>
                </td>
                <!-- Net income for seller -->
                <td :class="getProfitClass(product.results.sbw.netIncomeForSeller)" class="net-income-cell">
                  {{ formatMoney(product.results.sbw.netIncomeForSeller) }}
                </td>
                <!-- Net receive per unit -->
                <td :class="getProfitClass(product.results.sbw.netReceivePerUnit)">
                  {{ formatMoney(product.results.sbw.netReceivePerUnit) }}
                </td>
                <!-- Actions cell -->
                <td :rowspan="getModelRowSpan(productIndex)" class="actions-cell">
                  <button class="action-btn edit-btn" @click="editProduct(productIndex)">
                    {{ $t('calculator.history.edit') }}
                  </button>
                </td>
              </tr>
              
              <!-- Amazon Deal model row -->
              <tr v-if="historyModelFilter === 'all' || historyModelFilter === 'amazonDeal'" 
                  :class="{'product-group': historyModelFilter !== 'all' && historyModelFilter === 'amazonDeal'}">
                <!-- Product name cell for filtered view -->
                <td v-if="historyModelFilter !== 'all' && historyModelFilter === 'amazonDeal'" class="product-name">
                  {{ product.name || `ASIN ${productIndex + 1}` }}
                </td>
                <!-- MSRP -->
                <td>{{ formatMoney(product.inputs.msrp) }}</td>
                <!-- Deal price -->
                <td>{{ formatMoney(product.inputs.dealPrice) }}</td>
                <!-- Shipping cost -->
                <td>{{ formatMoney(product.inputs.estShippingCost) }}</td>
                <!-- Model type -->
                <td class="model-type-cell">
                  <div class="model-type-wrapper">
                    <span class="model-type">{{ $t('calculator.results.metrics.amazonDeal') }}</span>
                  </div>
                </td>
                <!-- Net income for seller -->
                <td :class="getProfitClass(product.results.amazonDeal.netIncomeForSeller)" class="net-income-cell">
                  {{ formatMoney(product.results.amazonDeal.netIncomeForSeller) }}
                </td>
                <!-- Net receive per unit -->
                <td :class="getProfitClass(product.results.amazonDeal.netReceivePerUnit)">
                  {{ formatMoney(product.results.amazonDeal.netReceivePerUnit) }}
                </td>
                <!-- Actions cell for filtered view -->
                <td v-if="historyModelFilter !== 'all' && historyModelFilter === 'amazonDeal'" class="actions-cell">
                  <button class="action-btn edit-btn" @click="editProduct(productIndex)">
                    {{ $t('calculator.history.edit') }}
                  </button>
                </td>
              </tr>
              
              <!-- Woot! 3PL model row -->
              <tr v-if="historyModelFilter === 'all' || historyModelFilter === 'sbw3pl'" 
                  :class="{'product-group': historyModelFilter !== 'all' && historyModelFilter === 'sbw3pl', 
                          'last-model-row': historyModelFilter === 'all' || isLastVisibleModel(productIndex)}">
                <!-- Product name cell for filtered view -->
                <td v-if="historyModelFilter !== 'all' && historyModelFilter === 'sbw3pl'" class="product-name">
                  {{ product.name || `ASIN ${productIndex + 1}` }}
                </td>
                <!-- MSRP -->
                <td>{{ formatMoney(product.inputs.msrp) }}</td>
                <!-- Deal price -->
                <td>{{ formatMoney(product.inputs.dealPrice) }}</td>
                <!-- Shipping cost -->
                <td>{{ formatMoney(product.inputs.estShippingCost) }}</td>
                <!-- Model type -->
                <td class="model-type-cell">
                  <div class="model-type-wrapper">
                    <span class="model-type">{{ $t('calculator.results.metrics.woot3PL') }}</span>
                  </div>
                </td>
                <!-- Net income for seller -->
                <td :class="getProfitClass(product.results.sbw3pl.netIncomeForSeller)" class="net-income-cell">
                  {{ formatMoney(product.results.sbw3pl.netIncomeForSeller) }}
                </td>
                <!-- Net receive per unit -->
                <td :class="getProfitClass(product.results.sbw3pl.netReceivePerUnit)">
                  {{ formatMoney(product.results.sbw3pl.netReceivePerUnit) }}
                </td>
                <!-- Actions cell for filtered view -->
                <td v-if="historyModelFilter !== 'all' && historyModelFilter === 'sbw3pl'" class="actions-cell">
                  <button class="action-btn edit-btn" @click="editProduct(productIndex)">
                    {{ $t('calculator.history.edit') }}
                  </button>
                </td>
              </tr>
              
              <!-- Add a separator after each product group -->
              <tr v-if="productIndex < calculatedProducts.length - 1" class="product-separator">
                <td colspan="8"></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { ref, computed, watch, onMounted } from 'vue'

// Import libraries for exports - these would need to be installed in a real app
// For demo purposes, we're using CDN links instead of npm packages
export default {
  name: 'Calculator',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      currentView: 'calculator', // 'calculator' or 'history'
      historyModelFilter: 'all',
      currentProductIndex: 0,
      products: [this.createEmptyProduct()],
      showDropdown: false,
      validationErrors: {}
    }
  },
  computed: {
    currentProduct() {
      return this.products[this.currentProductIndex];
    },
    calculatedProducts() {
      return this.products.filter(product => product.calculated);
    }
  },
  watch: {
    products: {
      handler() {
        // Remove localStorage functionality
      },
      deep: true
    }
  },
  mounted() {
    // No longer loading from localStorage
  },
  methods: {
    createEmptyProduct() {
      return {
        name: '',
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
      };
    },
    calculate() {
      const product = this.currentProduct;
      
      // Reset validation errors
      this.validationErrors = {};
      
      // Check if any required inputs are missing
      let hasError = false;
      
      if (!product.inputs.msrp) {
        this.validationErrors.msrp = true;
        hasError = true;
      }
      
      if (!product.inputs.sellingPrice) {
        this.validationErrors.sellingPrice = true;
        hasError = true;
      }
      
      if (!product.inputs.dealPrice) {
        this.validationErrors.dealPrice = true;
        hasError = true;
      }
      
      if (!product.inputs.estShippingCost) {
        this.validationErrors.estShippingCost = true;
        hasError = true;
      }
      
      // If there are errors, stop calculation
      if (hasError) {
        return;
      }
      
      // Calculate for Sold by Woot model
      product.results.sbw = this.calculateCostsExact(
        "Sold by woot",
        product.inputs.msrp,
        product.inputs.sellingPrice,
        product.inputs.dealPrice,
        product.inputs.estShippingCost,
        100, // Default deal submission cost for Sold by Woot
        500  // Default estimated sales
      );
      
      // Calculate for Amazon Deal model
      product.results.amazonDeal = this.calculateCostsExact(
        "Amazon deal",
        product.inputs.msrp,
        product.inputs.sellingPrice,
        product.inputs.dealPrice,
        product.inputs.estShippingCost,
        500, // Default deal submission cost for Amazon Deal
        500  // Default estimated sales
      );
      
      // Calculate for Sold by Woot 3PL model
      product.results.sbw3pl = this.calculateCostsExact(
        "Sold by woot 3pl",
        product.inputs.msrp,
        product.inputs.sellingPrice,
        product.inputs.dealPrice,
        product.inputs.estShippingCost,
        100, // Default deal submission cost for Sold by Woot 3PL
        500  // Default estimated sales
      );
      
      product.calculated = true;
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
      if (num !== undefined) {
        const formattedNum = parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNum;
      }
      return "0.00";
    },
    formatMoney(num) {
      if (num !== undefined) {
        const formattedNum = parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `$${formattedNum}`;
      }
      return "$0.00";
    },
    getProfitClass(value) {
      if (value > 0) return 'profit';
      if (value < 0) return 'loss';
      return '';
    },
    addNewProduct() {
      this.products.push(this.createEmptyProduct());
      this.currentProductIndex = this.products.length - 1;
    },
    selectProduct(index) {
      this.currentProductIndex = index;
    },
    deleteProduct() {
      if (this.products.length <= 1) {
        return;
      }
      
      this.products.splice(this.currentProductIndex, 1);
      
      if (this.currentProductIndex >= this.products.length) {
        this.currentProductIndex = this.products.length - 1;
      }
    },
    switchView(view) {
      this.currentView = view;
    },
    editProduct(index) {
      this.currentProductIndex = index;
      this.currentView = 'calculator';
    },
    getModelRowSpan(productIndex) {
      if (this.historyModelFilter === 'all') {
        return 3; // All three models showing
      } else {
        return 1; // Only one model showing
      }
    },
    isLastVisibleModel(productIndex) {
      return this.historyModelFilter === 'sbw3pl' || 
             (this.historyModelFilter === 'amazonDeal' && !this.isModelVisible('sbw3pl')) ||
             (this.historyModelFilter === 'sbw' && !this.isModelVisible('amazonDeal') && !this.isModelVisible('sbw3pl'));
    },
    isModelVisible(modelType) {
      return this.historyModelFilter === 'all' || this.historyModelFilter === modelType;
    },
    exportToPDF() {
      // Load jsPDF from CDN if not present
      if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
          this.generatePDF();
        };
        document.head.appendChild(script);
      } else {
        this.generatePDF();
      }
    },
    generatePDF() {
      // Get data to export
      const data = this.prepareExportData();
      
      try {
        // Create new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text("Woot Calculator - Product History", 14, 20);
        
        // Calculate column widths
        const pageWidth = doc.internal.pageSize.getWidth();
        const margins = 28; // 14pt on each side
        const tableWidth = pageWidth - margins;
        const colWidths = [
          tableWidth * 0.25, // Product name
          tableWidth * 0.13, // MSRP
          tableWidth * 0.13, // Deal Price
          tableWidth * 0.13, // Shipping Cost
          tableWidth * 0.15, // Model Type
          tableWidth * 0.21 // Net Income
        ];
        
        // Set initial position
        let y = 30;
        
        // Add headers
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        let x = 14;
        doc.text("ASIN", x, y);
        x += colWidths[0];
        doc.text("MSRP", x, y);
        x += colWidths[1];
        doc.text("Deal Price", x, y);
        x += colWidths[2];
        doc.text("Shipping", x, y);
        x += colWidths[3];
        doc.text("Model Type", x, y);
        x += colWidths[4];
        doc.text("Net Income", x, y);
        
        // Add data rows
        doc.setFont(undefined, 'normal');
        data.forEach((row, index) => {
          y += 10;
          
          // Add new page if needed
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          
          // Draw row background
          if (index % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(14, y - 6, tableWidth, 8, 'F');
          }
          
          // Add row data
          x = 14;
          doc.text(this.truncateText(row.name || "-", colWidths[0], doc), x, y);
          x += colWidths[0];
          doc.text(`$${this.formatNumber(row.msrp)}`, x, y);
          x += colWidths[1];
          doc.text(`$${this.formatNumber(row.dealPrice)}`, x, y);
          x += colWidths[2];
          doc.text(`$${this.formatNumber(row.shippingCost)}`, x, y);
          x += colWidths[3];
          doc.text(row.modelType, x, y);
          x += colWidths[4];
          const netIncome = this.formatNumber(row.netIncomeForSeller);
          doc.text(`$${netIncome}`, x, y);
        });
        
        // Save the PDF
        doc.save("woot-calculator-history.pdf");
        
        alert('PDF export complete. Check your downloads folder.');
      } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please try again or check console for details.');
      }
    },
    exportToExcel() {
      // Load SheetJS from CDN if not present
      if (typeof window.XLSX === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js';
        script.onload = () => {
          this.generateExcel();
        };
        document.head.appendChild(script);
      } else {
        this.generateExcel();
      }
    },
    generateExcel() {
      // Get data to export
      const data = this.prepareExportData();
      
      try {
        // Format data for Excel
        const excelData = data.map(item => {
          return {
            'ASIN': item.name || '-',
            'MSRP': parseFloat(item.msrp) || 0,
            'Deal Price': parseFloat(item.dealPrice) || 0,
            'Shipping Cost': parseFloat(item.shippingCost) || 0,
            'Model Type': item.modelType,
            'Net Income': parseFloat(item.netIncomeForSeller) || 0,
            'Net Receive Per Unit': parseFloat(item.netReceivePerUnit) || 0
          };
        });
        
        // Create worksheet
        const worksheet = window.XLSX.utils.json_to_sheet(excelData);
        
        // Create workbook
        const workbook = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        
        // Generate Excel file
        window.XLSX.writeFile(workbook, "woot-calculator-history.xlsx");
        
        alert('Excel export complete. Check your downloads folder.');
      } catch (error) {
        console.error('Excel generation error:', error);
        alert('Error generating Excel. Please try again or check console for details.');
      }
    },
    sendEmail() {
      // Prompt user for email details
      const emailAddress = prompt('Enter recipient email address:', '');
      
      // Check if user cancelled or didn't provide an email
      if (!emailAddress) {
        alert('Email sending cancelled.');
        return;
      }
      
      // Show loading message while generating files
      alert('Generating PDF and Excel files for attachment. Click OK to continue.');
      
      // First, trigger PDF and Excel exports
      this.exportToPDF();
      this.exportToExcel();
      
      // Format the subject and body
      const subject = 'Woot Calculator - Product History Export';
      const body = `Please find attached the Woot Calculator Product History.\n\n` +
                  `This email contains data for ${this.calculatedProducts.length} products with the following models: ${this.getIncludedModels()}.\n\n` +
                  `IMPORTANT: Due to browser limitations, you need to manually attach the files that were just downloaded:\n` +
                  `1. woot-calculator-history.pdf\n` +
                  `2. woot-calculator-history.xlsx\n\n` +
                  `These files have been saved to your downloads folder.\n\n` +
                  `This email was sent from the Woot Calculator application.`;
      
      // Add slight delay to ensure files are downloaded before email opens
      setTimeout(() => {
        // Create a mailto link with the data
        const mailtoLink = `mailto:${encodeURIComponent(emailAddress)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open the email client
        window.location.href = mailtoLink;
        
        // Show email instructions in case the user missed them in the email
        alert('IMPORTANT: Your email client has opened. Please manually attach the PDF and Excel files from your downloads folder to complete the process.');
      }, 1500);
    },
    getIncludedModels() {
      const models = [];
      
      if (this.historyModelFilter === 'all') {
        return 'Woot!, Amazon Deal, and Woot! 3PL';
      }
      
      if (this.historyModelFilter === 'sbw') {
        return 'Woot!';
      }
      
      if (this.historyModelFilter === 'amazonDeal') {
        return 'Amazon Deal';
      }
      
      if (this.historyModelFilter === 'sbw3pl') {
        return 'Woot! 3PL';
      }
      
      return models.join(', ');
    },
    prepareExportData() {
      // Get the filtered products based on current filter
      const filteredProducts = this.calculatedProducts.map(product => {
        // Create a base product object
        const baseProduct = {
          name: product.name || `Product ${this.calculatedProducts.indexOf(product) + 1}`,
          msrp: product.inputs.msrp,
          dealPrice: product.inputs.dealPrice,
          shippingCost: product.inputs.estShippingCost
        };
        
        // Create result objects based on filter
        const results = [];
        
        if (this.historyModelFilter === 'all' || this.historyModelFilter === 'sbw') {
          results.push({
            ...baseProduct,
            modelType: 'Woot!',
            netIncomeForSeller: product.results.sbw.netIncomeForSeller,
            netReceivePerUnit: product.results.sbw.netReceivePerUnit
          });
        }
        
        if (this.historyModelFilter === 'all' || this.historyModelFilter === 'amazonDeal') {
          results.push({
            ...baseProduct,
            modelType: 'Amazon Deal',
            netIncomeForSeller: product.results.amazonDeal.netIncomeForSeller,
            netReceivePerUnit: product.results.amazonDeal.netReceivePerUnit
          });
        }
        
        if (this.historyModelFilter === 'all' || this.historyModelFilter === 'sbw3pl') {
          results.push({
            ...baseProduct,
            modelType: 'Woot! 3PL',
            netIncomeForSeller: product.results.sbw3pl.netIncomeForSeller,
            netReceivePerUnit: product.results.sbw3pl.netReceivePerUnit
          });
        }
        
        return results;
      }).flat(); // Flatten the array of arrays
      
      return filteredProducts;
    },
    truncateText(text, columnWidth, doc) {
      const fontSize = doc.getFontSize();
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      
      if (textWidth <= columnWidth) {
        return text;
      }
      
      // Reduce text until it fits
      let truncatedText = text;
      while (doc.getStringUnitWidth(truncatedText + "...") * fontSize / doc.internal.scaleFactor > columnWidth) {
        truncatedText = truncatedText.slice(0, -1);
        if (truncatedText.length <= 3) break;
      }
      
      return truncatedText + "...";
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      
      // Close dropdown when clicking outside
      if (this.showDropdown) {
        setTimeout(() => {
          document.addEventListener('click', this.closeDropdown);
        }, 0);
      }
    },
    
    closeDropdown(event) {
      if (!event.target.closest('.dropdown')) {
        this.showDropdown = false;
        document.removeEventListener('click', this.closeDropdown);
      }
    },
    clearValidationError(field) {
      if (this.validationErrors[field]) {
        this.validationErrors[field] = false;
      }
    }
  }
}
</script>

<style scoped>
.calculator-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: var(--border-radius);
}

.view-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.view-toggle-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  max-width: 200px;
  text-align: center;
  margin-top: 0;
  color: #333;
  font-weight: 500;
}

.view-toggle-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.input-section, .results-section, .about-section, .products-section, .history-view {
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.about-section {
  margin-bottom: 20px;
}

.about-section ol {
  padding-left: 20px;
}

.products-section {
  padding-top: 20px;
  background-color: white;
}

.input-section {
  flex: 1;
  min-width: 300px;
}

.results-section {
  flex: 2;
  min-width: 500px;
  margin-top: 20px;
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
  padding: 12px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calculate-btn {
  background-color: var(--primary-color);
  color: white;
  width: 100%;
}

.calculate-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: var(--danger-color);
  color: white;
  width: 100%;
  margin-top: 10px;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* Table styles */
.result-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  table-layout: fixed;
}

.result-table th {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 12px;
  font-weight: 600;
}

.result-table td {
  padding: 12px;
  border-bottom: 1px solid #eaeaea;
  background-color: #ffffff;
  vertical-align: middle;
}

.result-table tr:nth-child(even) td {
  background-color: #f7fafc;
}

/* Comparison table */
.comparison-table th {
  text-align: center;
}

.comparison-table td:first-child {
  text-align: left;
  font-weight: 600;
}

.comparison-table td:not(:first-child) {
  text-align: right;
}

/* History table */
.history-view {
  background-color: #f0f4f8;
}

.history-header {
  text-align: left;
  margin-bottom: 20px;
}

.history-header h2 {
  margin-top: 0;
  margin-bottom: 15px;
}

.filter-controls-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  background-color: white;
  padding: 15px;
  border-radius: var(--border-radius);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
}

.filter-controls {
  flex: 1;
}

.filter-controls .form-group {
  margin-bottom: 0;
  width: 100%;
  max-width: 300px;
}

.export-controls {
  position: relative;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.export-btn {
  padding: 10px 16px;
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-top: 0;
}

.export-btn:hover {
  background-color: #2980b9;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
  margin-top: 5px;
}

.dropdown-content a {
  display: block;
  padding: 10px 16px;
  text-align: left;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-content a:last-child {
  border-bottom: none;
}

.dropdown-content a:hover {
  background-color: #f0f0f0;
}

.dropdown-arrow {
  margin-left: 8px;
  font-size: 10px;
}

.history-table-container {
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1px;
  max-width: 1200px;
  margin: 0 auto;
}

.no-history {
  padding: 30px;
  text-align: center;
  font-style: italic;
  color: #777;
  background-color: white;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.history-table td.product-name {
  text-align: left;
  font-weight: 600;
  width: 15%;
}

.history-table td:nth-child(2),
.history-table td:nth-child(3),
.history-table td:nth-child(4),
.history-table td:nth-child(6),
.history-table td:nth-child(7) {
  text-align: right;
}

.history-table td:nth-child(5) {
  text-align: center;
}

.history-table td.actions-cell {
  text-align: center;
  width: 10%;
}

.model-type {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: rgba(41, 128, 185, 0.1);
  color: #2980b9;
  font-weight: 500;
  white-space: nowrap;
}

.product-group {
  border-top: 2px solid #ddd;
}

.last-model-row td {
  border-bottom: 2px solid #ddd;
}

.product-separator td {
  height: 20px;
  background-color: #f0f4f8 !important;
  border: none;
}

.action-btn.edit-btn {
  padding: 8px 16px;
}

.profit {
  color: var(--secondary-color);
  font-weight: bold;
}

.loss {
  color: var(--danger-color);
  font-weight: bold;
}

.product-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.product-tab {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
  background-color: #f5f5f5;
  color: #333;
  margin-top: 0;
  cursor: pointer;
}

.product-tab.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.add-product-btn {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: 1px dashed #aaa;
  color: #666;
  border-radius: 4px;
  margin-top: 0;
}

.add-product-btn:hover {
  background-color: #e5e5e5;
}

@media (max-width: 768px) {
  .calculator-container {
    flex-direction: column;
  }
  
  .input-section, .results-section {
    width: 100%;
  }
  
  .product-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }
}

/* 让所有表格数据居中 */
.result-table td,
.result-table th,
.comparison-table td,
.comparison-table th,
.history-table td,
.history-table th {
  text-align: center !important;
}

/* Make model type column wider and prevent text wrapping */
.history-table td:nth-child(5),
.history-table th:nth-child(5) {
  width: 120px;
  white-space: nowrap;
}

/* 确保绿色利润数字也居中 */
.profit, .loss {
  text-align: center !important;
}

/* 确保所有货币值居中 */
.history-table td:nth-child(2),
.history-table td:nth-child(3),
.history-table td:nth-child(4),
.history-table td:nth-child(6),
.history-table td:nth-child(7) {
  text-align: center !important;
}

/* 覆盖之前可能的样式 */
.comparison-table td:first-child,
.history-table td.product-name {
  text-align: center !important;
}

.comparison-table td:not(:first-child) {
  text-align: center !important;
}

/* Add error styles */
.error-input {
  border: 2px solid #e74c3c !important;
  background-color: #ffeaea;
}

/* Add required field style */
.required-indicator {
  color: #e74c3c;
  margin-left: 2px;
}
</style> 