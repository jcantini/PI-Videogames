import React from 'react';
import stl from './Paging.module.css'


export default function Paging({vgamesPerPage, allVgames, currpage, actualPage}) {
    const pageNumbers = []
    const maxpage = Math.ceil(allVgames/vgamesPerPage)

    for (let i=0; i<maxpage;i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className={stl.pagination}>
                {pageNumbers && pageNumbers.map(num => {
                    return (
                    <li className={stl.pagenr} key={num}>
                       <a onClick={() => actualPage(num)}>{num}</a> 
                    </li>
                    )
                })}
                <span>{`   Actual Page  ${currpage}`}</span>
            </ul>           
        </nav>        
    )
}
