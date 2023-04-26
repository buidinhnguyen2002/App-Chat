import React from "react";
import "./search_bar.scss";
import image from '../../Assets/Image/FunnelSimple.png';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="search_bar search_bar-round">
                <input type="text" placeholder="Search" className="searchBar-input"/>
                <i className="fa-solid fa-magnifying-glass"></i>
                <img src={image} alt=""/>
            </div>
        )
    }

}

export default SearchBar;