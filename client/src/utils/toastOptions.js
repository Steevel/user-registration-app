import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const successMessage = (message) => {
  toast.success(message, toastOptions);
};

export const errorMessage = (message) => {
  toast.error(message, toastOptions);
};
