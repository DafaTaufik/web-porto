import p1 from "../assets/Image/organizational/organizational-01.webp";
import p1s from "../assets/Image/organizational/organizational-01-sm.webp";
import p2 from "../assets/Image/organizational/organizational-02.webp";
import p2s from "../assets/Image/organizational/organizational-02-sm.webp";
import p3 from "../assets/Image/organizational/organizational-03.webp";
import p3s from "../assets/Image/organizational/organizational-03-sm.webp";
import p4 from "../assets/Image/organizational/organizational-04.webp";
import p4s from "../assets/Image/organizational/organizational-04-sm.webp";
import p5 from "../assets/Image/organizational/organizational-05.webp";
import p5s from "../assets/Image/organizational/organizational-05-sm.webp";
import p6 from "../assets/Image/organizational/organizational-06.webp";
import p6s from "../assets/Image/organizational/organizational-06-sm.webp";
import p7 from "../assets/Image/organizational/organizational-07.webp";
import p7s from "../assets/Image/organizational/organizational-07-sm.webp";
import p8 from "../assets/Image/organizational/organizational-08.webp";
import p8s from "../assets/Image/organizational/organizational-08-sm.webp";
import p9 from "../assets/Image/organizational/organizational-09.webp";
import p9s from "../assets/Image/organizational/organizational-09-sm.webp";
import p10 from "../assets/Image/organizational/organizational-10.webp";
import p10s from "../assets/Image/organizational/organizational-10-sm.webp";
import p11 from "../assets/Image/organizational/organizational-11.webp";
import p11s from "../assets/Image/organizational/organizational-11-sm.webp";
import p12 from "../assets/Image/organizational/organizational-13.webp";
import p12s from "../assets/Image/organizational/organizational-13-sm.webp";
import p13 from "../assets/Image/organizational/organizational-14.webp";
import p13s from "../assets/Image/organizational/organizational-14-sm.webp";
import p14 from "../assets/Image/organizational/organizational-15.webp";
import p14s from "../assets/Image/organizational/organizational-15-sm.webp";

export const OrganizationalData = {
  name: "OMB UMN 2023",
  role: "Security Division Member",
  period: "Feb 2023 – Aug 2023",
  event: "New Student Orientation",
  summary:
    "OMB (Orientasi Mahasiswa Baru) is Universitas Multimedia Nusantara’s annual orientation program that introduces new students to campus life. About 2.800 new students attended the 2023 edition. As a member of Adhyasta, the security division, I helped plan the guard posts, participant flow, and on event day I kept the venue safe and orderly.",
  bullets: [
    "Served on the security team for the New Student Orientation, which about 2.800 new students attended, and kept the event safe and running smoothly",
    "Helped plan security post locations, participant flow, and event rules to keep the event safe and organized.",
    "Stamped about 1.000 student assignments at the entrance as proof of participation",
  ],
  heroCaption: "Building D Garden, Universitas Multimedia Nusantara · Jul 2023",
};

// Satu sumber untuk hero, galeri, viewer, dan strip. Urutan array = nomor foto 01-14.
// src: resolusi penuh (hero + viewer), thumb: lebar 800px (galeri + strip).
// caption: kosong = viewer menampilkan placeholder. ratio: rasio kotak di galeri.
export const OrganizationalPhotos = [
  { src: p1, thumb: p1s, alt: "Aerial view of the whole group standing in formation on the lawn", ratio: "16 / 9" },
  { src: p2, thumb: p2s, alt: "A committee member in a light blue shirt crossing the street", ratio: "3 / 2" },
  { src: p3, thumb: p3s, alt: "Committee members checking in participants on the street", ratio: "3 / 2" },
  { src: p4, thumb: p4s, alt: "Committee members handing out materials to participants", ratio: "3 / 2" },
  { src: p5, thumb: p5s, alt: "A committee member in a navy jacket holding a small marker", ratio: "3 / 2" },
  { src: p6, thumb: p6s, alt: "A committee member in a navy jacket briefing a participant", ratio: "727 / 910" },
  { src: p7, thumb: p7s, alt: "Committee members and participants lining up on the road", ratio: "3 / 2" },
  { src: p8, thumb: p8s, alt: "A committee member in a cap and mask scanning a participant's card", ratio: "3 / 2" },
  { src: p9, thumb: p9s, alt: "Committee members in navy jackets guiding a line of participants along the road", ratio: "3 / 2" },
  { src: p10, thumb: p10s, alt: "Close group photo of masked committee members posing under the trees", ratio: "3 / 2" },
  { src: p11, thumb: p11s, alt: "Two committee members in light blue shirts holding up their name tags", ratio: "1108 / 1478" },
  { src: p12, thumb: p12s, alt: "Two committee members posing on the paved plaza, one flashing a peace sign", ratio: "1109 / 1479" },
  { src: p13, thumb: p13s, alt: "A committee member in a black cap and navy blazer stamping a participant's card on the street", ratio: "1108 / 1662" },
  { src: p14, thumb: p14s, alt: "Committee members in navy blazers checking in a long line of participants in yellow and orange shirts", ratio: "3 / 2" },
];

// Kolom galeri (indeks foto), margin-top bergerigi, dan kecepatan parallax
export const GalleryColumns = [
  { photos: [5, 2, 8, 12], top: 0, speed: 0.06 },
  { photos: [4, 1, 6, 11], top: 72, speed: 0.14 },
  { photos: [3, 7, 9, 10, 13], top: 32, speed: 0.1 },
];
