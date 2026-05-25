import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
    if (isAxiosError(error)) {
        // Return message > data > status code > generic message
        return error.response?.data?.message ||
            error.response?.data ||
            `Error ${error.response?.status}` ||
            error.message;
    } else {
        return "An unexpected error occurred";
    }
}

export default axiosErrorHandler;