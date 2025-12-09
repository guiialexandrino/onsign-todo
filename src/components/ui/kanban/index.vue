<template>
  <section ref="kanbanWrapperRef" class="kanban-wrapper">
    <div
      v-for="board in props.boards"
      :key="board.value"
      class="board-style"
      @dragover.prevent="onDragOver"
      @drop="onDrop(board)"
      @touchstart="onTouchMobileStart"
      @touchend="onTouchMobileItemEnd"
    >
      <div ref="titleRef">
        <h2 v-if="!slots.title">{{ board.title }}</h2>
        <slot v-else name="title" :board="board"></slot>
      </div>

      <div class="board-wrapper">
        <div v-for="boardItem in getItens(board.value)" :key="boardItem.created_at">
          <div
            v-if="!slots.item"
            class="item-style"
            :draggable="true"
            @dragstart="(e) => onDragStart(boardItem, e)"
            @touchstart="(e) => onTouchBoardItemStart(boardItem, e)"
          >
            <div class="label">
              {{ boardItem.label }}
            </div>
            <div class="remove" @click="handleRemove(boardItem)">❎</div>
          </div>

          <div
            v-else
            :draggable="true"
            @dragstart="(e) => onDragStart(boardItem, e)"
            @touchstart="(e) => onTouchBoardItemStart(boardItem, e)"
          >
            <div class="label">
              <slot name="item" :boardItem="boardItem"></slot>
            </div>
            <div class="remove" @click="handleRemove(boardItem)">❎</div>
          </div>
        </div>

        <div v-if="getItens(board.value).length === 0">Sem tarefas</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKanbanDesktop } from './useKanbanDesktop'
import { useKanbanMobile } from './useKanbanMobile'
import {
  type KanbanEmits,
  type Kanban,
  type BoardItem,
  type KanbanSlots,
  type onDeleteBoardItem,
} from './kanban.types'

const props = withDefaults(defineProps<Kanban>(), {
  style: () => ({ gapBetweenBoards: 20, boardWidth: 400 }),
})
const emits = defineEmits<KanbanEmits>()
const slots = defineSlots<KanbanSlots>()

const kanbanWrapperRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement[] | null>(null)

const isDragging = ref(false)
const draggedItem = ref<BoardItem | null>(null)
const draggedItemIndex = ref<number>(-1)
const getItens = (boardValue: string): BoardItem[] => {
  return props.itens.filter((item) => item.value === boardValue)
}

const { onDragStart, onDragOver, onDrop } = useKanbanDesktop({
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
})

const { onTouchMobileStart, onTouchMobileItemEnd, onTouchBoardItemStart } = useKanbanMobile({
  kanbanWrapperRef,
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
})

const handleRemove = (boardItem: BoardItem) => {
  const confirmRemove = confirm(`Deletar a tarefa '${boardItem.label}'?`)
  if (confirmRemove) {
    const payload: onDeleteBoardItem = {
      value: boardItem,
      index: props.itens.findIndex((item) => item.created_at === boardItem.created_at),
      itensAfterDelete: props.itens.filter((item) => item.created_at !== boardItem.created_at),
    }
    emits('onDelete', payload)
  }
}

/* Style */
const gap = computed(() => `${props.style.gapBetweenBoards}px`)
const width = computed(() => `${props.style.boardWidth}px`)
const titleHeight = computed(() => {
  if (titleRef.value) {
    const height = titleRef.value[0]?.getBoundingClientRect().height
    return height ? `${height}px` : `0px`
  }
  return `0px`
})
</script>

<style scoped>
.kanban-wrapper {
  display: flex;
  max-width: 100%;
  max-height: 100%;
  gap: v-bind(gap);
  overflow: hidden;
  overflow-x: auto;
}

.board-style {
  min-width: v-bind(width);
  max-width: v-bind(width);
  user-select: none;
  padding-bottom: 20px;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #eff0f2;
  max-height: calc(100% - v-bind(titleHeight));
  overflow-y: auto;
}

h2 {
  padding-left: 8px;
}

.item-style {
  border-radius: 12px;
  background-color: white;
  border: 1px solid lightgray;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 8px;
}

.item-style .label {
  user-select: none;
  flex: 1 0 0;
}

.item-style .remove {
  cursor: pointer;
}

.item-style .remove:active {
  transform: translateY(2px);
}
</style>
