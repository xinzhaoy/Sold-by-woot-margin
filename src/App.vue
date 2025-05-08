<template>
  <header>
    <h1>Sold by Woot Cost Calculator</h1>
    <p>Calculate your costs and profits across different sales models</p>
  </header>
  
  <div class="container">
    <Calculator />
    
    <div class="footer">
      <p>© {{ new Date().getFullYear() }} Sold by Woot Cost Calculator</p>
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style>
header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: #777;
  font-size: 0.9rem;
}
</style> 