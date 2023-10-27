import {useState} from 'react';

import './styles.scss';


export const Button = props => {

	const{
		propsType,
		propsClassName,
		propsOnClick,
		children,
		displayWord,
		propsDisabled
	} = props
	
  return (
  	<>
  		<button 
  			type={propsType} 
  			onClick={propsOnClick} 
  			className={propsClassName ? propsClassName : undefined}
  			disabled={propsDisabled}>
				{displayWord}
  			{propsDisabled ? <i className="loadingIcon"></i> : children}
  		</button>
  	</>
  )
}


