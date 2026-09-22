<script setup lang="ts">
import { useTasksStore } from "~/stores/tasksStore.ts"
import columnHeader from "~/components/columnHeader.vue"
import type { Column } from "~/types/column.ts";
import { v4 as uuid } from 'uuid';

const tasksStore = useTasksStore()

const router = useRouter()

defineProps({
  column: {
    type: Object as PropType<Column>,
    required: true
  },
})

const newTaskName = ref('')
const newTaskDescription = ref('')
const isNewTaskSectionOpen = ref(false)

function openNewTaskSection() {
  isNewTaskSectionOpen.value = true
}

function addNewTask(columnId: string) {
  const task = {
    id: uuid(),
    columnId: columnId,
    name: newTaskName.value,
    description: newTaskDescription.value,
  }

  tasksStore.addNewTask(task)
  isNewTaskSectionOpen.value = false
  newTaskName.value = ''
  newTaskDescription.value = ''
}

function closeNewTaskSection() {
  newTaskName.value = ''
  newTaskDescription.value = ''
  isNewTaskSectionOpen.value = false
}

function goToTask(taskId: string) {
  router.push(`/tasks/${taskId}`)
}
</script>

<template>
  <UContainer class="column">
    <columnHeader :column />
      <ul>
        <li v-for="task in tasksStore.getTasksByColumn(column.id)" :key="task.id">
          <UCard class="mb-2 task-link" @click="goToTask(task.id)">
            <template #header>
              <h3>{{ task.name }}</h3>
            </template>
          </UCard>
        </li>
      </ul>
    <UCard class="mb-2">
      <UButton
          v-if="!isNewTaskSectionOpen"
          icon="i-heroicons-plus"
          @click="openNewTaskSection"
      > Create new Task</UButton>
      <div v-if="isNewTaskSectionOpen">
        <UInput
            v-model="newTaskName"
            type="text"
            placeholder="New task name"
            class="mb-2 w-full"
        />
        <UTextarea
            v-model="newTaskDescription"
            placeholder="New task description"
            class="mb-2 w-full"
        />
        <div class="flex items-center gap-1">
          <UButton
              color="neutral"
              variant="ghost"
              @click="closeNewTaskSection"
          > Cancel </UButton>
          <UButton
              icon="i-heroicons-plus"
              @click="addNewTask(column.id)"
          > Create </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>