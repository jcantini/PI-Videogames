import { GET_PLATFORMS } from '.';

import axios from 'axios'

export default function getplatforms() {
    return async function (dispatch){
        var result = await axios.get('http://localhost:3001/platforms'); 
        return dispatch({ 
            type: GET_PLATFORMS, 
            payload: result.data
        })                                                                                                 
    }
}