import type { InjectionKey } from 'vue'
import type { IStorageClient } from '../infra/StorageClient'

export const StorageClient: InjectionKey<IStorageClient> = Symbol('StorageClient')
