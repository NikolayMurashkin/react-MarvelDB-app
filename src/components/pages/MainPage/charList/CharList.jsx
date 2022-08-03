import './charList.scss';
import {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Spinner from "../../../spinner/Spinner";
import PropTypes from "prop-types";
import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const CharList = (props) => {
    const [characters, setCharacters] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(520);
    const [charEnded, setCharEnded] = useState(false);

    const {error, clearError, loading, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onLoadMore()
    }, []);

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onLoadMore = (offset) => {
        clearError();
        setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const content = <View chars={characters} onCharSelected={props.onCharSelected}/>;

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
        <TransitionGroup component={'ul'} appear={true} className="char__grid">
            {chars.map((char, i) => {
                return (
                    <CSSTransition timeout={0} classNames="charListItem">
                        <CharListItem
                            onFocus={onFocusChar}
                            onCharSelected={onCharSelected}
                            id={char.id}
                            key={i}
                            name={char.name}
                            img={char.thumbnail}/>
                    </CSSTransition>
                )
            })}
        </TransitionGroup>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;