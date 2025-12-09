<script setup lang="ts">
import { provide } from 'vue'
import { StorageClient } from './provider'
import { LocalStorageClient } from './infra/LocalStorage'
import BaseLayout from './components/layouts/baseLayout/index.vue'
import type { IStorageClient } from './infra/StorageClient'

const storageClient: IStorageClient = new LocalStorageClient()

provide(StorageClient, storageClient)
</script>

<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>
