import React from "react";
import styled from "styled-components";
import { DarkTheme } from "../../../assets/themes";
import MyCard from "../../UI/MyCard";

/**
 * React Function component representing a candidate in list of candidates
 * @param {Object} jobApplication An object representing a job application, includes
 * at least 4 keys {candidateName, candidateLevel, applyTime, applyStatus}
 * @returns {JSXElement} A JSX Element representing a CandidateItem in CandidateList
 */
const CandidateItem = (props) => {
    console.log(props.jobApplication);
    return (
        <Card className="list-group-item list-group-item-action">
            <SpaceBetweenRow>
                <h5>{props.jobApplication.candidateName}</h5>
                <StatusBadge className="badge" status={props.jobApplication.applyStatus}>
                    {statusContent[props.jobApplication.applyStatus]}
                </StatusBadge>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
                <p>{`Mức kinh nghiệm: ${props.jobApplication.candidateLevel || "Không rõ"}`}</p>
                <p>{`Ngày ứng tuyển: ${props.jobApplication.applyTime.toLocaleString("vi-VN")}`}</p>
            </SpaceBetweenRow>
        </Card>
    );
};

export default CandidateItem;

// Helpers
const statusBadgeColor = {
    1: "#3b3c3d",
    2: "#198754",
    3: "#dc3545",
};

const statusContent = {
    1: "Chưa quyết định",
    2: "Đã đồng ý",
    3: "Đã từ chối",
};

// Styled Components
const Card = styled(MyCard)`
    width: 100%;
    border-radius: 10px !important;
    background: ${DarkTheme.card};
    color: ${DarkTheme.text};
    padding-top: 1rem;
    padding-bottom: 0px;
    margin-inline-start: 1rem;
    margin-inline-end: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    &:hover {
        background: #0d6efd;
        color: inherit;
    }
`;

const SpaceBetweenRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StatusBadge = styled.p`
    width: fit-content;
    padding-inline: 1rem;
    background: ${(props) => statusBadgeColor[props.status]};
`;
