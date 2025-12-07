<template>
  <section ref="kanbanWrapperRef" class="kanban-wrapper" @dragleave="">
    <div
      v-for="board in props.boards"
      :key="board.value"
      class="board-style"
      @dragover.prevent="onDragOver"
      @drop="onDrop(board)"
      @touchstart="onTouchMobileStart"
      @touchend="onTouchMobileItemEnd"
    >
      <h2>{{ board.title }}</h2>

      <div class="board-wrapper">
        <div v-for="boardItem in getItens(board.value)" :key="boardItem.created_at">
          <div
            class="item-style"
            :draggable="true"
            @dragstart="onDragStart(boardItem)"
            @touchstart="onDragStart(boardItem)"
          >
            {{ boardItem.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKanbanDesktop } from './useKanbanDesktop'
import { useKanbanMobile } from './useKanbanMobile'
import { type KanbanEmits, type Kanban, type BoardItem } from './kanban.types'

const props = withDefaults(defineProps<Kanban>(), { gapBetweenBoards: 20, boardWidth: 400 })
const emits = defineEmits<KanbanEmits>()

const gap = computed(() => `${props.gapBetweenBoards}px`)
const width = computed(() => `${props.boardWidth}px`)
const getItens = (boardValue: string): BoardItem[] => {
  return props.itens.filter((item) => item.value === boardValue)
}

const isDragging = ref(false)
const draggedItem = ref<BoardItem | null>(null)
const draggedItemIndex = ref<number>(-1)
const kanbanWrapperRef = ref<HTMLDivElement | null>(null)

const { onDragStart, onDragOver, onDrop } = useKanbanDesktop({
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
})

const { onTouchMobileStart, onTouchMobileItemEnd } = useKanbanMobile({
  kanbanWrapperRef,
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
})
</script>

<style scoped>
.kanban-wrapper {
  display: flex;
  min-width: 100%;
  gap: v-bind(gap);
  overflow: hidden;
  overflow-x: auto;
}

.board-style {
  min-width: v-bind(width);
  user-select: none;
  padding-bottom: 20px;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-style {
  min-width: 80px;
  border-radius: 12px;
  background-color: lightcoral;
  padding: 16px;
}
</style>
