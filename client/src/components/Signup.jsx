import React, { useState } from "react";
import { Container } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { SignUpUser } from "../../Api/ApiData";
import { toast } from "sonner"

function Signup() {
  const { register, handleSubmit } = useForm();
  const naviagte = useNavigate()
  const [isLoading, setLoading] = useState(false);

  async function handleSignup(data) {
    try {
      console.log(data)
      await SignUpUser(data,naviagte, setLoading);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  }

  return (
    <Container className=" flex justify-center items-center h-screen">
      <section className=" w-full sm:w-2/3 dark:bg-gray-900">
        <div className="flex flex-col items-center  justify-center py-8">
          <div className="w-full bg-white rounded-lg dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleSignup)}
              >
                <div>
                  <Input
                    {...register("firstName", { required: true })}
                    label="Name"
                    name="firstName"
                    placeholder="xyz"
                  />
                </div>
                <div>
                  <Input
                    {...register("username", { required: true })}
                    label="Username"
                    name="username"
                    placeholder="@abc__"
                  />
                </div>
                <div>
                  <Input
                    label="Your email"
                    name="email"
                    type="email"
                    placeholder="name@xyz.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: true })}
                  />
                </div>
                <div>
                  <Input
                    label="Confirm password"
                    name="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", { required: true })}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? "Loading...":"Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/signin"}
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Signup;
