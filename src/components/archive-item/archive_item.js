import React from "react";
import "./archive.scss";

class ArchiveItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }

    render() {
        return (
        <div className="archive">
            <i className="fa-solid fa-box-archive icon-a"></i>
            <p className="a-name">Archived</p>
        </div>
        )
    }
}


export default ArchiveItem;