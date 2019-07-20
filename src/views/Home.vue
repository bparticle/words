<template>
  <div class="home">
    <SideBar />
    <Grid />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "home",
  components: {
    Grid,
    SideBar
  }
};
</script>

<style scoped lang="scss"></style>
