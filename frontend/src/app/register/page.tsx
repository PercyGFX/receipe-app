'use client'
import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

function Page({}: Props) {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      password: Yup.string()
        .min(8, "Enter strong Password")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { email, password, firstName, phone, lastName } = values;
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/register`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, firstName, phone, lastName }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        } else {
          toast.success("Registration Success");
          const data = await response.json();
          
          
          router.push("/login");
        }
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center rounded-md h-lvh">
        <div className="bg-white w-11/12 md:w-7/12 lg:w-4/12 h-6/12 rounded-lg p-5">
          <div className=" flex justify-center">
            <div className=" my-5">
              <Image src="/logo.png" width={120} height={0} alt="Logo" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className=" w-full lg:w-auto">
              <p className=" ml-2 my-2 text-2xl">Register</p>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col lg:flex-row w-full">
                  <div className="flex flex-col mx-2 gap-3 mb-4 lg:mb-0">
                    <TextField
                      required
                      id="outlined-required"
                      label="First Name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                    <TextField
                      required
                      id="outlined-required"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </div>
                  <div className="flex flex-col mx-2 gap-3">
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <TextField
                      required
                      id="outlined-password-input"
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                  </div>
                </div>
                <Button
                  className="mx-2 my-5"
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#fe5c84",
                    "&:hover": {
                      backgroundColor: "pink",
                    },
                  }}
                >
                  Create Account
                </Button>
              </form>
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

export default Page;