export const dateParser = (num: any) => {
    let options = {hour: "2-digit", minute:"2-digit", second:"2-digit", 
    weekday: "long", year:"numeric", month:"short", day:"numeric"}

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString()
}

export const timeStampParser = (num: any) => {
    let options = {
    hour: "2-digit", 
    minute:"2-digit", 
    second:"2-digit", 
    weekday: "long", 
    year:"numeric", 
    month:"short", 
    day:"numeric"
}

    let date = new Date(num).toLocaleDateString("fr-FR", options )

    return date.toString()
}

export const isEmpty = (value:any) => {
    return value === undefined ||
     value === null || 
     (typeof value === "object" && Object.keys(value).length ===0) || 
     (typeof value === "string" && value.trim().length === 0)
}