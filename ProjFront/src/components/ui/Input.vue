<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="font-semibold text-sm text-gray-300"
    >
      {{ label }}
    </label>

    <input
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="
        bg-white
        text-black
        placeholder-gray-500
        border border-gray-300
        px-3 py-2 rounded-lg
        focus:ring-2 focus:ring-blue-500
        focus:outline-none
      "
    />
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";

const model = defineModel();

defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
});
</script>
