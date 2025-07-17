"use client"

import { useUser } from '@/app/context/UserContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'


const Navbar = () => {

  const {user} = useUser();

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between lg:gap-0 gap-10 items-center mx-auto h-16 px-3">
        <Link href={"/"}>
          <h1 className="text-2xl font-black flex items-center">
            Project Management
          </h1>
        </Link>
        <div className="max-w-md  flex-grow">
          <Input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
            {
              user ? (
                <Link href={"/dashboard"}>
                    <Button variant={"outline"}>Dashboard</Button>
                </Link>
              ) : (
                <Link href={"/login"}>
                    <Button variant={"outline"}>Login</Button>
                </Link>
              )
            }
        </nav>
      </div>
    </header>
  )
}

export default Navbar