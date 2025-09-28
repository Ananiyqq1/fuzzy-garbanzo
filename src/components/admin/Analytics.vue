<template>
  <div>
    <div class="content-header">
      <div>
        <h1>Platform Analytics</h1>
        <p>Track performance, engagement, and platform usage</p>
      </div>
      <button class="admin-btn admin-btn-primary">
        <i class="fas fa-download"></i> Export Report
      </button>
    </div>

    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-header">
          <div class="analytics-title">Total Users</div>
          <div class="analytics-icon">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <div class="analytics-value">1,248</div>
        <div class="analytics-change change-positive">
          <i class="fas fa-arrow-up"></i> 12.5% from last month
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-header">
          <div class="analytics-title">Active Courses</div>
          <div class="analytics-icon">
            <i class="fas fa-book"></i>
          </div>
        </div>
        <div class="analytics-value">356</div>
        <div class="analytics-change change-positive">
          <i class="fas fa-arrow-up"></i> 8.3% from last month
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-header">
          <div class="analytics-title">Avg. Completion Rate</div>
          <div class="analytics-icon">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
        <div class="analytics-value">78%</div>
        <div class="analytics-change change-positive">
          <i class="fas fa-arrow-up"></i> 5.2% from last month
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-header">
          <div class="analytics-title">Weekly Engagement</div>
          <div class="analytics-icon">
            <i class="fas fa-clock"></i>
          </div>
        </div>
        <div class="analytics-value">4.2h</div>
        <div class="analytics-change change-negative">
          <i class="fas fa-arrow-down"></i> 1.3% from last week
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-header">
        <div class="chart-title">User Growth Over Time</div>
        <div class="chart-actions">
          <select class="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      <div class="chart-placeholder">
        User growth chart visualization would be displayed here
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-header">
        <div class="chart-title">Course Completion Rates</div>
        <div class="chart-actions">
          <select class="filter-select">
            <option>All Courses</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
          </select>
        </div>
      </div>
      <div class="chart-placeholder">
        Course completion rates chart visualization would be displayed here
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-options">
        <select class="filter-select">
          <option>All Metrics</option>
          <option>User Activity</option>
          <option>Course Engagement</option>
          <option>Resource Usage</option>
        </select>
        <select class="filter-select">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>Custom range</option>
        </select>
      </div>
      <div>
        <button class="admin-btn admin-btn-secondary">
          <i class="fas fa-sync"></i> Refresh Data
        </button>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Course</th>
          <th>Enrollments</th>
          <th>Completion Rate</th>
          <th>Avg. Time Spent</th>
          <th>Avg. Score</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data Structures and Algorithms</td>
          <td>142</td>
          <td>82%</td>
          <td>12.4h</td>
          <td>87%</td>
          <td><i class="fas fa-arrow-up change-positive"></i></td>
        </tr>
        <tr>
          <td>Database Systems</td>
          <td>118</td>
          <td>76%</td>
          <td>10.2h</td>
          <td>84%</td>
          <td><i class="fas fa-arrow-up change-positive"></i></td>
        </tr>
        <tr>
          <td>Calculus I</td>
          <td>205</td>
          <td>71%</td>
          <td>14.7h</td>
          <td>79%</td>
          <td><i class="fas fa-arrow-down change-negative"></i></td>
        </tr>
        <tr>
          <td>Business Management</td>
          <td>87</td>
          <td>68%</td>
          <td>8.9h</td>
          <td>81%</td>
          <td><i class="fas fa-arrow-up change-positive"></i></td>
        </tr>
        <tr>
          <td>Introduction to Engineering</td>
          <td>93</td>
          <td>63%</td>
          <td>9.5h</td>
          <td>76%</td>
          <td><i class="fas fa-minus" style="color: #6b7280;"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const analyticsData = ref([
  { title: 'Total Users', value: '1,248', change: '+12.5%', trend: 'positive' },
  { title: 'Active Courses', value: '356', change: '+8.3%', trend: 'positive' },
  { title: 'Avg. Completion Rate', value: '78%', change: '+5.2%', trend: 'positive' },
  { title: 'Weekly Engagement', value: '4.2h', change: '-1.3%', trend: 'negative' }
])

const coursesData = ref([
  { name: 'Data Structures and Algorithms', enrollments: 142, completion: '82%', time: '12.4h', score: '87%', trend: 'up' },
  { name: 'Database Systems', enrollments: 118, completion: '76%', time: '10.2h', score: '84%', trend: 'up' },
  { name: 'Calculus I', enrollments: 205, completion: '71%', time: '14.7h', score: '79%', trend: 'down' },
  { name: 'Business Management', enrollments: 87, completion: '68%', time: '8.9h', score: '81%', trend: 'up' },
  { name: 'Introduction to Engineering', enrollments: 93, completion: '63%', time: '9.5h', score: '76%', trend: 'neutral' }
])

const exportReport = () => {
  console.log('Exporting analytics report...')
  // Implement export functionality
}

const refreshData = () => {
  console.log('Refreshing analytics data...')
  // Implement refresh functionality
}
</script>

<style scoped>
.content-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.content-header p {
  color: #6b7280;
  font-size: 1.125rem;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.analytics-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.analytics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.analytics-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.analytics-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.1);
  color: #111827;
}

.analytics-value {
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.analytics-change {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.change-positive {
  color: #059669;
}

.change-negative {
  color: #dc2626;
}

.chart-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.chart-placeholder {
  height: 300px;
  background: rgba(17, 24, 39, 0.05);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.filter-options {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background: rgba(17, 24, 39, 0.05);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover {
  background: rgba(17, 24, 39, 0.03);
}

.admin-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.admin-btn-primary {
  background: #111827;
  color: white;
}

.admin-btn-primary:hover {
  background: #374151;
}

.admin-btn-secondary {
  background: transparent;
  color: #111827;
  border: 1px solid #e5e7eb;
}

.admin-btn-secondary:hover {
  background: rgba(17, 24, 39, 0.1);
}
</style>