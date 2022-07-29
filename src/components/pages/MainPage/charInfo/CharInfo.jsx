import './charInfo.scss';
import useMarvelService from "../../../../services/MarvelService";
import {useState, useEffect} from "react";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Spinner from "../../../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const CharInfo = (props) => {
    const [selectedChar, setSelectedChar] = useState(0);

    const {error, clearError, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setSelectedChar(char);
    }

    const updateChar = () => {
        clearError();
        const charId = props.charId;
        if (!charId) {
            return
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const skeleton = selectedChar || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && selectedChar ? <Spinner/> : null;
    const content = !(error || loading || !selectedChar) ? <View char={selectedChar}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, homepage, wiki, thumbnail, comics} = char;


    const imgStyle = char.thumbnail.includes('image_not_available') || char.thumbnail.includes('4c002e0305708')
        ? {objectFit: 'fill'}
        : {objectFit: 'cover'};
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {comics.map((item, i) => {
                    const comicId = item.resourceURI.replace(/\D/g, "").slice(1);
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return <li key={i} className="char__comics-item"><Link
                        to={`/comics/${comicId}`}>{item.name}</Link>
                    </li>
                })}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number.isRequired
}

export default CharInfo;