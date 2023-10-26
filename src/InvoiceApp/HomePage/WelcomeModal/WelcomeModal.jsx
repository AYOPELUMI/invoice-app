import React from 'react';
import {AiFillCloseCircle} from "react-icons/ai"
import{NavLink} from "react-router-dom"
import {Button} from "../../assets/Button/Button"
import './styles.scss';


export const WelcomeModal = props => {
	const {
		updateShowWelcomeModal,
		showWelcomeModal
	} = props
  return (
  	<>
  		<div className="welcomeModalCtnr">
  			<div className="mainContent" style={{
				opacity: showWelcomeModal ? "1" : "0"
			}}>
  				<span className="closeModalSpan" onClick={updateShowWelcomeModal}>
  					<AiFillCloseCircle className="icon"  />
  				</span>

  				<div>
  				<h3>Send your first official invoice by clicking on the start button </h3>
				</div>
				<NavLink to="newInvoice">
  					<Button propsClassName="startBtn" displayWord="create invoice" propsOnClick={updateShowWelcomeModal}/>
  				</NavLink>
			</div>
  			
  		</div>
  	</>
  	)
}
