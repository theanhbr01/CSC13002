import React, { Component, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MyProfile from "./Profile/index";

export default function Profile() {
    document.body.style.background = '#18191a'
    return (
        <div style={{fontSize: "90%", color: "white"}}>
            <Routes>
                <Route index element={<MyProfile />} />
                {/* <Route path="jobs" element={<RecruiterJobPage />} />
                <Route path="articles" element={<RecruiterArticles userId={props.userId}/>} />
                <Route path="messages" element={<RecruiterMessages />} />
                <Route path="notifications" element={<RecruiterNotifications />} />
                <Route path="profile" element={<RecruiterProfile />} /> */}

            </Routes>
        </div>
    );
}