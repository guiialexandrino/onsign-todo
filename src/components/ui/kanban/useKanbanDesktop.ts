import type { Ref } from 'vue'
import type { Board, BoardItem, Kanban, KanbanEmits } from './kanban.types'

type Props = {
  props: Kanban
  emits: KanbanEmits
  isDragging: Ref<boolean>
  draggedItem: Ref<BoardItem | null>
  draggedItemIndex: Ref<number>
}

export const useKanbanDesktop = ({
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
}: Props) => {
  const onDragStart = (item: BoardItem) => {
    isDragging.value = true
    draggedItem.value = item
    draggedItemIndex.value = props.itens.findIndex(
      (boardItem) => boardItem.created_at === item.created_at,
    )
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const onDrop = (target: Board) => {
    if (isDragging.value && draggedItem.value && draggedItemIndex.value >= 0) {
      emits('onChange', {
        index: draggedItemIndex.value,
        value: { ...draggedItem.value, value: target.value },
      })
      isDragging.value = false
      draggedItem.value = null
      draggedItemIndex.value = -1
    }
  }

  return { onDragStart, onDragOver, onDrop }
}
