import avatarPlaceholder from "@/assets/avatar_placeholder.png";
import { Lock, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
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

interface UserButtonProps {
  user: User;
}

export default async function UserButton({ user }: UserButtonProps) {
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
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {user?.role && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Lock className="mr-2 h-4 w-4" />
                {user.role}<span className="text-xs">(role)</span>
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
              className="flex w-full items-center text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
