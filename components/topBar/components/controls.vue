<template>
  <div class="flex gap-3 items-center text-sm">
      <div class="controls__battery">
        <Icon 
          :name="batteryIcon" 
          size="22"
          :class="batteryColor"
        ></Icon>
        <Icon v-if="showCharger" name="icon:battery-charging" class="controls__battery__charger" size="12"></Icon>

      </div>
      <Icon 
        :name="isMuted ? 'i-iconoir-sound-off-solid' : 'i-iconoir-sound-high-solid'" 
        size="16"
        class="cursor-pointer"
        @click="toggleMute"
      ></Icon>
      <Icon name="i-material-symbols-wifi" size="16"></Icon>
      <span class="h-4 w-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#1c1c1c" viewBox="0 0 351 348"><path d="M87.75 46.2c9.31 0 18.237 3.245 24.819 9.021 6.583 5.776 10.281 13.61 10.281 21.779s-3.698 16.003-10.281 21.779c-6.582 5.776-15.51 9.021-24.819 9.021-9.31 0-18.237-3.245-24.82-9.021C56.349 93.003 52.65 85.169 52.65 77s3.698-16.003 10.28-21.779c6.583-5.776 15.51-9.021 24.82-9.021zM263.25 0c23.273 0 45.592 8.112 62.049 22.553C341.755 36.993 351 56.578 351 77c0 20.422-9.245 40.007-25.701 54.447C308.842 145.888 286.523 154 263.25 154H87.75c-23.273 0-45.592-8.112-62.049-22.553C9.245 117.007 0 97.422 0 77c0-20.422 9.245-40.007 25.701-54.447C42.158 8.113 64.477 0 87.75 0h175.5zM87.75 30.8c-13.964 0-27.355 4.867-37.23 13.532C40.648 52.996 35.1 64.747 35.1 77s5.547 24.004 15.42 32.668c9.875 8.665 23.266 13.532 37.23 13.532h175.5c13.964 0 27.355-4.867 37.229-13.532C310.353 101.004 315.9 89.253 315.9 77s-5.547-24.004-15.421-32.668C290.605 35.667 277.214 30.8 263.25 30.8H87.75zM263.25 194H87.75c-23.273 0-45.592 8.112-62.049 22.553C9.245 230.993 0 250.578 0 271c0 20.422 9.245 40.007 25.701 54.447C42.158 339.888 64.477 348 87.75 348h175.5c23.273 0 45.592-8.112 62.049-22.553C341.755 311.007 351 291.422 351 271c0-20.422-9.245-40.007-25.701-54.447C308.842 202.112 286.523 194 263.25 194v0zm0 123.2c-13.964 0-27.355-4.867-37.229-13.532-9.874-8.664-15.421-20.415-15.421-32.668s5.547-24.004 15.421-32.668c9.874-8.665 23.265-13.532 37.229-13.532 13.964 0 27.355 4.867 37.229 13.532 9.874 8.664 15.421 20.415 15.421 32.668s-5.547 24.004-15.421 32.668c-9.874 8.665-23.265 13.532-37.229 13.532z"></path></svg>        
      </span>
      <USkeleton v-if="currentTime === ''" class="h-5 w-26" />
      <span v-else>{{ currentTime }}</span>
    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  const currentTime = ref('')
  const isMuted = ref(false)
  const batteryLevel = ref(100)
  const isCharging = ref(false)
  const batteryIcon = ref('i-fontisto-battery-full')
  const batteryColor = ref('text-green-500')
  const showCharger = ref(false)

  const batteryIcons = [
    'i-fontisto-battery-full',           // 100-80%
    'i-fontisto-battery-three-quarters', // 79-60%
    'i-fontisto-battery-half',          // 59-40%
    'i-fontisto-battery-quarter',       // 39-20%
    'i-fontisto-battery-empty'          // 19-0%
  ]

  const batteryColors = [
    'text-green-500',
    'text-green-500',
    'text-orange-500',
    'text-orange-500',
    'text-red-500'
  ]
  
  const updateBatteryIcon = () => {
    let index
    if (batteryLevel.value >= 80) {
      index = 0
      showCharger.value = false;
    } else if (batteryLevel.value >= 60) {
      index = 1
    } else if (batteryLevel.value >= 40) {
      index = 2
    } else if (batteryLevel.value >= 20) {
      index = 3
    } else {
      index = 4
      showCharger.value = true;
    }
    batteryIcon.value = batteryIcons[index]
    batteryColor.value = batteryColors[index]
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
.controls {
    &__battery {
      position: relative;
      display: flex;
      align-items: center;

      &__charger {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>