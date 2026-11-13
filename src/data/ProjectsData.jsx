import umoviezCover1 from "../assets/Image/project/umoviez/Cover 1 - Desktop + Mobile@1x.png";
import umoviezCover2 from "../assets/Image/project/umoviez/Cover 2 - Mobile@1x.png";
import umoviezCover3 from "../assets/Image/project/umoviez/Cover 3 - Detail@1x.png";
import umoviezHome from "../assets/Image/project/umoviez/Gallery - Home (portrait)@1x.png";
import umoviezSearch from "../assets/Image/project/umoviez/Gallery - Search (portrait)@1x.png";
import umoviezDetail from "../assets/Image/project/umoviez/Gallery - Detail (portrait)@1x.png";

import ciakhamikCover1 from "../assets/Image/project/ciakhamik/cover-1-logo.png";
import ciakhamikCover2 from "../assets/Image/project/ciakhamik/cover-2-dashboard.png";
import ciakhamikCover3 from "../assets/Image/project/ciakhamik/cover-3-goal-and-workout.png";
import ciakhamikHome from "../assets/Image/project/ciakhamik/gallery-1-home.png";
import ciakhamikWaterCalendar from "../assets/Image/project/ciakhamik/gallery-2-water-and-calendar.png";
import ciakhamikExercise from "../assets/Image/project/ciakhamik/gallery-3-exercise.png";
import ciakhamikFood from "../assets/Image/project/ciakhamik/gallery-4-food.png";
import ciakhamikGoal from "../assets/Image/project/ciakhamik/gallery-5-goal.png";
import ciakhamikCalendar from "../assets/Image/project/ciakhamik/gallery-6-calendar.png";

import abseninCover1 from "../assets/Image/project/absenin/cover-1-tap-and-photo.png";
import abseninCover2 from "../assets/Image/project/absenin/cover-2-tap-snap-done.png";
import abseninCover3 from "../assets/Image/project/absenin/cover-3-two-check-ins-a-day.png";
import abseninHome from "../assets/Image/project/absenin/gallery-1-home.png";
import abseninHistory from "../assets/Image/project/absenin/gallery-2-history.png";
import abseninProfile from "../assets/Image/project/absenin/gallery-3-profile.png";

import covenantCover1 from "../assets/Image/project/covenant/cover-1-logo-and-site.png";
import covenantCover2 from "../assets/Image/project/covenant/cover-2-figma-to-web.png";
import covenantCover3 from "../assets/Image/project/covenant/cover-3-masonry-gallery.png";
import covenantHome from "../assets/Image/project/covenant/gallery-1-homepage.png";
import covenantGallery from "../assets/Image/project/covenant/gallery-2-masonry-gallery.png";
import covenantVolunteer from "../assets/Image/project/covenant/gallery-3-volunteer.png";
import covenantAbout from "../assets/Image/project/covenant/gallery-4-about.png";
import covenantTeachers from "../assets/Image/project/covenant/gallery-5-teachers.png";

const SECTION_PLACEHOLDERS = {
  overview: "[What the product is, who uses it, and which problem it solves.]",
  background: "[Why this project started and what the team needed from it.]",
  challenge: "[The hardest problem you ran into.]",
  solution: "[How you solved it, and what you learned.]",
  outcome: "[What changed because of your work.]",
};

const DEFAULT_LINKS = [
  { label: "Figma", sub: "[Design file]", href: null },
  { label: "GitHub", sub: "[Repository]", href: null },
  { label: "Live demo", sub: "[Link unavailable]", href: null },
];

const MOBILE_STACK = [
  { name: "Kotlin", icon: "Kotlin" },
  { name: "Java", icon: "Java" },
  { name: "Golang", icon: "Golang" },
];

const EMPTY_PROJECT = {
  title: "[Project name]",
  summary: "[One or two sentences: what it does and who it is for.]",
  meta: { role: "[Your role]", type: "[Type]", year: "[YYYY]", status: "[Status]" },
  stack: [{ name: "[Tech]" }, { name: "[Tech]" }, { name: "[Tech]" }],
  images: [],
};

const pad = (n) => String(n).padStart(2, "0");

