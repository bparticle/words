<template>
  <div class="side-bar">
    <transition-group name="list-complete" tag="p" class="grid__words">
      <span
        v-for="item in hiddenWords"
        v-bind:key="item.index"
        class="list-complete-item grid__word"
      >
        {{ item.word }}
      </span>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    hiddenWords() {
      return this.$store.getters.getHiddenWords;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../partials/vars";

.side-bar {
  min-height: 100%;
  position: absolute;
  text-align: center;
  padding-right: 50px;
  left: 0;
  width: 350px;
  height: 100%;
  background-color: $color-gray-dd;
  z-index: 10;
  transition-property: all;
  transition-duration: 0.5s;
  transition: all 0.35s ease-out; // custom easing
  transform: translateX(-350px);

  h3 {
    color: $color;
    margin-bottom: 0;
  }

  &--active {
    transform: translateX(0);
    padding-right: 0;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }

  &__close {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 17px;
  }
}
</style>
