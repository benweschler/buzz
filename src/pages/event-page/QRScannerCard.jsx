import {useState} from "react";
import {ModalCardScaffold} from "../../components/modalStyles";
import {
  CloseButton,
  ScannerTitle, SuccessMessage,
  TopRow,
} from "./styles/QRScannerCard.styled";
import QrReader from "modern-react-qr-reader";
import axios from "axios";
import {StyledErrorMessage, StyledMessage} from "../../components/globalStyles";
import {IoClose} from "react-icons/io5";
import Constants from "../../constants/Constants";

const ScanStatus = {
  scanning: "scanning",
  error: "error",
  failedAuthentication: "failedAuthentication",
  alreadyRegistered: "alreadyRegistered",
  noTicket: "noTicket",
  success: "success",
}

export default function QRScannerCard({onClose, eventID}) {
  const [lastScanTime, setLastScanTime] = useState(null)
  const [status, setStatus] = useState(ScanStatus.scanning)

  const COOLDOWN_MILLIS = 3000

  function onReaderError(e) {
    console.log("Error reading QR code:", e)
    setStatus(ScanStatus.error)
  }

  function onScan(code) {
    if (!code) return;

    code = code.text

    let userID, otp
    try {
      const data = JSON.parse(code)
      userID = data.userID
      otp = data.otp
    } catch (e) {
      setStatus(ScanStatus.error)
      console.log("Error scanning QR code:", e)
    }

    if (!isOnCoolDown()) {
      processOtp(otp, userID).catch((e) => {
        console.log("Error processing otp:", e)
        return setStatus(ScanStatus.error)
      })
    }
  }

  function isOnCoolDown() {
    const current = Date.now()
    if (lastScanTime == null) {
      setLastScanTime(current)
      return false
    }

    const coolingDown = current - lastScanTime < COOLDOWN_MILLIS

    if (coolingDown) return true

    setLastScanTime(current)
    return false
  }

  async function processOtp(otp, userID) {
    const isValid = await validateOtp(otp, userID)
      .catch((e) => console.log("Error validating otp:", e))

    if (!isValid) return setStatus(ScanStatus.failedAuthentication)

    const response = await checkUserIn(userID, eventID)
      .catch((e) => console.log("Error checking user in:", e))
    const registered = response.registered
    const alreadyChecked = response.alreadyChecked

    if (alreadyChecked) return setStatus(ScanStatus.alreadyRegistered)
    if (!registered) return setStatus(ScanStatus.noTicket)
    return setStatus(ScanStatus.success)
  }

  return (
    <ModalCardScaffold>
      <TopRow>
        <ScannerTitle>Scan a Buzz ID Code</ScannerTitle>
        <CloseButton onClick={onClose}><IoClose/></CloseButton>
      </TopRow>
      <ScanStatusMessage status={status}/>
      <QrReader
        style={{height: "25rem", width: "25rem"}}
        onError={onReaderError}
        onScan={onScan}
        facingMode="environment"
      />
    </ModalCardScaffold>
  )
}

async function validateOtp(otp, userID) {
  const data = await axios.get(
    `${Constants.API_ENDPOINT}/api/users/validateOTP/${userID}/${otp}`)
    .catch((e) => console.log("Error validating OTP:", e))

  return data.data.authentication
}

async function checkUserIn(userID, eventID) {
  const body = {
    user: userID,
    event: eventID
  }

  const response = await axios.patch(
    `${Constants.API_ENDPOINT}/api/users/checkIn`, body)
    .catch((e) => console.log("Error checking user in:", e))

  return {
    registered: response.data.registered,
    alreadyChecked: response.data.alreadyChecked
  }
}

function ScanStatusMessage({status}) {
  const statusMap = {
    scanning: "Scan a Buzz Personal ID",
    error: "Error validating ID",
    failedAuthentication: "Personal ID failed authentication",
    alreadyRegistered: "Already been registered at this event",
    noTicket: "No ticket to this event",
    success: "Accepted",
  }

  const message = statusMap[status]

  if (status === ScanStatus.scanning) {
    return (
      <StyledMessage>{message}</StyledMessage>
    )
  } else if (status === ScanStatus.success) {
    return (
      <SuccessMessage>{message}</SuccessMessage>
    )
  }

  return (
    <StyledErrorMessage>{message}</StyledErrorMessage>
  )
}
