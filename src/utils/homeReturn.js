// Mengingat project yang dibuka dari list supaya saat kembali ke Home, list menggulir tepat ke barisnya.
// Datanya disimpan di history.state (terikat ke entri riwayat, ikut bertahan saat refresh), bukan di variabel modul.
//  - homeReturn: ditulis ke entri Home saat baris diklik; dipakai ketika kembali lewat tombol back HP/browser.
//  - usr.returnTo: dikirim lewat state <Link> dari halaman detail ("All projects"); tanpa offset, jadi pakai posisi default.
const readState = () => window.history.state ?? {};

// Dipanggil saat baris project diklik, sebelum pindah ke halaman detail
export const rememberClick = (slug, el) => {
  const homeReturn = { slug, offset: Math.round(el.getBoundingClientRect().top) };
  window.history.replaceState({ ...readState(), homeReturn }, "");
};

// State untuk <Link> dari halaman detail ke Home
export const returnLinkState = (slug) => ({ returnTo: { slug } });

const current = () => {
  const state = readState();
  return state.usr?.returnTo ?? state.homeReturn ?? null;
};

export const isReturning = () => current() !== null;

export const getReturn = () => {
  const { slug, offset } = current();
  // Tanpa offset tersimpan (mis. lewat "next project"), taruh baris agak di atas layar
  return { slug, offset: offset ?? Math.round(window.innerHeight * 0.25) };
};

// Hapus agar refresh atau kunjungan berikutnya ke entri ini tidak memicu pemulihan lagi
export const clearReturn = () => {
  const { homeReturn, ...rest } = readState();
  if (rest.usr?.returnTo) rest.usr = { ...rest.usr, returnTo: undefined };
  window.history.replaceState(rest, "");
};
