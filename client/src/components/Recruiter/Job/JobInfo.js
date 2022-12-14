import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import AuthApi from "../../../api/AuthApi";
import axios from "axios";
import { API_BASE_URL } from "../../../Data/apiConstants";
import YesNoDialog from "../../UI/YesNoDialog";

const RecruiterJobInfo = (props) => {
    const [title, setTitle] = useState(undefined);
    const [company, setCompany] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [salary, setSalary] = useState(undefined);
    const [closeDate, setCloseDate] = useState(undefined);
    const [isRemovingJob, setIsRemovingJob] = useState(false);

    console.log("RecruiterJobInfo property job: ", props.job);

    if (!props.job) return;
    if (title === undefined) setTitle(props.job.title);
    if (company === undefined) setCompany(props.job.company);
    if (description === undefined) setDescription(props.job.description);
    if (salary === undefined) setSalary(props.job.salary);
    if (closeDate === undefined) setCloseDate(new Date(props.job.closingDate));

    const jobTitleChangeHandler = (event) => {
        console.log(event.target.value);
        setTitle(event.target.value);
    };

    const jobCompanyChangeHandler = (event) => {
        console.log(event.target.value);
        setCompany(event.target.value);
    };

    const jobDescriptionChangeHandler = (event) => {
        console.log(event.target.value);
        setDescription(event.target.value);
    };

    const salaryChangeHandler = (event) => {
        console.log(event.target.value);
        setSalary(event.target.value);
    };

    const closeDateChangeHandler = (event) => {
        console.log(event.target.value);
        setCloseDate(new Date(event.target.value));
    };

    const updateInfo = () => {
        // Prepare API body
        let user = AuthApi.GetCurrentUser();
        if (!user) return;
        const accessToken = user.accessToken;
        const body = {
            id: props.job.id,
            authorId: user.data.id,
            title: title,
            company: company,
            description: description,
            salary: salary,
            datePosted: props.job.datePosted,
            closingDate: closeDate,
        };

        // Call API
        const URL = API_BASE_URL + "/job/edit";
        axios
            .put(URL, body, { headers: { "x-access-token": accessToken } })
            .then((res) => {
                console.log("Update job info response: ", res);
                alert("C???p nh???t th??ng tin th??nh c??ng!");
                props.onUpdated();
            })
            .catch((err) => {
                console.log("Update job info err: ", err);
                alert("C???p nh???t th??ng tin th???t b???i, h??y th??? l???i sau");
            });
    };

    const removeThisJob = () => {
        // Call API to remove this job
        const URL = `${API_BASE_URL}/job/delete?jobId=${props.job.id}`;
        axios
            .delete(URL)
            .then((res) => {
                console.log("Remove job response: ", res);
                if (res.status === 200) {
                    alert(`???? x??a tin tuy???n d???ng ${title} th??nh c??ng!`);
                    setIsRemovingJob(false);
                    props.onUpdated();
                }
            })
            .catch((err) => {
                console.log("Remove job error: ", err);
                alert(`X??a tin tuy???n d???ng ${title} kh??ng th??nh c??ng!\nH??y th??? l???i sau`);
            });
    };

    return (
        <>
            {isRemovingJob && (
                <YesNoDialog
                    title="X??c nh???n x??a tin tuy???n d???ng"
                    message={`B???n c?? ch???c ch???n b???n mu???n x??a tin tuy???n d???ng ${title}`}
                    onNo={() => setIsRemovingJob(false)}
                    onYes={removeThisJob}
                />
            )}
            <FlexColumn className={`${props.className}`}>
                <div className="row">
                    <JobInfoLabel className="col-3">Ti??u ?????:</JobInfoLabel>
                    <JobInfoInput
                        className="col"
                        type="text"
                        value={title}
                        onChange={jobTitleChangeHandler}
                    />
                </div>
                <div className="row" style={{ marginTop: "0.75rem" }}>
                    <JobInfoLabel className="col-3">C??ng ty:</JobInfoLabel>
                    <JobInfoInput
                        className="col"
                        type="text"
                        value={company}
                        onChange={jobCompanyChangeHandler}
                    />
                </div>
                <div className="row" style={{ marginTop: "0.75rem" }}>
                    <JobInfoLabel className="col-3">{"M???c l????ng ($):"}</JobInfoLabel>
                    <JobInfoInput
                        className="col"
                        type="number"
                        value={salary}
                        onChange={salaryChangeHandler}
                    />
                </div>
                <div className="row" style={{ marginTop: "0.75rem" }}>
                    <JobInfoLabel className="col-3">Ng??y k???t th??c:</JobInfoLabel>
                    <JobInfoInput
                        className="col"
                        type="datetime-local"
                        value={moment(closeDate).format("yyyy-MM-DDThh:mm:ss")}
                        onChange={closeDateChangeHandler}
                    />
                </div>
                <div className="row" style={{ marginTop: "0.75rem", flex: "1" }}>
                    <JobInfoLabel className="col-3">M?? t??? c??ng vi???c:</JobInfoLabel>
                    <JobInfoTextArea
                        className="col"
                        value={description}
                        onChange={jobDescriptionChangeHandler}
                    />
                </div>
            </FlexColumn>
            <ButtonContainer>
                <Button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginInlineEnd: "2rem" }}
                    onClick={() => setIsRemovingJob(true)}>
                    X??a tin tuy???n d???ng n??y
                </Button>
                <Button type="button" className="btn btn-success" onClick={updateInfo}>
                    L??u c??c ch???nh s???a
                </Button>
            </ButtonContainer>
        </>
    );
};

export default RecruiterJobInfo;

// Styled Components
const JobInfoLabel = styled.label`
    text-align: start;
`;

const JobInfoInput = styled.input`
    background: #3a3b3c;
    color: white;
    border: none;
    border-radius: 5px;
`;

const JobInfoTextArea = styled.textarea`
    background: #3a3b3c;
    color: white;
    border: none;
    border-radius: 5px;
    min-height: 7rem;
    max-height: 7rem;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: flex-end;
    height: fit-content;
`;

const Button = styled.button`
    border-radius: 30px;
    padding-inline: 2rem;
    height: fit-content;
`;
