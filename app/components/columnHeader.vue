<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore.ts"
import type { Column } from "~/types/column.ts"
import actions from "./actions.vue"

defineProps({
  column: {
    type:  Object as PropType<Column> ,
    required: true
  }
})

const boardStore = useBoardStore()

const editNameState = ref(false)

function updateColumnName(column: Column) {
  boardStore.updateColumn(column)

  editNameState.value =false
}
</script>

<template>
  <div v-if="column" class="column-header mb-3">
    <div>
      <UInput
        v-if="editNameState"
        type="text"
        v-model="column.name"
        @keyup.enter="updateColumnName(column)"
      />
      <h2 v-if="!editNameState">{{ column.name }}</h2>
    </div>
    <div>
      <actions
        @edit="editNameState=!editNameState"
        @delete="boardStore.deleteColumn(column.id)"
      />
    </div>
  </div>
</template>
