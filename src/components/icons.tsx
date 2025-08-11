import type { SVGProps } from 'react';

export const CapacitorSymbol = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="40"
    viewBox="0 0 60 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 20H22" stroke="currentColor" strokeWidth="2" />
    <path d="M38 20H60" stroke="currentColor" strokeWidth="2" />
    <path d="M22 10V30" stroke="currentColor" strokeWidth="2" />
    <path d="M38 10V30" stroke="currentColor" strokeWidth="2" />
  </svg>
);
