'use client'

import { usePathname } from "next/navigation"
import links from '../utils/links'
import { Button } from "@tutorial/shared-lib"
import Link from "next/link"

function Sidebar(){
    const pathname = usePathname()
    return <aside className="py-4 px-8 bg-muted h-full">
        <div className="flex flex-col mt-20 gap-y-4">
            {links.map((link)=>{
                return <Button asChild key={link.href} variant={pathname === link.href ? 'default' : 'link'}><Link href={link.href} className="flex items-center gap-x-2">
                    {link.icon} <span className="capitalize">{link.label}</span></Link></Button>
            })}
        </div>
    </aside>
    return <h2 className="text-4xl">Sidebar</h2>
}

export default Sidebar