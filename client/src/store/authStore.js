import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:4000/api' 

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	verifyEmail: async (email, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verifyUser`, { 
				email: email,
				name: name,
			});

			set({ isLoading: false, error: null });
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`,
				{ 
					email: email, 
					password: password 
				}
			);
			if(response.data.message==="Incorrect Password"){
				set({
					error: "Incorrect Password",
					isLoading: false,
				});
            }
            else if(response.data.message==="Please Register"){
				set({
					error: "Please Register",
					isLoading: false,
				});
            }
            else if(response.data.message==="success"){
                localStorage.setItem('authToken', response.data.token);
				set({
					isAuthenticated: true,
					error: null,
					isLoading: false,
				});   
            }
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			localStorage.removeItem("authToken");
			set({ isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.post(`${API_URL}/verifyToken`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
			if(response.data.valid === true){
				set({ isAuthenticated: true, isCheckingAuth: false });
			}
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
}));
