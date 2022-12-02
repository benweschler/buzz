export const getTime = (date) => {
  const time = new Date(date);
  let result = "";
  const day = time.getDay();
  switch (day) {
    case 0:
      result += "Sun, ";
      break;
    case 1:
      result += "Mon, ";
      break;
    case 2:
      result += "Tue, ";
      break;
    case 3:
      result += "Wed, ";
      break;
    case 4:
      result += "Thu, ";
      break;
    case 5:
      result += "Fri, ";
      break;
    case 6:
      result += "Sat, ";
      break;
    default:
      return;
  }
  const month = time.getMonth();
  switch (month) {
    case 0:
      result += "Jan ";
      break;
    case 1:
      result += "Feb ";
      break;
    case 2:
      result += "Mar ";
      break;
    case 3:
      result += "Apr ";
      break;
    case 4:
      result += "May ";
      break;
    case 5:
      result += "Jun ";
      break;
    case 6:
      result += "Jul ";
      break;
    case 7:
      result += "Aug ";
      break;
    case 8:
      result += "Sep ";
      break;
    case 9:
      result += "Oct ";
      break;
    case 10:
      result += "Nov ";
      break;
    case 11:
      result += "Dec ";
      break;
    default:
      return;
  }
  const dayOfMonth = time.getDate();
  result += dayOfMonth + ", ";

  const Hours = time.getHours();
  let Mins = time.getMinutes();
  if (Mins < 10) {
    Mins = "0" + Mins;
  }
  result += Hours + ":" + Mins;
  return result;
};
