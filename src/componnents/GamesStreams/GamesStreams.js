import React,{useEffect, useState} from 'react';
import api from '../Api/Api';
import {useLocation, useParams,Link} from 'react-router-dom';


function GamesStream(){

    const [streamData,setStreamData] = useState([]);
    const [viewers, setViewers] = useState (0);

    let location = useLocation();
    let {slug} = useParams();
    let language = window.navigator.language;

  

    //console.log(location);

    useEffect(() => {
        
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?language=${language}&game_id=${location.state.gameID}`);

            let dataArray = result.data.data;

            let finalArray = dataArray.map(stream =>{
                let newURL = stream.thumbnail_url
                .replace("{width}","320")
                .replace("{height}","180");

                stream.thumbnail_url = newURL;

                return stream;

            });

            

            /** Calcul du total viewers */
            let totalViewer = finalArray.reduce((acc,val)=>{
                return acc + val.viewer_count;
            },0);

            /** recuperer les infos user */

            let userID = dataArray.map(stream=>{
                return stream.user_id
            })

            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUsers = "";

            userID.map(id => {
                return (queryParamsUsers = queryParamsUsers+ `id=${id}&`);
            })

            let finalUrl = baseUrl + queryParamsUsers;

            let getloginUser = await api.get(finalUrl);

            let  userLoginArray = getloginUser.data.data;

            /** Ajout du login  dans le tableau final */

            finalArray.map(stream =>{

                stream.login = "";
                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id )
                    {
                        stream.login = login.login;
                    }
                })

                return stream;
            })

            setViewers(totalViewer);
            setStreamData(finalArray);

        }

        fetchData();

    }, []);

    return (

       

        <div>
             
            <h1 className="titreGameStream"> {slug}</h1>

            <h3 className="sousTitreViewers"><span >{viewers} </span> viewers sur {slug} </h3>

            <div className="flexAccueil">

                {streamData.map((stream,index)=>(

                    <div key={index} className="cardGamesStreams">
                        <img src={stream.thumbnail_url} alt="image_profile" className="imgCard" />
                        <div className="cardBodyGameStreams">

                            <h1 className="titreGameStreamsCard">{stream.user_name}</h1>
                            <p className="txtStream">
                                Nombre de viewer : {stream.viewer_count}
                            </p>

                            <Link 
                                className="liens"
                                to = {{
                                    pathname: `/live/${stream.login}`
                                }}
                            >
                                <div className="btnCard">
                                    Regarder {stream.user_name}
                                </div>
                            </Link>

                        </div>


                    </div>

                ))}

            </div>
            
        </div>
    )
}

export default GamesStream;