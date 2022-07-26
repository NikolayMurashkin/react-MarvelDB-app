import './charList.scss';
import {useState, useEffect, useRef} from 'react';
import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import React from "react";

const CharList = (props) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(520);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onLoadMore()
    }, []);

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newChars]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onLoadMore = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ?
        <View chars={characters} onCharSelected={props.onCharSelected}/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                disabled={newItemLoading}
                onClick={() => onLoadMore(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">{newItemLoading ? 'data is loading' : 'load more'}</div>
            </button>
        </div>
    )
}

const View = (props) => {
    const itemRef = useRef(null);

    const onFocusChar = (e) => {
        if (itemRef.current) {
            itemRef.current.classList.remove('char__item_selected')
        }

        const target = e.target.closest('.char__item');

        itemRef.current = target;
        itemRef.current.classList.add('char__item_selected');
    }

    const {chars, onCharSelected} = props;

    return (
        <ul className="char__grid">
            {chars.map(char => {
                return (
                    <CharListItem
                        onFocus={onFocusChar}
                        onCharSelected={onCharSelected}
                        id={char.id}
                        key={char.id}
                        name={char.name}
                        img={char.thumbnail}/>
                )
            })}
        </ul>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;