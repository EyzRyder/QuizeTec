import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  name: string;
  roles: string[];
  fbImg: string;
  img: string;
  githubLink: string;
  linkedInLink: string;
  instaLink?: string;
}

export default function AvatarCard({
  name,
  roles,
  fbImg,
  img,
  githubLink,
  linkedInLink,
  instaLink,
}: AvatarProps) {
  return (
    <div className="flex flex-col space-y-3 p-4 justify-center items-left">
      <Avatar className="h-20 w-20 rounded-xl">
        <AvatarImage src={img} alt={name} className="rounded-full" />
        <AvatarFallback>{fbImg}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <p className="text-xl text-blue-800 font-bold">{name}</p>
        {roles.map((role) => (
          <p className="text-sm w-36 text-[#333333] font-medium">{role}</p>
        ))}
      </div>
      <div className="flex  gap-2 flex-row mr-16">
        <a
          href={linkedInLink}
          target="_blank"
          rel="noopener"
          className="w-10 h-10 flex-col rounded-full bg-blue-600/10 border-blue-600 border-2 flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M13.334 6.667a5 5 0 015 5V17.5H15v-5.833a1.667 1.667 0 00-3.333 0V17.5H8.334v-5.833a5 5 0 015-5zM5 7.5H1.667v10H5v-10zM3.333 5a1.667 1.667 0 100-3.333 1.667 1.667 0 000 3.333z"
              stroke="#2563EB"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener"
          className="w-10 h-10 flex-col rounded-full bg-blue-600/10 border-blue-600 border-2 flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 18.333V15a4 4 0 00-.833-2.917c2.5 0 5-1.666 5-4.583a4.503 4.503 0 00-.834-2.917 6.162 6.162 0 000-2.916s-.833 0-2.5 1.25a17.934 17.934 0 00-6.666 0c-1.667-1.25-2.5-1.25-2.5-1.25a5.765 5.765 0 000 2.916A4.502 4.502 0 003.333 7.5c0 2.917 2.5 4.583 5 4.583A3.929 3.929 0 007.5 15v3.333M7.5 15c-3.759 1.667-4.167-1.667-5.833-1.667"
              stroke="#2563EB"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{" "}
        </a>
        {instaLink && (
          <a
            href={instaLink}
            target="_blank"
            rel="noopener"
            className="w-10 h-10 flex-col rounded-full bg-blue-600/10 border-blue-600 border-2 flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                clipPath="url(#clip0_376_324)"
                stroke="#2563EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.166 1.667H5.833a4.167 4.167 0 00-4.167 4.166v8.334a4.167 4.167 0 004.167 4.166h8.334a4.167 4.167 0 004.166-4.166V5.833a4.167 4.167 0 00-4.166-4.166z" />
                <path d="M13.333 9.475a3.334 3.334 0 11-6.595.978 3.334 3.334 0 016.595-.978zM14.584 5.417h.008" />
              </g>
              <defs>
                <clipPath id="clip0_376_324">
                  <path fill="#fff" d="M0 0H20V20H0z" />
                </clipPath>
              </defs>
            </svg>{" "}
          </a>
        )}
      </div>
    </div>
  );
}
