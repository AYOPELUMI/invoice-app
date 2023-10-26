import {useState} from 'react';

import './styles.scss';


export const Button = props => {

	const{
		propsType,
		propsClassName,
		propsOnClick,
		children,
		displayWord
	} = props
	const [isLoading, setIsLoading] = useState(false)
  return (
  	<>
  		<button 
  			type={propsType} 
  			onClick={propsOnClick} 
  			className={propsClassName ? propsClassName : undefined}
  			disabled={isLoading}>
				{displayWord}
  			{isLoading ? <i className="loadingIcon"></i> : children}
  		</button>
  	</>
  )
}


