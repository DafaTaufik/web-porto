import dartPdf from "../assets/Courses/Dart_Dicoding_Dafa_Taufik_Al_Latief.pdf";
import dartThumb from "../assets/Courses/dart_dicoding_thumb.jpg";
import creativeJago from "../assets/Courses/creative_jago.png";
import hciaAi from "../assets/Courses/hcia_ai.png";
import intermediatePython from "../assets/Courses/intermediate_python.png";
import introPython from "../assets/Courses/intro_python.png";

/**
 * @typedef {Object} Certificate
 * @property {string} platform
 * @property {string} title
 * @property {string} date          sudah diformat, mis. "Dec 22, 2024"
 * @property {string} [hours]       opsional, mis. "20 hrs"
 * @property {string[]} tags        maks ~3
 * @property {"pdf"|"jpg"|"png"} type
 * @property {string} file          nama file asli (tampil di top bar modal)
 * @property {string} [src]         URL file asli; kosong = placeholder
 * @property {string} [thumb]       URL thumbnail gambar; kosong = kotak placeholder
 * @property {string} [credentialId]
 * @property {string} [validUntil]
 * @property {string} [verifyUrl]
 */

// Placeholder sampai sertifikat aslinya diserahkan. Jangan diisi karangan.
const placeholder = (type) => ({
  platform: "[Platform]",
  title: "[Course name]",
  date: "[Date]",
  hours: "[xx] hrs",
  tags: ["[skill]", "[skill]"],
  type,
  file: `[certificate-file].${type}`,
});

/** @type {Certificate[]} */
export const CoursesData = [
  {
    platform: "Dicoding",
    title: "Memulai Pemrograman dengan Dart",
    date: "Dec 22, 2024",
    hours: "20 hrs",
    tags: ["Dart", "OOP", "Futures"],
    type: "pdf",
    file: "Dart_Dicoding_Dafa_Taufik_Al_Latief.pdf",
    src: dartPdf,
    thumb: dartThumb,
    credentialId: "98XW5DKV9PM3",
    validUntil: "Dec 22, 2027",
    verifyUrl: "https://dicoding.com/certificates/98XW5DKV9PM3",
  },
  {
    platform: "Jago Digital Academy",
    title: "Creative Problem Solving",
    date: "Feb 26, 2025",
    tags: ["Problem Solving"],
    type: "png",
    file: "creative_jago.png",
    src: creativeJago,
    thumb: creativeJago,
  },
  {
    platform: "Huawei Talent Online",
    title: "HCIA-AI V3.5 Course (Indonesian)",
    date: "May 12, 2024",
    tags: ["AI"],
    type: "png",
    file: "hcia_ai.png",
    src: hciaAi,
    thumb: hciaAi,
    credentialId: "EBG20240512001409",
  },
  {
    platform: "SoloLearn",
    title: "Python Intermediate",
    date: "Mar 26, 2024",
    tags: ["Python"],
    type: "png",
    file: "intermediate_python.png",
    src: intermediatePython,
    thumb: intermediatePython,
    credentialId: "CC-U4U8NEN3",
  },
  {
    platform: "SoloLearn",
    title: "Introduction to Python",
    date: "Mar 13, 2024",
    tags: ["Python"],
    type: "png",
    file: "intro_python.png",
    src: introPython,
    thumb: introPython,
    credentialId: "CC-OYIGG1FM",
  },
  placeholder("jpg"),
  placeholder("png"),
  placeholder("pdf"),
  placeholder("jpg"),
];
