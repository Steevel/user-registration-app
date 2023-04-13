import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})

  // Edit user's name
  const editName = async () => {
    const editedName = prompt("Edit your name")

    if (editedName.trim() !== "") {
      const updatedInfo = { ...userInfo, name: editedName }

      try {
        await axios.put('http://localhost:4000/api/auth/updatedata', updatedInfo, { withCredentials: true })
        getUserData()
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Updated password
  const updatePassword = () => {
    const newPassword = prompt("Enter your new password")
    console.log(newPassword);
  }

  // Get user data
  const getUserData = async () => {
    try {
      const { data: { message: info } } = await axios.get('http://localhost:4000/api/auth/getdata', { withCredentials: true })
      setUserInfo(info)
    } catch (e) {
      console.log("Error ", e);
    }
  }

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

    if (!isLoggedIn) {
      navigate('/')
    } else {
      getUserData()
    }
  }, [])

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
            <div className="flex items-center justify-center">
              <h3 className="flex-1 text-xl font-medium leading-8 text-center text-gray-900">{userInfo.name}</h3>
              <button onClick={editName}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4F46E5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              </button>
            </div>
            <table className="my-3 text-xs">
              <tbody>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">Email</td>
                  <td className="px-2 py-2">{userInfo.email}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">ID</td>
                  <td className="px-2 py-2">{userInfo._id}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">Registered on</td>
                  <td className="px-2 py-2">{userInfo.createdAt}</td>
                </tr>

              </tbody></table>

            <div className="my-3 text-center">
              <button className="text-xs italic font-medium text-indigo-500 hover:underline hover:text-indigo-600" onClick={updatePassword}>Updated Password</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )

}

export default HomePage