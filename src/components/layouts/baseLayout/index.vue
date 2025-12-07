<template>
  <section class="container-layout bg">
    <div class="wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.container-layout {
  display: flex;
  justify-content: center;
  height: 100dvh;
  width: 100%;
}

.bg {
  background-color: lightcyan;
}

.wrapper {
  width: 100%;
  max-width: 1260px;
}
</style>
