import React, { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import UserAPI from "../../api/UserAPI";
import Table from "../../components/Material/Table";

export default function ArticleList(props) {
    const [articles, setArticles] = useState([]);
    const [table, setTable] = useState();
    const [message, setMessage] = useState();

    const columnTable = [
        { title:'Content', data: 'content' },
        { title:'Author', data: 'authorName' },
        { 
            title:'Date Posted', 
            data: 'datePosted',
            render: function(data, type, row, meta) {
                return new Date(data).toLocaleString()
            }
        }
    ]

    async function DeleteArticle(data) {
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
            await DeleteArticle(data)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                setMessage(<div className="alert alert-warning" role="alert">Đã có lỗi xảy ra! Vui lòng thử lại...</div >);
            });

        }
    }

    
    useEffect(()=>{
        ArticleAPI.GetList().then(articleData => {
            articleData.forEach(async article => {
                await UserAPI.GetDetail(article.authorId).then(author => {
                    article.authorName = author.UserName;
                });
                setArticles([...articles, article]);
            });
        });
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h1 className="h3 mb-2 text-gray-800">Danh sách bài viết</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 d-flex justify-content-end">
                        <button className="btn btn-danger btn-icon-split mx-1" onClick={onDelete}>
                            <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Xóa</span>
                        </button>
                    </div>
                </div>
                {message}
                {articles.length > 0 && 
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table 
                                    className="table table-bordered" 
                                    id="dataTable" 
                                    paging={true}
                                    searching={true}
                                    select={true}
                                    data={articles}
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