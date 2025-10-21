export interface Topic {
  topicId: string
  name: string
  description: string
  courseCode: string
}

export const mockTopics: Topic[] = [
  {
    topicId: '0b8d5d93-7480-46ac-a052-37561e37ebc1',
    name: 'Variables and Data Types',
    description:
      'Understanding fundamental data types including integers, floats, strings, and booleans. Learn how to declare, initialize, and manipulate variables in programming.',
    courseCode: 'CS221',
  },
  {
    topicId: 'ba8dbc89-e326-4534-85f6-43d7bda0393c',
    name: 'Control Structures',
    description:
      'Introduction to conditional statements (if-else), loops (for, while), and switch statements for controlling program flow.',
    courseCode: 'CS221',
  },
  {
    topicId: 'df13eb81-5893-4d16-adcc-14e24a97326e',
    name: 'Functions and Modular Programming',
    description:
      'Learn how to create reusable code blocks using functions. Understand parameters, return values, and scope.',
    courseCode: 'CS221',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db019',
    name: 'Pillars of OOP',
    description:
      'Deep dive into the four pillars of Object-Oriented Programming: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
    courseCode: 'CS224',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db020',
    name: 'Classes and Objects',
    description:
      'Understanding the relationship between classes and objects. Learn how to design and implement classes with properties and methods.',
    courseCode: 'CS224',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db013',
    name: 'Linked Lists',
    description:
      'Implementation and analysis of singly linked lists, doubly linked lists, and circular linked lists. Understanding pointers and dynamic memory.',
    courseCode: 'CS321',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db014',
    name: 'Binary Trees',
    description:
      'Introduction to tree data structures, binary trees, binary search trees (BST), and tree traversal algorithms.',
    courseCode: 'CS321',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db015',
    name: 'Sorting Algorithms',
    description:
      'Study of various sorting algorithms including bubble sort, insertion sort, merge sort, quick sort, and their time complexities.',
    courseCode: 'CS321',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db016',
    name: 'Unix Shell Scripting',
    description:
      'Learn to automate tasks using shell scripts, including variables, loops, conditionals, and file operations.',
    courseCode: 'CS362',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db017',
    name: 'User and Permission Management',
    description:
      'Understanding UNIX/Linux user accounts, groups, file permissions, and access control mechanisms.',
    courseCode: 'CS362',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db018',
    name: 'SQL Fundamentals',
    description:
      'Introduction to SQL including SELECT, INSERT, UPDATE, DELETE statements, and basic query writing.',
    courseCode: 'CS341',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db019',
    name: 'Database Normalization',
    description:
      'Understanding normal forms (1NF, 2NF, 3NF, BCNF) and the process of normalizing database schemas.',
    courseCode: 'CS341',
  },
  {
    topicId: '151c1bd5-b866-4cba-8ea2-5e8b6eb62a2d',
    name: 'HTML and CSS Basics',
    description:
      'Introduction to web markup with HTML5 and styling with CSS3. Creating responsive layouts and modern web designs.',
    courseCode: 'CS322',
  },
  {
    topicId: '151c1bd5-b866-4cba-8ea2-5e8b6eb62a2e',
    name: 'JavaScript Fundamentals',
    description:
      'Learn JavaScript programming including DOM manipulation, events, AJAX, and modern ES6+ features.',
    courseCode: 'CS322',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db042',
    name: 'Supervised Learning',
    description:
      'Introduction to supervised learning algorithms including linear regression, logistic regression, and decision trees.',
    courseCode: 'CS488',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db043',
    name: 'Neural Networks',
    description:
      'Understanding artificial neural networks, backpropagation, activation functions, and deep learning architectures.',
    courseCode: 'CS488',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db149',
    name: 'Text Indexing',
    description:
      'Techniques for indexing text documents, inverted indexes, and efficient text search algorithms.',
    courseCode: 'CS485',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db150',
    name: 'Relevance Ranking',
    description:
      'Understanding ranking algorithms like TF-IDF, BM25, and PageRank for information retrieval systems.',
    courseCode: 'CS485',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db151',
    name: 'Project Planning and Scheduling',
    description:
      'Understanding project planning techniques, Gantt charts, critical path method, and resource allocation.',
    courseCode: 'CS495',
  },
  {
    topicId: '5f91f492-ecdf-4e6b-bdc5-119b379db152',
    name: 'Agile Project Management',
    description:
      'Study of Agile methodologies in project management including Scrum, Kanban, and iterative development.',
    courseCode: 'CS495',
  },
]
