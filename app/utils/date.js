/**
 *
 *
 * @param {string} timeString like "2017-08-09T22:00:00+0800"
 */
export function timeReadable(timeString) {
    const time = new Date(timeString)
    const timeLocalDate = time.toLocaleDateString()
    const timeLocalTime = time.getHours() + ':' + time.getMinutes()
    const now = new Date()
    const nowLocalDate = now.toLocaleDateString()
    if (nowLocalDate === timeLocalDate) {
        return '今天 ' + timeLocalTime
    }
    const yestday = new Date(now.getTime() - 86400000).toLocaleDateString()
    if (yestday === timeLocalDate) {
        return '昨天 ' + timeLocalTime
    }
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    const monthStr =  month > 9 ? String(month) : '0' + String(month)
    const dayStr = day > 9 ? String(day) : '0' + String(day)
    const date = monthStr + '-' + dayStr
    if (now.getFullYear() === year) {
        return date
    }
    else {
        return String(year) + '-' + date
    }
}

/**
 *
 *
 * @param {string} timeString like "2017-08-09T22:00:00+0800"
 */
export function timeBeauty(timeString) {
    let dt = timeString.substring(0, 19)
    let dtArray = dt.split('T')
    return dtArray[0] + ' ' + dtArray[1]
}