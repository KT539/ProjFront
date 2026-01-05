<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex flex-col md:flex-row gap-6">

      <img
        :src="element.Poster"
        class="w-64 rounded-xl shadow"
      />

      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-2">{{ element.Title }}</h1>
        <p class="text-gray-600">{{ element.Year }}</p>
        <p class="mt-4">{{ element.Plot }}</p>

        <div class="mt-6 flex gap-4">
          <p class="text-sm">IMDb : {{ element.imdbRating }}</p>
          <p class="text-sm">Type : {{ element.Type }}</p>
        </div>
      </div>

    </div>
  </div>
</template>
