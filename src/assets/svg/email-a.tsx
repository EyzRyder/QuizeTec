import { SVGAttributes } from "react";

export default function EmailA({ ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        filter="url(#filter0_d_370_230)"
        stroke="#1E40AF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 16a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M19 8v5a3 3 0 006 0v-1a10 10 0 10-4 8" />
      </g>
    </svg>
  );
}
