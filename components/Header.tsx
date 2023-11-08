import React from "react";
import Avatar from "./Avatar";
import { ProfileData } from "@/types/profile";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  profile: ProfileData;
  loading: boolean;
  user: User | undefined;
}

const Header = ({ profile, loading, user }: HeaderProps) => {
  return (
    <header className="bg-sky-600 fixed w-[100vw] py-4 px-6 flex justify-between text-white items-center z-[10000]">
      {user ? (
        <Link href={"/account"} passHref>
          <div className="flex gap-2 items-center">
            <Avatar
              uid={(profile && profile.id) || ""}
              url={profile.avatar_url || ""}
              size={40}
              hideUpload
            />
            <span className="font-bold text-sm">
              {loading
                ? "Loading..."
                : (profile.username && profile.username) || "Edit Profile"}
            </span>
          </div>
        </Link>
      ) : (
        <span className="text-white font-bold">Welcome</span>
      )}
      <Link href={"/"} passHref>
        <h1 className="text-white text-xl font-bold">Movie App</h1>
      </Link>
      {user ? (
        <form action="/auth/signout" method="post">
          <button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M215.469 332.802l29.863 29.864L352 256 245.332 149.333l-29.863 29.865 55.469 55.469H64v42.666h205.864l-54.395 55.469zM405.334 64H106.666C83.198 64 64 83.198 64 106.666V192h42.666v-85.333h298.668v298.668H106.666V320H64v85.334C64 428.802 83.198 448 106.666 448h298.668C428.802 448 448 428.802 448 405.334V106.666C448 83.198 428.802 64 405.334 64z" />
            </svg>
          </button>
        </form>
      ) : (
        <span className="text-white font-bold">Logged Out</span>
      )}
    </header>
  );
};

export default Header;
