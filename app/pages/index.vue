<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore.ts"
import boardColumn from "~/components/boardColumn.vue"

const boardStore = useBoardStore()

const route = useRoute()

const newColumnName = ref('')

const isModalOpen = computed(() => {
  return route.name === 'index-tasks-id'
})

function addColumn() {
  boardStore.addColumn(newColumnName.value)

  newColumnName.value = ''
}
</script>

<template>
  <div class="board-wrapper bg-violet-500/10">
    <main class="board">
      <boardColumn
          v-for="column in boardStore.columns"
          :key="column.id"
          :column
      />
      <UContainer class="column">
          <UInput
              v-model="newColumnName"
              type="text"
              placeholder="Create new column"
              icon="i-heroicons-plus"
              @keyup.enter="addColumn"
          />
        </UContainer>
    </main>
    <div v-if="isModalOpen" class="task-bg">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>