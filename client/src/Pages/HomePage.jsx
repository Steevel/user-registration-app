
const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80vh]">

      <div className="max-w-xs">
        <div className="py-3 bg-white rounded-lg shadow-xl">
          <div className="p-2">
            <div className="flex items-center justify-center w-32 h-32 mx-auto bg-indigo-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4F46E5"
                className="w-24 h-24"
              >
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clipRule="evenodd"
                />
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
              </svg>
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-xl font-medium leading-8 text-center text-gray-900">Joh Doe</h3>
            <div className="text-xs font-semibold text-center text-gray-400">
              <p>Web Developer</p>
            </div>
            <table className="my-3 text-xs">
              <tbody><tr>
                <td className="px-2 py-2 font-semibold text-gray-500">Address</td>
                <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
              </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">Phone</td>
                  <td className="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">Email</td>
                  <td className="px-2 py-2">john@exmaple.com</td>
                </tr>
              </tbody></table>

            {/* <div className="my-3 text-center">
              <a className="text-xs italic font-medium text-indigo-500 hover:underline hover:text-indigo-600" href="#">View Profile</a>
            </div> */}

          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage