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

/* ********** STUDENT MANAGEMENT ********** */

export const getAllStudents = async () => {
    try {
        const response = await apiRequest.get("/faculty/students")
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

export const getStudent = async (studentId: string) => {
    try {   
        const response = await apiRequest.get(`/faculty/students/${studentId}`)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}   

export const getStudentStatuses = async (studentId: string) => {
    try {
        const response = await apiRequest.get(`/faculty/students/${studentId}/statuses`)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

/* ********** END OF STUDENT MANAGEMENT ********** */

/* ********** PROPOSAL MANAGEMENT ********** */

export const submitProposal = async (studentId: string, proposal: any) => {
    try {
        const response = await apiRequest.post(`/faculty/proposals/${studentId}`, proposal)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

export const getProposal = async (studentId: string, proposalId: string) => {
    try {
        const response = await apiRequest.get(`/faculty/proposals/${studentId}/${proposalId}`)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

export const gradeProposal = async (studentId: string, proposalId: string, grade: number, feedback: string) => {
    try {
        const response = await apiRequest.post(`/faculty/proposals/${studentId}/${proposalId}/grade`, { grade, feedback })
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

export const getStudentProposals = async (studentId: string) => {
    try {
        const response = await apiRequest.get(`/faculty/proposals/${studentId}`)
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

/* ********** END OF PROPOSAL MANAGEMENT ********** */
