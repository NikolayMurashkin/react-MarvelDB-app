import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=9348dbb59adab6792791d34da902e88b';
    const _limit = 9;
    const _baseOffset = 520;

    const {error, loading, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=${_limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const description = (str, num) => {
            if (str) {
                if (str.length > 150) {
                    return str.slice(0, num) + '...';
                }
                return str;
            } else return 'The description of this character was destroyed by Tanos';
        }
        return {
            comics: char.comics.items,
            id: char.id,
            name: char.name,
            description: description(char.description, 150),
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`
        }
    }

    return {error, loading, getCharacter, getAllCharacters, clearError};
}

export default useMarvelService;