// -------- custom icon set --------
// Hand-built rather than a generic icon library, so weight and line quality
// match the display type and the lancet-arch motif used throughout the page.

type IconProps = {
  className?: string;
};

export function IconBook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4H11.5V20H5.5C4.67 20 4 19.33 4 18.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M20 5.5C20 4.67 19.33 4 18.5 4H12.5V20H18.5C19.33 20 20 19.33 20 18.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 9.5H20" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3.5V6.5M16 3.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 19.5C12 19.5 4 15 4 9.3C4 6.6 6 4.8 8.3 4.8C9.9 4.8 11.2 5.7 12 6.9C12.8 5.7 14.1 4.8 15.7 4.8C18 4.8 20 6.6 20 9.3C20 15 12 19.5 12 19.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21C12 21 18.5 15.06 18.5 10C18.5 6.41 15.59 3.5 12 3.5C8.41 3.5 5.5 6.41 5.5 10C5.5 15.06 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 2.5V5M12 19V21.5M4.2 4.2L6 6M18 18L19.8 19.8M2.5 12H5M19 12H21.5M4.2 19.8L6 18M18 6L19.8 4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 19C3.5 15.5 6 13.5 9 13.5C12 13.5 14.5 15.5 14.5 19" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 8.3C16.1 8.6 16.9 9.6 16.9 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 13.7C18.1 14.2 19.6 16 19.6 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconBookOpen({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 6.5C10.5 5.3 8 4.7 4.5 4.7V17.7C8 17.7 10.5 18.3 12 19.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 6.5C13.5 5.3 16 4.7 19.5 4.7V17.7C16 17.7 13.5 18.3 12 19.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 6.5V19.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconWorld({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 12H20.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3.5C14.5 6 15.7 9 15.7 12C15.7 15 14.5 18 12 20.5C9.5 18 8.3 15 8.3 12C8.3 9 9.5 6 12 3.5Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 12H19.5M19.5 12L14 6.5M19.5 12L14 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 5.5L15.5 12L9 18.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 6.5L12 12.5L19.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path
                d="M8.3 4.5H6.2C5.3 4.5 4.5 5.3 4.5 6.2C4.5 14.7 11.3 21.5 19.8 21.5C20.7 21.5 21.5 20.7 21.5 19.8V17.7C21.5 16.9 21 16.2 20.2 15.9L17.9 15.1C17.2 14.8 16.4 15 15.9 15.6L15 16.7C13.1 15.6 9.9 12.4 8.8 10.5L9.9 9.6C10.5 9.1 10.7 8.3 10.4 7.6L9.6 5.3C9.3 4.5 8.8 4.5 8.3 4.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.5 21V13.5H17L17.4 10.2H14.5V8.3C14.5 7.4 14.8 6.8 16.1 6.8H17.5V3.9C17.2 3.9 16.3 3.8 15.3 3.8C13.1 3.8 11.5 5.1 11.5 7.6V10.2H9V13.5H11.5V21"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCoin({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
            <path
                d="M12 7.5V16.5M14.3 9.4C14.3 8.4 13.3 7.6 12 7.6C10.7 7.6 9.7 8.4 9.7 9.4C9.7 10.4 10.5 10.8 12 11.2C13.5 11.6 14.3 12.1 14.3 13.1C14.3 14.1 13.3 14.9 12 14.9C10.7 14.9 9.7 14.1 9.7 13.1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
            />
        </svg>
    );
}

// -------- the signature lancet arch, used atop cards site-wide --------
export function ArchTop({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true">
      <path
        d="M1 23C1 10.8 9.6 1 20 1C30.4 1 39 10.8 39 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M9 23C9 14.7 13.8 8 20 8C26.2 8 31 14.7 31 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
    </svg>
  );
}
