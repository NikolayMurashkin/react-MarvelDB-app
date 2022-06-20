import img from './error.gif';

const ErrorMessage = () => {
	return (
		<img className='error' src={img} alt="Error" style={{ objectFit: 'contain', width: '250px', heigth: '250px', margin: '0 auto', display: 'block' }} />
	)
}

export default ErrorMessage;