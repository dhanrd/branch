// Dummy group data with posts
const dummyGroups = [
  {
    id: 1,
    name: 'MACHINE LEARNING',
    members: 342,
    categories: ['education', 'recommended'],
    posts: [
      {
        id: 101,
        title: "Getting Started with TensorFlow",
        author: "ML_Enthusiast",
        content: "Just started learning TensorFlow. Any tips for beginners? The documentation seems overwhelming at first glance.",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        likes: 24,
        comments: 8
      },
      {
        id: 102,
        title: "Attention Mechanisms Explained",
        author: "NLP_Researcher",
        content: "Here's a simple explanation of how attention works in transformer models with some visual examples.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 56,
        comments: 12
      }
    ]
  },
  {
    id: 2,
    name: 'COMPUTER SCIENCE UNDERGRADUATE SOCIETY',
    members: 423,
    categories: ['clubs', 'popular'],
    newMembers: '6 new members in the past day!',
    posts: [
      {
        id: 201,
        title: "Welcome New Members!",
        author: "ClubPresident",
        content: "Welcome to all our new members! Our first meetup is this Friday at 4pm in the CS lounge.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 42,
        comments: 15
      },
      {
        id: 202,
        title: "Study Session for Midterms",
        author: "AcademicChair",
        content: "Organizing a group study session for upcoming midterms. Who's interested?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 38,
        comments: 22
      }
    ]
  },
  {
    id: 3,
    name: 'WEB DEVELOPMENT',
    members: 102,
    categories: ['education'],
    posts: [
      {
        id: 301,
        title: "React vs Vue in 2023",
        author: "FrontendDev",
        content: "Which framework are you using for new projects this year? I'm torn between React and Vue.",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        likes: 31,
        comments: 14
      },
      {
        id: 302,
        title: "CSS Grid Tips",
        author: "CSS_Wizard",
        content: "Sharing my top 5 CSS Grid tricks that saved me hours of layout headaches.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        likes: 47,
        comments: 9
      }
    ]
  },
  {
    id: 6,
    name: 'STUDY TIPS',
    members: 126,
    categories: ['education', 'recommended'],
    posts: [
      {
        id: 601,
        title: "Pomodoro Technique Works!",
        author: "StudySmart",
        content: "After trying Pomodoro for a month, my productivity has doubled. Highly recommend!",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        likes: 29,
        comments: 7
      },
      {
        id: 602,
        title: "Best Note-Taking Apps",
        author: "NoteTaker",
        content: "Comparing Notion, OneNote, and Obsidian for CS students. What's your favorite?",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 35,
        comments: 18
      }
    ]
  },
  {
    id: 15,
    name: 'LEARNING C++',
    members: 189,
    categories: ['education', 'recommended'],
    posts: [
      {
        id: 1501,
        title: "C++20 Features Overview",
        author: "CPP_Expert",
        content: "Just explored the new C++20 features. Modules and concepts are game changers!",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        likes: 27,
        comments: 11
      },
      {
        id: 1502,
        title: "Memory Management Tips",
        author: "SystemProgrammer",
        content: "Sharing some hard-earned lessons about smart pointers and memory leaks.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 33,
        comments: 8
      }
    ]
  },
  {
    id: 4,
    name: 'WOMEN IN COMPUTER SCIENCE',
    members: 89,
    categories: ['clubs'],
    posts: [
      {
        id: 401,
        title: "Guest Speaker Next Week",
        author: "EventCoordinator",
        content: "We have a senior engineer from Google coming to speak about her career journey.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        likes: 18,
        comments: 5
      },
      {
        id: 402,
        title: "Mentorship Program",
        author: "MentorshipChair",
        content: "Applications for our winter mentorship program are now open!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 22,
        comments: 12
      }
    ]
  },
  {
    id: 14,
    name: 'CALGARY ESPORTS UNITED',
    members: 456,
    categories: ['clubs', 'popular'],
    mostActive: 'Most active',
    posts: [
      {
        id: 1401,
        title: "Tournament Results",
        author: "EventManager",
        content: "Congratulations to team Phoenix for winning our Valorant tournament!",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        likes: 67,
        comments: 24
      },
      {
        id: 1402,
        title: "New Game Nights",
        author: "SocialChair",
        content: "Starting weekly Rocket League nights every Thursday. All skill levels welcome!",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 53,
        comments: 19
      }
    ]
  },
  {
    id: 5,
    name: 'COMPETITIVE PROGRAMMING CLUB',
    members: 156,
    categories: ['clubs'],
    posts: [
      {
        id: 501,
        title: "Upcoming Contest",
        author: "ContestOrganizer",
        content: "Monthly programming contest this Saturday. Prizes for top 3!",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
        likes: 31,
        comments: 9
      },
      {
        id: 502,
        title: "Dynamic Programming Workshop",
        author: "AlgoExpert",
        content: "Recording of last week's DP workshop is now available in our resources.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        likes: 28,
        comments: 6
      }
    ]
  },
  {
    id: 7,
    name: 'MUSIC',
    members: 213,
    categories: ['hobbies'],
    posts: [
      {
        id: 701,
        title: "Band Looking for Drummer",
        author: "Guitarist123",
        content: "Our indie rock band needs a drummer for weekly practices. DM if interested!",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        likes: 15,
        comments: 8
      },
      {
        id: 702,
        title: "Best Headphones for Mixing",
        author: "AudioEngineer",
        content: "Looking for recommendations under $200. Currently considering Audio-Technica ATH-M50x.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 22,
        comments: 14
      }
    ]
  },
  {
    id: 8,
    name: 'HOCKEY',
    members: 187,
    categories: ['hobbies'],
    posts: [
      {
        id: 801,
        title: "Pickup Game This Weekend",
        author: "HockeyFanatic",
        content: "Organizing a casual game at the Olympic Oval on Saturday. All skill levels welcome!",
        timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
        likes: 27,
        comments: 11
      },
      {
        id: 802,
        title: "Flames Game Watch Party",
        author: "PuckHead",
        content: "Anyone want to meet up at the Den for Saturday's game against Edmonton?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 19,
        comments: 7
      }
    ]
  },
  {
    id: 9,
    name: 'BAKING',
    members: 109,
    categories: ['hobbies'],
    posts: [
      {
        id: 901,
        title: "Sourdough Starter Help",
        author: "BreadLover",
        content: "My starter isn't bubbling after 5 days. What am I doing wrong?",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        likes: 14,
        comments: 9
      },
      {
        id: 902,
        title: "Best Chocolate Chip Cookie Recipe",
        author: "CookieMonster",
        content: "After 20 attempts, I've perfected my recipe. Sharing my secrets in the comments!",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        likes: 37,
        comments: 23
      }
    ]
  },
  {
    id: 10,
    name: 'RESUME HELP',
    members: 278,
    categories: ['education'],
    posts: [
      {
        id: 1001,
        title: "ATS-Friendly Resume Tips",
        author: "CareerAdvisor",
        content: "How to format your resume to pass through Applicant Tracking Systems.",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        likes: 42,
        comments: 7
      },
      {
        id: 1002,
        title: "Resume Review Volunteers Needed",
        author: "CommunityMod",
        content: "We need experienced members to help review resumes for newcomers.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 18,
        comments: 12
      }
    ]
  },
  {
    id: 11,
    name: '355 STUDY GROUP',
    members: 76,
    categories: ['education'],
    posts: [
      {
        id: 1101,
        title: "Assignment 3 Solutions",
        author: "TopOfClass",
        content: "Sharing my solutions for the latest assignment. Let me know if you spot any errors!",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
        likes: 23,
        comments: 15
      },
      {
        id: 1102,
        title: "Midterm Study Guide",
        author: "StudyGroupLeader",
        content: "Compiled a list of key topics to focus on for next week's exam.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 31,
        comments: 8
      }
    ]
  }
];

export default dummyGroups;