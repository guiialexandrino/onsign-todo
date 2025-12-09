import type { IStorageClient } from './StorageClient'
import type { StorageKeys, StorageKeyTypes, StorageResponse } from './StorageClient'

export class LocalStorageClient implements IStorageClient {
  async getItem<T extends StorageKeys>(key: T): Promise<StorageResponse<StorageKeyTypes[T]>> {
    try {
      const item = localStorage.getItem(key)
      if (item) return { success: true, data: JSON.parse(item), error: null }
      else {
        console.log(`Key: ${key} --> não encontrado no Async Storage`)
        throw new Error(`Key: ${key} --> não encontrado no Async Storage`)
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: { message: error as string, code: 'GET_ITEM_ERROR' },
      }
    }
  }

  async setItem<T extends StorageKeys>(
    key: T,
    object: StorageKeyTypes[T],
  ): Promise<StorageResponse<StorageKeyTypes[T]>> {
    try {
      await localStorage.setItem(key, JSON.stringify(object))
      return { success: true, data: object, error: null }
    } catch (error) {
      console.log('Erro ao definir item:', error)
      return {
        success: false,
        data: null,
        error: { message: 'Erro ao definir item', code: 'SET_ITEM_ERROR' },
      }
    }
  }

  async deleteItem<T extends StorageKeys>(key: T): Promise<StorageResponse<StorageKeyTypes[T]>> {
    try {
      const existingItem = await localStorage.getItem(key)
      if (!existingItem) {
        return {
          success: false,
          data: null,
          error: { message: `Item com a chave '${key}' não existe`, code: 'ITEM_NOT_FOUND' },
        }
      }

      await localStorage.removeItem(key)
      return { success: true, data: null, error: null }
    } catch (error) {
      console.log('Erro ao deletar item:', error)
      return {
        success: false,
        data: null,
        error: { message: 'Erro ao deletar item', code: 'DELETE_ITEM_ERROR' },
      }
    }
  }
}
