import {BiPaint} from "react-icons/bi";
import {IoMusicalNotesOutline} from "react-icons/io5";
import {MdSportsFootball} from "react-icons/md";
import {FaUserFriends} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {BsMusicNoteBeamed} from "react-icons/bs";
import {GiMaterialsScience} from "react-icons/gi";
import {BiDollar} from "react-icons/bi";
import {GiHighHeel} from "react-icons/gi";
import {RiHandCoinLine} from "react-icons/ri";

export default class Constants {
  static tags = {
    "Workshop": <IoMusicalNotesOutline/>,
    "Info-Sesh": <BiPaint/>,
    "Sports": <MdSportsFootball/>,
    "Social": <FaUserFriends/>,
    "Humanities": <ImBooks/>,
    "Music": <BsMusicNoteBeamed/>,
    "STEM": <GiMaterialsScience/>,
    "Career": <BiDollar/>,
    "Formal": <GiHighHeel/>,
    "Fundraiser": <RiHandCoinLine/>
  };
}