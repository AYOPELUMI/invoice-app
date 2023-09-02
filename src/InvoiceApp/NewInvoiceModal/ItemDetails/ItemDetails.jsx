import {useState, useEffect} from 'react';
import {ImBin2} from "react-icons/im"
import './styles.scss';


export function ItemDetails(props){
	const {
		index,
		updateItemArray,
		getData,
		itemDetail,
		handleDel
	} = props

	const [itemNameValue, setItemName] = useState()
	const [qtyValue, setQtyValue] = useState(1)
	const [priceValue, setPriceValue] = useState(1)
	const [totalValue, setTotalValue] = useState(1)

	useEffect(() =>{
		if (itemDetail) {
			setItemName(itemDetail.name)
			setQtyValue(itemDetail.quantity)
			setPriceValue(itemDetail.price)
			setTotalValue(itemDetail.total)
		}
	},[])

	const deleteItemDetails =() =>{
		updateItemArray(props.index)
	}
	const handleName =(event) =>{
		let value = event.target.value
		setItemName(value)
	}
	const handleQty =(event) =>{
		let value = event.target.value
		setQtyValue(value)
	}
	const handlePrice =(event) =>{
		let value = event.target.value
		setPriceValue(value)
	}
	const handleDeleteItem =() =>{
		console.log({index})
		handleDel(index)
	}

	useEffect(() =>{
		let qtyValueClone = qtyValue
		let priceValueClone = priceValue
		let total

		qtyValueClone =Number(qtyValueClone)
		priceValueClone =Number(priceValueClone)
		total = qtyValueClone * priceValueClone
		setTotalValue(total.toFixed(2))
		getData([index,{"name": itemNameValue,"quantity":qtyValueClone,"price":priceValueClone,"total" : total.toFixed(2)}])

	},[qtyValue,priceValue,itemNameValue])

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
				<input type="text" value={qtyValue} onChange={handleQty} />
			</label>
			<label htmlFor="" className="priceLabel">
				<h4>Price</h4>
				<input type="text" value={priceValue} onChange={handlePrice} />
			</label>
			<label className="priceLabel">
				<h4>Total</h4>
				<input type="text" value={totalValue} disabled />
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
