<template>
  <div :style="setPos" class="character" :class="classes" :id="id">
    {{ char }}
  </div>
</template>

<script>
export default {
  name: "Character",
  props: {
    isRandom: {
      type: Boolean,
      required: true
    },
    character: {
      type: String,
      required: false
    },
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
    characters() {
      return this.$store.state.allCharacters;
    },
    char() {
      if (this.isRandom) {
        return this.characters.charAt(
          Math.floor(Math.random() * this.characters.length)
        );
      } else {
        return this.character;
      }
    },
    setPos() {
      return {
        left: this.column * this.elementSize + "px",
        top: this.row * this.elementSize + "px"
      };
    }
  }
};
</script>

<style scoped lang="scss">
.character {
  text-transform: uppercase;
  position: absolute;
  transition: all 0.3s ease-out;
  font-size: 20px;

  @for $i from 20 through 80 {
    &--#{$i} {
      width: #{$i}px;
      height: #{$i}px;
      line-height: #{$i}px;
    }
  }

  @for $i from 0 through 10 {
    &--delay#{$i} {
      transition-delay: #{$i / 20}s;
    }
  }
}
</style>
