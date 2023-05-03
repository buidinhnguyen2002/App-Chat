import React from "react";
import "./archive.scss";
import archive from '../../Assets/Image/archive.png';

class ArchiveItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="archive-box d-flex">
                <div className="archive-img">
                    <img src={archive} alt="Logo" />
                </div>
                <div className="archived">Archived</div>
            </div>
        )
    }
}


export default ArchiveItem;