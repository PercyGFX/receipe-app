"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// yup validations  //
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Page() {
  const router = useRouter();

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/login`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        } else {
          toast.success("Login Success");
          const data = await response.json();
          localStorage.setItem("token", data.data);
          router.push("/");
        }
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center  rounded-md h-lvh">
        <div className="bg-white w-3/12 h-6/12 rounded-lg p-5">
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
          <form onSubmit={formik.handleSubmit}>
            <div className=" flex  justify-center mx-10">
              <div>
                <p className=" ml-2 my-5 text-2xl">Login</p>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  className=" w-full my-3"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  className=" w-full"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
                  type="submit"
                >
                  sign in
                </Button>
              </div>
            </div>
          </form>
          <div className=" flex justify-center my-5 text-sm">
            <p>
              Don&apos;t have an account?{" "}
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

export default Page;
