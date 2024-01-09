import { removeComma } from "../removeComma";
import { numberFormat } from "../numberFormat";
export function NumberInput({ value, onChange}) {

	const handleChange = (event) => {
		let value = removeComma(event.target.value)
		console.log({value});
		if (value.length > 0) {
			let valueToNumber = Number(value)
			
			if (valueToNumber) {
				onChange(valueToNumber)
			}	
		} else {
			onChange(value)
		}
	}
	return (
		<input  type="text" inputMode="decimal" value={numberFormat(value)} onChange={handleChange} />
	)
}