import React, { Component } from "react";

export default function Footer(props) {
    const currentYear = new Date().getFullYear();

    return(
        <>
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; GenZ Job {currentYear}</span>
                    </div>
                </div>
            </footer>
        </>
    )
}