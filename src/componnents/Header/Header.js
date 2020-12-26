import React , {useState,useEffect}from 'react';
import logoTwich from './icone/IconeTwitch.svg';
import search from './icone/Search.svg';
import menuHamButton from './icone/MenuIco.svg';
import croix from './icone/Croix.svg';
import {Link} from 'react-router-dom';

function Header(){

    const [menu,showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [searchInput,setSearchInput] = useState('');



    useEffect(() => {
       
         const mediaQuery = window.matchMedia("(max-width:900px)");
        //addListener est un ecouteur d'evenement en mediaQueries en JavaScript
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () =>{ mediaQuery.removeListener(handleMediaQueryChange) }

    });

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches)
        {
            setSmallScreen(true);
        }else{
            setSmallScreen(false);
        }
    }

    const toogleNavRes = () => {
        showMenu(!menu);
    }

    const hideMenu = () => {

        if (menu === true)
        {
            showMenu(!menu);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleKeyPress = (e) => {
        setSearchInput(e.target.value);
    }

  

    return (
        <div>
            <nav className="headerTop">

            {(menu || !smallScreen) && (

                <ul className="listesMenu">
                    <li onClick={hideMenu} className="liensNav">
                        <Link className="liens" to="/" >
                            <img src={logoTwich} alt="icone-Twictch" className="logo" />
                        </Link>
                        
                    </li>

                    <li onClick={hideMenu} className="liensNav">
                        
                        <Link className="liens" to="/">
                            Top Games
                        </Link>
                    </li>

                    <li onClick={hideMenu} className="liensNav">
                        <Link className="liens" to="/top-streams">
                            Top streams
                        </Link>
                    </li>

                    <li onClick={hideMenu} className="liensNav">
                        <form className="formSubmit" onSubmit={handleSubmit} >

                            <input value={searchInput} onChange={(e)=> handleKeyPress(e)} type="text" className="inputSearch" />

                        <Link 
                            className='liens'
                            to = {{
                                pathname:`/resultat/${searchInput}`
                            }}
      
                        
                        >
                            <button type="submit" >
                                <img src={search}  alt="search-icon" className="logoLoup" />
                            </button>
                        </Link>
                        </form>
                    </li>

                </ul>

            )}

            </nav>

            <div className="menuResBtn">
                <img onClick={toogleNavRes} src={ !menu ? menuHamButton : croix } alt="menu-icon" className="menuIco" />
            </div>


        </div>
    )
}

export default Header;