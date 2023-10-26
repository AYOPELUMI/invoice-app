export function numberFormat(args){
    let numValue = args
    return new Intl.NumberFormat("en-US").format(numValue)
}