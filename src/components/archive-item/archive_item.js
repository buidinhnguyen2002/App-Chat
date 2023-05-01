import React from "react";
import "./archive.scss";
import archive from './archive.png';

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
            <div className="archive-box">
                <div className="archive-img">
                    <img src={archive} alt="Logo" />
                </div>
                <div className="archived">Archived</div>
            </div>
        )
    }
}


export default ArchiveItem;