import React from "react";
import SideBar from "./components/Sidebar";
import "../assets/css/sb-admin-2.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import UserList from "./pages/users/List";
import UserDetail from "./pages/users/Detail";
import ManageRole from "./pages/Role/ManageRole";
import ArticleList from "./pages/Article/List";
import ReportList from "./pages/Article/Report";
import Notify from "./pages/Notification/notify";
import JobList from "./pages/Job/List";
import JobDetail from "./pages/Job/Detail";

export default function AdminCP(props) {
    return(<>
        <div id="wrapper"> 
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />

                        <Route path="user" element={<UserList />} />
                        <Route path="user/detail/:id" element={<UserDetail />} />
                        <Route path="user/detail" element={<UserDetail />} />
                        <Route path="role" element={<ManageRole />} />

                        <Route path="article" element={<ArticleList />} />
                        <Route path="article/report" element={<ReportList />} />

                        <Route path="job" element={<JobList />} />
                        <Route path="job/detail" element={<JobDetail />} />
                        <Route path="job/detail/:id" element={<JobDetail />} />

                        <Route path="notification" element={<Notify />} />

                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    </>)
}