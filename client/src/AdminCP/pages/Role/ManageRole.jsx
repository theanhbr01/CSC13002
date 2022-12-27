import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoleAPI from "../../api/RoleAPI";
import Table from "../../components/Material/Table";
import RoleDetailModal from "./DetailModal";

export default function ManageRole(props) {  
    const [table, setTable] = useState();
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState();

    const columnTable = [
        { title:'Vai trò', data: 'Title' },
    ]

    async function DeleteRole(data) {
        for(let i = 0; i < data.length; ++i) {
            await RoleAPI.Delete(data[i].id)
            .then(() => {
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    function onDelete() {
        if (!window.confirm("Delete items?")) {
            return;
        }
        if(table) {
            var data=table.rows('.selected').data();
            DeleteRole(data)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
            });

        }
    }

    function onClick() {
        setShowModal(true);
    }

    useEffect(()=>{
        RoleAPI.GetList().then(data => {
            setRoles(data);
        });
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">Quản lý vai trò</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <Link className="btn btn-primary btn-icon-split mx-1" onClick={onClick}>
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
                {roles.length > 0 && 
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table 
                                    className="table table-bordered" 
                                    id="dataTable" 
                                    paging={true}
                                    searching={true}
                                    select={true}
                                    data={roles}
                                    columns={columnTable}
                                    setTable={setTable}
                                />
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            <RoleDetailModal show={showModal} setShow={setShowModal}/>
        </>
    )
}