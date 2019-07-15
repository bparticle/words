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
    <input @keyup.enter="hideWord" type="text" name="height" v-model="word" />
    <button @click="setSize" type="button" name="button">SHUFFLE</button>
    <button @click="deleteGrid" type="button" name="button">DELETE</button>
    <div class="grid-wrapper__word">
      {{ word }}
    </div>
    <div class="grid" :class="gridSize" :style="gridStyle" :key="gridKey">
      <transition-group name="list-complete" tag="div" mode="out-in">
        <Character
          v-for="gridObject in gridObjects"
          :key="gridObject.rnd"
          :classes="gridObject.classes"
          :id="gridObject.elementId"
          :row="gridObject.row"
          :column="gridObject.column"
          :isRandom="gridObject.isRandom"
          :character="gridObject.character"
        />
      </transition-group>
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
      gridStyle: {
        width: 250,
        height: 250
      },
      size: {
        width: 250,
        height: 250
      },
      gridKey: 0
    };
  },
  computed: {
    gridObjects() {
      return this.$store.getters.getGridObjects;
    },
    word: {
      get: function() {
        return this.$store.state.word;
      },
      set: function(newValue) {
        this.$store.commit("setWord", newValue);
      }
    },
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
    hideWord() {
      const alg = [0, 1, 2];
      switch (alg[Math.floor(Math.random() * alg.length)]) {
        case 0:
          this.hideWordH();
          break;
        case 1:
          this.hideWordV();
          break;
        case 2:
          this.hideWordD();
          break;
      }
    },
    hideWordH() {
      const getAvailable = new Promise(resolve => {
        var availablePlaces = [];
        this.$store.state.gridObjects.forEach(item => {
          if (
            item.column <
            this.$store.state.columns + 1 - this.$store.state.word.length
          ) {
            availablePlaces.push(this.$store.state.gridObjects.indexOf(item));
          }
        });
        resolve(availablePlaces);
      });
      getAvailable.then(result => {
        var startPos = result[Math.floor(Math.random() * result.length)];
        for (var i = 0; i < this.$store.state.word.length; i++) {
          const x = this.$store.state.gridObjects[startPos + i].row;
          const y = this.$store.state.gridObjects[startPos + i].column;
          const z = this.$store.state.gridObjects[startPos + i].elementNumber;
          this.$store.commit("replaceGridItem", {
            index: startPos + i,
            content: {
              elementNumber: z,
              elementId: x + "-" + y,
              row: x,
              column: y,
              rnd:
                Math.floor(100000 + Math.random() * 900000 + x * y) +
                "-" +
                x +
                y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--delay" + Math.floor(Math.random() * 10),
                this.elementSize,
                "col-" + y,
                "row-" + x,
                "index-" + z
              ]
            }
          });
        }
      });
    },
    hideWordV() {
      const getAvailable = new Promise(resolve => {
        var availablePlaces = [];
        this.$store.state.gridObjects.forEach(item => {
          if (
            item.row <
            this.$store.state.rows + 1 - this.$store.state.word.length
          ) {
            availablePlaces.push(this.$store.state.gridObjects.indexOf(item));
          }
        });
        resolve(availablePlaces);
      });
      getAvailable.then(result => {
        var startPos = result[Math.floor(Math.random() * result.length)];
        for (var i = 0; i < this.$store.state.word.length; i++) {
          const x = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i
          ].row;
          const y = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i
          ].column;
          const z = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i
          ].elementNumber;
          this.$store.commit("replaceGridItem", {
            index: startPos + this.$store.state.columns * i,
            content: {
              elementNumber: z,
              elementId: x + "-" + y,
              row: x,
              column: y,
              rnd:
                Math.floor(100000 + Math.random() * 900000 + x * y) +
                "-" +
                x +
                y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--delay" + Math.floor(Math.random() * 10),
                this.elementSize,
                "col-" + y,
                "row-" + x,
                "index-" + z
              ]
            }
          });
        }
      });
    },
    hideWordD() {
      const getAvailable = new Promise(resolve => {
        var availablePlaces = [];
        this.$store.state.gridObjects.forEach(item => {
          if (
            item.row <
              this.$store.state.rows + 1 - this.$store.state.word.length &&
            item.column <
              this.$store.state.columns + 1 - this.$store.state.word.length
          ) {
            availablePlaces.push(this.$store.state.gridObjects.indexOf(item));
          }
        });
        resolve(availablePlaces);
      });
      getAvailable.then(result => {
        var startPos = result[Math.floor(Math.random() * result.length)];
        var d = 0;
        for (var i = 0; i < this.$store.state.word.length; i++) {
          const x = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i + d
          ].row;
          const y = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i + d
          ].column;
          const z = this.$store.state.gridObjects[
            startPos + this.$store.state.columns * i + d
          ].elementNumber;
          this.$store.commit("replaceGridItem", {
            index: startPos + this.$store.state.columns * i + d,
            content: {
              elementNumber: z,
              elementId: x + "-" + y,
              row: x,
              column: y,
              rnd:
                Math.floor(100000 + Math.random() * 900000 + x * y) +
                "-" +
                x +
                y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--delay" + Math.floor(Math.random() * 10),
                this.elementSize,
                "col-" + y,
                "row-" + x,
                "index-" + z
              ]
            }
          });
          d++;
        }
      });
    },
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
      this.$store.commit("deleteGrid");
    },
    makeGrid() {
      this.$store.commit("deleteGrid");
      this.setGridStyle();
      var count = 0;
      for (var i = 0; i < this.ElementsV; i++) {
        for (var j = 0; j < this.ElementsH; j++) {
          count++;
          this.$store.commit("createGrid", {
            elementNumber: count,
            elementId: i + "-" + j,
            row: i,
            rnd:
              Math.floor(100000 + Math.random() * 900000 + i * j) + "-" + i + j,
            column: j,
            isRandom: true,
            character: "",
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
  position: relative;
  &-wrapper {
    &__word {
      margin: 20px;
      font-family: paytone-one, sans-serif;
      text-transform: uppercase;
      font-size: 20px;
    }
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
