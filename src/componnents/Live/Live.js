import React,{useState,useEffect} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';
import api from '../Api/Api';




function Live(){

    let {slug}= useParams();

    const [infoStream,setInfostream ] = useState([]);
    const [infoGames,setInfoGames] = useState([]);
    const [onStream,setOnstream] = useState([]);
   

    useEffect(()=>{
        const fetchData = async () =>{
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);
            //console.log(result.data.data);

            /** Si le stremeur est offline */

            //console.log(result.data.data.length);

            if(result.data.data.length === 0 ){
             
                setOnstream(false)

            }else{

                setOnstream(true);
                let gameId = result.data.data.map(data =>{
                return data.game_id
                

            })
                
                const resultGameName = await api.get(`https://api.twitch.tv/helix/games?id=${gameId}`);
                //console.log(resultGameName.data.data );
                
                let gameName = resultGameName.data.data.map(data => {
                    return data.name;
                });
                
              
                
                
                setInfoGames(gameName);
                setInfostream(result.data.data[0]);
                
                
            }


        }

        fetchData();
            
        


    },[slug])



    return (

          

        onStream == 0 ? 

         <div className="containerDecal">

            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />

            <div>
                <div className="contInfo">
                    <div className="titreStream" >Le streameur est offline</div>
     
                </div>
            </div>

        </div>

        :

        <div className="containerDecal">

            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />

            <div>
                <div className="contInfo">
                    <div className="streamUserName" >{infoStream.user_name}</div>
                    <div className="titreStream" >{infoStream.title}</div>
                     <div className="viewer">{infoStream.viewer_count}</div>
                      <div className="language" > <span className="badgeLang">{infoStream.language}</span></div>
                      <div className="gameName"> Jeux: {infoGames} </div>
                </div>
            </div>

        </div>
    )


}

export default Live;