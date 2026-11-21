import { SiSqlite } from "react-icons/si";

// percent: penilaian diri (0-100). Kosong = placeholder "[xx]%" sampai diisi. Jangan mengarang angka.
// unit: [tunggal, jamak] untuk penghitung di kanan judul grup
export const SkillGroups = [
  {
    name: "Languages",
    unit: ["language", "languages"],
    skills: [
      { name: "Kotlin", percent: 83 },
      { name: "Java", percent: 73 },
      { name: "Dart", percent: 82 },
      { name: "Golang", percent: 75 },
      { name: "Python", percent: 78 },
      { name: "JavaScript", percent: 81 },
      { name: "PHP", percent: 72 },
    ],
  },
  {
    name: "Frameworks & libraries",
    unit: ["framework", "frameworks"],
    skills: [
      { name: "Flutter", percent: 76 },
      { name: "ReactJs", percent: 71 },
      { name: "Laravel", percent: 68 },
      { name: "Tailwind CSS", percent: 84 },
    ],
  },
  {
    name: "Databases",
    unit: ["database", "databases"],
    skills: [
      { name: "MySQL", percent: 83 },
      { name: "Firebase", percent: 89 },
      { name: "Sqlite/Room", percent: 83 },
      { name: "Redis", percent: 66 },
    ],
  },
  {
    name: "Tools",
    unit: ["tool", "tools"],
    skills: [
      { name: "Postman", percent: 87 },
      { name: "Bruno", percent: 86 },
      { name: "N8N", percent: 69 },
      { name: "Git", percent: 84 },
      { name: "DBeaver", percent: 84 },
      { name: "Figma", percent: 85 },
    ],
  },
];

export const FamiliarWith = ["NodeJS", "Typescript", "MongoDB", "PostgreSQL", "NextJS", "Jira", "Docker", "GSAP"];
