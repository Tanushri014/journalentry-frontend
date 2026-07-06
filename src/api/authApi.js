// src/api/authApi.js

import api from "./api";

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
    return api.post("/auth/login", userData);
};

export const verifyOtp = (otpData) => {
    return api.post("/auth/verify", otpData);
};

export const deletePendingRegistration = (userEmail) => {
    return api.delete(`/auth/pending-registration/${userEmail}`);
};
export const resendOtp = (userEmail) => {
    return api.post("/auth/resend-otp", {
        userEmail,
    });
};