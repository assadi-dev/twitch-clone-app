import React, { useState,useEffect} from 'react';
import api from '../Api/Api';
import {Link }from 'react-router-dom'

function Sidebar(){

    const[topStreams, setTopStreams] = useState([]);
    const [numberTop,setNumberTop] = useState([6,"Afficher plus"]);
    const [showOn,setShowOn] = useState(false);

    function showMore(){
        
        setShowOn(!showOn);
        
        showOn ?  setNumberTop([10,"Afficher moins"]) : setNumberTop([6,"Afficher plus"]);


        
    }



    let language = window.navigator.language;

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`https://api.twitch.tv/helix/streams?language=${language}&`);
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
                return stream;
            })

            setTopStreams(finalArray.slice(0,numberTop[0]));
        }

        fetchData(); 
       
    }, [numberTop]);

    //console.log(topStreams);

  return(
        <div className="sideBar">
            <h2 className="titreSideBar" >Chaines recommandées </h2>

            <div className="sideBarContain">

                <div className="chaineRecoContainer">
                    
                                <ul className="listStream" >

                    {topStreams.map((stream,index)=>(
                        <Link key={index} className="liens" to ={{
                                pathname: `/live/${stream.login}`
                            }}
                        >
                        <li key={index} className="containerFlexSidebar" >
                        
                            <img src={stream.truePic} alt="Profil_Picture" className="profilePicRonde"/>
                            <div className="infoUser">
                            <div className="streamUser">{stream.user_name}</div>
                            <div className="gameNamesSidebar">{stream.gameName}</div>
                            </div>

                            <div className="viewerRight">
                                <div className="pointRouge"></div>
                                <div>{stream.viewer_count}</div>
                            </div>

                            

                        </li>
                        </Link>

                    ))}

                </ul>

                    <p className= "showMore" onClick={showMore} >{numberTop[1]}</p>
 
                </div>

               
                 
            </div>

          



        </div>
    )

}

export default Sidebar;