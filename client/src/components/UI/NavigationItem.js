import React from "react";
import { Link } from "react-router-dom";

const NavigationItem = (props) => {
    return (
        <li id={props.id} className="nav-item ms-3" onClick={props.rerenderApp}>
            <Link to={props.linkTo} className="nav-link" style={{ color: props.theme.text }}>
                {props.title}
            </Link>
        </li>
    );
};

export default NavigationItem;
