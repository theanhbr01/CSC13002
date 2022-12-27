import React, { useEffect, useState } from "react";
import UserAPI from "../../api/UserAPI";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import NotificationAPI from "../../api/NotificationAPI";
import AuthApi from "../../../api/AuthApi";

export default function Notify(props) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [message, setMessage] = useState();
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    useEffect(()=>{
        UserAPI.GetList().then(usersData => {
            var userModels = [];
            usersData.forEach((item) => {
                var userModel = {
                    label: item.UserName,
                    value: item.id
                }
                userModels.push(userModel);
            })
            setUsers(userModels);
        });
    }, []);
    const onSelectUser = (e) => {
        setSelectedUsers(e);
    }
    const sendNotification = async (model) => {
        NotificationAPI.Create(model)
        .catch((error) => {
            console.log(error);
            
        });
    }
    const onNotify = (data) => {
        try {
            const currentUser = AuthApi.GetCurrentUser();

            selectedUsers.forEach((user) => {
                var model = {
                    recipientId: user.value,
                    senderId: (currentUser ? currentUser.id : -1),
                    content: data.content
                };

                sendNotification(model);
            })  
            setMessage(<div className="alert alert-success" role="alert">Gửi thành công</div >);

        } catch (error) {
            console.log(error);
            setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(onNotify)}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h1 className="h3 mb-2 text-gray-800">Gửi thông báo</h1>
                        </div>
                        <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                            <button className="btn btn-primary btn-icon-split mx-1" type="submit">
                                <span className="icon text-white-50">
                                    <i className="fas fa-paper-plane"></i>
                                </span>
                                <span className="text">Gửi</span>
                            </button>
                        </div>
                    </div>
                    {message}
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="form-horizontal"> 
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="Password">Đến</label>
                                    <div className="col-sm-10">
                                        <Select  
                                            options={users} 
                                            value={selectedUsers}
                                            isMulti
                                            onChange={onSelectUser}
                                        />
                                    </div>
                                </div>
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="UserName">Nội dung</label>
                                    <div className="col-sm-10">
                                        <textarea 
                                            className="form-control" 
                                            {...register("content", { required: true })} 
                                        />
                                        { errors.content?.type === 'required' && <p role="alert" className="alert alert-danger">Content is required</p> }
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}