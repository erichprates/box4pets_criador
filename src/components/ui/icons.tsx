import type { SVGProps } from "react";
import type { IconName } from "@/content/site";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  dna: (
    <>
      <path d="M8 2.5c0 4.75 8 4.75 8 9.5s-8 4.75-8 9.5" />
      <path d="M16 2.5c0 4.75-8 4.75-8 9.5s8 4.75 8 9.5" />
      <path d="M8.4 4.6h7.2M8.4 19.4h7.2M8 12h8M9.6 9.6h4.8M9.6 14.4h4.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  searchCheck: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.5-4.5" />
      <path d="M8 11l2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  brain: (
    <>
      <path d="M12 4a3 3 0 00-5.6 1.5A3 3 0 004 9a3 3 0 001 5 3 3 0 003 4 3 3 0 004 1V4z" />
      <path d="M12 4a3 3 0 015.6 1.5A3 3 0 0120 9a3 3 0 01-1 5 3 3 0 01-3 4 3 3 0 01-4 1" />
    </>
  ),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  paw: (
    <>
      <circle cx="7" cy="6" r="2" />
      <circle cx="17" cy="6" r="2" />
      <circle cx="4" cy="11" r="1.8" />
      <circle cx="20" cy="11" r="1.8" />
      <path d="M12 11c-3 0-6 4-6 7 0 2 2 3 6 3s6-1 6-3c0-3-3-7-6-7z" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a4 4 0 008 0V3" />
      <path d="M10 13v3a5 5 0 0010 0v-2" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  clinic: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M10 21v-5h4v5" />
      <path d="M12 9v3M10.5 10.5h3" />
    </>
  ),
  heart: <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" />,
};

export function Icon({ name, ...rest }: Props & { name: IconName }) {
  return <Base {...rest}>{paths[name]}</Base>;
}

export function ArrowUpRight(props: Props) {
  return (
    <Base {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </Base>
  );
}

export function ArrowRight(props: Props) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function Plus(props: Props) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function Check(props: Props) {
  return (
    <Base {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Base>
  );
}

export function Minus(props: Props) {
  return (
    <Base {...props}>
      <path d="M6 12h12" />
    </Base>
  );
}

export function Close(props: Props) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function Menu(props: Props) {
  return (
    <Base {...props}>
      <path d="M4 8h16M4 16h16" />
    </Base>
  );
}

export function Cartao(props: Props) {
  return (
    <Base {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M6.5 15h4" />
    </Base>
  );
}

/** Icone do WhatsApp (preenchido). */
export function WhatsApp({ size = 24, ...rest }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01Z" />
    </svg>
  );
}
