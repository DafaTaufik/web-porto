// import mainPhoto from "../../assets/Image/g.png";
import mainPhoto from "../../assets/Image/about-main.jpg";
import bouquetPhoto from "../../assets/Image/about-bouquet.jpg";

const CHIP = "flex items-center gap-2 rounded-full border border-[#D4D4D4] bg-white px-[18px] py-2.5 font-Inter text-[15px] font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.08)]";

// Tiga lapis supaya transform tidak saling menimpa:
// [data-depth] (scroll, y) > [data-mouse] (mouse, x/y) > elemen float (CSS keyframes)
const CHIPS = [
  { label: "Kotlin", depth: 0.9, pos: "-left-1.5 top-[330px]", float: "about-fl4" },
  { label: "Flutter", depth: 0.6, pos: "right-0 top-[70px]", float: "about-fl2" },
  { label: "Golang", depth: 1.2, pos: "left-2.5 bottom-[90px]", float: "about-fl1", dark: true },
];

export default function AboutCluster() {
  return (
    // data-cluster: kotak yang tidak bergerak, dipakai sebagai trigger animasi foto
    <div data-cluster className="relative w-[540px] h-[700px]">
      {/* Ring */}
      <div aria-hidden="true" data-depth="0.25" className="absolute left-1/2 top-[60px] -ml-[280px] w-[560px] h-[560px] z-1">
        <div data-mouse className="w-full h-full">
          <svg className="about-ring" width="560" height="560" viewBox="0 0 560 560" fill="none">
            <circle cx="280" cy="280" r="276" stroke="#C9CED6" strokeWidth="2" strokeDasharray="3 12" strokeLinecap="round" />
            <circle cx="280" cy="4" r="7" fill="#1D1D1D" />
          </svg>
        </div>
      </div>

      {/* Foto utama dalam frame lengkung */}
      <div data-depth="0.5" className="absolute left-1/2 top-[30px] -ml-[215px] w-[430px] h-[640px] z-2">
        <div data-mouse className="w-full h-full">
          <div className="about-fl1 box-border w-full h-full p-2.5 rounded-t-[215px] rounded-b-[34px] bg-[#ECECEC] shadow-[0_28px_56px_rgba(0,0,0,0.16)]">
            <div data-clip className="relative box-border w-full h-full overflow-hidden border-[3px] border-[#1D1D1D] rounded-t-[205px] rounded-b-[26px] bg-[#F4F4F4]">
              <img data-zoom src={mainPhoto} width={1200} height={1800} alt="Dafa Taufik Al Latief in a graduation gown, seated and smiling" className="block w-full h-full object-cover object-[50%_30%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stempel Open to work */}
      <div aria-hidden="true" data-depth="0.8" className="absolute -left-3.5 top-14 z-4">
        <div data-mouse>
          <div className="about-fl3 relative w-[124px] h-[124px] rounded-full bg-white border border-[#D4D4D4] shadow-[0_10px_24px_rgba(0,0,0,0.1)]">
            <svg className="about-spin absolute left-0 top-0" width="122" height="122" viewBox="0 0 120 120" fill="none">
              <defs>
                <path id="aboutBadgePath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text className="font-HWT text-[13px] uppercase fill-[#1D1D1D]">
                <textPath href="#aboutBadgePath" textLength="270" lengthAdjust="spacing">
                  Open to work • Open to work •{" "}
                </textPath>
              </text>
            </svg>
            <span className="about-pulse absolute left-1/2 top-1/2 -mt-[7px] -ml-[7px] w-3.5 h-3.5 rounded-full bg-[#15803D]" />
          </div>
        </div>
      </div>

      {/* Polaroid */}
      <div data-depth="1" className="absolute -right-1.5 bottom-5 z-5">
        <div data-mouse>
          <div className="rotate-[5deg]">
            <div className="about-fl3 box-border w-[190px] px-2 pt-2 pb-3 rounded-[14px] bg-white border border-[#D4D4D4] shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
              <img src={bouquetPhoto} width={800} height={1200} loading="lazy" alt="Dafa holding a graduation bouquet" className="block w-full h-[220px] object-cover object-[50%_35%] rounded-lg" />
              <div className="mt-2.5 flex items-center justify-between font-Inter text-[11px] font-bold uppercase tracking-[0.06em]">
                <span>Informatics / UMN</span>
                <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full bg-[#1D1D1D]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chips */}
      {CHIPS.map(({ label, depth, pos, float, dark }) => (
        <div key={label} aria-hidden="true" data-depth={depth} className={`absolute z-3 ${pos}`}>
          <div data-mouse>
            <span className={`${float} ${CHIP} ${dark ? "!border-[#1D1D1D] !bg-[#1D1D1D] !text-white !shadow-[0_10px_24px_rgba(0,0,0,0.16)]" : ""}`}>
              <span className={`w-2 h-2 rounded-full ${dark ? "bg-[#4ADE80]" : "bg-[#1D1D1D]"}`} />
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
