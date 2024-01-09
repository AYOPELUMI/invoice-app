import {useState, useEffect} from 'react';
import {ImBin2} from "react-icons/im"
import { numberFormat } from '../../assets/numberFormat';
import { removeComma } from '../../assets/removeComma';
import { NumberInput } from '../../assets/NumberInput/NumberInput';
import './styles.scss';


export function ItemDetails(props){
	const {
		index,
		updateItemArray,
		getData,
		itemDetail,
		handleDel
	} = props

	console.log({props})

	const [itemNameValue, setItemName] = useState("")
	const [qtyValue, setQtyValue] = useState(0)
	const [priceValue, setPriceValue] = useState(0)
	const [totalValue, setTotalValue] = useState(0)

	useEffect(() =>{
		if (itemDetail) {
			setItemName(itemDetail.name)
			setQtyValue(itemDetail.quantity)
			setPriceValue(itemDetail.price)
			setTotalValue(itemDetail.total)
		}
	},[])
	console.log({qtyValue})
	console.log({itemDetail})

	const updateItemDetail = (name,value) =>{
		let itemDetailClone= {...itemDetail}
			itemDetailClone.name =value
			getData(itemDetailClone)
	}
	const handleName =(event) =>{
		let value = event.target.value
		setItemName(value)
		updateItemDetail("name",value)
	}
	const handleQty =(qty) =>{
		console.log({qty})
		setQtyValue(qty)
		updateItemDetail("quantity",qty)
	}

	const handlePrice =(number) =>{
		setPriceValue(number)
		updateItemDetail("price",number)
	}

	const handleDeleteItem =() =>{
		console.log({index})
		handleDel(index)
	}



	return (
	<div className="itemCtnr" key={index}>
		<label htmlFor="" className="itemFirstLabel">
			<h4>Item Name</h4>
			<input type="text" value={itemNameValue} onChange={handleName} required/>
		</label>
		<div className="itemDiv">
			<label htmlFor="" className="qtyLabel">
				<h4>
					Qty
				</h4>
				<NumberInput  value={qtyValue} onChange={handleQty} />
			</label>
			<label htmlFor="" className="priceLabel">
				<h4>Price</h4>
				<NumberInput value={priceValue} onChange={handlePrice} />
			</label>
			<label className="priceLabel">
				<h4>Total</h4>
				<input type="text" value={numberFormat((qtyValue * priceValue).toFixed(2))} disabled />
			</label>
			<i key={index} className="bin" index={index} id={index}>
			<i style={{
				position :'absolute',
				width: "100%",
				height:"100%"

			}} key={index} index={index} id={index} onClick={handleDeleteItem}></i>
				<ImBin2  index={index} id={index} />
			</i>
		</div>
	</div>
	)
}
