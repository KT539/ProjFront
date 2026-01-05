<template>
  <button
    class="px-4 py-2 rounded-lg shadow transition"
    :class="variantClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 hover:bg-blue-700 text-white";
    case "danger":
      return "bg-red-600 hover:bg-red-700 text-white";
    case "warning":
      return "bg-yellow-500 hover:bg-yellow-600 text-black";
    default:
      return "bg-gray-600 hover:bg-gray-700 text-white";
  }
});
</script>
