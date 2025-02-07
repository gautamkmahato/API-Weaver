import { Plus } from 'lucide-react'
import React from 'react'

export default function Button({ name }: any) {
    return (
        <>
            <a
                className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                href="#"
            >
                <span className="text-sm font-medium"> {name} </span>
                <Plus />
            </a>
        </>
    )
}
