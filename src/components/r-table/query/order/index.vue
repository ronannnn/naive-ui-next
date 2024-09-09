<script setup lang="ts">
import type { PopoverInst } from 'naive-ui'
import type { OrderQueryProps } from '~/types'
import ListQueryOrderItem from './Item.vue'
import ListQueryOrderNewer from './Newer.vue'

const props = defineProps<OrderQueryProps<any>>()

const popoverRef = ref<PopoverInst | null>(null)

function onTriggerQuery() {
  popoverRef.value?.setShow(false)
  props.triggerQuery()
}

const unselectedOrderFields = computed(() => {
  const selectedFields = props.orderQuery.map(query => query.field)
  return props.orderOptions.filter(option => !selectedFields.includes(option.field)).map(option => option.field as string)
})

function onNewField(field: string) {
  props.onUpdateOrderQuery([...props.orderQuery, { field, order: 'desc' }])
}
function onChangeField(oldField: string, newField: string, orderType: Query.OrderType) {
  const oldIdx = props.orderQuery.findIndex(query => query.field === oldField)
  if (oldIdx !== -1) {
    props.onUpdateOrderQuery(
      props.orderQuery.map((query, idx) => (idx === oldIdx ? { field: newField, order: orderType } : query)),
    )
  }
  else {
    props.onUpdateOrderQuery([...props.orderQuery, { field: newField, order: orderType }])
  }
}
function onRemoveField(field: string) {
  props.onUpdateOrderQuery(props.orderQuery.filter(query => query.field !== field))
}

// drag related
const dragOrderQuery = computed<Query.Order<any>>({
  get() {
    return props.orderQuery
  },
  set(newOrderQuery) {
    props.onUpdateOrderQuery(newOrderQuery)
  },
})
</script>

<template>
  <n-popover ref="popoverRef" trigger="click" placement="bottom">
    <template #trigger>
      <n-button :size="size">
        <template #icon>
          <RIconSort />
        </template>
        {{ $t('button.sort') }}
      </n-button>
    </template>
    <div class="flex-vertical gap-2">
      <!-- items -->
      <RDnd v-model="dragOrderQuery" handle=".order-query-handle" dnd-class="flex-vertical gap-2">
        <ListQueryOrderItem
          v-for="item in dragOrderQuery"
          :key="item.field"
          :field="item.field as string"
          :order-type="item.order"
          :order-options="orderOptions"
          :unselected-fields="unselectedOrderFields"
          :size="size"
          @change="(newField, orderType) => onChangeField(item.field as string, newField, orderType)"
          @remove="onRemoveField(item.field as string)"
        />
      </RDnd>
      <div class="flex-y-center gap-2 border-(0 t slate-100 dashed) pt-2">
        <ListQueryOrderNewer
          :order-options="orderOptions"
          :unselected-fields="unselectedOrderFields"
          :size="size"
          @new="onNewField"
        />
        <n-button :size="size" type="primary" :loading="loading" @click="onTriggerQuery">
          {{ $t('button.query') }}
        </n-button>
        <n-button :size="size" :disabled="loading" @click="() => onUpdateOrderQuery(defaultOrderQuery ?? [])">
          {{ $t('button.reset') }}
        </n-button>
      </div>
    </div>
  </n-popover>
</template>
