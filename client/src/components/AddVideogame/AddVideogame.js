import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import postvgame from '../../actions/postvgame';
import getvgames from '../../actions/getvideogames'
import  stl from './AddVideogame.module.css';

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required' 
    } else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'Rating must be a nummber between 0-5'
    } else if (input.platform.length===0) {
        errors.platform = 'Platform is required'
    }
    return errors 
}

export default function AddVideogame() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [input,setInput] = useState({
        name: '',
        description: '',
        reldate: '',
        rating:'',
        platform: [],
        genre: []
    })
    const [errors,setErrors] =  useState({})
    let allgenres = useSelector((state) => state.genres)  
    const allplatforms = useSelector((state) => state.platforms)
    allgenres = allgenres.filter(p => p !== 'All')

    function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
        setErrors(validate ({
            ...input,[e.target.name]:e.target.value
        }))
     }
     
     function handlePlatforms(e) {
         console.log('Platform: ',e.target.value)
        setInput({
          ...input,
          platform: [...input.platform,e.target.value]
        })
     } 

     function handleGenres(e) {
        setInput({
          ...input,
          genre: [...input.genre,e.target.value]
        })
     } 
    
      function  handleSubmit(e) {
         e.preventDefault()
         if (!input.name) {return alert('Name is required')}
         if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.reldate)) 
            {return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D')}
         if (!input.rating) {return alert('Rating is required')}
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || 
            input.rating <0 || input.rating >5) 
            {return alert('Wrong format for Rating. Should be a number between 0-5')
         }
         if (input.platform.length===0) {return alert('Platform is required')}
         dispatch(postvgame(input))
         dispatch(getvgames())
         alert(`Videogame ${input.name} has been added`)
         setInput({
            name: '',
            description: '',
            reldate: '',
            rating:0,
            platform: [],
            genre: []
         })
         history.push('/home')
      }

    return (
        <>
        <div  className={stl.avgwrapper}>
        <h1 className={stl.h1}>Add your own videogame</h1>
            <form className={stl.formarea} onSubmit={handleSubmit}>
           
                <div className={stl.msgarea}>
                    <label>Description:</label>
                    <textarea onChange={handleOnChange} type='text' name='description' value={input.description} />
                </div>
                <div className={stl.detailsarea}>
                    <label>Game Name:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange} 
                        type='text' name='name' value={input.name}/>
                    {errors.name && ( <p className={stl.error}> {errors.name} </p> )}

                    <label>Released date:</label>
                    <input onChange={handleOnChange} type='text' name='reldate' value={input.reldate} 
                             placeholder='YYYY-MM-DD'/>

                    <label>Rating:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange}
                        type='text' name='rating' value={input.rating} placeholder='ex 4.3'/>
                    {errors.rating && ( <p className={stl.error}> {errors.rating} </p> )}     

                    <label>Platforms:</label>   
                    <select onChange={handlePlatforms}  onBlur={handleOnChange}>
                        {allplatforms.sort().map(p => {
                           return  <option value={p}>{p}</option>
                        })}
                    </select>
                    <ul  className='ul'><li>{input.platform.map(p => p + ' ,')}</li></ul>
                    {errors.platform && ( <p className={stl.error}> {errors.platform} </p> )}

                    <label>Genres:</label>
                    <select onChange={handleGenres}>
                        {allgenres.sort().map(p => {
                            return <option value={p}>{p}</option>
                        })}
                    </select>   
                
                    <ul ><li>{input.genre.map(p => p + ' ,')}</li></ul> 
 
                    <button className={stl.bot} type='submit'>Add Game</button> 
                    <span><Link to='/home'><button className={stl.bot2}>Back To Home</button></Link> </span>
                </div>
            </form>
        </div>
        <div/>
        </>
    )
}
