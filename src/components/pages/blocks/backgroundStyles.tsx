export const BACKGROUND_STYLES: Record<string, string> = {
  agedPaper: "bg-stone-100",
  paper: "bg-white",
  solidStone: "bg-stone-100",
  solidWhite: "bg-white",
  vestmentDark: "bg-vestment-900",
  transparent: "bg-transparent",
};

export const BACKGROUND_IMAGE: Record<string, string | undefined> = {
  agedPaper: "/images/aged_paper.png",
  paper: "/images/paper.png",
  solidStone: undefined,
  solidWhite: undefined,
  vestmentDark: undefined,
};

export function backgroundStyleFor(background?: string | null) {
  const key = background ?? "transparent";
  const bgClass = BACKGROUND_STYLES[key] ?? "bg-transparent";
  const image = BACKGROUND_IMAGE[key];
  return {
    className: bgClass,
    style: image
      ? {
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat" as const,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
      : undefined,
    isDark: key === "vestmentDark",
  };
}
