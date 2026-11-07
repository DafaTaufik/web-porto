import { TECH_ICONS } from "../../data/TechIcons";

export default function TechIcon({ name, size = 26 }) {
  const parts = TECH_ICONS[name] ?? [];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {parts.map(([Tag, props], i) => (
        <Tag key={i} {...props} />
      ))}
    </svg>
  );
}
