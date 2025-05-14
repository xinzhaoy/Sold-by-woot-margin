<template>
  <div class="app-header">
    <h1>{{ $t('calculator.title') }}</h1>
    <p>{{ $t('calculator.subtitle') }}</p>
    <div class="language-selector-container">
      <LanguageSelector />
    </div>
  </div>
  
  <div class="container">
    <Calculator />
    
    <div class="footer">
      <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'
import LanguageSelector from './components/LanguageSelector.vue'

export default {
  name: 'App',
  components: {
    Calculator,
    LanguageSelector
  }
}
</script>

<style>
.app-header {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
}

.language-selector-container {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  justify-content: flex-end;
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: #777;
  font-size: 0.9rem;
}
</style> 