import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <nav className="bg-[#333333] px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <CastleIcon />
        <span className="text-xl font-bold text-white">React Rooks</span>
      </div>
      <div className="flex items-center space-x-8">
        {/* <button className="text-white">
          Play Online
        </button> */}
        <button className="text-white pr-40">
          Login
        </button>
      </div>
    </nav>
  )
}

function CastleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
      <path d="M18 11V4H6v7" />
      <path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" />
      <path d="M22 11V9" />
      <path d="M2 11V9" />
      <path d="M6 4V2" />
      <path d="M18 4V2" />
      <path d="M10 4V2" />
      <path d="M14 4V2" />
    </svg>
  )
}