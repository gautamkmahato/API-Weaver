'use client'

import Link from "next/link";
import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation"; // Import usePathname
import { LayoutDashboard, Code, HelpCircle, DiamondPercent, Dock } from "lucide-react"; // Import icons from lucide-react
import logo from '../../../public/assets/logo-4.png';
import Image from "next/image";


export default function Sidebar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname(); // Get the current route

  if (!isSignedIn) { 
    return(
      <>
        <RedirectToSignIn />
      </>
    ) 
  }

  return (
    <>
      <div className="flex h-screen w-64 flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <Link href="/">
            <span className="grid place-content-start rounded-lg text-xs text-gray-600">
              <Image src={logo} alt="logo" width="120" height="120" />
            </span>
          </Link>
          

          <ul className="mt-6 space-y-1">

            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === "/dashboard" ? "bg-iconBackground text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" /> {/* Dashboard Icon */}
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/playground"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === "/dashboard/playground" ? "bg-iconBackground text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Code className="h-4 w-4" /> {/* Playground Icon */}
                <span>Playground</span>
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === "/documentation" ? "bg-iconBackground text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Dock className="h-4 w-4" /> {/* Dashboard Icon */}
                <span>Documentation</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/pricing"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === "/dashboard/pricing" ? "bg-iconBackground text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <DiamondPercent className="h-4 w-4" /> {/* Pricing Icon */}
                <span>Pricing</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/support"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  pathname === "/dashboard/support" ? "bg-iconBackground text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <HelpCircle className="h-4 w-4" /> {/* Support Icon */}
                <span>Support</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <Link href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
              <UserButton />
              <div>
                <p className="text-xs">
                  <strong className="block font-medium">{user?.fullName}</strong>
                  <span>{user?.primaryEmailAddress?.emailAddress}</span>
                </p>
              </div>
            </Link>
          </SignedIn>
        </div>
      </div>
    </>
  );
}