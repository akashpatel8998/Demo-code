import axios from "axios";
import { BASEURL, USER_LOGIN_URL } from "../lib/config";

// Login Profile API Call
export const userLogin = async (email, password) => {  
    const response = await axios.post(USER_LOGIN_URL, {
        email: email,
        password: password
    });
    return response;
};

// Get all Profile Details API Call
export const getAllDetail = async () => {  
    const response = await axios.get(`${BASEURL}`);
    return response;
};

// Get Single Profile Details API Call
export const getPersonDetail = async (id) => {  
    const response = await axios.get(`${BASEURL}/${id}`);
    return response;
};

// delete Single Profile Details API Call
export const deletePersonDetail = async (id) => {  
    const response = await axios.delete(`${BASEURL}/${id}`);
    return response;
};

// post Single Profile Details API Call
export const addPersonDetail = async (data) => {  
    const response = await axios.post(`${BASEURL}/`, data);
    return response;
};

// update Single Profile Details API Call
export const updatePersonDetail = async (data) => {  
    const response = await axios.put(`${BASEURL}/${data.id}`, data);
    return response;
};