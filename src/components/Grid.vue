<template>
  <div class="grid-wrapper">
    <input
      @keyup.enter="setSize"
      type="text"
      name="width"
      v-model="size.width"
    />
    <input
      @keyup.enter="setSize"
      type="text"
      name="height"
      v-model="size.height"
    />
    <button @click="setSize" type="button" name="button">GO</button>
    <button @click="deleteGrid" type="button" name="button">DELETE</button>
    <div class="grid" :class="gridSize" :style="gridStyle" :key="gridKey">
      <div :style="gridPadding" class="grid-padding">
        <transition-group name="list-complete" tag="div" mode="out-in">
          <Character
            v-for="gridObject in gridObjects"
            :key="gridObject.rnd"
            :classes="gridObject.classes"
            :id="gridObject.elementId"
            :row="gridObject.row"
            :column="gridObject.column"
          />
        </transition-group>
      </div>
    </div>
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
      gridObjects: [],
      gridStyle: {
        width: 500,
        height: 500
      },
      size: {
        width: 500,
        height: 500
      },
      gridKey: 0
    };
  },
  computed: {
    gridSize() {
      return "grid--" + this.$store.state.columns;
    },
    elementSize() {
      return "character--" + this.$store.state.elementSize;
    },
    elementSizeRaw() {
      return this.$store.state.elementSize;
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
    setGridStyle() {
      this.gridStyle.width = this.size.width + "px";
      this.gridStyle.height = this.size.height + "px";
    },
    setSize() {
      this.$store
        .dispatch("setViewport", {
          width: Math.max(this.size.width || 0),
          height: Math.max(this.size.height || 0)
        })
        .then(() => {
          this.makeGrid();
        });
    },
    deleteGrid() {
      this.gridObjects = [];
    },
    makeGrid() {
      this.gridObjects = [];
      this.setGridStyle();
      var count = 0;
      for (var i = 0; i < this.ElementsV; i++) {
        for (var j = 0; j < this.ElementsH; j++) {
          count++;
          this.gridObjects.push({
            elementNumber: count,
            elementId: i + "-" + j,
            row: i,
            rnd:
              Math.floor(100000 + Math.random() * 900000 + i * j) + "-" + i + j,
            column: j,
            classes: [
              "character--delay" + Math.floor(Math.random() * 10),
              this.elementSize,
              "col-" + j,
              "row-" + i,
              "index-" + count
            ]
          });
        }
      }
    }
  },
  mounted() {
    this.setSize();
  }
};
</script>

<style scoped lang="scss">
.grid {
  &-padding {
    position: relative;
  }

  margin: 50px auto;
  transition: all 0.5s;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
