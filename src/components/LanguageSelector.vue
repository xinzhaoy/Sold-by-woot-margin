<template>
  <div class="language-selector" @click="toggleDropdown" ref="dropdown">
    <div class="selected-language">
      {{ currentLanguageCode.toUpperCase() }}
      <span class="dropdown-arrow">▼</span>
    </div>
    <div class="language-dropdown" v-if="isOpen">
      <div 
        v-for="(lang, code) in availableLanguages" 
        :key="code" 
        class="language-option"
        :class="{ 'active': locale === code }"
        @click="changeLanguage(code)"
      >
        {{ lang }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n()
    const isOpen = ref(false)
    const dropdown = ref(null)
    
    const availableLanguages = {
      'en': 'English-EN',
      'zh-CN': '简体中文-CN'
    }
    
    const currentLanguageCode = computed(() => {
      return locale.value === 'zh-CN' ? 'CN' : 'EN'
    })
    
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }
    
    const changeLanguage = (langCode) => {
      locale.value = langCode
      localStorage.setItem('userLanguage', langCode)
      isOpen.value = false
    }
    
    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        isOpen.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      isOpen,
      dropdown,
      availableLanguages,
      currentLanguageCode,
      toggleDropdown,
      changeLanguage,
      locale
    }
  }
}
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  z-index: 1000;
}

.selected-language {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  min-width: 60px;
  justify-content: space-between;
  font-weight: bold;
}

.dropdown-arrow {
  margin-left: 5px;
  font-size: 10px;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 5px;
  overflow: hidden;
}

.language-option {
  padding: 10px 15px;
  transition: background-color 0.2s;
  color: #333;
  font-weight: 500;
}

.language-option:hover {
  background-color: #e0e0e0;
}

.language-option.active {
  background-color: #3498db;
  color: white;
}
</style> 