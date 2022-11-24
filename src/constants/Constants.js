import {CiMusicNote1} from "react-icons/ci";
import {BiPaint} from "react-icons/bi";
import {MdOutlineScience} from "react-icons/md";

export default class Constants {
  static tags = {
    1: {
      icon: <CiMusicNote1/>,
      name: "Music"
    },
    2: {
      id: 2,
      icon: <BiPaint/>,
      name: "Art"
    },
    3: {
      id: 3,
      icon: <MdOutlineScience/>,
      name: "Science"
    }
  };
}
