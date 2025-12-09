import type { IStorageClient, StorageKeys, StorageKeyTypes } from '@/infra/StorageClient'
import { onMounted, ref, watch, type Ref } from 'vue'

type TUseStateSyncStorage<T extends StorageKeys> = {
  state: Ref<StorageKeyTypes[T]>
  isLoaded: Ref<boolean>
}

export function useStateSyncStorage<T extends StorageKeys>(
  storageClient: IStorageClient,
  key: T,
  initialState: StorageKeyTypes[T],
): TUseStateSyncStorage<T> {
  const data = ref<StorageKeyTypes[T]>(initialState)
  const isLoaded = ref<boolean>(false)

  onMounted(() => {
    loadInitialState()
  })

  const loadInitialState = async () => {
    isLoaded.value = true
    const storedValue = await storageClient.getItem(key)
    if (storedValue.data !== null) {
      data.value = storedValue.data
    } else if (!storedValue.data && initialState) {
      setState(initialState)
    }
    isLoaded.value = false
  }

  const setState = async (value: StorageKeyTypes[T]) => {
    data.value = value
    await storageClient.setItem(key, value)
  }

  watch(
    data,
    async (v) => {
      await storageClient.setItem(key, v)
    },
    { deep: true },
  )

  return { state: data, isLoaded: isLoaded }
}
