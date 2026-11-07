import p1 from "../assets/Image/organizational/organizational-01.jpg";
import p2 from "../assets/Image/organizational/organizational-02.jpg";
import p3 from "../assets/Image/organizational/organizational-03.jpg";
import p4 from "../assets/Image/organizational/organizational-04.jpg";
import p5 from "../assets/Image/organizational/organizational-05.jpg";
import p6 from "../assets/Image/organizational/organizational-06.jpg";
import p7 from "../assets/Image/organizational/organizational-07.jpg";
import p8 from "../assets/Image/organizational/organizational-08.jpg";

// Teks dalam kurung siku adalah placeholder sampai Dafa mengisinya. Jangan diisi karangan.
export const OrganizationalData = {
  name: "[Organization name]",
  role: "[Your role / division]",
  period: "[Mon YYYY – Mon YYYY]",
  event: "[Event / program]",
  summary: "[Two or three sentences: what the organization does, what the event was, and what your part was.]",
  bullets: ["[Add what you did: responsibility 1]", "[Add what you did: responsibility 2]", "[Add a result: number of people, scale, outcome]"],
  heroCaption: "[Caption: where and when this group photo was taken]",
};

// Satu sumber untuk hero, galeri, viewer, dan strip. Urutan array = nomor foto 01-08.
// caption: kosong = viewer menampilkan placeholder. ratio: rasio kotak di galeri.
export const OrganizationalPhotos = [
  { src: p1, alt: "Aerial view of the whole group standing in formation on the lawn", caption: "", ratio: "16 / 9" },
  { src: p2, alt: "A committee member in a light blue shirt crossing the street", caption: "", ratio: "3 / 2" },
  { src: p3, alt: "Committee members checking in participants on the street", caption: "", ratio: "3 / 2" },
  { src: p4, alt: "Committee members handing out materials to participants", caption: "", ratio: "3 / 2" },
  { src: p5, alt: "A committee member in a navy jacket holding a small marker", caption: "", ratio: "3 / 2" },
  { src: p6, alt: "A committee member in a navy jacket briefing a participant", caption: "", ratio: "727 / 910" },
  { src: p7, alt: "A committee member in a navy jacket checking a booklet", caption: "", ratio: "2 / 3" },
  { src: p8, alt: "Committee members and participants lining up on the road", caption: "", ratio: "3 / 2" },
];

// Kolom galeri (indeks foto), margin-top bergerigi, dan kecepatan parallax
export const GalleryColumns = [
  { photos: [6, 2], top: 0, speed: 0.06 },
  { photos: [4, 1, 7], top: 72, speed: 0.14 },
  { photos: [5, 3], top: 32, speed: 0.1 },
];
