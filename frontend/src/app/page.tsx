import Header from "./componants/Header";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-lvh py-10 px-20">
          {/* categories */}
          <div className="flex gap-x-5">
            <Button
              className=" px-10"
              variant="outlined"
              sx={{
                padding: "12px 24px", // Adjust padding as desired
                borderColor: "#fe5c84", // Border color
                textTransform: "none",
                color: "#fe5c84", // Text color
                fontWeight: "bold", // Make text bold
                borderRadius: "25px", // Make button more round
                "&:hover": {
                  backgroundColor: "#fe5c84", // Background color on hover
                  color: "#fff", // Text color on hover
                },
              }}
            >
              Pork
            </Button>

            <Button
              className=" shadow-none px-10"
              variant="contained"
              sx={{
                padding: "12px 24px",
                borderColor: "#fe5c84",
                color: "white",
                fontWeight: "bold",
                borderRadius: "25px",
                textTransform: "none",
                backgroundColor: "#fe5c84",
                "&:hover": {
                  backgroundColor: "#fe5c84",
                  color: "#fff",
                },
              }}
            >
              Beef
            </Button>
          </div>

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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
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
