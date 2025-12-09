<template>
  <header ref="headerRef">
    <h1>✔ TO DO LIST</h1>
    <div class="add-task">
      <TextField v-model="newTaskInput" @onPressEnter="handleCreateTask" />
      <Button @onClick="handleCreateTask">Adicionar</Button>
    </div>
  </header>

  <main class="kanban-container">
    <Kanban
      :boards="boards"
      :itens="itens"
      @onChange="onChangeItemFromBoard"
      @onDelete="onDeleteItemFromBoard"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextField from '@/components/ui/textfield/index.vue'
import Button from '@/components/ui/button/index.vue'
import Kanban from '@/components/ui/kanban/index.vue'
import type {
  Board,
  BoardItem,
  onChangeBoardItem,
  onDeleteBoardItem,
} from '@/components/ui/kanban/kanban.types'

const newTaskInput = ref<string>('')

const boards: Board[] = [
  { title: 'TO DO', value: 'undone' },
  { title: 'DONE', value: 'done' },
]

const itens = ref<BoardItem[]>([])

const handleCreateTask = () => {
  const taskLabel = newTaskInput.value
  if (!taskLabel) {
    window.alert('Atenção, a tarefa precisa ter um texto')
    return
  }

  const newTask: BoardItem = {
    created_at: Date.now(),
    label: taskLabel,
    value: 'undone',
  }

  itens.value.push(newTask)
}

const onChangeItemFromBoard = ({ index, value }: onChangeBoardItem) => {
  itens.value[index] = value
}

const onDeleteItemFromBoard = ({ itensAfterDelete }: onDeleteBoardItem) => {
  itens.value = itensAfterDelete
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(15dvh);
}

.add-task {
  display: flex;
  gap: 12px;
}

.kanban-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(80dvh);
  max-width: 100%;
}
</style>
