import './charList.scss';
import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import React from "react";

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 520,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onLoadMore();
    }


    onCharListLoaded = (chars) => {
        let ended = false;
        if (chars.length < 9) {
            ended = true;
        }

        this.setState(({characters, offset}) => ({
            characters: [...characters, ...chars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onLoadMore = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    render() {
        const {characters, loading, error, newItemLoading, offset, charEnded} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading) ?
            <View chars={characters} onCharSelected={this.props.onCharSelected}/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    disabled={newItemLoading}
                    onClick={() => this.onLoadMore(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">{newItemLoading ? 'data is loading' : 'load more'}</div>
                </button>
            </div>
        )
    }
}

class View extends Component {
    myRef = null;
    createRef = elem => {
        this.myRef = elem;
    }

    onFocusChar = (e) => {
        if (this.myRef) {
            this.myRef.classList.remove('char__item_selected')
        }

        const target = e.target.closest('.char__item');

        this.createRef(target);

        this.myRef.classList.add('char__item_selected');
    }

    render() {
        const {chars, onCharSelected} = this.props;

        return (
            <ul className="char__grid">
                {chars.map(char => {
                    return (
                        <CharListItem
                            onFocus={this.onFocusChar}
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
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;