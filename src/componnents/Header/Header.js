import React from 'react';
import logoTwich from './icone/IconeTwitch.svg';
import search from './icone/Search.svg';
import menuHamButton from './icone/MenuIco.svg';
import {Link} from 'react-router-dom';

function Header(){

    return (
        <div>
            <nav className="headerTop">
                <ul className="listesMenu">
                    <li className="liensNav">
                        <Link className="liens" to="/" >
                            <img src={logoTwich} alt="icone-Twictch" className="logo" />
                        </Link>
                        
                    </li>

                    <li className="liensNav">
                        
                        <Link className="liens" to="/">
                            Top Games
                        </Link>
                    </li>

                    <li className="liensNav">
                        <Link className="liens" to="/top-streams">
                            Top streams
                        </Link>
                    </li>

                    <li className="liensNav">
                        <form className="formSubmit">

                            <input type="text" className="inputSearch" />
                            <button type="submit" >
                                <img src={search}  alt="search-icon" className="logoLoup" />
                            </button>
                        </form>
                    </li>

                </ul>
            </nav>

            <div className="menuResBtn">
                <img src={menuHamButton} alt="menu-icon" className="menuIco" />
            </div>


        </div>
    )
}

export default Header;