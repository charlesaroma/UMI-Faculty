import apiRequest from "../../../utils/apiRequestUrl.js"


/* ********** ERROR HANDLING ********** */

const errorHandling = (error: any) => {
    if (error?.response) {
        throw {message: `Error ${error.response.status}: ${error.response.statusText}. ${error.response?.data?.message}`}
    } else if (error.request) {
        throw {message: "No response from server. Please check your network connection."}
    } else {
        throw {message: `Request failed: ${error.message}`}
    }
}

/* ********** AUTH ********** */

export const loginFaculty = async (user: any) => {
    try {
        const response = await apiRequest.post("/faculty/login", user)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

export const getFacultyProfile = async () => {
    try {
        const response = await apiRequest.get("/faculty/profile")
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}


