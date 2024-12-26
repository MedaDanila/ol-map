<script setup>
import exemplaOne from "./components/exempla_one/exemplaOne.vue";
import exemplaTwo from "./components/exempla_two/exemplaTwo.vue";
import exemplaThree from "./components/exempla_three/exemplaThree.vue";
</script>

<template>
  <div class="exempla-page">
    <div class="exempla-page__exempla">
      <span class="exempla-page__exempla__title">Пример 1</span>
      <div class="exempla-page__exempla__map">
        <exemplaOne />
      </div>
    </div>
    <div class="exempla-page__exempla">
      <span class="exempla-page__exempla__title">Пример 2</span>
      <div class="exempla-page__exempla__map">
        <exemplaTwo />
      </div>
    </div>
    <div class="exempla-page__exempla">
      <span class="exempla-page__exempla__title">Пример 3</span>
      <div class="exempla-page__exempla__map">
        <exemplaThree />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exempla-page {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  &__exempla {
    width: 100%;
    height: auto;

    padding: 32px 64px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    &__title {
      font-size: 32px;
      line-height: 38px;
      color: white;
    }

    &__map {
      width: 100%;
      height: auto;
    }
  }
}
</style>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100dvh;
}

body {
  background-color: #303641;
  background-image: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.1) 25%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.1) 75%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    linear-gradient(90deg, #192129, #303641, #484e57);
  background-size: 8px 8px, 100%;
}
</style>