const PROJECTS = [
  {
    slug: "Rekapan",
    title: "Rekapan",
    subtitle: "Mobile app.",
    summary: "A fitness and wellness Android app for tracking food, water, workouts, and daily calorie goals.",
    lead: "CiakHamik helps people reach a personal fitness goal by turning their body data into a daily calorie target, then tracking meals, water, and workouts against it in one place.",
    tags: ["Mobile", "Family Business", "2026"],
    origin: "family",
    meta: {
      role: "Full Stack Android",
      clientLabel: "Company",
      client: "PT. Mitra Integrasi Digital",
      type: "Mobile",
      year: "2026",
      duration: "[Oct 2026 – Mon YYYY]",
      status: "On Progress",
    },
    stack: [
      { name: "Kotlin", icon: "Kotlin" },
      { name: "Golang", icon: "Golang" },
      { name: "N8N", icon: "N8N" },
    ],
    links: DEFAULT_LINKS,
    work: [
      { title: "Screen redesign", desc: "Transaction History, Sales Recap, Transaction, Login, and Cart." },
      { title: "Pending QRIS payment", desc: "Handling QRIS payments that are still pending." },
      { title: "Menu management", desc: "Create, read, update and delete menu items, with topping and size options on the create transaction page." },
      { title: "Bluetooth printer", desc: "Refactored pairing, connection, CPL configuration and test print." },
      { title: "Online orders", desc: "An order page and mobile notifications for orders coming from the self-order web app (Socket.IO, Node.js, gRPC, Golang)." },
    ],
    sections: SECTION_PLACEHOLDERS,
    images: [],
    gallery: [],
  },

  {
    slug: "CiakHamik",
    title: "CiakHamik",
    subtitle: "Mobile app.",
    summary: "A fitness and wellness Android app for tracking food, water, workouts, and daily calorie goals.",
    lead: "CiakHamik turns a user's body data and fitness goal into a daily calorie target, then tracks meals, water, and workouts against it.",
    tags: ["Mobile", "University project", "2024"],
    origin: "campus",
    meta: {
      role: "Android Developer & UI/UX Designer",
      clientLabel: "Institution",
      client: "Universitas Multimedia Nusantara",
      type: "Mobile",
      year: "2024",
      duration: "Sep 2024 – Dec 2024",
      status: "Completed",
    },
    stack: [
      { name: "Kotlin", icon: "Kotlin" },
      { name: "Android", icon: "Android" },
      { name: "Firebase", icon: "Firebase" },
      { name: "Figma", icon: "Figma" },
    ],
    links: [
      { label: "APK", sub: "CiakHamik", href: "https://drive.google.com/drive/folders/1qunLYKOKOtZCHA-dqYt8Q5R60tImYiOw" },
      { label: "Github", sub: "Repository", href: "https://github.com/DafaTaufik/umoviez-web" },
      { label: "Figma", sub: "CiakHamik Prototype", href: "https://www.figma.com/design/IqVG5UjrRsActqBLej8pZy/CiakHamik-Apps-Mobile-UAS-Kelompok-8?node-id=0-1&t=U3v9VZspfAdiMQOo-1" },
    ],
    work: [
      { title: "UI/UX design", desc: "Designed the onboarding, home, calendar, water section, login, and signup in Figma and linked them into a clickable prototype." },
      { title: "Onboarding and account", desc: "Built the onboarding flow, login, and signup screens." },
      { title: "Home dashboard", desc: "A daily overview of calories eaten, burned and left, water progress, current weight, and a weekly calorie chart." },
      { title: "Water tracking", desc: "A hydration page with a daily goal, water logged in milliliters, and a RecyclerView history of past entries." },
      { title: "Calendar", desc: "A calendar page for looking back at what was logged on other days." },
      { title: "Firebase database", desc: "Designed the data structure with a teammate and implemented CRUD for user, exercise, water, and activity data." },
    ],
    sections: {
      overview: "CiakHamik is an Android fitness app that sets a daily calorie target from the user's body data and goal, then tracks meals, workouts, and water against it.",
      background:
        "Built as the final project for IF 570 Mobile Application Programming at Universitas Multimedia Nusantara, in a team of students. I designed and built the onboarding, home, calendar, water, login, signup, and designed the Firebase database with a teammate. Another teammate built the food section.",
      challenge: "[Bagian tersulit untuk kamu — lihat pertanyaan di bawah.]",
      solution: "[Bagaimana kamu menyelesaikannya, dan apa yang dipelajari.]",
    },
    images: [ciakhamikCover1, ciakhamikCover2, ciakhamikCover3],
    gallery: [
      // Urutan mengikuti kolom masonry (COLUMN_OF di ProjectDetail): kolom 1 = 01,03,07; kolom 2 = 02,04,08; kolom 3 = 05,06
      { src: ciakhamikHome, alt: "CiakHamik home screen", caption: "Today at a glance", ratio: "9/16" },
      { src: ciakhamikCover2, alt: "CiakHamik dashboard, hydration and calendar screens", caption: "Calories, water and workouts in one app", ratio: "16/10" },
      { src: ciakhamikCover3, alt: "CiakHamik goal and exercise screens", caption: "Set a goal, log the day", ratio: "16/10" },
      { src: ciakhamikWaterCalendar, alt: "CiakHamik hydration monitor and calendar screens", caption: "Every glass, every day", ratio: "9/16" },
      { src: ciakhamikExercise, alt: "CiakHamik exercise list and add exercise screens", caption: "Log every workout", ratio: "9/16" },
      { src: ciakhamikFood, alt: "CiakHamik food diary and breakfast list screens", caption: "Plan every meal", ratio: "9/16" },
      { src: ciakhamikGoal, alt: "CiakHamik goal selection and home screens", caption: "Start with your goal", ratio: "4/5" },
      { src: ciakhamikCalendar, alt: "CiakHamik calendar screen", caption: "Look back at any day", ratio: "1/1" },
    ],
  },

  {
    slug: "Absenin",
    title: "Absenin",
    subtitle: "Photo-based attendance app.",
    summary: "An Android app where you check in and out with a photo, and see every attendance in a history.",
    lead: "Absenin is a photo-based attendance app for Android, built solo as the midterm lab project for IF 570 Mobile Application Programming.",
    tags: ["Mobile", "University project", "2024"],
    origin: "campus",
    meta: {
      role: "Android Developer & UI/UX Designer",
      clientLabel: "Institution",
      client: "Universitas Multimedia Nusantara",
      type: "Mobile",
      year: "2024",
      duration: "Aug 2024 – Oct 2024",
      status: "Completed",
    },
    stack: [
      { name: "Kotlin", icon: "Kotlin" },
      { name: "Android", icon: "Android" },
      { name: "Firebase", icon: "Firebase" },
    ],
    links: [
      { label: "APK", sub: "Absenin", href: "https://drive.google.com/drive/folders/1AK6_mvtc5pDNi8nLC7mnQTrCfEsxXYlY" },
      { label: "Github", sub: "Repository", href: "https://github.com/DafaTaufik/umoviez-web" },
    ],
    work: [
      { title: "Account", desc: "Built the login and create account screens with Firebase Authentication." },
      { title: "Photo attendance", desc: "Users take a photo with the camera, preview it, retake it if needed, and submit it. The photo is uploaded to Firebase Storage." },
      { title: "Two check-ins a day", desc: "Each user can check in once and check out once a day. After checking in, the app moves straight to the check-out step, and once both are done the button is disabled." },
      { title: "Attendance history", desc: "A history list showing each record's photo, day and time, and whether it was a check-in or check-out." },
      { title: "Profile", desc: "Users can update their name and student ID (NIM)." },
      { title: "UI design", desc: "Designed all screens myself, directly in the app without a Figma prototype." },
    ],
    sections: {
      overview: "Absenin is an Android app for recording attendance with a photo. Users log in, check in when they arrive and check out when they leave, and can look back at every record in a history.",
      background:
        "Built individually as the midterm lab project for IF 570 Mobile Application Programming at Universitas Multimedia Nusantara. I designed and developed the whole app on my own, from the account screens to the attendance flow and history.",
      challenge:
        "I was new to Android, and the camera was the hardest part to get working: permissions, taking the photo, and getting it uploaded. The attendance rule was also tricky, because the app has to know what has already been done today before it decides what comes next.",
      solution:
        "I used Android's built-in camera with a preview screen, then uploaded the photo to Firebase Storage and saved its link with the date, time and status in Firestore. When the home screen opens, it loads today's records for the logged-in user and shows check-in, check-out, or a locked state, so the rule holds even after the app is reopened.",
    },
    images: [abseninCover1, abseninCover2, abseninCover3],
    gallery: [
      // Urutan mengikuti kolom masonry (COLUMN_OF di ProjectDetail): kolom 1 = 01,03; kolom 2 = 02,04; kolom 3 = 05,06
      { src: abseninHome, alt: "Absenin home screen with the check-in button", caption: "One tap to check in", ratio: "9/16" },
      { src: abseninCover1, alt: "Absenin login and home screens", caption: "Check in with a tap and a photo", ratio: "16/10" },
      { src: abseninCover2, alt: "Absenin photo preview, home and history screens", caption: "Tap, snap, done", ratio: "16/10" },
      { src: abseninHistory, alt: "Absenin photo preview and history screens", caption: "Every check-in, on record", ratio: "9/16" },
      { src: abseninProfile, alt: "Absenin profile screens", caption: "Your name, your NIM", ratio: "9/16" },
      { src: abseninCover3, alt: "Absenin home screens after check-in", caption: "Two check-ins a day", ratio: "16/10" },
    ],
  },

  {
    slug: "rumah-belajar-covenant",
    title: "Rumah Belajar Covenant",
    subtitle: "Website",
    summary: "Rumah Belajar Covenant is a community service website for an orphanage and learning center, created for the final project of the IF330 Web Programming course.",
    lead: "A website that puts the Covenant orphanage online for visitors, donors and volunteers. I turned the Figma design into the homepage, the masonry gallery and the volunteer page.",
    tags: ["Website", "University project", "2023"],
    origin: "campus",
    meta: {
      role: "Frontend Developer",
      clientLabel: "Institution",
      client: "Universitas Multimedia Nusantara",
      type: "Website",
      year: "2023",
      duration: "Oct 2023 – Dec 2023",
      status: "Offline",
    },
    stack: [
      { name: "Laravel", icon: "Laravel" },
      { name: "Tailwind CSS", icon: "Tailwind CSS" },
      { name: "JavaScript", icon: "JavaScript" },
    ],
    links: [
      { label: "Github", sub: "Repository", href: "https://github.com/Vn1k/Rumah-Belajar-Covenant" },
      { label: "Figma", sub: "Design Web", href: "https://www.figma.com/design/TlQZ3ZHDyQDWFJDcqI29zo/UAS?node-id=0-1&t=LXp7cYjVxoPzRz2b-1" },
    ],
    work: [
      { title: "Figma to web", desc: "Converted the Figma design into responsive, interactive pages that follow the design and user experience specs." },
      { title: "Homepage", desc: "Built the full homepage, from the first section to the footer." },
      { title: "Masonry gallery", desc: "A masonry grid gallery that shows photos of different sizes without gaps." },
      { title: "Volunteer page", desc: "A page for people who want to volunteer at the orphanage." },
      { title: "Animations", desc: "Added motion to the pages using JavaScript animation libraries." },
      { title: "Backend collaboration", desc: "Worked with the backend team so the pages fit together in the Laravel project." },
    ],
    sections: {
      overview:
        "Rumah Belajar Covenant is a social institution, orphanage and learning center that helps children from low-income families, broken homes, and marginalized or street backgrounds. The website makes the orphanage reachable online, so visitors, donors and volunteers can find information and learn how to help.",
      background:
        "This was the final assignment for the IF330 Web Programming course, and the team was asked to build a website for community service. We chose Rumah Belajar Covenant so the orphanage could have a clear presence online. I was the frontend developer, responsible for turning the Figma design into real pages.",
      challenge: "The pages had to match the Figma design closely and still work on different screen sizes. The gallery was the trickiest part, because photos come in different sizes and a plain grid leaves uneven gaps.",
      solution:
        "I built the layouts with Tailwind CSS so they adapt across screen sizes, and used a masonry grid for the gallery so photos of any size sit together neatly. JavaScript animation libraries added movement to the pages, and I checked the result with the backend team against the design and user experience specs.",
    },
    images: [covenantCover1, covenantCover2, covenantCover3],
    gallery: [
      // col = kolom masonry; dibagi manual agar tinggi ketiga kolom seimbang
      { src: covenantCover1, alt: "Rumah Belajar Covenant cover with white and yellow accent", caption: "Cover 1", ratio: "16/10", col: 0 },
      { src: covenantCover2, alt: "Rumah Belajar Covenant cover from Figma to web", caption: "Cover 2", ratio: "16/10", col: 1 },
      { src: covenantCover3, alt: "Rumah Belajar Covenant cover with yellow dominant", caption: "Cover 3", ratio: "16/10", col: 2 },
      { src: covenantHome, alt: "Rumah Belajar Covenant home page", caption: "Homepage", ratio: "16/10", col: 1 },
      { src: covenantGallery, alt: "Rumah Belajar Covenant gallery page", caption: "Masonry photo gallery", ratio: "2/3", col: 0 },
      { src: covenantVolunteer, alt: "Rumah Belajar Covenant volunteer page", caption: "Volunteer page", ratio: "16/10", col: 2 },
      { src: covenantAbout, alt: "Rumah Belajar Covenant about page", caption: "About page", ratio: "1080/970", col: 1 },
      { src: covenantTeachers, alt: "Rumah Belajar Covenant teachers page", caption: "Teachers page", ratio: "1080/757", col: 2 },
    ],
  },

  {
    slug: "umoviez",
    title: "Umoviez",
    subtitle: "Website.",
    summary: "Umoviez is a movie information website created for the final project of the IF231 Introduction to Internet Technology course.",
    lead: "A movie information website. I designed every page and built the frontend, and a teammate handled the movie data API.",
    tags: ["Website", "University project", "2023"],
    origin: "campus",
    meta: {
      role: "Frontend Developer",
      clientLabel: "Institution",
      client: "Universitas Multimedia Nusantara",
      type: "Website",
      year: "2023",
      duration: "Mar 2023 – Jun 2023",
      status: "Live",
    },
    stack: [
      { name: "ReactJS", icon: "ReactJs" },
      { name: "Tailwind CSS", icon: "Tailwind CSS" },
      { name: "JavaScript", icon: "JavaScript" },
    ],
    links: [
      { label: "Website", sub: "Umoviez", href: "https://umoviez-web.vercel.app/" },
      { label: "Github", sub: "Repository", href: "https://github.com/DafaTaufik/umoviez-web" },
    ],
    work: [
      { title: "UI design", desc: "Designed every page of the website, from layout to the dark visual theme." },
      { title: "Sidebar navigation", desc: "Adapted a community-shared sidebar and restyled it to match the Umoviez theme." },
      { title: "Hero carousel", desc: "A featured carousel on the home page showing movie title, rating and year." },
      { title: "Movie carousels", desc: "Scrollable Popular, Up Coming, Top Rated and Now Playing rows with posters, trailer buttons and detail links." },
      { title: "About Us page", desc: "Adapted from a layout shared by another developer, then customized for this project." },
      { title: "Live date and time", desc: "A header clock showing the current date and time in GMT+7." },
    ],
    sections: {
      overview:
        "Umoviez is a movie information website where visitors can browse popular, upcoming, top-rated and now-playing films, check ratings, watch trailers and open a detail page for each title. It is made for movie fans who want a quick, visual way to discover what to watch.",
      background:
        "The project was the final assignment for the IF231 Introduction to Internet Technology course. We chose a movie information site because it needs a visual, content-heavy interface and real data from an API. The work was split between two of us: I took the frontend and design, and my teammate took the API.",
      challenge: "The home page has to show many movies at once across several categories without feeling crowded. It also had to stay consistent across all pages, since I was designing every screen myself.",
      solution:
        "I used a dark theme with a slim icon sidebar so the posters stay the focus. Each category became its own carousel with the same card layout, so the page stays scannable and easy to extend. I also learned how to build the interface around data that comes from someone else's API.",
    },
    images: [umoviezCover1, umoviezCover2, umoviezCover3],
    gallery: [
      { src: umoviezHome, alt: "Umoviez home page", caption: "Popular, upcoming and top rated", ratio: "2/3" },
      { src: umoviezCover1, alt: "Umoviez on desktop and mobile", caption: "One site for desktop and mobile", ratio: "16/10" },
      { src: umoviezCover2, alt: "Umoviez mobile screens", caption: "Home, detail and search on phones", ratio: "16/10" },
      { src: umoviezSearch, alt: "Umoviez search page", caption: "Search any title", ratio: "2/3" },
      { src: umoviezDetail, alt: "Umoviez movie detail page", caption: "Poster, rating and trailer", ratio: "2/3" },
      { src: umoviezCover3, alt: "Umoviez movie detail screens", caption: "Every movie has its own page", ratio: "16/10" },
    ],
  },
];

export const ProjectsData = PROJECTS.map((p, i) => ({ ...p, number: pad(i + 1) }));

const WITH_PAGE = ProjectsData.filter((p) => p.slug);

export const getProject = (slug) => WITH_PAGE.find((p) => p.slug === slug);

// Next project (Rewind to the first item)
export const getNextProject = (slug) => {
  const i = WITH_PAGE.findIndex((p) => p.slug === slug);
  return WITH_PAGE[(i + 1) % WITH_PAGE.length];
};
