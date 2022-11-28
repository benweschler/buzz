import {BiPaint} from "react-icons/bi";
import {MdOutlineScience} from "react-icons/md";
import {IoMusicalNotesOutline} from "react-icons/io5";

export default class Constants {
  static tags = {
    0: {
      icon: <IoMusicalNotesOutline/>,
      name: "Music"
    },
    1: {
      icon: <BiPaint/>,
      name: "Art"
    },
    2: {
      icon: <MdOutlineScience/>,
      name: "Science"
    }
  };
}
