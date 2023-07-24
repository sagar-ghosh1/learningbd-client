import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import MyCollege from "../Pages/MyCollege/MyCollege";
import Register from "../Pages/Register/Register";
import LoginAndRegister from "../Layout/LoginAndRegister";
import Login from "../Pages/Login/Login";
import ResetPass from "../Pages/Login/ResetPass";
import Profile from "../Pages/Profile/Profile";
import CollegeCard from "../Pages/Home/CollegesCards/CollegeCard";
import CollegeDetails from "../Components/CollegeDetails/CollegeDetails";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import EditProfile from "../Pages/Profile/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/colleges",
        element: <Colleges></Colleges>,
      },
      {
        path: "/admission",
        element: <Admission></Admission>,
      },
      {
        path: "/mycollege",
        element: <MyCollege></MyCollege>,
      },
      {
        path: "/singleCollege/:id",
        element: <CollegeDetails></CollegeDetails>,
      },
      {
        path: "/admissionForm/:id",
        element: <AdmissionForm></AdmissionForm>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "editProfile",
        element: <EditProfile></EditProfile>,
      },
    ],
  },
  {
    path: "user",
    element: <LoginAndRegister></LoginAndRegister>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "reset",
        element: <ResetPass></ResetPass>,
      },
    ],
  },
]);
