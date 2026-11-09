// Satu objek per project untuk halaman detail (/projects/:slug). Template ada di components/sections/ProjectDetail.jsx.
// Teks dalam kurung siku adalah placeholder sampai Dafa mengisinya. Jangan diisi karangan.
// Moni POS: Dafa bergabung ke tim saat magang dan menambah fitur ke aplikasi yang sudah ada. Jangan menulis "built".
// stack.icon: kunci di TECH_ICONS; null = titik kecil.
// links.href: null = tombol disabled (belum ada URL). gallery kosong = tile placeholder.
// number: nomor project di daftar Projects. Project berikutnya mengikuti urutan array ini (berputar).

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

export const ProjectDetailData = [
  {
    slug: "moni-pos",
    number: "01",
    title: "Moni POS",
    subtitle: "Mobile app.",
    lead: "A point-of-sale app. I joined the team during my internship at PT. Mitra Integrasi Digital and added features to the existing app.",
    tags: ["Mobile", "Internship", "[YYYY]"],
    meta: {
      role: "Mobile Developer Intern",
      company: "PT. Mitra Integrasi Digital",
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
    gallery: [],
  },
  {
    slug: "cmoasik-hris",
    number: "02",
    title: "CmoAsik HRIS",
    subtitle: "Mobile app.",
    lead: "[One or two sentences: what it does and who it is for.]",
    tags: ["Mobile", "Internship", "[YYYY]"],
    meta: {
      role: "Mobile Developer Intern",
      company: "PT. Mitra Integrasi Digital",
      type: "Mobile",
      year: "[YYYY]",
      duration: "[Mon YYYY – Mon YYYY]",
      status: "[Status]",
    },
    stack: MOBILE_STACK,
    links: DEFAULT_LINKS,
    work: [],
    sections: SECTION_PLACEHOLDERS,
    gallery: [],
  },
];

export const getProject = (slug) => ProjectDetailData.find((p) => p.slug === slug);

// Project berikutnya (berputar kembali ke yang pertama)
export const getNextProject = (slug) => {
  const i = ProjectDetailData.findIndex((p) => p.slug === slug);
  return ProjectDetailData[(i + 1) % ProjectDetailData.length];
};
