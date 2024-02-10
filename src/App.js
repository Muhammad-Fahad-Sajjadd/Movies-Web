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
  const isLoggedIn = localStorage.getItem('currentUser');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          {isLoggedIn ? (
            <>
              <Route path="/movies" element={<MoviesScreen />} />
              <Route path="/updateUserProfile" element={<UpdateProfileScreen />} />
              <Route path="/recommendedMovies" element={<RecommendedMoviesScreen />} />
            </>
          ) : (
            <Route element={<Navigate to="/login" />} />
          )}
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
