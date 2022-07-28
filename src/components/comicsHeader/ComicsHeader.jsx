import './comicsHeader.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const ComicsHeader = () => {

    return (
        <div className='comics__header'>
            <img src={avengers} alt="avengers" className='avengers'/>
            <div className="comics__header-text">
                <p>New comics every week! <br/>
                    Stay tuned!</p>
            </div>
            <img src={avengersLogo} alt="avengers logo" className='avengersLogo'/>
        </div>
    );
};

export default ComicsHeader;
