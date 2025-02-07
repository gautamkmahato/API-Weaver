'use client'

import { useUser } from "@clerk/nextjs";
import Link from "next/link";


export default function Page() {
    const { isSignedIn, user, isLoaded } = useUser(); 
    // Early exit if user is not signed in or project_id is missing
    if (!isLoaded || !isSignedIn || !user) { 
        return(
            <>
                <div>
                <p><span className="text-blue-700 font-semibold"><Link href='/sign-in'>Sign In</Link></span> in to view this page</p>
                </div>
            </>
        )
    }
    return (
        <>
            <h1>Hello</h1>
        </>
    )
}
