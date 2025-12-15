<template>
  <div class="bg-gray-800 text-white shadow p-4 rounded-xl mx-6 mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <Input v-model="local.year"
             label="Année"
             placeholder="Ex: 2015"
      />

      <Input v-model="local.genre"
             label="Genre"
             placeholder="Ex: Action"
      />

      <Input v-model="local.minRating"
             label="Note IMDb min"
             placeholder="Ex: 7.5"
      />
    </div>

    <div class="flex justify-end mt-4">
      <BaseButton @click="apply">
        Appliquer les filtres
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import Input from "@/components/ui/Input.vue";

const emit = defineEmits(["filter"]);

const local = reactive({
  title: "",
  year: "",
  genre: "",
  minRating: "",
});

const apply = () => {
  emit("filter", { ...local });
};
</script>
