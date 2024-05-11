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
        <div className="bg-white w-[35vw] h-[60vh] rounded-lg p-5">
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
          <div className=" flex  justify-center">
            <div>
              <p className=" ml-2 my-2 text-2xl">Register</p>
              <div className="flex">
                <div className="flex flex-col mx-2 gap-3">
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                  />
                  <TextField required id="outlined-required" label="Email" />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                  />
                </div>

                <div className="flex flex-col mx-2 gap-3">
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                  />
                  <TextField required id="outlined-required" label="Email" />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                  />
                </div>
              </div>
              <Button
                className="mx-2 my-5"
                variant="contained"
                sx={{
                  backgroundColor: "#fe5c84",
                  "&:hover": {
                    backgroundColor: "pink",
                  },
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
          <div className=" flex justify-center my-5 text-sm">
            <p>
              Already have account?{" "}
              <Link href="/login">
                <span className=" text-sky-800">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
