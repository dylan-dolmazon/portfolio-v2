<!-- components/macbookTopBar.vue -->
<template>
    <header class="mac-top-bar flex justify-between items-center text-white px-4 py-1 bg-black/80 text-xs">
      <div class="flex gap-4 items-center">
        <span class="text-xl font-semibold">MyBook</span>
        <nav class="hidden md:flex gap-4 text-sm text-gray-100 font-body">
          <a v-for="item in menuItems" :key="item" href="#" class="hover:underline">
            {{ item }}
          </a>
        </nav>
      </div>
      <div class="flex gap-3 items-center text-sm text-gray-200">
        <Icon :name="batteryIcon" class="h-5 w-6"></Icon>
        
        <Icon 
          :name="isMuted ? 'i-iconoir-sound-off-solid' : 'i-iconoir-sound-high-solid'" 
          size="16"
          class="cursor-pointer"
          @click="toggleMute"
        ></Icon>
        <Icon name="i-material-symbols-wifi" size="16"></Icon>
        <Icon name="icon:battery-charging"></Icon>
        <span class="min-w-24">{{ currentTime }}</span>
      </div>
    </header>
</template>
  
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  const menuItems = ['Finder', 'Fichier', 'Édition', 'Présentation', 'Aller', 'Fenêtre', 'Aide']
  
  const currentTime = ref('')
  const isMuted = ref(false)
  const batteryLevel = ref(100)
  const isCharging = ref(false)
  const batteryIcon = ref('i-fontisto-battery-full')
  
  const batteryIcons = [
    'i-fontisto-battery-full',           // 100-80%
    'i-fontisto-battery-three-quarters', // 79-60%
    'i-fontisto-battery-half',          // 59-40%
    'i-fontisto-battery-quarter',       // 39-20%
    'i-fontisto-battery-empty'          // 19-0%
  ]
  
  const updateBatteryIcon = () => {
    let index
    if (batteryLevel.value >= 80) {
      index = 0
    } else if (batteryLevel.value >= 60) {
      index = 1
    } else if (batteryLevel.value >= 40) {
      index = 2
    } else if (batteryLevel.value >= 20) {
      index = 3
    } else {
      index = 4
    }
    batteryIcon.value = batteryIcons[index]
  }
  
  const updateBatteryLevel = () => {
    if (isCharging.value) {
      batteryLevel.value = Math.min(100, batteryLevel.value + 5) // Réduit la vitesse de charge
      if (batteryLevel.value === 100) {
        isCharging.value = false
      }
    } else {
      batteryLevel.value = Math.max(0, batteryLevel.value - 2) // Réduit la vitesse de décharge
      if (batteryLevel.value === 0) {
        isCharging.value = true
      }
    }
    updateBatteryIcon()
  }
  
  const toggleMute = () => {
    isMuted.value = !isMuted.value
  }
  
  const updateClock = () => {
    const now = new Date()
    currentTime.value = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  onMounted(() => {
    updateClock()
    setInterval(updateClock, 60000)
    setInterval(updateBatteryLevel, 1000) // Met à jour toutes les minutes
  })
</script>
  
<style lang="scss" scoped>
  .mac-top-bar {
    backdrop-filter: blur(12px);
  }
</style>