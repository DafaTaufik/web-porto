import { IconArrowUpRight } from "@tabler/icons-react";

export default function CardCourse({ course }) {
  const href = course.pdf || course.image;
  const label = course.pdf ? "Open certificate (PDF)" : "View certificate";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col border-2 border-navy bg-white font-PlusJakartaSans text-navy shadow-[6px_6px_0_0_var(--color-navy)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--color-navy)] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-navy)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="overflow-hidden border-b-2 border-navy bg-mist">
        <img
          src={course.image}
          alt={`${course.title} certificate from ${course.organization}`}
          width="1754"
          height="1240"
          loading="lazy"
          className="block aspect-[1754/1240] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <h3 className="text-xl font-semibold leading-snug md:text-2xl">{course.title}</h3>
          <p className="mt-1 text-lg font-medium">{course.organization}</p>
          <p className="mt-1 text-base text-navy/80">Completed on {course.completedDate}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <li key={tag} className={`px-3 py-1 text-base font-semibold ${index === 0 ? "border-2 border-navy" : "border-2 border-navy bg-navy text-cream"}`}>
              {tag}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex min-h-11 items-center gap-2 pt-2 text-lg font-semibold underline decoration-2 underline-offset-4 group-hover:decoration-accent">
          {label}
          <IconArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
}
