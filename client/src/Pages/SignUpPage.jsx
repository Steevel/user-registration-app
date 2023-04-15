import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState: { errors } } = useForm()

  const signupHandler = async (formData) => {

    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/signup`, formData, { withCredentials: true })

      if (data.success) {
        localStorage.setItem('LoggedIn', true);
        navigate('/home')
      }
    } catch (e) {
      toast.error(`${e.response.data.message}`, toastOptions);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black w-72 lg:w-80 sm:text-4xl">
            Sign Up
          </h2>
          <p className="mt-2 text-base text-gray-600 ">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Sign In
            </Link>
          </p>

          <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(signupHandler)} noValidate>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="text"
                    placeholder="Enter You Full Name"
                    id="name"
                    {...register('name', {
                      required: {
                        value: true,
                        message: "Name is required"
                      }
                    })}
                  ></input>
                </div>
                <p className="text-red-500">{errors.name?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    {...register("email",
                      {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Invalid email format'
                        },
                      })
                    }
                  ></input>
                </div>
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="password"
                    placeholder="Enter Your Password"
                    autoComplete="on"
                    id="password"
                    {...register('password', {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: "Password should be atleast 8 characters long" },
                    })}
                  ></input>
                </div>
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <button className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                  Get started
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
  );
}

export default SignUpPage