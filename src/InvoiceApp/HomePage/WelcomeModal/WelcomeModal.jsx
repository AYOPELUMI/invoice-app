import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
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
  					<IoCloseSharp className="icon"  />
  				</span>

  				<div>
  				<h3>Send your first official invoice by clicking on the start button </h3>
				</div>
				<NavLink to="newInvoice">
  					<Button className="startBtn" displayWord="Create invoice" onClick={updateShowWelcomeModal}/>
  				</NavLink>
			</div>
  			
  		</div>
  	</>
  	)
}
