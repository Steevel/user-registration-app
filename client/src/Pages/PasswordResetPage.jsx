import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useRef } from "react";
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_URL

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const confPassElement = useRef(null);
  const { id } = useParams();
  const { register, control, handleSubmit, formState: { errors } } = useForm()

  const passwordResetHandler = async (passwordData) => {
    const { newpassword, confirmpassword } = passwordData;

    if (newpassword === confirmpassword) {

      try {
        const { data } = await axios.post(`${baseUrl}/api/auth/password/reset/${id}`, { newpassword })

        if (data.success) {
          navigate('/')
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      confPassElement.current.focus();
      confPassElement.current.innerText = "Password does not match"
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Reset Password
          </h2>
          {/* <p className="mt-2 text-base text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Create a free account
            </Link>
          </p> */}

          <form action="#" method="POST" onSubmit={handleSubmit(passwordResetHandler)} className="mt-8" noValidate>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  New Password{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="password"
                    placeholder="New Password"
                    id="newpassword"
                    {...register('newpassword', {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: "Password should be atleast 8 characters long" },
                    })}
                  ></input>
                </div>
                <p className="text-red-500">{errors.newpassword?.message}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmpassword"
                    className="text-base font-medium text-gray-900 "
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="confirmpassword"
                    autoComplete="on"
                    id="confirmpassword"
                    {...register('confirmpassword', {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: "Password should be atleast 8 characters long" },
                    })}
                  ></input>
                </div>
                <p ref={confPassElement} className="text-red-500">{errors.confirmpassword?.message}</p>
              </div>

              <div>
                <button className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                  Reset Password
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  )
}

export default PasswordResetPage