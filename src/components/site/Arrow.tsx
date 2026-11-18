/** Small drawn arrow that nudges in its direction when its `group` parent is hovered. */
export function Arrow({ back = false, className = "" }: { back?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out-expo ${
        back ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
      } ${className}`}
    >
      <path
        d={back ? "M13 8H3.5M7.5 4l-4 4 4 4" : "M3 8h9.5M8.5 4l4 4-4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
