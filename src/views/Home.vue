<template>
  <div class="home">
    <div
      @click="toggleMenu"
      class="open-menu"
      :class="{ 'open-menu--hover': hoverClass }"
    >
      <svgicon
        class="open-menu__icon"
        icon="menu"
        width="26"
        height="36"
        color="#151515"
      />
    </div>
    <SideBar />
    <Grid />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import SideBar from "@/components/SideBar.vue";
import "@/compiled-icons/menu";

export default {
  name: "home",
  data() {
    return {
      hoverClass: false
    };
  },
  components: {
    Grid,
    SideBar
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style scoped lang="scss"></style>
