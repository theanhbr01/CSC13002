import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RoleAPI from "../../api/RoleAPI";

export default function RoleDetailModal(props) { 
    const handleClose = () => props.setShow(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onCreate = (data) => {
        var roleModel = {
            Title: data.Title
        }
        RoleAPI.Create(roleModel).then((response) => {
            window.location.reload(false);
        })
    }
    return (
        <>
                <Modal show={props.show} onHide={handleClose}>
                    <form onSubmit={handleSubmit(onCreate)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm mới vai trò</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row input-group mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="UserName">Vai trò</label>
                                <div className="col-sm-10">
                                    <input 
                                        className="form-control" 
                                        {...register("Title", { required: true })} 
                                    />
                                    { errors.Title?.type === 'required' && <p role="alert" className="alert alert-danger">Title is required</p> }
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Thêm mới</Button>
                            <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}
