<template>
  <div>
    <div class="content-header">
      <h1>Top Contributors</h1>
      <p>Recognizing students who actively contribute to the learning community</p>
    </div>

    <div class="leaderboard-container">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Contributions</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contributor, index) in contributors" :key="contributor.id">
            <td>
              <div class="rank-badge" :class="{ 'rank-gold': index === 0, 'rank-silver': index === 1, 'rank-bronze': index === 2 }">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="contributor-info">
                <div class="contributor-avatar">{{ contributor.initials }}</div>
                <div>
                  <div class="contributor-name">{{ contributor.name }}</div>
                  <div class="contributor-role">{{ contributor.role }}</div>
                </div>
              </div>
            </td>
            <td>{{ contributor.contributions }}</td>
            <td>{{ contributor.points }}</td>
            <td>
              <button class="btn btn-secondary" @click="viewProfile(contributor.id)">View Profile</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="contributors-stats">
      <div class="stat-card">
        <h3>Total Contributors</h3>
        <p class="stat-number">{{ totalContributors }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Points Awarded</h3>
        <p class="stat-number">{{ totalPoints }}</p>
      </div>
      <div class="stat-card">
        <h3>Active This Month</h3>
        <p class="stat-number">{{ activeThisMonth }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const contributors = ref([
  {
    id: 1,
    name: 'Abebe Kebede',
    initials: 'AK',
    role: 'Student Leader',
    contributions: '45 sessions hosted, 120 resources uploaded, 89 questions answered',
    points: 1245
  },
  {
    id: 2,
    name: 'Selamawit Tadesse',
    initials: 'ST',
    role: 'Top Contributor',
    contributions: '38 sessions hosted, 95 resources uploaded, 112 questions answered',
    points: 1187
  },
  {
    id: 3,
    name: 'Michael Berhanu',
    initials: 'MB',
    role: 'Active Member',
    contributions: '29 sessions hosted, 78 resources uploaded, 67 questions answered',
    points: 987
  },
  {
    id: 4,
    name: 'Hanna Girma',
    initials: 'HG',
    role: 'Active Member',
    contributions: '25 sessions hosted, 65 resources uploaded, 98 questions answered',
    points: 856
  },
  {
    id: 5,
    name: 'Yordanos Lemma',
    initials: 'YL',
    role: 'Active Member',
    contributions: '22 sessions hosted, 52 resources uploaded, 45 questions answered',
    points: 743
  },
  {
    id: 6,
    name: 'Tomas Mekonnen',
    initials: 'TM',
    role: 'Active Member',
    contributions: '18 sessions hosted, 41 resources uploaded, 56 questions answered',
    points: 612
  },
  {
    id: 7,
    name: 'Liya Jemal',
    initials: 'LJ',
    role: 'Active Member',
    contributions: '15 sessions hosted, 33 resources uploaded, 42 questions answered',
    points: 489
  },
  {
    id: 8,
    name: 'Robel Mekonnen',
    initials: 'RM',
    role: 'Active Member',
    contributions: '12 sessions hosted, 28 resources uploaded, 35 questions answered',
    points: 356
  },
  {
    id: 9,
    name: 'Tigist Paulos',
    initials: 'TP',
    role: 'Active Member',
    contributions: '10 sessions hosted, 22 resources uploaded, 29 questions answered',
    points: 298
  },
  {
    id: 10,
    name: 'Jemal Desta',
    initials: 'JD',
    role: 'Active Member',
    contributions: '8 sessions hosted, 18 resources uploaded, 24 questions answered',
    points: 245
  }
])

const totalContributors = computed(() => contributors.value.length)
const totalPoints = computed(() => contributors.value.reduce((sum, c) => sum + c.points, 0))
const activeThisMonth = computed(() => contributors.value.filter(c => c.points > 100).length)

const viewProfile = (contributorId) => {
  console.log('Viewing profile for contributor:', contributorId)
  alert(`Viewing profile for contributor ${contributorId}...`)
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

.leaderboard-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.leaderboard-table th {
  background: rgba(17, 24, 39, 0.05);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.leaderboard-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.leaderboard-table tr:last-child td {
  border-bottom: none;
}

.leaderboard-table tr:hover {
  background: rgba(17, 24, 39, 0.03);
}

.rank-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 0.875rem;
}

.rank-gold {
  background: #f59e0b;
}

.rank-silver {
  background: #9ca3af;
}

.rank-bronze {
  background: #d97706;
}

.contributor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contributor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.contributor-name {
  font-weight: 600;
  color: #111827;
}

.contributor-role {
  font-size: 0.875rem;
  color: #6b7280;
}

.contributors-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  text-align: center;
}

.stat-card h3 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
}

.btn {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: transparent;
  color: #111827;
}

.btn-secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

@media (max-width: 768px) {
  .leaderboard-table {
    font-size: 0.875rem;
  }

  .contributor-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>