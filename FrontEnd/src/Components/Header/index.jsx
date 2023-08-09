import React from "react";
import "./styles.css"
import Logo from "../../assets/b1_00000.png"
import BotaoLogout from "../BotaoLogout";
const Header = () => {
    return (
        <header className="headerprincipal">
            <img className="logodoheader" src={Logo} alt="Logo skill" />
            <BotaoLogout />
        </header>
    )
}

export default Header;