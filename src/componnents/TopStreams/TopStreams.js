import React,{useEffect,useState} from 'react';
import api from '../Api/Api';
import {Link} from 'react-router-dom';


function TopStreams(){

    const [channels,setChannels] = useState([]);
    const [apiURL,setApiURL] = useState(`https://api.twitch.tv/helix/streams?first=100`);


    let language = window.navigator.language;

        function changeLanguage(){

        let language = window.navigator.language;
        let newURL = `https://api.twitch.tv/helix/streams?language=${language}&first=100`;
        setApiURL(newURL);

        document.querySelector(".langDisplay").style.display = "none"

    }

        useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(apiURL);
            let dataArray = response.data.data;

            let gamingId = dataArray.map(stream =>{
                return stream.game_id;
            })

            
            let usersId = dataArray.map(stream =>{
                return stream.user_id;
            })

            //console.log(gamingId,usersId)

            //url perso

            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamGames= "";
            let queryParamUsers = "";

            gamingId.map(id=>{
                return (queryParamGames = queryParamGames + `id=${id}&`)
            })

            usersId.map(id=>{
                return (queryParamUsers = queryParamUsers + `id=${id}&`)
            })

            //url final
            let urlFinalGames = baseUrlGames + queryParamGames;
            let urlFinalUsers = baseUrlUsers  + queryParamUsers;

            //console.log(urlFinalGames);

            //appels

            let gamesNames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesNamesArray = gamesNames.data.data;
            let usersArray = getUsers.data.data;
            //console.log(usersArray,gamesNamesArray);

            //creation du tableau final

            let finalArray = dataArray.map(stream =>{

                stream.gameName = "";
                stream.truePic = "";
                stream.login = "";

                gamesNamesArray.forEach(name => {
                    usersArray.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id)
                        {
                            stream.truePic = user.profile_image_url;
                            stream.gameName = name.name;
                            stream.login = user.login;
                        }
                    })
                })

                let newUrl = stream.thumbnail_url
                .replace("{width}","320")
                .replace("{height}","180")
                stream.thumbnail_url = newUrl;
                return stream;
            })

            setChannels(finalArray);
        }

        fetchData(); 
       
    }, [apiURL]);


    return(
        <div>
            <h1 className="titreGames">Stream Populaire</h1>

                <p className="langDisplay" onClick={changeLanguage}>
                    Afficher les top streameur <span>{ window.navigator.language}</span>
                </p>
            
            <div className="flexAccueil">

                {channels.map((channels,index)=>(

                    <div key={index} className="streamCard">

                        <img src={channels.thumbnail_url} alt="thumbnail" className="imgCard" />

                        <div className="cardBodyStream">
                            <h5 className="titreCartesStream">{channels.user_name}</h5>
                            <p className="txtStream">Jeux : {channels.gameName}</p>
                            <p className="txtStream viewers" >Viewers : {channels.viewer_count} </p>

                            <Link 
                                className="liens"
                                to = {{
                                    pathname: `/live/${channels.login}`
                                }}
                            >
                                <div className="btnCard">
                                    Regarder {channels.user_name}
                                </div>
                            </Link>

                        </div>


                    </div>
                ))}
            </div>
        </div>
    )

}

export default TopStreams;