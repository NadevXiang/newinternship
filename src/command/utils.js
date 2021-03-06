export const replaceNull = (obj) => {
    let keys = Object.keys(obj)
    keys.map(item => {
        if (typeof obj[item] == 'string') {
            obj[item] = obj[item].trim()
            if (!obj[item]) {
                obj[item] = "暂无"
            }
        }else if(!obj[item]){
            obj[item] = "暂无"
        }

    })
    return obj
}
export const text2html = (str) => {
    if (str == null) {
        return "";
    } else if (str.length == 0) {
        return "";
    }
    return str.replace(/\n/g, '<br />');

}

//用于展示换行  会把\n换位<br>
export const Obj2html = (obj) => {
    let arr = Object.keys(obj)
    arr.map(item => {
        if (typeof obj[item] == 'string') {
            obj[item] = text2html(obj[item])
            // console.log(obj[item])
        }
    })
    return obj
}