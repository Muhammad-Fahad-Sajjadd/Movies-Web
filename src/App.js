import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./auth-module/user-login/login";
import MoviesScreen from "./Pages/MovieScreen";
import RecommendedMoviesScreen from "./Pages/RecommendedMoviesScreen";
import UserSignUp from "./auth-module/user-registration/signup";
import UpdateProfileScreen from "./Pages/UpdateProfileScreen";
import Layout from "./Layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('currentUser');
  console.log('Is Logged In',isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes accessible to all users */}
          <Route index element={<UserLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          {/* Protected routes accessible only to logged-in users */}
          {isLoggedIn ? (
            <>
              <Route path="/movies" element={<MoviesScreen />} />
              <Route path="/updateUserProfile" element={<UpdateProfileScreen />} />
              <Route path="/recommendedMovies" element={<RecommendedMoviesScreen />} />
            </>
          ) : (
            // Redirect to login page if not logged in
            <Navigate to="/login" />
          )}
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
