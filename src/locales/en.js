export default {
  language: 'English',
  calculator: {
    title: 'Sold by Woot Cost Calculator',
    subtitle: 'Calculate your costs and profits across different sales models',
    views: {
      calculator: 'Calculator',
      history: 'History View'
    },
    products: {
      title: 'Products Calculator',
      product: 'Product',
      addNew: 'Add New Product',
      delete: 'Delete Product'
    },
    history: {
      title: 'Products History',
      noHistory: 'No calculated products yet. Use the calculator to add products.',
      filterByModel: 'Filter by Model',
      allModels: 'All Models',
      model: 'Model Type',
      actions: 'Actions',
      edit: 'Edit'
    },
    about: {
      title: 'About the Calculator',
      description: 'This cost calculator helps you calculate costs and profits under different sales models for Sold by Woot.',
      howToUse: 'How to use:',
      steps: {
        step1: 'Enter the Amazon retail price (MSRP)',
        step2: 'Enter the Amazon lowest price in the last 30 days',
        step3: 'Enter the SBW retail price (Deal Price)',
        step4: 'Enter the shipping cost',
        step5: 'Click the "Calculate Costs and Profits" button'
      },
      autoCalculation: 'The calculator will automatically calculate results for all three models: Woot!, Amazon Deal, and Woot! 3PL.'
    },
    input: {
      title: 'Input Parameters',
      productName: 'Product Name',
      productNamePlaceholder: 'Enter product name (optional)',
      asinPlaceholder: 'Enter ASIN',
      msrp: 'Amazon Retail Price (MSRP)',
      lowestPrice: 'Amazon Lowest Price (Last 30 Days)',
      dealPrice: 'SBW Retail Price (Deal Price)',
      shippingCost: 'Shipping Cost (FBA)',
      calculateButton: 'Calculate Costs and Profits'
    },
    validation: {
      missingInputs: 'Please complete all input fields before calculating.'
    },
    results: {
      title: 'Calculation Results',
      pleaseEnter: 'Please enter parameters and click "Calculate Costs and Profits" button',
      modelComparison: 'Model Comparison',
      metrics: {
        metric: 'Metric',
        woot: 'Woot!',
        amazonDeal: 'Amazon Deal',
        woot3PL: 'Woot! 3PL',
        msrp: 'MSRP (Amazon Retail Price)',
        lowestPrice: 'Amazon Lowest Price (Last 30 Days)',
        dealPrice: 'Deal Price (SBW Retail Price)',
        shippingCost: 'Shipping Cost',
        wootMargin: 'Woot Margin',
        wootCost: 'Woot Cost',
        dealSubmissionCost: 'Deal Submission Cost',
        bbluMargin: '6Blu Margin',
        amazonPlatformFee: 'Amazon Platform Fee',
        netIncomeForSeller: 'Net Income for Seller',
        estimatedSalesQuantity: 'Estimated Sales Quantity',
        returns: 'Returns (5%)',
        netDealSales: 'Net Deal Sales / Net Receive',
        netReceivePerUnit: 'Net Receive Per Unit'
      }
    }
  },
  footer: {
    copyright: '© {year} Sold by Woot Cost Calculator'
  }
} 