import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import JobAPI from "../../api/JobAPI";
import AuthApi from "../../../api/AuthApi";
import Table from "../../components/Material/Table";
import ApplicationAPI from "../../api/ApplicationAPI";

export default function JobDetail(props) {
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: async () => fetchJobData()  
    });
    const [job, setJob] = useState({});

    const [message, setMessage] = useState();
    const [table, setTable] = useState();
    const [applications, setApplications] = useState([])

    const navigate = useNavigate();
    const currentUser = AuthApi.GetCurrentUser();

    function onCreate(data) {
        var jobModel = {}
        jobModel.title = data.title;
        jobModel.description = data.description;
        jobModel.company = data.company;
        jobModel.datePosted = data.datePosted;
        jobModel.closingDate = data.closingDate;
        jobModel.salary = data.salary;
        jobModel.title = data.title;
        jobModel.authorId = currentUser.id;

        JobAPI.Create(jobModel).then(createdJob =>{
            navigate('/admincp/job/detail/' + createdJob.id);
            setJob(createdJob);
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div class="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
    }

    async function onUpdate(data) {
        var jobModel = {}
        jobModel.id = job.id;
        jobModel.title = data.title;
        jobModel.description = data.description;
        jobModel.company = data.company;
        jobModel.datePosted = data.datePosted;
        jobModel.closingDate = data.closingDate;
        jobModel.salary = data.salary;
        jobModel.title = data.title;
        jobModel.authorId = (currentUser ? currentUser.id: -1);


        JobAPI.Update(jobModel)
        .then(response =>{
            setMessage(<div className="alert alert-success" role="alert">Cập nhật thành công</div >);
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
    }

    function onDelete() {
        JobAPI.Delete(job.id)
        .then(response =>{
            navigate('/admincp/job');
        })
        .catch((error) => {
            console.log(error);
            setMessage(<div class="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
        });
    }

    async function fetchJobData() {
        if(id){
            ApplicationAPI.GetByJob(id).then(applicationData => {
                setApplications(applicationData);
            });

            return JobAPI.GetDetail(id).then(async data => {
                setJob(data);
                
                return data;
            });
        }
    }

    const columnTable = [
        { title:'User', data: 'User.UserName' },
        {   title: 'Ngày ứng tuyển', 
            data: 'createdAt',
            render: function(data, type, row, meta) {
                return new Date(data).toLocaleString()
            }
        }
    ]

    return (
        <>
         <form onSubmit={handleSubmit(!job.id ? onCreate : onUpdate)}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">{job.id ? 'Cập nhật' : 'Thêm' } tin tuyển dụng</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <button className="btn btn-primary btn-icon-split mx-1" type="submit">
                            <span className="icon text-white-50">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span className="text">{job.id ? 'Cập nhật' : 'Thêm mới' }</span>
                        </button>
                        {job.id && <button className="btn btn-danger btn-icon-split mx-1" onClick={onDelete}>
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
                                <label className="col-sm-2 col-form-label" htmlFor="title">Tiêu đề</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("title", { required: true })} 
                                    />
                                    { errors.title?.type === 'required' && <p role="alert" className="alert alert-danger">Title is required</p> }
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="company">Công ty</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("company", { required: true })} 
                                    />
                                    { errors.company?.type === 'required' && <p role="alert" className="alert alert-danger">Field is required</p> }

                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="salary">Lương</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("salary", { required: true })} 
                                    />
                                    { errors.salary?.type === 'required' && <p role="alert" className="alert alert-danger">Field is required</p> }

                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="description">Nội dung</label>
                                <div className="col-sm-10">
                                    <textarea 
                                        className="form-control" 
                                        {...register("description", { required: true })} 
                                    />
                                    { errors.content?.type === 'required' && <p role="alert" className="alert alert-danger">Field is required</p> }

                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="datePosted">Ngày đăng</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        {...register("datePosted", { required: true })} 
                                    />
                                    { errors.datePosted?.type === 'required' && <p role="alert" className="alert alert-danger">Field is required</p> }

                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="closingDate">Ngày đóng</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="date" 
                                        className="form-control"                                       
                                        {...register("closingDate", { required: true })} 
                                    />
                                    { errors.closingDate?.type === 'required' && <p role="alert" className="alert alert-danger">Field is required</p> }

                                </div>
                            </div>
                            {job.id && <>
                                <div className="row input-group mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="createdAt">Ngày tạo</label>
                                    <div className="col-sm-10">
                                    <input 
                                            className="form-control" 
                                            value={new Date(job.createdAt).toLocaleString()} 
                                            readOnly={true}  
                                            />
                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                {job.id && 
                    <div className="card shadow mb-4">
                        <div className="card-header">
                            Danh sách ứng tuyển
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table 
                                    className="table table-bordered" 
                                    paging={true}
                                    searching={true}
                                    select={true}
                                    data={applications}
                                    columns={columnTable}
                                    setTable={setTable}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </form>
        </>
    )
}