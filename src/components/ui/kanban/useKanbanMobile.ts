import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import type { BoardItem, Kanban, KanbanEmits } from './kanban.types'

type Props = {
  props: Kanban
  emits: KanbanEmits
  kanbanWrapperRef: Ref<HTMLDivElement | null>
  isDragging: Ref<boolean>
  draggedItem: Ref<BoardItem | null>
  draggedItemIndex: Ref<number>
}

// For mobile is necessary TouchEvent -> drag events dont work.
export const useKanbanMobile = ({
  kanbanWrapperRef,
  props,
  emits,
  isDragging,
  draggedItem,
  draggedItemIndex,
}: Props) => {
  let touchXStart = 0

  const onTouchMobileStart = (e: TouchEvent) => {
    if (e.targetTouches[0]?.clientX) {
      touchXStart = e.targetTouches[0].clientX
    }
  }

  const onTouchMobileMove = (e: TouchEvent) => {
    e.preventDefault()
    if (e.targetTouches[0]?.clientX) {
      const clientX = e.targetTouches[0].clientX
      const touchMovement = touchXStart - clientX
      if (kanbanWrapperRef.value) {
        const SCROLL_SPEED = 8
        const scrollValue = touchMovement < 0 ? -SCROLL_SPEED : SCROLL_SPEED
        kanbanWrapperRef.value.scrollLeft = kanbanWrapperRef.value.scrollLeft - scrollValue
      }
    }
  }

  const onTouchMobileItemEnd = (e: TouchEvent) => {
    if (kanbanWrapperRef.value) {
      let { left, right } = kanbanWrapperRef.value.getBoundingClientRect()
      const boardsLength = props.boards.length
      right = right * boardsLength + props.gapBetweenBoards! * (boardsLength - 1)

      const xPosition =
        (kanbanWrapperRef.value.scrollLeft || 0) + (e.changedTouches[0]?.clientX || 0)

      if (xPosition < left || xPosition > right) return

      const boardIndex = Math.floor(
        xPosition /
          (props.boardWidth! + (xPosition > props.boardWidth! ? props.gapBetweenBoards! : 0)),
      )

      const board = props.boards[boardIndex]
      if (!board) return

      if (isDragging.value && draggedItem.value && draggedItemIndex.value >= 0) {
        emits('onChange', {
          index: draggedItemIndex.value,
          value: { ...draggedItem.value, value: board.value },
        })
        isDragging.value = false
        draggedItem.value = null
        draggedItemIndex.value = -1
      }
    }
  }

  onMounted(() => {
    window.addEventListener('touchmove', onTouchMobileMove, { passive: false })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('touchmove', onTouchMobileMove)
  })

  return { kanbanWrapperRef, onTouchMobileStart, onTouchMobileItemEnd }
}
