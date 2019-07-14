<template>
  <div class="home">
    <Grid :size="size" />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  name: "home",
  components: {
    Grid
  },
  data() {
    return {
      size: {
        width: 500,
        height: 500
      }
    };
  }
};
</script>

<style scoped lang="scss"></style>
