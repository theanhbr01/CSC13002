import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from 'react-select';

import UserAPI from "../../api/UserAPI";
import RoleAPI from "../../api/RoleAPI";

export default function UserDetail(props) {
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: async () => fetchUserData()  
    });
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [defaultUserRoles, setDefaultUserRoles] = useState([]);

    const [message, setMessage] = useState();

    const navigate = useNavigate();

    function onCreate(data) {
        var userModel = {}
        userModel.UserName = data.UserName;
        userModel.Email = data.Email;
        userModel.Password = data.Password;
        UserAPI.Create(userModel).then(createdUser =>{
            navigate('/admincp/user/detail/' + createdUser.id);
            setUser(createdUser);
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div class="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
    }

    async function UnAssignRole() {
        await defaultUserRoles.forEach(async (item) => {
            await RoleAPI.UnAssignRole(user.id, item.value);
        })
    }

    async function onUpdate(data) {
        var userModel = {}
        userModel.id = user.id;
        userModel.Password = data.Password;

        UserAPI.Update(userModel)
        .then(response =>{
            setMessage(<div class="alert alert-success" role="alert">Cập nhật thành công</div >);
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div class="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
        
        UnAssignRole().then(() =>
            {
                userRoles.forEach((item) => {
                    RoleAPI.AssignRole(user.id, item.value);
                });
                setDefaultUserRoles(userRoles);
            }
        )
    }

    function onDelete() {
        UserAPI.Delete(user.id)
        .then(response =>{
            navigate('/admincp/user');
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div class="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
    }

    const fetchRoleData = async () => {
        var roleData = [];
        await RoleAPI.GetList().then((response) => {
            response.forEach((item) => {
                roleData.push({
                    label: item.Title,
                    value: item.id
                })
            });
        });
        setRoles(roleData);
    }

    async function fetchUserData() {
        if(id){
            return UserAPI.GetDetail(id).then(async user => {
                setUser(user);

                return user;
            });
        }
    }
    const onRoleChange = (e) =>{
        setUserRoles(e);
    }
    useEffect(() => {
        fetchRoleData().then(async () => {
            var userRoleData = [];
            await RoleAPI.GetByUser(id).then((response) => {
                response.forEach((item) => {
                    userRoleData.push({
                        label: item.Title,
                        value: item.id
                    });
                });
            });
            setUserRoles(userRoleData);
            setDefaultUserRoles(userRoleData);
        });
    }, []);

    return (
        <>
         <form onSubmit={handleSubmit(!user.id ? onCreate : onUpdate)}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">{user.id ? 'Cập nhật' : 'Thêm' } thành viên</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <button className="btn btn-primary btn-icon-split mx-1" type="submit">
                            <span className="icon text-white-50">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span className="text">{user.id ? 'Cập nhật' : 'Thêm mới' }</span>
                        </button>
                        {user.id && <button className="btn btn-danger btn-icon-split mx-1" onClick={onDelete}>
                            <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Xóa</span>
                        </button>}
                    </div>
                </div>
                {message}
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="form-horizontal">
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="UserName">Tên đăng nhập</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("UserName", { required: true })} 
                                        readOnly={user.id ? true : false }
                                    />
                                    { errors.UserName?.type === 'required' && <p role="alert" className="alert alert-danger">User Name is required</p> }
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="Email">Email</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("Email", { required: true, pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/ })} 
                                        readOnly={user.id ? true : false }
                                    />
                                    { errors.Email?.type === 'required' && <p role="alert" className="alert alert-danger">Email is required</p> }
                                    { errors.Email?.type === 'pattern' && <p role="alert" className="alert alert-danger">Invalid Email</p> }

                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="Password">Mật khẩu</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="password"
                                        className="form-control" 
                                        {...register("Password", { required: !user.id, minLength: 6})} 
                                    />
                                    { errors.Password?.type === 'required' && <p role="alert" class="alert alert-danger">Password is required</p> }
                                    { errors.Password?.type === 'minLength' && <p role="alert" class="alert alert-danger">Invaild Password</p> }

                                </div>
                            </div>

                            {user.id && <>
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="LastActivityDate">Ngày hoạt động gần đây</label>
                                    <div className="col-sm-10">
                                        <input 
                                            className="form-control" 
                                            value={new Date(user.LastActivyDate).toLocaleString()} 
                                            id="LastActivyDate"
                                            name="LastActivyDate"
                                            readOnly={user.id > 0} 
                                            />
                                    </div>
                                </div>
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="CreatedDate">Ngày tạo</label>
                                    <div className="col-sm-10">
                                        <input 
                                            className="form-control" 
                                            value={new Date(user.CreatedDate).toLocaleString()} 
                                            id="CreatedDate"
                                            name="CreatedDate"
                                            readOnly={user.id > 0} 
                                            />
                                    </div>
                                </div>
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="Password">Vai trò</label>
                                    <div className="col-sm-10">
                                        <Select  
                                            options={roles} 
                                            value={userRoles}
                                            isMulti
                                            onChange={onRoleChange}
                                        />
                                    </div>
                                </div>
                            </>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}