import React from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function JobseekerJobs() {
    const navigator = useNavigate();
    return (
        <>
            <button onClick={() => navigator('jobdetails')}>Click me to go to job details</button>
        </>
    );
}