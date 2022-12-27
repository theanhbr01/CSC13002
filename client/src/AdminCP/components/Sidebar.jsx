import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar(props) {
    
    return (
        <>
            <ul 
                className="Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" 
                id="accordionSidebar"
            >
                <Link 
                    to='dashboard' 
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">GenZ Job Admin</div>
                </Link>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapse-2"
                        aria-expanded="true" aria-controls="collapse-2">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Thành viên</span>
                    </Link>
                    <div id="collapse-2" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='user' className="collapse-item">Danh sách thành viên</Link>
                            <Link to='role' className="collapse-item">Quản lý vai trò</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapse-3"
                        aria-expanded="true" aria-controls="collapse-3">
                        <i className="fas fa-fw fa-newspaper"></i>
                        <span>Bài viết</span>
                    </Link>
                    <div id="collapse-3" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='article' className="collapse-item">Danh sách bài viết</Link>
                            <Link to='article/report' className="collapse-item">Báo cáo bài viết</Link>

                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapse-4"
                        aria-expanded="true" aria-controls="collapse-4">
                        <i className="fas fa-fw fa-briefcase"></i>
                        <span>Tin Tuyển dụng</span>
                    </Link>
                    <div id="collapse-4" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='job' className="collapse-item">Danh sách tin tuyển dụng</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapse-5"
                        aria-expanded="true" aria-controls="collapse-5">
                        <i className="fas fa-fw fa-bell"></i>
                        <span>Thông báo</span>
                    </Link>
                    <div id="collapse-5" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='notification' className="collapse-item">Gửi thông báo</Link>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}