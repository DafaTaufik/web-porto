import dartDicoding from "../assets/Image/courses/dart_dicoding.png";
import introPython from "../assets/Image/courses/intro_python.png";
import intermediatePython from "../assets/Image/courses/intermediate_python.png";
import creativeJago from "../assets/Image/courses/creative_jago.png";

// pdf: path file PDF sertifikat di folder /public (mis. "/certificates/dart-dicoding.pdf").
// Selama pdf masih null, kartu membuka gambar sertifikatnya.
export const CoursesData = [
  {
    id: 1,
    title: "Belajar Dasar Dart",
    organization: "Dicoding",
    image: dartDicoding,
    pdf: null,
    completedDate: "1 Dec, 2024",
    tags: ["language", "Dart"],
  },
  {
    id: 2,
    title: "Introduction to Python",
    organization: "Dicoding",
    image: introPython,
    pdf: null,
    completedDate: "15 Nov, 2024",
    tags: ["programming", "Python"],
  },
  {
    id: 3,
    title: "Intermediate Python",
    organization: "Dicoding",
    image: intermediatePython,
    pdf: null,
    completedDate: "20 Nov, 2024",
    tags: ["programming", "Python"],
  },
  {
    id: 4,
    title: "Creative Jago",
    organization: "Dicoding",
    image: creativeJago,
    pdf: null,
    completedDate: "25 Nov, 2024",
    tags: ["design", "Creative"],
  },
];
