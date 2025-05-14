export default {
  language: '简体中文',
  calculator: {
    title: 'Woot 成本计算器',
    subtitle: '计算不同销售模式下的成本和利润',
    views: {
      calculator: '计算器',
      history: '历史记录'
    },
    products: {
      title: '产品计算器',
      product: '产品',
      addNew: '添加新产品',
      delete: '删除产品'
    },
    history: {
      title: '产品历史记录',
      noHistory: '尚无计算产品。请使用计算器添加产品。',
      filterByModel: '按模型筛选',
      allModels: '所有模型',
      model: '模型类型',
      actions: '操作',
      edit: '编辑'
    },
    about: {
      title: '关于计算器',
      description: '这个成本计算器帮助您计算Sold by Woot下不同销售模型的成本和利润。',
      howToUse: '如何使用：',
      steps: {
        step1: '输入亚马逊零售价格（MSRP）',
        step2: '输入亚马逊最近30天的最低价格',
        step3: '输入SBW零售价格（促销价格）',
        step4: '输入运输成本',
        step5: '点击"计算成本和利润"按钮'
      },
      autoCalculation: '计算器将自动计算所有三种模型的结果：Woot!、亚马逊促销和Woot! 3PL。'
    },
    input: {
      title: '输入参数',
      productName: '产品名称',
      productNamePlaceholder: '输入产品名称（可选）',
      asinPlaceholder: '输入ASIN',
      msrp: '亚马逊零售价格（MSRP）',
      lowestPrice: '亚马逊最低价格（最近30天）',
      dealPrice: 'SBW零售价格（促销价格）',
      shippingCost: '运输成本（FBA）',
      calculateButton: '计算成本和利润'
    },
    validation: {
      missingInputs: '请在计算前填写所有输入字段。'
    },
    results: {
      title: '计算结果',
      pleaseEnter: '请输入参数并点击"计算成本和利润"按钮',
      modelComparison: '模型比较',
      metrics: {
        metric: '指标',
        woot: 'Woot!',
        amazonDeal: '亚马逊促销',
        woot3PL: 'Woot! 3PL',
        msrp: 'MSRP（亚马逊零售价格）',
        lowestPrice: '亚马逊最低价格（最近30天）',
        dealPrice: '促销价格（SBW零售价格）',
        shippingCost: '运输成本',
        wootMargin: 'Woot利润',
        wootCost: 'Woot成本',
        dealSubmissionCost: '促销提交成本',
        bbluMargin: '6Blu利润',
        amazonPlatformFee: '亚马逊平台费',
        netIncomeForSeller: '卖家净收入',
        estimatedSalesQuantity: '预计销售数量',
        returns: '退货（5%）',
        netDealSales: '净促销销售额/净收入',
        netReceivePerUnit: '单位净收入'
      }
    }
  },
  footer: {
    copyright: '© {year} Woot 成本计算器'
  }
} 