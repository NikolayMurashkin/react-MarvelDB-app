import {useEffect, useState} from 'react';
import Spinner from '../../../spinner/Spinner';
import ErrorMessage from '../../../errorMessage/ErrorMessage';
import useMarvelService from '../../../../services/MarvelService';
import {CSSTransition, TransitionGroup} from "react-transition-group";


import './randomChar.scss';
import mjolnir from '../../../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null);

    const {error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        clearError();
        const id = Math.round(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, homepage, wiki, thumbnail} = char;
    const imgStyle = thumbnail.includes('image_not_available')
    || thumbnail.includes('4c002e0305708')
        ? {objectFit: 'fill'}
        : {objectFit: 'cover'};
    return (

        <div className="randomchar__block">
            <TransitionGroup component={null} appear={true}>
                <CSSTransition
                    timeout={500}
                    classNames="randomchar__img"
                >
                    <img
                        src={thumbnail}
                        alt={name}
                        className="randomchar__img"
                        style={imgStyle}
                    />
                </CSSTransition>
            </TransitionGroup>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;