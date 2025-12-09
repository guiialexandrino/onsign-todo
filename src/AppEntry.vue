<script setup lang="ts">
import { LocalStorageClient } from './infra/LocalStorage'
import type { IStorageClient } from './infra/StorageClient'
import BaseLayout from './components/layouts/baseLayout/index.vue'
import { useStateSyncStorage } from './hookies/useStateStorage'
import { provide, watch } from 'vue'
import { StorageClient } from './provider'

const storageClient: IStorageClient = new LocalStorageClient()

provide(StorageClient, storageClient)
</script>

<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>
