<template>
  <div class="side-bar" :class="{ 'side-bar--active': menuActive }">
    <h3>Hidden words</h3>
    <transition-group name="list-complete" tag="p" class="words">
      <span
        v-for="(item, index) in hiddenWords"
        v-bind:key="item.index"
        class="list-complete-item words__word"
      >
        <span class="words__word-index">{{ index + 1 }}</span>
        {{ item.word }}
      </span>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    menuActive() {
      return this.$store.state.menuActive;
    },
    hiddenWords() {
      return this.$store.getters.getHiddenWords;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../partials/vars";

.side-bar {
  text-align: left;
  padding: 25px;
  min-height: 100%;
  position: absolute;
  padding-right: 50px;
  left: 0;
  width: 350px;
  min-height: 100%;
  background-color: $color-gray-dd;
  z-index: 10;
  transition-property: all;
  transition-duration: 0.5s;
  transition: all 0.35s ease-out; // custom easing
  transform: translateX(-410px);
  top: 0;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.5);

  h3 {
    color: $color;
    margin-bottom: 0;
  }

  &--active {
    transform: translateX(0);
    padding-right: 0;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 17px;
  }
}

.words {
  overflow: hidden;
  margin: 15px auto;
  padding: 10px 0;

  &__word {
    margin: 5px 5px 0;
    padding: 5px 10px 5px 0;
    background-color: lightyellow;
    text-transform: uppercase;
    font-size: 15px;
    display: inline-block;
    list-style-type: none;
    transition: all 1s;
    box-shadow: 1px 1px 2px;

    &-index {
      background: $color-gray-dd;
      min-width: 18px;
      margin: 0 15px 0 5px;
      display: inline-block;
      text-align: center;
      border-radius: 15px;
      padding: 5px;
      box-shadow: inset 1px 1px 2px;
    }
  }
}
</style>
