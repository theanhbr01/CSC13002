import React from "react";
import MyCard from "../UI/MyCard";
import ArticleAuthor from "./ArticleAuthor";
import ArticleMediaContent from "./ArticleMediaContent";
import ArticleLikeCommentShareReport from "./ArticleLikeCommentShareReport";
import ArticleEditDelete from "./ArticleEditDelete";

const Article = (props) => {
    /*
        props = {
            article = {
                id: string
                avatarURL: string
                authorName: string
                createDate: Date
                textContent: string
                mediaContentURL: string
            }
            mode: "myPosts" or "allPosts"
        }
    */
    return (
        <MyCard style={{marginBottom: "2rem"}}>
            <div
                className="row justify-content-between"
                style={{ width: "41rem", height: "50px" }}>
                <ArticleAuthor
                    className="col-md-auto"
                    authorName={props.article.authorName}
                    avatarURL={props.article.avatarURL}
                    createDate={props.article.createDate}
                />
                {props.mode === "allPosts" && (
                    <div className="col-sm-auto">
                        <button
                            className="btn btn-danger"
                            style={{ borderRadius: "30px" }}>
                            Bỏ theo dõi
                        </button>
                    </div>
                )}
            </div>
            <div className="row" style={{ marginTop: "1rem" }}>
                {props.mode === "allPosts" && (
                    <p style={{ textAlign: "start", color: "black" }}>
                        {props.article.textContent}
                    </p>
                )}
                {props.mode === "myPosts" && (
                    <textarea
                        style={{
                            textAlign: "start",
                            color: "black",
                            borderRadius: "15px",
                        }}>
                        {props.article.textContent}
                    </textarea>
                )}
            </div>
            <div className="row" style={{ marginTop: "0.5rem" }}>
                <ArticleMediaContent
                    contentURL={props.article.mediaContentURL}
                />
            </div>
            {props.mode === "allPosts" && <ArticleLikeCommentShareReport />}
            {props.mode === "myPosts" && <ArticleEditDelete />}
        </MyCard>
    );
};

export default Article;
