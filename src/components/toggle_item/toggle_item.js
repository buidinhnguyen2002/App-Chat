import React from "react";
import "./toggle.scss";

class NavigationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            icon: props.icon,
        }
    }

    render() {
        return (
            <div className="toggle-switch toggle-item d-flex">
                <div className="img-toggle">
                    <img src="https://s3-alpha-sig.figma.com/img/8c7f/d5f3/7d553b0e0d50a2930cf54041fded7305?Expires=1682899200&Signature=c1djvis46pFWmd2MrSVT2pBkChm1j28gZYZVPbG8gGYZWQnZwpHa0fvi4mvD5QWktQ2JVfhEjxiNi0PEAWI96xz6sPjkUVKWSoDkSmPQk2P8ayo8TPPK57LaPIykElAgQQ12QZeOf02QTBV7g4mB7VZruR1iiCXZBO3TXbWAh1v7QymrthA7rbphycXJ1uULQ~sfsYLh4TH3C1Q92CSKuZDToinUGsntkKlrNcaRZYgbWRRG09iZ-4vFnssRCMX0D8UJYi-HBrJIN9P1wuTGRDNHifVHPB76Yu0A~piU8FpIOH5nfljd4DkXvWI-YOap4eMXFZaLpRphPE5qXsWp3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt=""/>
                </div>
            </div>
        )
    }
}


export default NavigationItem;