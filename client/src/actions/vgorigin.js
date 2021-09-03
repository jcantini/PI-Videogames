import { VIDEOGAMES_ORIGIN } from '.';

export default function vgorigin(payload) {
    return {
        type: VIDEOGAMES_ORIGIN,
        payload
    }
}