<template>
  <div class="analytics-page">
    <AppContentHeader
      title="Platform Analytics"
      subtitle="Track performance, engagement, and platform usage"
    >
      <template #actions>
        <AppButton icon="fas fa-download" @click="exportReport">Export Report</AppButton>
      </template>
    </AppContentHeader>

    <div class="summary-grid">
      <AppCard
        v-for="card in summaryCards"
        :key="card.title"
        variant="elevated"
      >
        <div class="summary-header">
          <div class="summary-title">{{ card.title }}</div>
          <div class="summary-icon">
            <i :class="card.icon"></i>
          </div>
        </div>
        <div class="summary-value">{{ card.value }}</div>
        <div class="summary-change" :class="card.changeClass">
          <i :class="card.changeIcon"></i>
          {{ card.changeText }}
        </div>
      </AppCard>
    </div>

    <div class="charts-grid">
      <AppFormSection
        v-for="chart in charts"
        :key="chart.title"
        :title="chart.title"
      >
        <template #actions>
          <AppSelect v-model="chart.selected">
            <option v-for="option in chart.options" :key="option" :value="option">{{ option }}</option>
          </AppSelect>
        </template>
        <div class="chart-placeholder">
          {{ chart.placeholder }}
        </div>
      </AppFormSection>
    </div>

    <AppFilterBar>
      <AppSelect v-model="filters.metric" label="Metric">
        <option v-for="option in metricOptions" :key="option" :value="option">{{ option }}</option>
      </AppSelect>
      <AppSelect v-model="filters.range" label="Range">
        <option v-for="option in rangeOptions" :key="option" :value="option">{{ option }}</option>
      </AppSelect>
      <template #actions>
        <AppButton
          variant="secondary"
          icon="fas fa-sync"
          @click="refreshData"
        >
          Refresh Data
        </AppButton>
      </template>
    </AppFilterBar>

    <AppDataTable
      :columns="courseColumns"
      :rows="courseStats"
      row-key="course"
    >
      <template #cell-trend="{ row }">
        <span class="trend-indicator" :class="row.trendClass">
          <i :class="row.trendIcon"></i>
        </span>
      </template>
    </AppDataTable>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppDataTable from '../common/AppDataTable.vue';
import AppFilterBar from '../common/AppFilterBar.vue';
import AppFormSection from '../common/AppFormSection.vue';
import AppSelect from '../common/AppSelect.vue';

const summaryCards = reactive([
  { title: 'Total Users', icon: 'fas fa-users', value: '1,248', changeText: '12.5% from last month', changeClass: 'change-positive', changeIcon: 'fas fa-arrow-up' },
  { title: 'Active Courses', icon: 'fas fa-book', value: '356', changeText: '8.3% from last month', changeClass: 'change-positive', changeIcon: 'fas fa-arrow-up' },
  { title: 'Avg. Completion Rate', icon: 'fas fa-chart-line', value: '78%', changeText: '5.2% from last month', changeClass: 'change-positive', changeIcon: 'fas fa-arrow-up' },
  { title: 'Weekly Engagement', icon: 'fas fa-clock', value: '4.2h', changeText: '1.3% from last week', changeClass: 'change-negative', changeIcon: 'fas fa-arrow-down' }
]);

const charts = reactive([
  { title: 'User Growth Over Time', options: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last year'], selected: 'Last 7 days', placeholder: 'User growth chart visualization would be displayed here' },
  { title: 'Course Completion Rates', options: ['All Courses', 'Computer Science', 'Engineering', 'Business'], selected: 'All Courses', placeholder: 'Course completion rates chart visualization would be displayed here' }
]);

const metricOptions = ['All Metrics', 'User Activity', 'Course Engagement', 'Resource Usage'];
const rangeOptions = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'Custom range'];

const filters = reactive({ metric: 'All Metrics', range: 'Last 30 days' });

const courseColumns = [
  { key: 'course', label: 'Course', minWidth: '220px' },
  { key: 'enrollments', label: 'Enrollments', align: 'right', width: '140px' },
  { key: 'completion', label: 'Completion Rate', width: '160px', align: 'center' },
  { key: 'timeSpent', label: 'Avg. Time Spent', width: '160px', align: 'center' },
  { key: 'avgScore', label: 'Avg. Score', width: '140px', align: 'center' },
  { key: 'trend', label: 'Trend', width: '120px', align: 'center' }
];

const courseStats = reactive([
  { course: 'Data Structures and Algorithms', enrollments: 142, completion: '82%', timeSpent: '12.4h', avgScore: '87%', trendIcon: 'fas fa-arrow-up', trendClass: 'trend-positive' },
  { course: 'Database Systems', enrollments: 118, completion: '76%', timeSpent: '10.2h', avgScore: '84%', trendIcon: 'fas fa-arrow-up', trendClass: 'trend-positive' },
  { course: 'Calculus I', enrollments: 205, completion: '71%', timeSpent: '14.7h', avgScore: '79%', trendIcon: 'fas fa-arrow-down', trendClass: 'trend-negative' },
  { course: 'Business Management', enrollments: 87, completion: '68%', timeSpent: '8.9h', avgScore: '81%', trendIcon: 'fas fa-arrow-up', trendClass: 'trend-positive' },
  { course: 'Introduction to Engineering', enrollments: 93, completion: '63%', timeSpent: '9.5h', avgScore: '76%', trendIcon: 'fas fa-minus', trendClass: 'trend-neutral' }
]);

function exportReport() {
  console.log('Export analytics report');
}

function refreshData() {
  console.log('Refresh analytics data', { ...filters });
}
</script>

<style scoped>
.analytics-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.summary-title {
  font-weight: 600;
  color: #111827;
}

.summary-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #111827, #374151);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.summary-change {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}

.change-positive {
  color: #047857;
}

.change-negative {
  color: #b91c1c;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(243, 244, 246, 0.7);
  border-radius: 0.75rem;
  color: #6b7280;
  text-align: center;
  padding: 1rem;
}

.trend-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(17, 24, 39, 0.05);
}

.trend-positive {
  color: #047857;
}

.trend-negative {
  color: #b91c1c;
}

.trend-neutral {
  color: #6b7280;
}

@media (max-width: 1024px) {
  .analytics-page {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .summary-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .charts-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .summary-value {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .analytics-page {
    padding: 1rem;
    gap: 1rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .summary-header {
    margin-bottom: 0.5rem;
  }

  .summary-title {
    font-size: 0.95rem;
  }

  .summary-icon {
    width: 36px;
    height: 36px;
  }

  .summary-icon i {
    font-size: 1rem;
  }

  .summary-value {
    font-size: 1.5rem;
  }

  .summary-change {
    font-size: 0.85rem;
  }

  .chart-placeholder {
    height: 160px;
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .trend-indicator {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .analytics-page {
    padding: 0.5rem;
  }

  .summary-value {
    font-size: 1.25rem;
  }

  .summary-change {
    font-size: 0.8rem;
  }

  .chart-placeholder {
    height: 120px;
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>