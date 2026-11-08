// Animasi masuk yang diputar ulang per "kunjungan" ke sebuah section.
// - Masuk dari ATAS (scroll turun): animasi main. Selama section masih di layar tidak diulang.
// - Masuk dari BAWAH (scroll naik): elemen langsung tampil tanpa animasi.
// - Reset (agar main lagi saat kembali dari atas) hanya saat section keluar lewat bawah layar,
//   artinya user pergi ke section di atasnya.
// Pakai IntersectionObserver (bukan ScrollTrigger) karena membaca posisi yang benar-benar tampil,
// termasuk geseran parallax; ScrollTrigger menghitung dari posisi layout sehingga elemen bisa telat muncul.
export function createReplay(section) {
  const observers = [];
  const states = [];

  // anim: tween/timeline yang dibuat dengan { paused: true } dan sudah merender keadaan awalnya
  const replay = (el, anim) => {
    const state = { anim, played: false };
    states.push(state);
    const enter = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || state.played) return;
        state.played = true;
        if (entry.boundingClientRect.top > 0) anim.play();
        else anim.progress(1);
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    enter.observe(el);
    observers.push(enter);
  };

  const resetAll = () =>
    states.forEach((state) => {
      state.played = false;
      state.anim.pause(0);
    });

  const sectionIo = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting && entry.boundingClientRect.top > 0) resetAll();
  });
  sectionIo.observe(section);
  observers.push(sectionIo);

  return { replay, disconnect: () => observers.forEach((o) => o.disconnect()) };
}
