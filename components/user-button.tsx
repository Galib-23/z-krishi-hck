import avatarPlaceholder from "@/assets/avatar_placeholder.png";
import { Lock, LogOut, Settings } from "lucide-react";
import { signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentProfile } from "@/lib/current-profile";


export default async function UserButton() {
  const profile = await currentProfile();
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        {
          profile?.image ? (
            <Button size="icon" className="flex-none rounded-full border-green-700 border-2 shadow-md hover:border-green-500">
              <Image
                src={profile?.image || avatarPlaceholder}
                alt="User profile picture"
                width={50}
                height={50}
                className="aspect-square rounded-full bg-background object-cover"
              />
            </Button>) : (
            <h1>User</h1>
          )
        }
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-3" asChild>
            <Link className="cursor-pointer hover:bg-gray-200" href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {profile?.role === 'ADMIN' && (
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-3" asChild>
              <Link className="cursor-pointer hover:bg-gray-200" href="/admin">
                <Lock className="mr-2 h-4 w-4" />
                DashBoard<span className="text-xs">({profile?.role})</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button
              type="submit"
              className="flex w-full items-center text-red-500 hover:bg-gray-200 p-2 rounded-md"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
