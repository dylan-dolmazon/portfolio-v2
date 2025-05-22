<template>
  <div class="flex justify-center items-center min-h-screen bg-black">
    <div class="flex flex-col h-macbook w-macbook relative">
      <div class="background-cover" style="background-image: url('/images/ventura.webp')"></div>
      <TopBar />
      <main class="flex-1 flex flex-col justify-center items-center">
        <slot />
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
  .background-cover {
    will-change: background-image;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    transition: background-image .15s ease-in;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
  