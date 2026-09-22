import { defineStore } from 'pinia'
import type { Task } from '~/types/task'

export const useTasksStore = defineStore('tasksStore', ()=> {

    const {
        data: tasks,
        pending: pending,
        error: error,
        refresh: refresh,
    } = useFetch<Task[]>('/api/board/tasks')

    const addNewTask = async (newTask: Task) => {
        await useFetch('/api/board/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })

        await refresh()
    }

    const updateTask = async (task: Task) => {
        await useFetch(`/api/board/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })

        await refresh()
    }

    const deleteTask = async (taskId: string) => {
        await useFetch(`/api/board/tasks/${taskId}`, {
            method: 'DELETE'
        })

        await refresh()
    }

    const getTasksByColumn = (columnId: string) => {
        return tasks.value?.filter((task) => {
            return task.columnId === columnId
        }) ?? []
    }

    const getTaskById = computed(() => {
        return (taskId: string): Task | undefined => {
            return tasks.value?.find((task) => task.id === taskId)
        }
    })

    return {
        tasks,
        pending,
        error,
        refresh,
        addNewTask,
        updateTask,
        deleteTask,
        getTasksByColumn,
        getTaskById
    }
})