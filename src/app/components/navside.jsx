/* eslint-disable @next/next/no-img-element */
"use client";
import { logout } from "@/actions/auth";
import { RiHome5Line, RiLogoutBoxLine, RiSearchLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { getTimelines } from "../../actions/timeline";
import { getUser } from "../../actions/profile";
import { useEffect, useState } from "react";
import SearchBox from "./searchBox";

export default function Navside() {
  const [username, setusername] = useState("");
  useEffect(() => {
    getProfile();
  });
  async function getProfile() {
    const user = (await getUser()).username ?? "";
    setusername(user);
  }
  const [searchActive, setSearchActive] = useState(false);
  function handleClickSearch() {
    setSearchActive(!searchActive);
  }
  return (
    <div className="sticky top-16 flex flex-row gap-3 items-center">
      {/* light mode - tight side navigation with red notification */}
      <div className="py-6 px-4 text-gray-900 bg-white rounded-3xl text-center shadow-lg flex flex-col gap-5 items-center">
        <Link href="/">
          <img src="/image/logo-black.png" alt="alt placeholder" className="w-10 h-10 mx-auto mb-5" />
        </Link>
        <Link href={`/timelines/${username}`}>
          <span className="cursor-pointer text-gray-500 hover:text-[#333333] px-2 block mb-5">
            <RiHome5Line size={40} />
          </span>
        </Link>
        <span className="cursor-pointer text-gray-500 hover:text-[#333333] px-2 block mb-5" onClick={() => handleClickSearch()}>
          <RiSearchLine size={40} />
        </span>
        <Link href={"/accounts"}>
          <span className="cursor-pointer text-gray-500 hover:text-[#333333] px-2 block mb-5 relative">
            <Image src="/image/profile-picture.png" alt="alt placeholder" width={40} height={40} className=" mx-auto bg-[#666666] rounded-full" />
            <span className="absolute 2 right-0 top-0 -mt-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full border-2 border-white ">3</span>
          </span>
        </Link>

        <form action={logout}>
          <button className="" type="submit">
            <span className="cursor-pointer text-gray-500 hover:text-[#333333] px-2 block">
              <RiLogoutBoxLine size={40} />
            </span>
          </button>
        </form>
      </div>
      <SearchBox status={searchActive} />
    </div>
  );
}
