export type Board = {
  title: string
  value: string
}

export type BoardItem = {
  created_at: number // timestamp
  label: string
  desc?: string
  value: string
}

export type Kanban = {
  boards: Board[]
  itens: BoardItem[]
  style?: { gapBetweenBoards?: number; boardWidth?: number }
}

export type KanbanEmits = {
  (e: 'onChange', payload: onChangeBoardItem): void
  (e: 'onDelete', payload: any): void
}

export type KanbanSlots = {
  title?: (props: { board: Board }) => any
  item?: (props: { boardItem: BoardItem }) => any
}

export type onChangeBoardItem = { index: number; value: BoardItem }
