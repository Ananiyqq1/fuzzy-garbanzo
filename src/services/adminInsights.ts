export interface WeeklyLogsResponse {
  logs: string;
}

export interface SummaryResponse {
  summaryMarkdown: string;
}

export async function fetchWeeklyLogs() {
  // TODO: Replace with real API call once backend endpoint is available.
  // const { data } = await api.get<WeeklyLogsResponse>('/api/admin/logs/weekly');
  // return data;

  return new Promise<WeeklyLogsResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        logs: [
          '[Room: Quantum Systems Lab] Discussed entanglement experiments and calibration issues.',
          '[Room: Machine Learning Guild] Debated transformer fine-tuning vs. retrieval-augmented generation.',
          '[Room: Systems Control Room] Highlighted backlog on capstone proposals and faculty feedback cadence.'
        ].join('\n\n')
      });
    }, 500);
  });
}

export async function generateWeeklySummary(payload?: { logs?: string }) {
  // TODO: Replace with real API call once backend endpoint is available.
  // const { data } = await api.post<SummaryResponse>('/api/admin/insights/summary', payload);
  // return data;

  const logsExcerpt = payload?.logs?.slice(0, 160) || 'No logs provided.';

  return new Promise<SummaryResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        summaryMarkdown: `## Weekly Highlights\n\n- **Top Rooms:** Quantum Systems Lab, Machine Learning Guild, Systems Control Room.\n- **Themes:** Calibration workflows, LLM evaluation, capstone mentoring cadence.\n- **Faculty Actions:** Review backlog items, provide lab equipment checklist, schedule ML reproducibility clinic.\n\n> _Logs excerpt:_ ${logsExcerpt}...`
      });
    }, 800);
  });
}
