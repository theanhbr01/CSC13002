import React, { Component, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "../../components/UI/Button";
import { InputTextField } from "../../components/UI/InputTextField";
import AuthAPI from "../../api/AuthApi";
import RoleApi from "../../api/RoleApi";
import { useNavigate } from "react-router-dom";

export function SignUp({ setComponent, role, setUser }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");
    const [validPasswordVerification, setValidPasswordVerification] = useState(true);

    const navigate = useNavigate();

    const signUpHandler = (event) => {
        event.preventDefault();
        AuthAPI.Signup(username, email, password)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Signed Up Successfully!");
                    RoleApi.assign(response.data.data.id, role)
                        .then((response) => {
                            if (response.status === 200) {
                                alert("Signed Up Successfully!");
                                AuthAPI.Login(username, password)
                                    .then((response) => {
                                        console.log(response.data);
                                        navigate("/profile");
                                        setUser(response.data);
                                    })
                                    .catch((error) => {
                                        console.log({ message: error.message });
                                    });
                            }
                        })
                        .catch((error) => {
                            let msg = error.message;
                            if (error.response) msg = error.response.data.message;
                            alert("Assigning role unsuccessfully!\n" + msg);
                            console.log(error);
                        });
                } else {
                    console.log("Failed to Sign Up!");
                }
            })
            .catch((error) => {
                let msg = error.message;
                if (error.response) msg = error.response.data.message;
                alert("Failed to Sign Up!\n" + msg);
                console.log(error);
            });
    };

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const passwordVerificationChangeHandler = (event) => {
        setPasswordVerification(event.target.value);

        // Check if password verification matches with password
        setValidPasswordVerification(password === event.target.value);
    };

    return (
        <div
            id="signInSignUpComponent"
            className="col-lg-7 d-flex align-items-center h-100 shadow-lg border">
            <div className="d-flex flex-column flex-grow-1">
                <Logo setComponent={setComponent} />

                <h2 className="text-center fw-normal mb-3">????ng k??</h2>
                <h3 className="text-center text-muted mb-4">S??n ?????u ng?????i</h3>

                <form className="w-50 mx-auto" onSubmit={signUpHandler}>
                    <div className="mb-4">
                        <InputTextField
                            id="username"
                            placeholder="T??n t??i kho???n"
                            name="userName"
                            value={username}
                            onChange={usernameChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <InputTextField
                            type="email"
                            id="email"
                            placeholder="?????a ch??? email"
                            name="email"
                            value={email}
                            onChange={emailChangeHandler}
                        />
                    </div>

                    {/* <div className="mb-4">
                        <InputTextField
                            id="company"
                            placeholder="T??n doanh nghi???p"
                            name="company"
                        />
                    </div> */}

                    <div className="row">
                        <div className="col mb-4">
                            <InputTextField
                                type="password"
                                id="password"
                                placeholder="M???t kh???u"
                                name="password"
                                value={password}
                                onChange={passwordChangeHandler}
                            />
                        </div>
                        <div className="col mb-4">
                            <InputTextField
                                type="password"
                                id="verify"
                                placeholder="X??c nh???n m???t kh???u"
                                name="verify"
                                value={passwordVerification}
                                onChange={passwordVerificationChangeHandler}
                                onFocus={passwordVerificationChangeHandler}
                                style={{
                                    border: validPasswordVerification
                                        ? "1px solid green"
                                        : "3px solid red",
                                }}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button type="submit" style={{ backgroundColor: "var{--primary}" }}>
                            ????ng k??
                        </Button>
                    </div>

                    <hr className="solid mt-5" />

                    <p className="small fw-bold mt-0">
                        ???? c?? t??i kho???n?{" "}
                        <a className="link-danger" onClick={() => setComponent("logIn")}>
                            ????ng nh???p
                        </a>{" "}
                    </p>
                </form>
            </div>
        </div>
    );
}
