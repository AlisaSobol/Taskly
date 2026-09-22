<script setup lang="ts">
const emit = defineEmits(['edit', 'delete'])

const editEvent = () => {
  emit("edit")
}

const deleteEvent = () => {
  emit("delete")
}
</script>

<template>
  <UButton
    icon="i-akar-icons-pencil"
    color="warning"
    variant="ghost"
    activeVariant="outline"
    @click="editEvent"
  />
  <UButton
    icon="i-akar-icons-trash-can"
    color="error"
    variant="ghost"
    activeVariant="outline"
    @click="deleteEvent"
  />
</template>
