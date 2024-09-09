<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import type { RColumn } from '~/types'
import { RTable } from './components/r-table'

interface User {
  id: number
  username: string
  email: string
  password: string
}

const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => (
  {
    common: {
      borderRadius: '6px',
    },
  }
))

const tblRef = ref<InstanceType<typeof RTable>>()

const columns = computed<RColumn<User>[]>(() => [
  { key: 'username', title: '用户名', filterOption: { type: 'input' }, sortOption: true },
  { key: 'email', title: '邮箱', filterOption: { type: 'input' }, sortOption: true },
])

onMounted(() => {
  addTestData()
})

function addTestData() {
  tblRef.value?.createRow({ id: 0, username: 'ronan', email: '12@123.com' })
  tblRef.value?.createRow({ id: 1, username: 'ronan1', email: '123@123.com' })
  tblRef.value?.createRow({ id: 2, username: 'ronan2', email: '124@123.com' })
}
</script>

<template>
  <n-config-provider :theme-overrides="naiveThemeOverrides" h-full>
    <div h-full flex-vertical>
      <RTable
        ref="tblRef"
        name="test-user"
        title="测试用户表"
        :row-key="row => row.id"
        :columns="columns"
        p-3
      />
    </div>
  </n-config-provider>
</template>
