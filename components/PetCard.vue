<template>
  <div
    ref="interactElement"
    class="card"
    :class="{ isAnimating: isAnimating, isCurrent: isCurrent }"
    :style="{ transform: transformString }"
  >
    <h3 class="cardTitle">{{ card.keyword }}</h3>
  </div>
</template>

<script>
const interact = require('interactjs')
export default {
  static: {
    maxRotation: 15,
    xThreshold: 150,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isAnimating: true,
    interactPosition: {
      x: 0,
      y: 0,
      rotation: 0,
    },
  }),
  computed: {
    transformString() {
      if (!this.isAnimating) {
        const { x, y, rotation } = this.interactPosition
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
      }
      return null
    },
  },
  mounted() {
    const element = this.$refs.interactElement
    interact(element).draggable({
      onstart: () => {
        this.isAnimating = false
      },
      onmove: (event) => {
        const { maxRotation, xThreshold } = this.$options.static
        const x = this.interactPosition.x + event.dx
        const y = this.interactPosition.y + event.dy

        let rotation = this.interactPosition.rotation + x / xThreshold

        if (rotation > maxRotation) rotation = maxRotation
        if (rotation < -maxRotation) rotation = -maxRotation

        if (x > xThreshold) console.log('RIGHT')
        if (x < -xThreshold) console.log('LEFT')

        this.interactSetPosition({ x, y, rotation })
      },
      onend: () => {
        this.isAnimating = true
        this.resetCardPosition()
      },
    })
  },
  // ...
  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },
  methods: {
    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates
      this.interactPosition = { x, y, rotation }
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-bottom();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 350px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: url('/xoxo_cute__Puppy__Dog__animal__pets__Cute_dogs_Cute_animals_.jpg');
  background-size: cover; /* <------ */
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  touch-action: none;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
