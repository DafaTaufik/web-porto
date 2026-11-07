import dartPdf from "../assets/Courses/Dart_Dicoding_Dafa_Taufik_Al_Latief.pdf";
import dartThumb from "../assets/Courses/thumbnails/dart_dicoding.jpg";
import dasarAiPdf from "../assets/Courses/Dasar_AI_Dicoding_Dafa_Taufik_Al_Latief.pdf";
import dasarAiThumb from "../assets/Courses/thumbnails/dasar_ai_dicoding.jpg";
import generativeAiPdf from "../assets/Courses/Generative_AI_Dafa_Taufik_Al_Latief.pdf";
import generativeAiThumb from "../assets/Courses/thumbnails/generative_ai_dicoding.jpg";
import devopsPdf from "../assets/Courses/devops_sertifikat.pdf";
import devopsThumb from "../assets/Courses/thumbnails/devops_dicoding.jpg";
import financialLiteracyPdf from "../assets/Courses/financial_literacy101_dicoding.pdf";
import financialLiteracyThumb from "../assets/Courses/thumbnails/financial_literacy_dicoding.jpg";
import androidFundamentalPdf from "../assets/Courses/fundamental_aplikasi_android.pdf";
import androidFundamentalThumb from "../assets/Courses/thumbnails/android_fundamental_dicoding.jpg";
import promptEngineeringPdf from "../assets/Courses/prompt_engineering_dicoding_Dafa_Taufik_Al_Latief.pdf";
import promptEngineeringThumb from "../assets/Courses/thumbnails/prompt_engineering_dicoding.jpg";
import luarsekolahPdf from "../assets/Courses/PBI_LuarSekolah_DafaTaufikAlLatief.pdf";
import luarsekolahThumb from "../assets/Courses/thumbnails/luarsekolah_internship.jpg";
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
  {
    platform: "Dicoding",
    title: "Belajar Dasar AI",
    date: "Dec 17, 2025",
    hours: "10 hrs",
    tags: ["AI", "Machine Learning", "Deep Learning"],
    type: "pdf",
    file: "Dasar_AI_Dicoding_Dafa_Taufik_Al_Latief.pdf",
    src: dasarAiPdf,
    thumb: dasarAiThumb,
    credentialId: "1OP8JO5OLPQK",
    validUntil: "Dec 17, 2028",
    verifyUrl: "https://dicoding.com/certificates/1OP8JO5OLPQK",
  },
  {
    platform: "Dicoding",
    title: "Belajar Penggunaan Generative AI",
    date: "Oct 25, 2025",
    hours: "30 hrs",
    tags: ["Generative AI"],
    type: "pdf",
    file: "Generative_AI_Dafa_Taufik_Al_Latief.pdf",
    src: generativeAiPdf,
    thumb: generativeAiThumb,
    credentialId: "MRZM668JKPYQ",
    validUntil: "Oct 25, 2028",
    verifyUrl: "https://dicoding.com/certificates/MRZM668JKPYQ",
  },
  {
    platform: "Dicoding",
    title: "Prompt Engineering untuk Software Developer",
    date: "Oct 20, 2025",
    hours: "16 hrs",
    tags: ["Prompt Engineering"],
    type: "pdf",
    file: "prompt_engineering_dicoding_Dafa_Taufik_Al_Latief.pdf",
    src: promptEngineeringPdf,
    thumb: promptEngineeringThumb,
    credentialId: "81P25LOWYPOY",
    validUntil: "Oct 20, 2028",
    verifyUrl: "https://dicoding.com/certificates/81P25LOWYPOY",
  },
  {
    platform: "Dicoding",
    title: "Financial Literacy 101",
    date: "Jun 21, 2025",
    hours: "5 hrs",
    tags: ["Finance"],
    type: "pdf",
    file: "financial_literacy101_dicoding.pdf",
    src: financialLiteracyPdf,
    thumb: financialLiteracyThumb,
    credentialId: "QLZ93JGEMZ5D",
    validUntil: "Jun 21, 2028",
    verifyUrl: "https://dicoding.com/certificates/QLZ93JGEMZ5D",
  },
  {
    platform: "Dicoding",
    title: "Belajar Fundamental Aplikasi Android",
    date: "Sep 23, 2026",
    hours: "140 hrs",
    tags: ["Android", "Networking", "Database"],
    type: "pdf",
    file: "fundamental_aplikasi_android.pdf",
    src: androidFundamentalPdf,
    thumb: androidFundamentalThumb,
    credentialId: "2VX3V675QPYQ",
    validUntil: "Sep 23, 2029",
    verifyUrl: "https://dicoding.com/certificates/2VX3V675QPYQ",
  },
  {
    platform: "Dicoding",
    title: "Belajar Dasar-Dasar DevOps",
    date: "Sep 28, 2026",
    hours: "15 hrs",
    tags: ["DevOps"],
    type: "pdf",
    file: "devops_sertifikat.pdf",
    src: devopsPdf,
    thumb: devopsThumb,
    credentialId: "4EXGJK4K1XRL",
    validUntil: "Sep 28, 2029",
    verifyUrl: "https://dicoding.com/certificates/4EXGJK4K1XRL",
  },
  {
    platform: "Luarsekolah",
    title: "Software Engineering (Mobile) Internship",
    date: "Dec 6, 2025",
    tags: ["Flutter", "GetX", "Firebase"],
    type: "pdf",
    file: "PBI_LuarSekolah_DafaTaufikAlLatief.pdf",
    src: luarsekolahPdf,
    thumb: luarsekolahThumb,
  },
];
