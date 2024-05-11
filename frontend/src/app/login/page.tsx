import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <div className="flex justify-center items-center  rounded-md h-lvh">
        <div className="bg-white w-[24vw] h-[60vh] rounded-lg p-5">
          <div className=" flex justify-center">
            <div className=" my-5">
              <Image
                src="/logo.png"
                width={120}
                height={100}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className=" flex  justify-center mx-10">
            <div>
              <p className=" ml-2 my-5 text-2xl">Login</p>

              <TextField
                required
                id="outlined-required"
                label="Email"
                className=" w-full my-3"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                className=" w-full"
              />

              <div className="flex flex-col mx-2 gap-3"></div>

              <Button
                className="w-full my-5 font-semibold"
                variant="contained"
                sx={{
                  backgroundColor: "#fe5c84",
                  "&:hover": {
                    backgroundColor: "pink",
                  },
                }}
              >
                sign in
              </Button>
            </div>
          </div>
          <div className=" flex justify-center my-5 text-sm">
            <p>
              Dont have an account?{" "}
              <Link href="/register">
                <span className=" text-sky-800">Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
