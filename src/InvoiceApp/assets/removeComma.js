export function removeComma(args){
    console.log({args})
    let str = args.toString()
    console.log(str.replaceAll(",",""))
    return Number(str.replaceAll(",",""))
}