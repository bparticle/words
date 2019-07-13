<template>
  <div :style="setPos" class="character" :class="classes" :id="id">
    {{ rndChar }}
  </div>
</template>

<script>
export default {
  name: "Character",
  props: {
    classes: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    row: {
      type: Number,
      required: true
    },
    column: {
      type: Number,
      required: true
    }
  },
  computed: {
    elementSize() {
      return this.$store.state.elementSize;
    },
    rndChar() {
      var characters = this.$store.state.allCharacters;
      return characters.charAt(Math.floor(Math.random() * characters.length));
    },
    setPos() {
      return {
        left: this.column * this.elementSize,
        top: this.row * this.elementSize
      };
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.character {
  font-family: paytone-one, sans-serif;
  position: absolute;
  font-size: 20px;

  @for $i from 20 through 80 {
    &--#{$i} {
      width: #{$i}px;
      height: #{$i}px;
    }
  }
}
</style>
