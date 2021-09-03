import React, { Fragment } from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import getvgames from '../../actions/getvideogames';
import {Link} from 'react-router-dom'
import  Vgcard from '../Vgcard/Vgcard';
import Paging from '../Paging/Paging';
import stl from '../HomePage/HomePage.module.css'
import genrefilter from '../../actions/genrefilter'
import vgorigin from '../../actions/vgorigin';
import sortvgames from '../../actions/sortvgames';
import SearchBar from '../SearchBar/SearchBar'

export default function HomePage () {
    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames) 
    const allgenres = useSelector((state) => state.genres)
    const [currentPage, setCurrentPage] = useState(1) 
    const [vgamesPerPage, setvgamesPerPage] = useState(8)
    const lastVgameIndex = currentPage * vgamesPerPage 
    const firstVgIndex = lastVgameIndex - vgamesPerPage 
    const currentVgames = allVgames.slice(firstVgIndex,lastVgameIndex) 
    const [render,setRender] = useState('') 
    const actualPage = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }
  
    function handleGenreFilter(e) {
        e.preventDefault();
        dispatch(genrefilter(e.target.value))
    }

    function handleOriginFilter(e) {
        dispatch(vgorigin(e.target.value))
        setCurrentPage(1)
    }

    function handleShowAll(e) {
      dispatch(vgorigin('All'))
      dispatch(sortvgames('asc'))
  }

    function handleSortvgames(e) {
        e.preventDefault(); 
        dispatch(sortvgames(e.target.value))
        setRender(`Order ${e.target.value}`)  
    }

    return (
        <div className= {stl.c1}>
            <div className= {stl.c2}>
                <div>
                   <button className={stl.hpbot} onClick={e => {handleShowAll(e)}}>Load all videogames</button>
                </div>
                <div>   
                   <Link to= '/videogame'>
                         <button className={stl.hpbot}>Add New Videogame</button>
                   </Link>   
                </div>
                <div>           
                   <SearchBar/>
                </div>
                <div>                    
                  <select className={stl.hpfilter} onChange={e => handleGenreFilter(e)}>
                    {allgenres.sort().map(e => {
                         return <option value={e}>{e}</option>
                    })}      
                  </select>
                </div>
                <div>  
                  <select className={stl.hpfilter} onChange={e => handleSortvgames(e)} onBlur={e => handleSortvgames(e)}>
                    <option value='asc'>SORT</option>
                    <option value='asc'>Forward</option>
                    <option value='desc'>Backward</option>
                    <option value='rating'>Rating</option>
                    <option value='date'>Date</option>
                  </select>
                </div>  
                <div>
                  <select className={stl.hpfilter} onChange={e => handleOriginFilter(e)}> 
                    <option value='All'>Api+DB Games</option>
                    <option value='DB'>Db Games</option>
                    <option value='API'>Api Games</option>
                  </select>
                </div>
            </div>    
            <div className={stl.c4}>
                <Paging vgamesPerPage={vgamesPerPage} allVgames={allVgames.length} currpage={currentPage} actualPage={actualPage}/>
            </div>
            <div className={stl.c5}> {/*ACA NO MAPEO TODOS LOS VGAMES SINO SOLO LOS DE LA PAGINA ACTUAL del Slice */}
                {currentVgames && currentVgames.map(p => {
                    return (
                        <>
                          <Link to ={"/videogame/" + p.id}>
                             <Vgcard name= {p.name} image= {p.image} genres= {p.genres} key={p.id} rating={p.rating}/>
                          </Link>
                        </>  
                   )})                
                }
            </div>
        </div>
    )
}