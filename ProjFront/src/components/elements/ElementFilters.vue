<template>
  <div class="bg-white shadow p-4 rounded-xl mx-6 mt-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <Input
        v-model="local.title"
        label="Titre"
        placeholder="Ex: Batman"
      />

      <Input
        v-model="local.year"
        label="Année"
        placeholder="Ex: 2015"
      />

      <Input
        v-model="local.genre"
        label="Genre"
        placeholder="Ex: Action"
      />
    </div>

    <div class="flex justify-end mt-4">
      <Button @click="apply">Rechercher</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";

const emit = defineEmits(["filter"]);

const local = reactive({
  title: "",
  year: "",
  genre: "",
});

const apply = () => {
  emit("filter", { ...local });
};
</script>
