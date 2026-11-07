import p1 from "../assets/Image/organizational/organizational-01.jpg";
import p2 from "../assets/Image/organizational/organizational-02.jpg";
import p3 from "../assets/Image/organizational/organizational-03.jpg";
import p4 from "../assets/Image/organizational/organizational-04.jpg";
import p5 from "../assets/Image/organizational/organizational-05.jpg";
import p6 from "../assets/Image/organizational/organizational-06.jpg";
import p7 from "../assets/Image/organizational/organizational-07.jpg";
import p8 from "../assets/Image/organizational/organizational-08.jpg";
import p9 from "../assets/Image/organizational/organizational-09.jpg";
import p10 from "../assets/Image/organizational/organizational-10.jpg";
import p11 from "../assets/Image/organizational/organizational-11.jpg";
import p12 from "../assets/Image/organizational/organizational-12.jpg";
import p13 from "../assets/Image/organizational/organizational-13.jpg";
import p14 from "../assets/Image/organizational/organizational-14.jpg";

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

// Satu sumber untuk hero, galeri, viewer, dan strip. Urutan array = nomor foto 01-14.
// caption: kosong = viewer menampilkan placeholder. ratio: rasio kotak di galeri.
export const OrganizationalPhotos = [
  { src: p1, alt: "Aerial view of the whole group standing in formation on the lawn", caption: "", ratio: "16 / 9" },
  { src: p2, alt: "A committee member in a light blue shirt crossing the street", caption: "", ratio: "3 / 2" },
  { src: p3, alt: "Committee members checking in participants on the street", caption: "", ratio: "3 / 2" },
  { src: p4, alt: "Committee members handing out materials to participants", caption: "", ratio: "3 / 2" },
  { src: p5, alt: "A committee member in a navy jacket holding a small marker", caption: "", ratio: "3 / 2" },
  { src: p6, alt: "A committee member in a navy jacket briefing a participant", caption: "", ratio: "727 / 910" },
  { src: p7, alt: "Committee members and participants lining up on the road", caption: "", ratio: "3 / 2" },
  { src: p8, alt: "Group photo of committee members and attendees in a lecture hall", caption: "", ratio: "16 / 9" },
  { src: p9, alt: "A committee member in a cap and mask scanning a participant's card", caption: "", ratio: "3 / 2" },
  { src: p10, alt: "Committee members in navy jackets guiding a line of participants along the road", caption: "", ratio: "3 / 2" },
  { src: p11, alt: "Close group photo of masked committee members posing under the trees", caption: "", ratio: "3 / 2" },
  { src: p12, alt: "Two committee members in light blue shirts holding up their name tags", caption: "", ratio: "1108 / 1478" },
  { src: p13, alt: "Two committee members posing together, one giving a thumbs up", caption: "", ratio: "1108 / 1477" },
  { src: p14, alt: "Two committee members posing on the paved plaza, one flashing a peace sign", caption: "", ratio: "1109 / 1479" },
];

// Kolom galeri (indeks foto), margin-top bergerigi, dan kecepatan parallax
export const GalleryColumns = [
  { photos: [5, 2, 8, 11], top: 0, speed: 0.06 },
  { photos: [4, 1, 6, 12], top: 72, speed: 0.14 },
  { photos: [3, 7, 9, 10, 13], top: 32, speed: 0.1 },
];
