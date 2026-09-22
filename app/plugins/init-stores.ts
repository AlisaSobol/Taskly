import { useTasksStore } from "~/stores/tasksStore"

export default defineNuxtPlugin(() => {
  useTasksStore()
})