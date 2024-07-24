import { GithubIcon, Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div>
      <footer className="p-4 bg-background rounded-lg shadow md:px-6 md:py-8 w-full">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            target="_blank"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Image
              src="/Icon.svg"
              width={30}
              height={30}
              alt="React Rooks Logo"
            />
            <span className="self-center text-xl font-semibold font-mono whitespace-nowrap">
              React Rooks
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 sm:mb-0 gap-2">
            <li>
              <Link href={"https://github.com/0xadityaa/React-Rooks-UI"}>
                <GithubIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-row justify-center items-center space-x-2 text-center text-xl font-sans font-semibold">
          <span>Made with ❤️ using</span>
          <Image
            src="/Nextjs.svg"
            alt="nextjs logo"
            height={30}
            width={30}
            className="dark:bg-white rounded-full"
          />
          <Image src="/Mongodb.svg" alt="mongodb logo" height={30} width={30} />
          <Image src="/Wasm.svg" alt="wasm logo" height={30} width={30} />
        </div>
      </footer>
    </div>
  );
};
