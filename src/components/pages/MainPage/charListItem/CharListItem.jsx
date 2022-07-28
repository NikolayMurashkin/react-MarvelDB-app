import classNames from "classnames";

const CharListItem = (props) => {

    const onFocus = (e) => {
        props.onFocus(e)
        props.onCharSelected(props.id);
    }

    const {img, name} = props;
    const imgStyle = img.includes('image_not_available') || img.includes('4c002e0305708') ? {objectFit: 'fill'} : {objectFit: 'cover'};

    return (
        <li key={props.id}
            tabIndex={0}
            onFocus={(e) => onFocus(e)}
            className={classNames("char__item")}>
            <img src={img} alt={name}
                 style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharListItem;