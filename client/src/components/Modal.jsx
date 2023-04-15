import { useState } from 'react'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL

const Modal = ({ isOpen, closeModal }) => {

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  // Click the background to close the modal
  const backdropClickClose = (e) => {
    if (e.target.id === "wrapper") {
      closeModal()
      setSubmitted(false)
      setEmail("")
    }
  }

  // Close modal
  const handleClose = (e) => {
    closeModal()
    setSubmitted(false)
    setEmail("")
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email.trim().length > 0) {

      try {
        setSending(true)
        const { data } = await axios
          .post(`${baseUrl}/api/auth/password/forgot`,
            { email },
            { withCredentials: true }
          )

        if (data.success) {
          setSubmitted(true)
          setEmail("")
        } else {
          setSending(false)
        }

      } catch (e) {
        console.log("error", e);
      }

    }
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm' id="wrapper" onClick={backdropClickClose}>
      <div id="content" role="main" className="w-full max-w-md p-6 mx-auto">
        <div className="bg-white shadow-lg mt-7 rounded-xl">
          <div className="p-4">
            <div className="flex flex-col">
              <button className='fixed place-self-end' onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              </button>
            </div>
            {submitted ? (<div >
              <div className="flex items-center justify-center w-20 h-20 mx-auto text-white bg-green-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className='w-16 h-16' viewBox="0 0 24 24" id="check">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path fill="#fff" d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z">
                  </path>
                </svg>
              </div>
              <div className='mt-3 text-center text-md'>
                We've sent you an email with a link to reset your password.
                If you did not receive the email in your inbox or junk folder, you may not have an account with that email.
              </div>
            </div>)
              : (
                <div>
                  <div className="pt-5 text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 ">Forgot password?</h1>
                    <p className="mt-2 text-sm text-gray-600 ">
                      Remember your password?
                      <button className="font-medium text-indigo-600 decoration-2 hover:underline" onClick={handleClose}>
                        &nbsp;Login here
                      </button>
                    </p>
                  </div>

                  <div className="mt-5">
                    <form>
                      <div className="grid gap-y-4">
                        <div>
                          <label htmlFor="email" className="block mb-2 ml-1 text-sm font-bold ">Email address</label>
                          <div className="relative">
                            <input type="email" id="email" name="email" className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required aria-describedby="email-error" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                          </div>
                        </div>
                        <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 " onClick={handleSubmit}>{sending ? "Sending Email..." : "Reset password"}</button>
                      </div>
                    </form>
                  </div>

                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal