<script setup lang="ts">
import type { Task } from "~/types/task.ts"
import actions from "@/components/actions.vue"

const route = useRoute()
const router = useRouter()
const tasksStore = useTasksStore()
const task = computed(() => tasksStore.getTaskById(route.params.id as string))

watch(
    () => tasksStore.pending,
    (pending) => {
      if (!pending && !task.value) throw createError({status: 404, statusText: 'Task not found', fatal: true})
    },
    { immediate: true }
)

const isEditMode = ref(false)
const newTaskName = ref('')
const newTaskDescription  = ref('')

const closeTask = () => {
  router.push('/')
  isEditMode.value = false
  newTaskName.value = ''
  newTaskDescription.value = ''
}

const editTask = () => {
  newTaskName.value = task?.value?.name || ''
  newTaskDescription.value = task?.value?.description || ''
  isEditMode.value = true
}

const deleteTask = () => {
  tasksStore.deleteTask(route.params.id as string)
  isEditMode.value = true
  router.push('/')
}

const cancelEditTask = () => {
  isEditMode.value = false
  newTaskName.value = ''
  newTaskDescription.value = ''
}

const saveEditTask = () => {
  if(task.value) {
    const newTask: Task = {
      id: task.value.id,
      columnId: task.value.columnId,
      name: newTaskName.value || '',
      description: newTaskDescription.value || ''
    }

    tasksStore.updateTask(newTask)
  }

  isEditMode.value = false
  newTaskName.value = ''
  newTaskDescription.value = ''
}
</script>

<template>
  <div class="task-wrapper">
    <div class="task-view-header mb-2">
      <p>Task ID: {{ route.params.id }}</p>
      <div>
        <actions
          @edit="editTask"
          @delete="deleteTask"
        />
        <UButton
          @click="closeTask"
          class="task-close-btn"
          icon="i-akar-icons-cross"
          color="neutral"
          variant="ghost"
        />
      </div>
    </div>
    <div class="task-view">
      <div v-if="!isEditMode">
        <h2><strong>{{ task?.name }}</strong></h2>
        <p>{{ task?.description }}</p>
      </div>
      <div v-if="isEditMode">
        <label for="name">Task name:</label>
        <UInput
          id="name"
          v-model="newTaskName"
          type="text"
          placeholder="New task name"
          class="mb-2 w-full"
        />
        <label for="description">Task description:</label>
        <UTextarea
          id="description"
          v-model="newTaskDescription"
          placeholder="New task description"
          class="mb-2 w-full"
        />
        <UButton
          @click="cancelEditTask"
          color="neutral"
          variant="ghost"
        >Cancel</UButton>
        <UButton @click="saveEditTask">Save</UButton>
      </div>
    </div>
  </div>
</template>