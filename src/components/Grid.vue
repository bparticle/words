<template>
  <div class="grid">
    <input
      class="grid__input grid__input--sizeW"
      @keyup.enter="setSize"
      type="text"
      name="width"
      v-model="size.width"
    />
    <input
      class="grid__input grid__input--sizeH"
      @keyup.enter="setSize"
      type="text"
      name="height"
      v-model="size.height"
    />
    <input
      @keyup.enter="hideWord()"
      class="grid__input grid__input--word"
      type="text"
      name="height"
      v-model="word"
    />
    <button
      @click="setSize"
      class="grid__button grid__button--set"
      type="button"
      name="button"
    >
      SHUFFLE
    </button>
    <button
      @click="deleteGrid"
      class="grid__button grid__button--clear"
      type="button"
      name="button"
    >
      DELETE
    </button>
    <transition-group name="list-complete" tag="p" class="grid__words">
      <span
        v-for="item in hiddenWords"
        v-bind:key="item.index"
        class="list-complete-item grid__word"
      >
        {{ item.word }}
      </span>
    </transition-group>
    Elements Horizontal: {{ ElementsH }} | Elements Vertical: {{ ElementsV }}
    <div class="grid__grid" :class="gridSize" :style="gridStyle" :key="gridKey">
      <transition-group name="list-complete" tag="div">
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
        width: 200,
        height: 200
      },
      size: {
        width: 200,
        height: 200
      },
      gridKey: 0
    };
  },
  computed: {
    hiddenWords() {
      return this.$store.getters.getHiddenWords;
    },
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
    },
    binaryWord() {
      return this.$store.getters.binaryWord;
    }
  },
  methods: {
    getPlaces() {
      return new Promise((resolve, reject) => {
        // First check if the word has been entered in the grid
        this.$store.dispatch("checkIfWordExists", this.word).then(exists => {
          if (!exists) {
            var possiblePlaces = [];
            this.gridObjects.forEach(gridObject => {
              // Horizontal check
              if (
                gridObject.column <
                this.$store.state.columns + 1 - this.word.length
              ) {
                this.checkHorizontal(gridObject).then(result => {
                  // if any of the characters returns 0 then reject
                  if (
                    result.some(b => {
                      return b === 0;
                    })
                  ) {
                    reject("No horizontal places possible");
                  } else {
                    possiblePlaces.push({
                      type: "horizontal",
                      content: gridObject
                    });
                  }
                });
              }
            });
            resolve(possiblePlaces);
          }
        });
      });
    },
    hideWord() {
      this.getPlaces()
        .then(possiblePlaces => {
          this.$store.dispatch(
            "hideWord",
            possiblePlaces[Math.floor(Math.random() * possiblePlaces.length)]
          );
          this.$store.commit("addHiddenWord", this.word);
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkHorizontal(gridObject) {
      var result = this.binaryWord.slice(0); // Prepare test result array
      return new Promise(resolve => {
        for (var i = 0; i < this.word.length; i++) {
          if (this.gridObjects[gridObject.elementNumber + i].isRandom) {
            // Character is random - OK
            result[i] = 1;
          } else if (
            this.gridObjects[gridObject.elementNumber + i].character ===
            this.word[i]
          ) {
            // Character is not random but same as requested - OK
            result[i] = 1;
          } else {
            // Character is not random and different from requested - NOT OK
            result[i] = 0;
          }
        }
        resolve(result);
      });
    },
    hideWord__legacy() {
      // First check if the word has been entered in the grid
      this.$store.dispatch("checkIfWordExists", this.word).then(exists => {
        if (!exists) {
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
          this.$store.commit("addHiddenWord", this.word);
        }
      });
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
            resolve(availablePlaces);
          }
        });
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
                Math.floor(10000 + Math.random() * 90000 + x * y) + "-" + x + y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--nonrnd",
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
            resolve(availablePlaces);
          }
        });
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
                Math.floor(10000 + Math.random() * 90000 + x * y) + "-" + x + y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--nonrnd",
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
            resolve(availablePlaces);
          }
        });
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
                Math.floor(10000 + Math.random() * 90000 + x * y) + "-" + x + y,
              isRandom: false,
              character: this.$store.state.word[i],
              classes: [
                "character--nonrnd",
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
      this.$store.commit("clearWords");
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
          this.$store.commit("createGrid", {
            elementNumber: count,
            elementId: i + "-" + j,
            row: i,
            rnd:
              Math.floor(10000 + Math.random() * 90000 + i * j) + "-" + i + j,
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
          count++;
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
  &__grid {
    position: relative;
    margin: 50px auto;
    transition: all 0.5s;
  }

  &__words {
    overflow: hidden;
    margin: 15px auto;
  }

  &__word {
    margin: 5px;
    padding: 5px;
    background-color: lightyellow;
    min-width: 160px;
    font-family: paytone-one, sans-serif;
    text-transform: uppercase;
    font-size: 15px;
    float: left;
    list-style-type: none;
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  &__input {
    width: 50px;
    outline: 0;
    border: 0;
    padding: 10px 15px;
    font-size: 20px;
    margin: 15px 2px;
    &--word {
      display: inline-block;
      min-width: 140px;
    }
  }

  &__button {
    outline: 0;
    border: 0;
    padding: 10px 15px;
    border-radius: 2px;
    color: #fff;
    margin: 0 5px;
  }
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
