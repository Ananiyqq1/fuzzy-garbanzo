<template>
  <div class="app-data-table" :class="{ 'is-dense': dense }">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="columnStyles(column)"
            :class="[{ 'is-right': column.align === 'right', 'is-center': column.align === 'center' }]"
          >
            <slot :name="`header-${column.key}`" :column="column">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="empty-state">
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </td>
        </tr>
        <tr v-for="row in rows" :key="getRowKey(row)">
          <td
            v-for="column in columns"
            :key="`${getRowKey(row)}-${column.key}`"
            :class="[{ 'is-right': column.align === 'right', 'is-center': column.align === 'center' }]"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
              :column="column"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  dense: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: 'No data available'
  }
})

const columnStyles = (column) => {
  const styles = {}
  if (column.width) {
    styles.width = column.width
  }
  if (column.minWidth) {
    styles.minWidth = column.minWidth
  }
  return styles
}

const getRowKey = (row) => {
  const key = props.rowKey
  if (typeof key === 'function') {
    return key(row)
  }
  return row?.[key] ?? JSON.stringify(row)
}
</script>

<style scoped>
.app-data-table {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--radius-lg, 0.75rem);
  border: 1px solid rgba(229, 231, 235, 0.6);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 10px 30px -15px rgba(17, 24, 39, 0.25);
  backdrop-filter: blur(10px);
}

.app-data-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.app-data-table.is-dense table {
  min-width: 0;
}

thead {
  background: rgba(243, 244, 246, 0.9);
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.75rem;
}

thead th {
  padding: 0.95rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(229, 231, 235, 0.75);
}

thead th.is-right,
tbody td.is-right {
  text-align: right;
}

thead th.is-center,
tbody td.is-center {
  text-align: center;
}

tbody td {
  padding: 1.1rem 1.25rem;
  font-size: 0.95rem;
  color: #111827;
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  background: rgba(255, 255, 255, 0.9);
}

tbody tr:hover td {
  background: rgba(249, 250, 251, 0.95);
}

.empty-state {
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
  padding: 2.5rem 1.25rem;
}

@media (max-width: 768px) {
  thead th,
  tbody td {
    padding: 0.75rem 1rem;
  }
}
</style>
