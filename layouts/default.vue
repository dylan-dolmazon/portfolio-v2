<template>
  <div class="flex justify-center items-center min-h-screen bg-black">
    <div class="flex flex-col h-macbook w-macbook bg-gray-500">
      <MacbookTopBar />
      <main class="flex-1 flex flex-col justify-center items-center">
        <slot />
      </main>
      <footer class="">
        <p>footer</p>
      </footer>
    </div>
  </div>
</template>
  