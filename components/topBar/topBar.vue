<template>
  <header class="top-bar flex justify-between items-stretch px-6 bg-light-hsl/30 text-light-contrast-hsl text-xs">
      <div class="flex gap-6 items-center">
        <span class="text-xl font-semibold">MyBook</span>
        <nav class="hidden md:flex md:items-center gap-1 text-sm font-body h-full">
          <a v-for="item in menuItems" :key="item" href="#" class="top-bar__item">
            {{ item }}
          </a>
        </nav>
      </div>
      <TopBarComponentsControls />
    </header>
</template>

<script lang="ts" setup>
  const menuItems = ['Finder', 'Fichier', 'Édition', 'Présentation', 'Aller', 'Fenêtre', 'Aide']
</script>

  
<style lang="scss" scoped>
  .top-bar {
    z-index: 1;

    &__item {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 8px;
      --scale: 0;

      &:hover {
        --scale: 1;
      }

      &::after{
        content: "";
        z-index: -1;
        border-radius: inherit;
        transform: scale(var(--scale), var(--scale));
        transform-origin: 50%;
        background-color: hsla(var(--color-dark-hsl-brut), .2);
        width: 100%;
        height: 100%;
        transition: transform .1s;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>