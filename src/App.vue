<template>
  <div id="app">
    <main class="main">
      <router-view />
      <div
        class="main__overlay"
        :class="{ 'main__overlay--active': menuActive }"
        @click="toggleMenu"
      ></div>
    </main>
    <GlobalEvents @keydown="pressKey" />
  </div>
</template>

<script>
import GlobalEvents from "vue-global-events";

export default {
  name: "app",
  components: {
    GlobalEvents
  },
  computed: {
    menuActive() {
      return this.$store.state.menuActive;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    closeMenu() {
      this.$store.commit("closeMenu");
    },
    pressKey(evt) {
      if (evt.keyCode === 27) {
        // Press escape key
        this.closeMenu();
        window.focus();
      }
      // First make sure we aren't typing in an input field
      if (
        document.activeElement.tagName &&
        document.activeElement.tagName.toLowerCase() !== "input"
      ) {
        if (evt.keyCode === 77) {
          // Press "m" key
          this.toggleMenu();
        }
      }
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #fffa99;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 600px;
  margin: 50px auto;
  box-sizing: border-box;
}
.main {
  &__overlay {
    transition: all 0.3s ease-out 0s;
    &--active {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 7;
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
