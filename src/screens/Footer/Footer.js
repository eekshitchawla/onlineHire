import React from "react";
import './Footer.css';
import footerPic from '../../assets/footerFlexPic.png';

const Footer = () => {
    return (
        <div id="footer">
            <div id="firstHalf">
                <img id="footerPic" src={footerPic} alt="" />
                <div id="slogan">STAY FIT. <br /> KEEP FIT. </div>
            </div>
            <div id="secondHalf">
                <div id="connect">
                    <h5>CONNECT WITH US <br /></h5>
                    instagram <br />
                    snapchat <br />
                    linkedin <br />
                </div>
                <div id="connect">
                    <h5> OUR LOCATIONS <br /></h5>
                    B3/234 FF <br />
                    NEW DELHI <br />
                    DELHI - 89 <br />
                </div>
                <div id="connect">
                    <h5> OUR LOCATIONS <br /></h5>
                    B3/234 FF <br />
                    NEW DELHI <br />
                    DELHI - 89 <br />
                </div>
            </div>
        </div>
    );
}

export default Footer;