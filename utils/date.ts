export const formatTime = (date : Date) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const hours = date.getHours()
    const minutes =date.getMinutes()
    const dayOfWeek = daysOfWeek[date.getDay()]
    const day = date.getDate()
    const month = date.getMonth()

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${dayOfWeek} ${day} thg ${month}`;
}