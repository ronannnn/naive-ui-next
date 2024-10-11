<script setup lang="ts">
import { defu } from 'defu'
import type { GlobalThemeOverrides } from 'naive-ui'
import type { RColumn, SimpleLayoutProps } from '~/types'
import { RTable } from './components/r-table'

interface User {
  id: number
  username: string
  email: string
  password: string
}

const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => (
  defu(
    getNaiveColor('#6366f1').value,
    {
      common: {
        borderRadius: '6px',
      },
    },
  )
))

const tblRef = ref<InstanceType<typeof RTable>>()

const columns = computed<RColumn<User>[]>(() => [
  { key: 'username', title: '用户名', filterOption: { type: 'input' }, sortOption: true },
  { key: 'email', title: '邮箱', filterOption: { type: 'input' }, sortOption: true },
])

onMounted(() => {
  addTestData()
  registerUnocssColor('#6366f1')
})

function addTestData() {
  tblRef.value?.createRow({ id: 0, username: 'ronan', email: '12@123.com' })
  tblRef.value?.createRow({ id: 1, username: 'ronan1', email: '123@123.com' })
  tblRef.value?.createRow({ id: 2, username: 'ronan2', email: '124@123.com' })
}

const layoutProps = ref<SimpleLayoutProps>({
  // sider
  siderMinWidth: 180,
  siderMaxWidth: 320,
  siderWidth: 220,
  siderMinCollapsedWidth: 50,
  siderMaxCollapsedWidth: 100,
  siderCollapsedWidth: 64,
  siderCollapsed: false,
  siderVisible: true,

  // header
  headerHeight: 48,
  headerVisible: true,

  // tab
  tabVisible: true,
  tabHeight: 42,

  isMobile: false,
  isFullContent: false,
})
</script>

<template>
  <n-config-provider :theme-overrides="naiveThemeOverrides" h-full>
    <SimpleLayout
      v-bind="layoutProps"
      @update:sider-collapsed="collapsed => layoutProps.siderCollapsed = collapsed"
      @update:sider-width="width => layoutProps.siderWidth = width"
      @update:sider-collapsed-width="width => layoutProps.siderCollapsedWidth = width"
    >
      <template #sider>
        sider
      </template>
      <template #header>
        header
      </template>
      <template #tab>
        <RTab
          active-tab-id="/"
          :tab-height="42"
          :tab-item-height="32"
          :tab-items="[
            { id: '/', label: '首页', icon: 'i-tabler-circle-check', closable: true },
            { id: '/test-user', label: '测试用户', icon: 'i-tabler-circle-check', closable: true },
            { id: '/test-user', label: '测试用户', icon: 'i-tabler-circle-check', closable: true },
            { id: '/test-user', label: '测试用户', icon: 'i-tabler-circle-check', closable: true },
            { id: '/test-user', label: '测试用户', icon: 'i-tabler-circle-check', closable: true },
          ]"
        />
      </template>
      <RTable
        ref="tblRef"
        name="test-user"
        title="测试用户表"
        :row-key="row => row.id"
        :columns="columns"
        p-3
      />
    </SimpleLayout>
  </n-config-provider>
</template>
