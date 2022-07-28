import classNames from "classnames";

const CharListItem = (props) => {

    const {img, title, price} = props;
    const imgStyle = img.includes('image_not_available') || img.includes('4c002e0305708') ? {objectFit: 'fill'} : {objectFit: 'cover'};

    return (
        <li
            className={classNames("comics__item")}>
            <a href="src/components/pages/ComicsPage/comicsListItem/ComicsListItem#">
                <img style={imgStyle} src={img} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </a>
        </li>
    );
}

export default CharListItem;