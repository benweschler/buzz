import {CgClipboard} from "react-icons/cg";
import {GrWorkshop} from "react-icons/gr";
import {MdSportsFootball} from "react-icons/md";
import {FaUserFriends} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {BsMusicNoteBeamed} from "react-icons/bs";
import {GiMaterialsScience} from "react-icons/gi";
import {FaUserTie} from "react-icons/fa";
import {GiHighHeel} from "react-icons/gi";
import {RiHandCoinLine} from "react-icons/ri";

export default class Constants {
  static API_ENDPOINT = "https://buzz-backend.onrender.com"

  static tags = {
    "Workshop": <GrWorkshop/>,
    "Info-Sesh": <CgClipboard/>,
    "Sports": <MdSportsFootball/>,
    "Social": <FaUserFriends/>,
    "Humanities": <ImBooks/>,
    "Music": <BsMusicNoteBeamed/>,
    "STEM": <GiMaterialsScience/>,
    "Career": <FaUserTie/>,
    "Formal": <GiHighHeel/>,
    "Fundraiser": <RiHandCoinLine/>
  };
}