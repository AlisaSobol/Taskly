import { defineStore } from 'pinia'
import { toKebabCase } from '@/utils/string'
import type { Column } from '~/types/column'

export const useBoardStore = defineStore('boardStore', ()=> {
    const {
        data: columns,
        pending: pending,
        error: error,
        refresh: refresh,
    } = useFetch<Column[]>('/api/board/columns')

    const addColumn = async (newColumnName: string)  => {
        const newColumnId = toKebabCase(newColumnName)

        const newColumn = {
            name: newColumnName,
            id: newColumnId
        }

        await useFetch('/api/board/columns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newColumn)
        })

        await refresh()
    }

    const updateColumn = async (column: Column) => {
        await useFetch(`/api/board/columns/${column.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(column)
        })

        await refresh()
    }

    const deleteColumn = async (columnId: string) => {
        await useFetch(`/api/board/columns/${columnId}`, {
            method: 'DELETE'
        })

        await refresh()
    }

    return {
        columns,
        pending,
        error,
        refresh,
        addColumn,
        updateColumn,
        deleteColumn
    }
})