"use client";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  History,
  LayoutGrid,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generateInitials } from "@/lib/generateInitials";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ setShowSidebar }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      router.replace("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading User...</p>;
  }

  if (status === "unauthenticated" || !session) {
    return null;
  }

  const userName = session.user?.name?.split(" ")[0] ?? "";
  const initials = generateInitials(session.user?.name);

  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between px-8 border-b border-slate-200">
      <button onClick={() => setShowSidebar(true)} className="lg:hidden">
        <AlignJustify className="w-6 h-6" />
      </button>
      <div className="flex gap-3">
        {/* Recent Activities */}
        <button className="hidden lg:block">
          <History className="w-6 h-6" />
        </button>
        {/* Search */}
        <SearchInput />
      </div>
      <div className="items-center hidden sm:flex">
        {/* Plus Icon */}
        <div className="flex pr-2 border-r border-gray-300">
          <button className="p-1 rounded-lg bg-blue-600">
            <Plus className="w-4 h-4 text-slate-50" />
          </button>
        </div>
        {/* Users */}
        <div className="flex pr-2 space-x-2">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Users className="w-4 h-4 text-slate-900" />
          </button>
        </div>
        {/* Bell */}
        <div className="flex pr-2">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Bell className="w-4 h-4 text-slate-900" />
          </button>
        </div>
        {/* Settings */}
        <div className="flex border-r border-gray-300">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Settings className="w-4 h-4 text-slate-900" />
          </button>
        </div>
        {/* Company */}
        <div className="flex ml-2 gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center">                
                <span>{userName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => signOut()}>Logout</button>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button>
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="user image"
                width={96}
                height={96}
                className="w-8 h-8 rounded-full border border-slate-800"
              />
            ) : (
              <div className="w-8 h-8 rounded-full border border-slate-800 bg-white flex items-center justify-center text-sm font-medium">
                {initials || "U"}
              </div>
            )}
          </button>
          <button>
            <LayoutGrid className="w-6 h-6 text-slate-900" />
          </button>
        </div>
      </div>
      <button className="sm:hidden">
        <Image
          src="/user.png"
          alt="user image"
          width={96}
          height={96}
          className="w-8 h-8 rounded-full border border-slate-800"
        />
      </button>
    </div>
  );
}