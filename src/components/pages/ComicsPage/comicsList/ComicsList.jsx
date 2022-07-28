import './comicsList.scss';
import {useState, useEffect, useRef} from "react";
import useMarvelService from "../../../../services/MarvelService";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Spinner from "../../../spinner/Spinner";
import ComicsListItem from "../comicsListItem/ComicsListItem";

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(520);
    const [comicEnded, setComicEnded] = useState(false);

    const {error, clearError, loading, getAllComics} = useMarvelService();

    useEffect(() => {
        onLoadMore()
    }, []);

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicEnded(ended);
    }

    const onLoadMore = (offset) => {
        clearError();
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = <View comics={comics} onComicSelected={props.onComicSelected}/>;

    console.log('render')

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                disabled={newItemLoading}
                onClick={() => onLoadMore(offset)}
                style={{'display': comicEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">{newItemLoading ? 'data is loading' : 'load more'}</div>
            </button>
        </div>
    )
}

const View = (props) => {

    const {comics} = props;
    return (
        <ul className="comics__grid">
            {comics.map((comic, i) => {
                return (
                    <ComicsListItem
                        id={comic.id}
                        key={i}
                        title={comic.title}
                        img={comic.thumbnail}
                        price={comic.price}/>
                )
            })}
        </ul>

    )
}
export default ComicsList;