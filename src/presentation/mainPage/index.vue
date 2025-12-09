<template>
  <section style="background-color: white">
    <h1>Página Principal</h1>
    <Kanban :boards="boards" :itens="itens" @onChange="onChangeItemFromBoard">
      <template #title="{ board }">
        {{ board.title }}
      </template>

      <template #item="{ boardItem }">
        <div class="board-item-style">
          {{ boardItem.label }}
        </div>
      </template>
    </Kanban>
  </section>
</template>

<script setup lang="ts">
import Kanban from '@/components/ui/kanban/index.vue'
import type { Board, BoardItem, onChangeBoardItem } from '@/components/ui/kanban/kanban.types'
import { ref } from 'vue'

const boards: Board[] = [
  { title: 'TO DO', value: 'undone' },
  { title: 'DONE', value: 'done' },
]

const itens = ref<BoardItem[]>([
  { created_at: 123, label: 'Estudar IA', value: 'undone' },
  { created_at: 2, label: 'Pedir demissão', value: 'done' },
  { created_at: 3, label: 'Testes automatizados', value: 'done' },
])

const onChangeItemFromBoard = ({ index, value }: onChangeBoardItem) => {
  itens.value[index] = value
}
</script>

<style scoped>
.board-item-style {
  border-radius: 12px;
  background-color: orange;
  padding: 16px;
}
</style>
