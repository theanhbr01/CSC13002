import React, { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import ReportAPI from "../../api/ReportAPI";
import UserAPI from "../../api/UserAPI";
import Table from "../../components/Material/Table";

export default function ReportList(props) {
    const [reports, setReports] = useState([]);
    const [table, setTable] = useState();
    const [message, setMessage] = useState();

    const columnTable = [
        { title:'Bài viết', data: 'article' },
        { title:'Reporter', data: 'reporter' },
        { 
            title:'Date Posted', 
            data: 'createdAt',
            render: function(data, type, row, meta) {
                return new Date(data).toLocaleString()
            }
        }
    ]

    async function DeleteArticle(data) {
        for(let i = 0; i < data.length; ++i) {
            await ArticleAPI.Delete(data[i].articleId)
            .then(() => {
            })
            .catch((err) => {
                throw err;
            })
        }
    }

    async function onDeleteArticle() {
        if (!window.confirm("Delete the items?")) {
            return;
        }
        if(table) {
            var data=table.rows('.selected').data();
            await DeleteArticle(data)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
            });

        }
    }

    async function DeleteReport(data) {
        for(let i = 0; i < data.length; ++i) {
            await ArticleAPI.Delete(data[i].id)
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
            await DeleteReport(data)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
            });

        }
    }

    useEffect(()=>{
        ReportAPI.GetList().then(reportsData => {
            reportsData.forEach(async report => {
                await UserAPI.GetDetail(report.reporterId).then(author => {
                    report.reporter = author.UserName;
                });
                await ArticleAPI.GetDetail(report.articleId).then(article => {
                    report.article = article.content;
                });
                setReports([...reports, report]);
            }); 
        });
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">Danh sách báo cáo bài viết</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <button className="btn btn-danger btn-icon-split mx-1" onClick={onDelete}>
                            <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Xóa</span>
                        </button>
                        <button className="btn btn-danger btn-icon-split mx-1" onClick={onDeleteArticle}>
                            <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Xóa bài viết</span>
                        </button>
                    </div>
                </div>
                {message}
                {reports.length > 0 && 
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table 
                                    className="table table-bordered" 
                                    id="dataTable" 
                                    paging={true}
                                    searching={true}
                                    select={true}
                                    data={reports}
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