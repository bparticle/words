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
    <input @keyup.enter="hideWordH" type="text" name="height" v-model="word" />
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
      gridObjects: [],
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
    hideWordH() {
      const getAvailable = new Promise(resolve => {
        var availablePlaces = [];
        this.gridObjects.forEach(item => {
          if (
            item.column <
            this.$store.state.columns - this.$store.state.word.length
          ) {
            availablePlaces.push(this.gridObjects.indexOf(item));
          }
        });
        resolve(availablePlaces);
      });
      getAvailable.then(result => {
        var startPos = result[Math.floor(Math.random() * result.length)];
        console.log(startPos);
        for (var i = 0; i < this.$store.state.word.length; i++) {
          this.gridObjects[startPos + i].isRandom = false;
          this.gridObjects[startPos + i].character = this.$store.state.word[i];
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
