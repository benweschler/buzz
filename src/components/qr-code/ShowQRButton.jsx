import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import {
  CardScaffold, CloseButton,
  IDTitle, IDUserName,
  QRBorder,
  QRButton, QRRow, TimeoutControlStack, TopRow
} from "./styles/ShowQRButton.styled";
import secureLocalStorage from "react-secure-storage";
import {generateUserOTP} from "../../utils/generateOTP";
import {Box} from "@mui/material";
import {IoRefresh} from "react-icons/io5";
import {IoClose} from "react-icons/io5";

export default function ShowQRButton() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: "linear-gradient(to right, #ffa700, #ffc531)",
    boxShadow: 24,
    borderRadius: "0.8rem",
    p: 4,
    outline: "none",
  };

  return (
    <div>
      <QRButton onClick={handleOpen}>
        <QrCodeRoundedIcon/>
      </QRButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <QRCard onClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

function QRCard({onClose}) {
  // The amount of time a qr code is valid for in seconds
  const TIMEOUT_INTERVAL = 60
  // The number of milliseconds per countdown tick (corresponds to 1 second).
  const TICK_MILLIS = 1000
  const [expirationTimer, setExpirationTimer] = useState(TIMEOUT_INTERVAL)
  const [otp, setOtp] = useState(
    generateUserOTP(secureLocalStorage.getItem("private-key"))
  )

  useEffect(() => {
    const interval = setInterval(decrementTimer, TICK_MILLIS)

    return () => clearInterval(interval)
  }, [decrementTimer])

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

  function refreshCode() {
    setExpirationTimer(TIMEOUT_INTERVAL)
    const otp = generateUserOTP(secureLocalStorage.getItem("private-key"))
    setOtp(otp)
  }

  return (
    <CardScaffold>
      <div>
        <TopRow>
          <IDTitle>Personal Buzz ID</IDTitle>
          <CloseButton onClick={onClose}>
            <IoClose/>
          </CloseButton>
        </TopRow>
        <IDUserName>Ben Weschler</IDUserName>
      </div>
      <QRRow>
        <QRBorder>
          <QRCode value={otp}/>
        </QRBorder>
        <TimeoutManager
          expirationTimer={expirationTimer}
          refreshCode={refreshCode}
        />
      </QRRow>
    </CardScaffold>
  )
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
