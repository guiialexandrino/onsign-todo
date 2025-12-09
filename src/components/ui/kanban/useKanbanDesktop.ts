import type { Ref } from 'vue'
import type { Board, BoardItem, Kanban, KanbanEmits } from './kanban.types'
import { useKanbanGhostEffect } from './useKanbanGhostEffect'

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
  const { createGhost, removeGhost } = useKanbanGhostEffect()

  const onDragStart = (item: BoardItem, e: DragEvent) => {
    const target = e.target as HTMLElement
    const ghost = createGhost(target)
    e.dataTransfer?.setDragImage(ghost, 10, 10)

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
      removeGhost()
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
