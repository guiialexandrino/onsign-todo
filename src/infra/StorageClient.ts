import type { BoardItem } from '@/components/ui/kanban/kanban.types'

export interface IStorageClient {
  getItem<T extends StorageKeys>(key: T): Promise<StorageResponse<StorageKeyTypes[T]>>
  setItem<T extends StorageKeys>(
    key: T,
    object: StorageKeyTypes[T],
  ): Promise<StorageResponse<StorageKeyTypes[T]>>
  deleteItem<T extends StorageKeys>(key: T): Promise<StorageResponse<StorageKeyTypes[T]>>
}

export type StorageResponse<T> = {
  success: boolean
  data: T | null
  error: { message: string; code?: string } | null
}

// Schema de dados
export type StorageKeyTypes = {
  todoList: BoardItem[]
}

export type StorageKeys = keyof StorageKeyTypes
