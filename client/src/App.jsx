import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import MessagePage from "./components/MessagePage";
import Profile from "./components/Profile";
import SearchUser from "./components/SearchUser";
import Notifications from "./components/Notifications";
import Create from "./components/Create";


// // protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	if (isAuthenticated ) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div
			className='min-h-screen bg-gradient-to-br
              from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>   

			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
		 

			<Routes>
				<Route
					path='/'
					element={
					  <DashboardPage/>
					}		
				/>
				         
                <Route path="/profile" element={<Profile />} /> 
				<Route path="/search" element={<SearchUser />} /> 
				<Route path="notifications" element={<Notifications />} /> 
				<Route path="create" element={<Create/>} /> 

                
				<Route path="/messages" element={<MessagePage />} />
				
         
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verifyEmail' element={<EmailVerificationPage />} />

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

		 
			<Toaster />
		</div>
	);
}

export default App;
