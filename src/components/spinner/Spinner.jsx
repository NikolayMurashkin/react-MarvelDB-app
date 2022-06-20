const Spinner = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto', background: 'none', display: 'block', shapeRendering: 'auto', width: 250 + 'px', height: 250 + 'px', viewBox: '0 0 100 100', preserveAspectRatio: 'xMidYMid' }}>
			< circle cx="125" cy="125" r="0" fill="none" stroke="#c8472c" strokeWidth="2" >
				<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
				<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
			</circle > <circle cx="125" cy="125" r="0" fill="none" stroke="#412a1e" strokeWidth="2">
				<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
				<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
			</circle>
		</svg >

	)
}

export default Spinner;