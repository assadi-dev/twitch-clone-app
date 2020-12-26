import React , {useState,useEffect} from 'react';
import api from '../Api/Api';
import {Link,useParams} from 'react-router-dom';




function Resultat(){

let {slug} = useParams();

let cleanSearch = slug.replace(/ /g ,'');

const [result,setResult] = useState(true);
const [streamerInfo, setStreamerInfo]= useState([]);


useEffect(()=>{

    const fetchData = async () => {
        const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);
        //console.log(result.data.data);

        setStreamerInfo(result.data.data);
    }

    fetchData();

},[slug]);




    return(
        <div>
            <div className="containerDecalResultat">
                <h4> Resultat de la recherche : </h4>

                { streamerInfo.map((streamer,index)=>(

                    <div key={index} className="cardResultat">

                        <img src={streamer.profile_image_url} alt="image_profil" className="imgCard" />

                        <div className="bodyCardResultat">

                            <h4 className="titreCardStream"> {streamer.display_name}</h4>
                            <div className="streamerDescription">
                               
                            </div>

                            <Link
                                className = "liens"

                                to = {{
                                    pathname:`/live/${streamer.login}`
                                }}

                            >

                                <div className="btnCard"> Regarder {streamer.display_name} </div>

                            </Link>

                        </div>

                    </div>



                ))}



            </div>
        </div>
    )
}

export default Resultat;