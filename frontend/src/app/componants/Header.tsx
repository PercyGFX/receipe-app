import React from "react";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

function Header({}: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };
  return (
    <div className="flex justify-center ">
      <div className="flex justify-between bg-white px-20 items-center w-10/12">
        <div>
          {" "}
          <Image
            src="/logo.png"
            width={120}
            height={0}
            alt="Picture of the author"
          />
        </div>
        <div className="flex gap-x-6 uppercase">
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/favourite">favourites</Link>
          </p>
        </div>
        <div>
          <LogoutIcon className="hover:cursor-pointer" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Header;
