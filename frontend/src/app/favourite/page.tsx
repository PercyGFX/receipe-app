import Header from "../componants/Header";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-lvh py-10 px-20">
          {/* recipies */}
          <div className="mt-16">
            <div className="grid grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>
              {/* recipe card */}

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              {/* Repeat the above div block for remaining cards */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
