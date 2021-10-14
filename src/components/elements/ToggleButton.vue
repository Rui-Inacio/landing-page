<template>
  <b-button
    :name="name"
    :class="toggleClass"
    :icon-left="icon"
    @click="toggleMethod"
  >
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    name: {
      type: String,
      default: "toggle-button",
    },
    onText: {
      type: String,
      default: null,
    },
    offText: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    offButtonClass: {
      type: String,
      default: null,
    },
    onButtonClass: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isOn: false,
      text: null,
      toggleClass: null,
    };
  },

  methods: {
    toggleMethod() {
      if (!this.isOn) {
        this.isOn = true;
        this.text = this.onText;
        this.toggleClass = this.onButtonClass;
        this.$emit("toggle", true);
      } else {
        this.isOn = false;
        this.text = this.offText;
        this.toggleClass = this.offButtonClass;
        this.$emit("toggle", false);
      }
    },
  },

  created() {
    this.text = this.offText;
    this.toggleClass = this.offButtonClass;
  },
};
</script>