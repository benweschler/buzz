export default function formatUnixTime(unixTime) {
  const date = new Date(unixTime);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  let result = [];

  const day = date.getDay();
  result.push(daysOfWeek[day])

  const month = date.getMonth();
  result.push(months[month] + " " + date.getDate())

  result.push(formatAMPM(date));

  return result.join(", ");
};

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}
