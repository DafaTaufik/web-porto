import { SiSqlite } from "react-icons/si";

// percent: penilaian diri (0-100). Kosong = placeholder "[xx]%" sampai diisi. Jangan mengarang angka.
export const SkillGroups = [
  {
    name: "Mobile",
    skills: [
      { name: "Kotlin", percent: 83 },
      { name: "Java", percent: 73 },
      { name: "Flutter", percent: 76 },
      { name: "Dart", percent: 82 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Golang", percent: 75 },
      { name: "Python", percent: 78 },
    ],
  },
  {
    name: "Web",
    skills: [
      { name: "JavaScript", percent: 81 },
      { name: "ReactJs", percent: 71 },
      { name: "PHP", percent: 72 },
      { name: "Laravel", percent: 68 },
      { name: "Tailwind CSS", percent: 84 },
    ],
  },
  {
    name: "Data & tools",
    skills: [
      { name: "MySQL", percent: 83 },
      { name: "Firebase", percent: 89 },
      { name: "Sqlite/Room", percent: 83 },
      { name: "Redis", percent: 66 },
    ],
  },
  {
    name: "tools",
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
