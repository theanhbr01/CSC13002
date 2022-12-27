import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../../api/UserAPI";
import Table from "../../components/Material/Table";

export default function UserList(props) {
    const [users, setUsers] = useState([]);
    const [table, setTable] = useState();
    const [message, setMessage] = useState();

    const columnTable = [
        { title:'Tên đăng nhập', data: 'UserName' },
        { title:'Email', data: 'Email' },

        {   title: 'Ngày hoạt động', 
            data: 'LastActivyDate',
            render: function(data, type, row, meta) {
                return new Date(data).toLocaleString()
            }
        },
        { 
            "data": "id",
            "render": function ( data, type, row, meta ) {
                 return '<a href="user/detail/' + data +'">Sửa</href>'
            }
        }
    ]

    async function DeleteUser(data) {
        for(let i = 0; i < data.length; ++i) {
            await UserAPI.Delete(data[i].id)
            .then(() => {
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    async function onDelete() {
        if (!window.confirm("Delete the items?")) {
            return;
        }
        if(table) {
            var data=table.rows('.selected').data();
            await DeleteUser(data)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
            });

        }
    }

    
    useEffect(()=>{
        UserAPI.GetList().then(users => {
            setUsers(users);
        });
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">Danh sách thành viên</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <Link className="btn btn-primary btn-icon-split mx-1" to="detail">
                            <span className="icon text-white-50">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span className="text">Thêm mới</span>
                        </Link>
                        <button className="btn btn-danger btn-icon-split mx-1" onClick={onDelete}>
                            <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Xóa</span>
                        </button>
                    </div>
                </div>
                {message}
                {users.length > 0 && 
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table 
                                    className="table table-bordered" 
                                    id="dataTable" 
                                    paging={true}
                                    searching={true}
                                    select={true}
                                    data={users}
                                    columns={columnTable}
                                    setTable={setTable}
                                />
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        </>
    )
}