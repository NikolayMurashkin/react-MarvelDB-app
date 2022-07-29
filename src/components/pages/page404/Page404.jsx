import {Link} from "react-router-dom";
import './page404.scss';
import capError from '../../../resources/img/capError.png';


const Page404 = () => {
    return (
        <div className='errorPage'>
            <img src={capError} alt="capitan America"/>
            <h1 style={{
                'fontWeight': 'bold',
                'fontSize': '44px',
                'color': '#202020',
                'marginBottom': '40px'
            }}>404 PAGE NOT FOUND</h1>
            <h2
                style={{
                    'fontWeight': 'bold',
                    'fontSize': '20px',
                    'color': '#202020',
                    'marginBottom': '30px'
                }}>HYDRA is currently attacking this page!</h2>
            <Link style={{
                'textAlign': 'center',
                'fontWeight': 'bold',
                'fontSize': '32px',
                'color': '#9f0013'
            }} to='/'>Back to main page</Link>
            <div className="error-image-animate"></div>
        </div>
    );
};

export default Page404;
