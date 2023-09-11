import toast from "react-hot-toast";

export const handleApiError = (error: any) => {
    if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network error.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
};
