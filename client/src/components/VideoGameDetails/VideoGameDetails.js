import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getvgamebyid from '../../actions/getvgamebyid'
import stl from './VideoGameDetails.module.css';

export default function VideoGameDetails(props) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getvgamebyid(props.match.params.id))
    },[dispatch])

    var detail = useSelector((state) => state.videodetails)
    
    return (
        <div className={stl.wrapper}>          
            <div className={stl.contarea}>
                <div className={stl.lineflex}>
                <h2>{detail.name} details</h2>          
                <Link to='/home'>
                    <button className={stl.botback}>Home</button>
                </Link> 
                </div>
                <img className={stl.detimg} src= {detail.image} alt="No image found" width='250px' heigth='300px' ></img>    
                <h3>Description</h3>
                <h5>{detail.description}</h5>
                <div className={stl.lineflex}>
                   <h4>{`Rating:   ${detail.rating}`} </h4>
                </div>
                <div className={stl.lineflex}>
                   <h4>{`Released date:  ${detail.released}`}  </h4>
                </div>               
                <h4>{`Platforms:  ${detail.platforms}`}</h4>
                <h4>{`Genres: ${detail.genres}`}</h4>
            </div>          
        </div>
    )

}