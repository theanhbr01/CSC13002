import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignInAndSignUp } from "./pages/SignInSignUp/index";
import RecruiterJobPage from "./pages/Job/RecruiterJobs";
import { HomePage } from "./pages/Home/index";
import Article from "./pages/Article/index";
import Message from "./pages/Message/index";
import Notification from "./pages/Notification/index";
import Profile from "./pages/Profile/index";
import SearchResult from "./pages/SearchResult/index";
import { Admin } from "./pages/Admin/index";
import Navbar from "./components/UI/NavigationBar";
import { JobDetails } from "./components/Job/JobDetails";
import "./assets/css/App.css";
import {
    NAV_GENERAL_ITEMS,
    NAV_RECRUITER_ITEMS,
    NAV_JOBSEEKER_ITEMS,
} from "./Data/NavigationItems";

import reportWebVitals from "./reportWebVitals";

import AuthApi from "./api/AuthApi";
import AuthVerify from "./common/AuthVerify";
import SecuredRoute, { checkUserPermission } from "./components/SecuredRoute";
import { data } from "jquery";
import AdminCP from "./AdminCP";

const container = document.getElementById("root");
const root = createRoot(container);

const Logout = ({ setUser }) => {
    AuthApi.Logout();
    setUser(null);
    return <Navigate to="/" />;
};

const SecuredProfile = ({ user }) => {
    if (user) return <Navigate to={"/p/" + user.UserName} />;
    else return <Navigate to="/" />;
};

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

const App = (props) => {
    var currentUser = AuthApi.GetCurrentUser();
    if (currentUser) currentUser = currentUser.data;
    console.log(currentUser);
    const [user, setUser] = useState(currentUser);

    console.log(window.location);

    let navigation_items = NAV_GENERAL_ITEMS;

    if (user) {
        if (user.Roles === "recruiter") navigation_items = NAV_RECRUITER_ITEMS;
        else if (user.Roles === "job-seeker") navigation_items = NAV_JOBSEEKER_ITEMS;
    }

    const rerender = useForceUpdate();
    return (
        <div>
            {window.location.pathname !== "/auth" && (
                <Navbar items={navigation_items} rerenderApp={rerender} />
            )}
            <Routes>
                {/* Homepage */}
                <Route path="/*" element={<HomePage />} />
                <Route path="/homepage" element={<HomePage />} />

                {/* Search */}
                <Route path="s/*" element={<SearchResult />} />

                {/* Profile */}
                <Route path="p/*" element={<Profile user={user} />} />

                {/* Login */}
                <Route path="auth" element={<SignInAndSignUp setUser={setUser} />} />

                {/* Job */}
                <Route
                    path="myjobs/*"
                    element={
                        <SecuredRoute user={user} permission="route.recruiter" redirectTo="/">
                            <RecruiterJobPage />
                        </SecuredRoute>
                    }
                />
                <Route path="job/detail/:jobId" element={<JobDetails />} />

                {/* Article */}
                <Route path="articles" element={<Article />} />

                {/* Messages */}
                <Route
                    path="messages"
                    element={
                        <SecuredRoute user={user} permission="route.authenticated">
                            <Message />
                        </SecuredRoute>
                    }
                />

                {/* Notifications */}
                <Route
                    path="notifications"
                    element={
                        <SecuredRoute user={user} permission="route.authenticated">
                            <Notification />
                        </SecuredRoute>
                    }
                />

                {/* Profile */}
                <Route path="profile" element={<SecuredProfile user={user} />} />

                {/* Logout */}
                <Route
                    path="logout"
                    element={
                        <SecuredRoute user={user} permission="route.authenticated">
                            <Logout setUser={setUser} />
                        </SecuredRoute>
                    }
                />

                {/* Admin Control Panel */}
                <Route
                    path="AdminCP/*"
                    element={
                        <SecuredRoute user={user} permission="route.admin">
                            <Admin />
                        </SecuredRoute>
                    }
                />
            </Routes>
        </div>
    );
};

root.render(
    <>
        <BrowserRouter>
            <App />
            <AuthVerify />
        </BrowserRouter>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
