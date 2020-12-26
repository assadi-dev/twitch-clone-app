import React, {useState, useEffect} from 'react';
import api from '../Api/Api';
import {Link} from 'react-router-dom';

function Games(){

    const [games,setGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top?first=100')
              //const resultV = await api.get('https://api.twitch.tv/helix/search/categories');
            //console.log(resultV.data.data);
            let dataTab = result.data.data;
            let finalArray = dataTab.map( game=> {
                let newUrl = game.box_art_url
                .replace("{width}","250")
                .replace("{height}","300")
            game.box_art_url = newUrl;
            return game;
            });

            setGames(finalArray)
        }

        fetchData();

    },[])

   
    return(
        <div>
            <h1 className="titreGames"> Jeux les plus populaires </h1>
            <div className="flexAccueil">
                {games.map((game,index) =>(

                    <div key={index} className="gameCard">
                        <img src={game.box_art_url} alt={game.name} className="gamePicture" />

                        <div className="bodyGameCard">

                            <h5 className="titleGameCard">{game.name}</h5>

                            <Link className="liens"

                                to={{
                                    pathname: `/game/${game.name}`,
                                    state: {
                                        gameID: game.id
                                    }

                                }}
                            >
                                <div className="btnCard">Regarder {game.name}</div>
                            </Link>
                            

                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Games;