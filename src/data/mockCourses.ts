export interface Course {
  courseCode: string
  name: string
  description: string
  creditHour: number
  category: 'programming' | 'databases' | 'systems' | 'web-mobile' | 'ict-research' | 'specialized'
}

export const mockCourses: Course[] = [
  {
    courseCode: 'CS221',
    name: 'Computer Programming I',
    creditHour: 5,
    description:
      'This course introduces the fundamental concepts of computer programming using a high-level programming language. Students will learn about variables, data types, control structures, functions, and basic input/output operations.',
    category: 'programming',
  },
  {
    courseCode: 'CS211',
    name: 'ICT Fundamentals',
    creditHour: 5,
    description:
      'This course introduces the fundamental concepts of Information and Communication Technology (ICT). Students will explore the basics of computer hardware, software, networking, and internet technologies.',
    category: 'ict-research',
  },
  {
    courseCode: 'CS222',
    name: 'Computer Programming II',
    creditHour: 5,
    description:
      'This course builds upon the concepts introduced in Computer Programming I, focusing on more advanced programming techniques and data structures. Students will explore topics such as arrays, linked lists, stacks, queues, recursion, and object-oriented programming principles.',
    category: 'programming',
  },
  {
    courseCode: 'CS262',
    name: 'Introduction Unix',
    creditHour: 3,
    description:
      'This course introduces the UNIX operating system, covering its history, architecture, and key features. Students will learn about the command-line interface, file system structure, process management, and basic shell scripting.',
    category: 'systems',
  },
  {
    courseCode: 'CS224',
    name: 'Object Oriented Programming',
    creditHour: 5,
    description:
      'This course introduces the concepts of Object-Oriented Programming (OOP) using a modern programming language. Students will learn about classes, objects, inheritance, polymorphism, encapsulation, and abstraction.',
    category: 'programming',
  },
  {
    courseCode: 'CS341',
    name: 'Database Management Systems',
    creditHour: 5,
    description:
      'This course introduces database management systems, including data modeling, SQL, normalization, transactions, and query optimization. Students will design and implement relational databases.',
    category: 'databases',
  },
  {
    courseCode: 'CS223',
    name: 'Windows Programming',
    creditHour: 5,
    description:
      'This course provides an introduction to Windows programming using a suitable programming language and framework. Students will learn about the Windows operating system architecture, event-driven programming, and GUI design.',
    category: 'programming',
  },
  {
    courseCode: 'CS342',
    name: 'Database Programming and Administration',
    creditHour: 5,
    description:
      'This course covers advanced database programming techniques, stored procedures, triggers, and database administration tasks including backup, recovery, security, and performance tuning.',
    category: 'databases',
  },
  {
    courseCode: 'CS321',
    name: 'Data Structure and Algorithms',
    creditHour: 5,
    description:
      'This course provides an in-depth study of data structures and algorithms, essential for efficient problem-solving in computer science. Students will learn about various data structures such as trees, graphs, hash tables, and heaps.',
    category: 'programming',
  },
  {
    courseCode: 'CS301',
    name: 'Logic Design',
    creditHour: 4,
    description:
      'This course covers digital logic design including Boolean algebra, combinational and sequential circuits, logic gates, flip-flops, and hardware description languages.',
    category: 'systems',
  },
  {
    courseCode: 'CS302',
    name: 'Computer Organization & Assembly Language',
    creditHour: 5,
    description:
      'This course introduces computer organization and assembly language programming. Students will learn about CPU architecture, instruction sets, memory hierarchy, and low-level programming.',
    category: 'systems',
  },
  {
    courseCode: 'CS322',
    name: 'Web Design & Development I',
    creditHour: 4,
    description:
      'This course introduces web development technologies including HTML, CSS, JavaScript, and responsive design. Students will build modern, user-friendly websites.',
    category: 'web-mobile',
  },
  {
    courseCode: 'CS447',
    name: 'Data Mining',
    creditHour: 4,
    description:
      'This course covers data mining techniques including classification, clustering, association rules, and pattern discovery. Students will learn to extract knowledge from large datasets.',
    category: 'databases',
  },
  {
    courseCode: 'CS486',
    name: 'Computer Systems Security',
    creditHour: 4,
    description:
      'This course introduces computer security principles including cryptography, network security, authentication, access control, and security threats and countermeasures.',
    category: 'systems',
  },
  {
    courseCode: 'CS446',
    name: 'Object Oriented Software Engineering',
    creditHour: 4,
    description:
      'This course covers software engineering principles with focus on object-oriented design, UML modeling, design patterns, software development lifecycle, and agile methodologies.',
    category: 'programming',
  },
  {
    courseCode: 'CS427',
    name: 'Compiler Design',
    creditHour: 4,
    description:
      'This course introduces compiler construction including lexical analysis, parsing, syntax-directed translation, code generation, and optimization techniques.',
    category: 'programming',
  },
  {
    courseCode: 'CS362',
    name: 'Unix System Administration',
    creditHour: 4,
    description:
      'This course covers UNIX/Linux system administration including user management, file systems, process management, system monitoring, security, and shell scripting.',
    category: 'systems',
  },
  {
    courseCode: 'CS488',
    name: 'Artificial Intelligence',
    creditHour: 4,
    description:
      'This course introduces artificial intelligence concepts including search algorithms, knowledge representation, machine learning, neural networks, and AI applications.',
    category: 'specialized',
  },
  {
    courseCode: 'CS497',
    name: 'Geographic Information System',
    creditHour: 3,
    description:
      'This course introduces Geographic Information Systems (GIS) including spatial data management, map visualization, spatial analysis, and GIS applications.',
    category: 'specialized',
  },
  {
    courseCode: 'CS489',
    name: 'Computer Graphics',
    creditHour: 4,
    description:
      'This course covers computer graphics principles including 2D/3D transformations, rendering, modeling, animation, and graphics programming using modern APIs.',
    category: 'specialized',
  },
  {
    courseCode: 'CS481',
    name: 'IT Research Methods',
    creditHour: 3,
    description:
      'This course introduces research methodologies in IT including literature review, experimental design, data analysis, statistical methods, and academic writing.',
    category: 'ict-research',
  },
  {
    courseCode: 'CS448',
    name: 'Software Testing',
    creditHour: 3,
    description:
      'This course covers software testing principles and techniques including unit testing, integration testing, system testing, test automation, and quality assurance.',
    category: 'programming',
  },
  {
    courseCode: 'CS468',
    name: 'Mobile Application',
    creditHour: 4,
    description:
      'This course covers mobile application development for iOS and Android platforms. Students will learn native and cross-platform development approaches and mobile UI/UX design.',
    category: 'web-mobile',
  },
  {
    courseCode: 'CS485',
    name: 'Information Retrieval',
    creditHour: 4,
    description:
      'This course introduces information retrieval concepts including indexing, search algorithms, relevance ranking, query processing, and web search engines.',
    category: 'databases',
  },
  {
    courseCode: 'CS465',
    name: 'Computer Network Administration',
    creditHour: 4,
    description:
      'This course covers computer network administration including network configuration, monitoring, troubleshooting, security, and network management protocols.',
    category: 'systems',
  },
  {
    courseCode: 'CS495',
    name: 'IT Project Management',
    creditHour: 4,
    description:
      'This course covers IT project management principles including project planning, scheduling, resource allocation, risk management, and agile project methodologies.',
    category: 'ict-research',
  },
  {
    courseCode: 'CS415',
    name: 'Focusing Areas in ICT',
    creditHour: 3,
    description:
      'This course explores specialized and emerging areas in Information and Communication Technology including cloud computing, IoT, blockchain, and current IT trends.',
    category: 'ict-research',
  },
]
