import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const getActiveNav = (path: string) => {
    const activePath = router.pathname;
    return activePath === path ? "text-blue-500" : "";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-gray-800 text-white py-4 px-4 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className={getActiveNav("/")}>
            <Link className="text-xl font-bold" href="/">
              Home
            </Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li className={getActiveNav("/portfolio")}>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li className={getActiveNav("/contact")}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-8 flex-grow">{children}</main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Dynamic Portfolio. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
