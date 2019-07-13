<template>
  <div class="grid" :class="gridSize">
    <Character
      v-for="gridObject in GridObjects"
      :key="gridObject.elementId"
      :classes="gridObject.classes"
      :id="gridObject.elementId"
      :row="gridObject.row"
      :column="gridObject.column"
    />
  </div>
</template>

<script>
import Character from "@/components/Character.vue";

export default {
  name: "Grid",
  components: {
    Character
  },
  data() {
    return {
      GridObjects: []
    };
  },
  computed: {
    gridSize() {
      return "grid--" + this.$store.state.columns;
    },
    elementSize() {
      return "character--" + this.$store.state.elementSize;
    },
    ElementsH() {
      return this.$store.getters.getElementsH;
    },
    ElementsV() {
      return this.$store.getters.getElementsV;
    },
    totalElements() {
      return this.$store.getters.totalElements;
    }
  },
  methods: {
    makeGrid() {
      var count = 0;
      for (var i = 0; i < this.ElementsV; i++) {
        for (var j = 0; j < this.ElementsH; j++) {
          count++;
          this.GridObjects.push({
            elementNumber: count,
            elementId: i + "-" + j,
            row: i,
            column: j,
            classes: [
              this.elementSize,
              "col-" + j,
              "row-" + i,
              "index-" + count
            ]
          });
        }
      }
      console.log(this.GridObjects[5].row);
    }
  },
  created() {
    this.$store
      .dispatch("setViewport", {
        width: Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        ),
        height: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        )
      })
      .then(() => {
        this.makeGrid();
      });
  }
};
</script>

<style scoped lang="scss">
.grid {
  // display: grid;
  // grid-auto-flow: row;
  // align-items: center;

  @for $i from 5 through 50 {
    &--#{$i} {
      // grid-template-columns: repeat(#{$i}, 1fr);
    }
  }
}
</style>
