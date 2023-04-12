import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center">
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

          <form action="#" method="POST" className="mt-8">
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
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="text"
                    placeholder="Enter You Full Name"
                    id="name"
                  ></input>
                </div>
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
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                  ></input>
                </div>
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
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="email"
                    placeholder="Enter Your Password"
                    id="password"
                  ></input>
                </div>
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

        </div>
      </div>
    </div>
  );
}

export default SignUpPage