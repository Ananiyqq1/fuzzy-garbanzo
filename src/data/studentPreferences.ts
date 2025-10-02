export const studentPreferenceCourses = [
  {
    title: 'Programming & Software Development',
    description:
      'Programming I, Programming II, Data Structures & Algorithms, Object-Oriented Programming, Windows Programming, Object Oriented Software Engineering, Compiler Design and Software Testing',
    icon: 'fas fa-code',
    category: 'programming',
  },
  {
    title: 'Databases & Data Management',
    description:
      'Database Management Systems, Database Programming & Admin, Data Mining, Information Retrieval',
    icon: 'fas fa-database',
    category: 'databases',
  },
  {
    title: 'Systems & Infrastructure',
    description:
      'Introduction to Unix, Computer Organization & Assembly Language Programming, Operating Systems, Computer Networks, Network Administration, Computer Systems Security, UNIX System Administration',
    icon: 'fas fa-network-wired',
    category: 'systems',
  },
  {
    title: 'Specialized & Emerging Areas',
    description:
      'Introduction to Emerging Techologies, Artificial Intelligence, Geographic Information Systems, Computer Graphics',
    icon: 'fas fa-brain',
    category: 'specialized',
  },
  {
    title: 'Web & Mobile Development',
    description: 'Web Design & Development I, Web Design & Development II, Mobile Application',
    icon: 'fas fa-globe',
    category: 'web-mobile',
  },
  {
    title: 'ICT Management & Research',
    description:
      'ICT Fundamentals, Systems Analysis & Design, Focusing Areas on ICT, IT Research Methods, IT Project Management',
    icon: 'fas fa-chart-line',
    category: 'ict-research',
  },
];

export const studentPreferenceFilters = [
  { value: 'programming', label: 'Programming', icon: 'fas fa-code' },
  { value: 'databases', label: 'Databases', icon: 'fas fa-database' },
  { value: 'systems', label: 'Systems', icon: 'fas fa-network-wired' },
  { value: 'web-mobile', label: 'Web & Mobile', icon: 'fas fa-globe' },
  { value: 'ict-research', label: 'ICT & Research', icon: 'fas fa-chart-line' },
  { value: 'specialized', label: 'Specialized', icon: 'fas fa-brain' },
];

export const studentPreferenceSelectionLimits = {
  min: 2,
  max: 6,
};
