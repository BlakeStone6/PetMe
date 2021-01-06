<template>
  <div
    ref="interactElement"
    class="card"
    :class="{ isCurrent: isCurrent }"
    :style="{ transform: transformString }"
  >
    <vs-card type="1">
      <template #title>
        <h3 class="cardTitle">{{ card.fields.nom }}</h3>
      </template>
      <template #img>
        <img
          :src="card.fields.image[0].url"
          :alt="'Profil de ' + card.fields.nom"
        />
      </template>
      <template #text>
        <p>{{ card.fields.description }}</p>
      </template>
      <template #interactions>
        <vs-button danger icon circle size="xl" @click="onRejectClick">
          <i class="bx bx-x"></i>
        </vs-button>
        <vs-button warning icon circle size="xl" @click="active = !active">
          <i class="bx bx-expand-alt"></i>
        </vs-button>
        <vs-button success icon circle size="xl" @click="onAcceptClick">
          <i class="bx bx-heart"></i>
        </vs-button>
      </template>
    </vs-card>
    <vs-dialog v-model="active" not-close>
      <pet-profile-dialog :card="card" :is-this-user="false" />
    </vs-dialog>
  </div>
</template>

<script>
import PetProfileDialog from '@/components/PetProfileDialog'
const interact = require('interactjs')
const ACCEPT_CARD = 'cardAccepted'
const REJECT_CARD = 'cardRejected'

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactXThreshold: 100,
  },
  components: { PetProfileDialog },

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
    isShowing: true,
    isInteractAnimating: true,
    isInteractDragged: null,
    interactPosition: {
      x: 0,
      y: 0,
      rotation: 0,
    },
    active: false,
  }),
  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
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
        this.isInteractAnimating = false
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } = this.$options.static
        const x = this.interactPosition.x + event.dx
        const y = this.interactPosition.y + event.dy

        let rotation = interactMaxRotation * (x / interactXThreshold)

        if (rotation > interactMaxRotation) rotation = interactMaxRotation
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation

        this.interactSetPosition({ x, y, rotation })
      },

      onend: () => {
        const x = this.interactPosition.x
        const interactXThreshold = this.$options.static.interactXThreshold
        this.isInteractAnimating = true

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD)
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD)
        else this.resetCardPosition()
      },
    })
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false
        this.$emit('hideCard', this.card)
      }, 300)
    },

    onAcceptClick() {
      this.isInteractAnimating = true
      this.playCard(ACCEPT_CARD)
    },

    onRejectClick() {
      this.isInteractAnimating = true
      this.playCard(REJECT_CARD)
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactMaxRotation,
      } = this.$options.static

      this.interactUnsetElement()

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          })
          this.$emit(ACCEPT_CARD)
          break
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          })
          this.$emit(REJECT_CARD)
          break
      }

      this.hideCard()
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates
      this.interactPosition = { x, y, rotation }
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset()
      this.isInteractDragged = true
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
@import 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css';

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 35vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include flex-center();

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
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

vs-card {
  height: 100%;
}

.cardTitle {
  margin: 0 0 15px;
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
