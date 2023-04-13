import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  console.log("renderNavbar");
  const navigate = useNavigate()
  const prevLoginState = JSON.parse(localStorage.getItem('LoggedIn'));
  const [isLoggedIn, setIsLoggedIn] = useState(prevLoginState);

  const handleLogout = () => {
    localStorage.setItem('LoggedIn', false);
    setIsLoggedIn(false);
    navigate('/')
  }

  useEffect(() => {
    const currentValue = JSON.parse(localStorage.getItem('LoggedIn'));
    setIsLoggedIn(currentValue)
  }, [prevLoginState])

  return (

    <nav className="relative flex items-center justify-between px-4 py-4 shadow-md border-y">
      <Link className="text-3xl font-bold leading-none" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#4F46E5"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
      </Link>

      {isLoggedIn
        ? (
          <button className="rounded-md bg-indigo-600 px-3.5 pt-1 pb-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 " onClick={handleLogout}>
            Logout
          </button>
        )
        : (
          <div className="space-x-2">
            <button className="rounded-md border border-indigo-600 px-3.5 pt-1 pb-1.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-indigo-500 hover:text-white" onClick={() => navigate('/')}>
              Login
            </button>
            <button className="rounded-md bg-indigo-600 px-3.5 pt-1 pb-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 " onClick={() => navigate('/register')}>
              SignUp
            </button>
          </div >
        )
      }
    </nav >

  )
}

export default Navbar