import classNames from "classnames";

const CharListItem = (props) => {
    const {img, name, onCharSelected, id} = props;
    const imgStyle = img.includes('image_not_available') || img.includes('4c002e0305708') ? {objectFit: 'fill'} : {objectFit: 'cover'};

    return (
        <li onClick={() => onCharSelected(id)} className={classNames("char__item")}>
            <img src={img} alt={name}
                 style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharListItem;