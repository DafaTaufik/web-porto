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
    slug: "moni-pos",
    title: "Moni POS",
    subtitle: "Mobile app.",
    summary: "A point-of-sale app, built during my internship at PT. Mitra Integrasi Digital.",
    lead: "A point-of-sale app. I joined the team during my internship at PT. Mitra Integrasi Digital and added features to the existing app.",
    tags: ["Mobile", "Internship", "[YYYY]"],
    meta: {
      role: "Mobile Developer Intern",
      clientLabel: "Company",
      client: "PT. Mitra Integrasi Digital",
      type: "Mobile",
      year: "[YYYY]",
      duration: "[Mon YYYY – Mon YYYY]",
      status: "[Status]",
    },
    stack: [...MOBILE_STACK, { name: "Node.js", icon: "Node.js" }, { name: "Socket.IO", icon: "Socket.IO" }, { name: "gRPC", icon: null }],
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
    slug: "cmoasik-hris",
    title: "CmoAsik HRIS",
    subtitle: "Mobile app.",
    summary: "A human-resources app, built during the same internship.",
    lead: "[One or two sentences: what it does and who it is for.]",
    tags: ["Mobile", "Internship", "[YYYY]"],
    meta: {
      role: "Mobile Developer Intern",
      clientLabel: "Company",
      client: "PT. Mitra Integrasi Digital",
      type: "Mobile",
      year: "[YYYY]",
      duration: "[Mon YYYY – Mon YYYY]",
      status: "[Status]",
    },
    stack: MOBILE_STACK,
    links: DEFAULT_LINKS,
    work: [],
    sections: SECTION_PLACEHOLDERS,
    images: [],
    gallery: [],
  },
  { ...EMPTY_PROJECT },
  { ...EMPTY_PROJECT },
  {
    slug: "umoviez",
    title: "Umoviez",
    subtitle: "Website.",
    summary: "Umoviez is a movie information website created for the final project of the IF231 Introduction to Internet Technology course.",
    lead: "A movie information website. I designed every page and built the frontend, and a teammate handled the movie data API.",
    tags: ["Website", "University project", "2023"],
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
      outcome: "Umoviez was completed and deployed on Vercel, and it is still live today. It gave me hands-on experience designing a full multi-page interface and building it in React and Tailwind CSS.",
    },
    images: [],
    gallery: [],
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
