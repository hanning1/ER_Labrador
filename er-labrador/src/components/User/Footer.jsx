import React, { Component } from 'react';
import '../styles/homePage/Footer.css';


class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="leftbox">
                    <span><a className="settings" href="/account">Settings</a></span>
                    <span><a className="about" href="https://eratos.com">About</a></span>
                </div>
                <div className="rightbox">
                    <span><a className="terms" href="/terms">Terms</a></span>
                    <span><a className="privacy" href="/privacy">Privacy</a></span>
                </div>
            </footer>
        )
    }
}

export default Footer;
