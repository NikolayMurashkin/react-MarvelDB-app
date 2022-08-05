import './singleComic.scss';
import {Link} from "react-router-dom";

/*const SingleComic = ({data}) => {
    const newComicId = useParams().comicId;

    const [selectedComic, setSelectedComic] = useState({});

    const {getComic, error, clearError, loading} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [newComicId]);

    const onComicLoaded = (comic) => {
        setSelectedComic(comic);
    }

    const updateComic = () => {
        clearError();
        if (!newComicId) {
            return
        }
        getComic(newComicId)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && selectedComic ? <Spinner/> : null;
    const content = !(error || loading || !selectedComic) ? <View comic={selectedComic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    const {title, description, thumbnail, price, pages, language} = comic;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back
                to all</Link>
        </>
    )

}
*/

const SingleComic = ({data}) => {

    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;