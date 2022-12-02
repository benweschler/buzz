import {useEffect, useState} from "react";
import {generateUserOTP} from "../../utils/generateOTP";
import secureLocalStorage from "react-secure-storage";
import {
  CloseButton,
  IDTitle, IDUserName, QRBorder, QRRow, TimeoutControlStack,
  TopRow
} from "./styles/QRCard.styled";
import {IoClose, IoRefresh} from "react-icons/io5";
import QRCode from "react-qr-code";
import {ModalCardScaffold} from "../modalStyles";

export default function QRCard({onClose}) {
  // The amount of time a qr code is valid for in seconds
  const TIMEOUT_INTERVAL = 60
  // The number of milliseconds per countdown tick (corresponds to 1 second).
  const TICK_MILLIS = 1000
  const [expirationTimer, setExpirationTimer] = useState(TIMEOUT_INTERVAL)
  const [otp, setOtp] = useState(
    generateUserOTP(secureLocalStorage.getItem("private-key"))
  )

  useEffect(() => {
    function decrementTimer() {
      setExpirationTimer(prevState => {
        if (prevState === 0) {
          refreshCode()
          return prevState
        } else {
          return prevState - 1
        }
      })
    }

    const interval = setInterval(decrementTimer, TICK_MILLIS)

    return () => clearInterval(interval)
  }, [])

  function refreshCode() {
    setExpirationTimer(TIMEOUT_INTERVAL)
    const otp = generateUserOTP(secureLocalStorage.getItem("private-key"))
    setOtp(otp)
  }

  return (
    <ModalCardScaffold>
      <div>
        <TopRow>
          <IDTitle>Personal Buzz ID</IDTitle>
          <CloseButton onClick={onClose}><IoClose/></CloseButton>
        </TopRow>
        <IDUserName>Ben Weschler</IDUserName>
      </div>
      <QRRow>
        <QRBorder>
          <QRCode value={encodeQRValue(otp)}/>
        </QRBorder>
        <TimeoutManager
          expirationTimer={expirationTimer}
          refreshCode={refreshCode}
        />
      </QRRow>
    </ModalCardScaffold>
  )
}

function encodeQRValue(otp) {
  const userID = JSON.parse(localStorage.getItem('user')).id
  const valueMap = {
    "otp": otp,
    "userID": userID,
  }

  return JSON.stringify(valueMap)
}

function TimeoutManager({expirationTimer, refreshCode}) {
  return (
    <TimeoutControlStack>
      <IoRefresh
        className="refreshIcon"
        onClick={() => refreshCode()}
      />
      <div className="expirationTimer">
        {expirationTimer}s
      </div>
    </TimeoutControlStack>
  )
}
