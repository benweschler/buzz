import {BiPaint} from "react-icons/bi";
import {DiReact} from "react-icons/di";
import {IoMusicalNotesOutline} from "react-icons/io5";

export default class Constants {
  static tags = {
    "0": {
      id: "0",
      icon: <IoMusicalNotesOutline/>,
      name: "Music"
    },
    "1": {
      id: "1",
      icon: <BiPaint/>,
      name: "Art"
    },
    "2": {
      id: "2",
      icon: <DiReact/>,
      name: "Science"
    }
  };
}
