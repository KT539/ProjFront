<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="font-semibold text-sm">{{ label }}</label>

    <input
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
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
