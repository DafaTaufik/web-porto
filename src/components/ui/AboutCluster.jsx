const CHIP = "flex items-center gap-2 rounded-full border border-[#D4D4D4] bg-white px-[18px] py-2.5 font-Inter text-[15px] font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.08)]";

// Tiga lapis supaya transform tidak saling menimpa:
// [data-depth] (scroll, y) > [data-mouse] (mouse, x/y) > elemen float (CSS keyframes)
const CHIPS = [
  { label: "Kotlin", depth: 0.9, pos: "left-0 top-[50px]", float: "about-fl3" },
  { label: "Flutter", depth: 0.5, pos: "right-6 top-[6px]", float: "about-fl2" },
  { label: "Java", depth: 0.7, pos: "-left-1.5 top-[180px]", float: "about-fl4" },
  { label: "Golang", depth: 1.2, pos: "left-3.5 top-[318px]", float: "about-fl1", dark: true },
  { label: "Firebase", depth: 0.8, pos: "right-1 top-[210px]", float: "about-fl3" },
  { label: "Gin", depth: 0.4, pos: "left-[70px] bottom-1.5", float: "about-fl2" },
];

const PHONE_ROWS = [
  { dark: false, a: "w-3/4", b: "w-[45%]" },
  { dark: true, a: "w-[65%]", b: "w-2/5" },
  { dark: false, a: "w-4/5", b: "w-1/2" },
  { dark: false, a: "w-3/5", b: "w-[35%]" },
];

export default function AboutCluster() {
  return (
    <div aria-hidden="true" className="relative w-[520px] h-[580px]">
      {/* Ring */}
      <div data-depth="0.25" className="absolute left-1/2 top-10 -ml-[230px] w-[460px] h-[460px] z-1">
        <div data-mouse className="w-full h-full">
          <svg className="about-ring" width="460" height="460" viewBox="0 0 460 460" fill="none">
            <circle cx="230" cy="230" r="226" stroke="#C9CED6" strokeWidth="2" strokeDasharray="3 12" strokeLinecap="round" />
            <circle cx="230" cy="4" r="7" fill="#1D1D1D" />
          </svg>
        </div>
      </div>

      {/* Phone */}
      <div data-depth="0.6" className="absolute left-1/2 top-10 -ml-[175px] w-[260px] h-[480px] z-2">
        <div data-mouse className="w-full h-full">
          <div className="about-fl1 flex flex-col gap-3.5 w-full h-full box-border rounded-[38px] border-[3px] border-[#1D1D1D] bg-[#F4F4F4] px-4 pt-4 pb-3.5 shadow-[0_28px_56px_rgba(0,0,0,0.16)]">
            <div className="self-center w-[70px] h-2 rounded-full bg-[#1D1D1D]" />
            <div className="flex items-center justify-between mt-1">
              <span className="font-HWT text-[26px] leading-none uppercase">Android</span>
              <span className="w-[30px] h-[30px] rounded-full bg-[#1D1D1D]" />
            </div>
            {PHONE_ROWS.map((row, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl ${row.dark ? "bg-[#1D1D1D]" : "bg-white border border-[#E5E7EB]"}`}>
                <span className={`w-[38px] h-[38px] shrink-0 rounded-[11px] ${row.dark ? "bg-[#4ADE80]" : "bg-[#E5E7EB]"}`} />
                <span className="flex-1 flex flex-col gap-[7px]">
                  <span className={`h-2 rounded ${row.a} ${row.dark ? "bg-white" : "bg-[#D1D5DB]"}`} />
                  <span className={`h-2 rounded ${row.b} ${row.dark ? "bg-[#6B7280]" : "bg-[#E5E7EB]"}`} />
                </span>
              </div>
            ))}
            <div className="mt-auto flex justify-around pt-2.5 border-t border-[#E5E7EB]">
              <span className="w-[26px] h-[26px] rounded-full bg-[#1D1D1D]" />
              <span className="w-[26px] h-[26px] rounded-full bg-[#D1D5DB]" />
              <span className="w-[26px] h-[26px] rounded-full bg-[#D1D5DB]" />
            </div>
          </div>
        </div>
      </div>

      {/* API card */}
      <div data-depth="1.1" className="absolute right-0 bottom-[34px] w-[250px] z-4">
        <div data-mouse>
          <div className="about-fl2 box-border rounded-[18px] bg-[#1D1D1D] px-[18px] py-4 font-mono text-[13px] leading-[1.7] text-[#D1D5DB] shadow-[0_24px_48px_rgba(0,0,0,0.24)]">
            <div className="flex gap-1.5 mb-2.5">
              <span className="w-[9px] h-[9px] rounded-full bg-[#6B7280]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#6B7280]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#6B7280]" />
            </div>
            <div className="text-white">POST /orders</div>
            <div className="text-[#4ADE80]">201 Created</div>
            <div>{'{ "status": "ok" }'}</div>
          </div>
        </div>
      </div>

      {/* Chips */}
      {CHIPS.map(({ label, depth, pos, float, dark }) => (
        <div key={label} data-depth={depth} className={`absolute z-3 ${pos}`}>
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
