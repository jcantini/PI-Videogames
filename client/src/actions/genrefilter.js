import { GENRES_FILTER } from '.';

export default function genrefilter(payload) {
    return {
        type: GENRES_FILTER,
        payload
    }
}