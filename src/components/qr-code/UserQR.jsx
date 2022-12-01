import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useState} from "react";
import QRCode from "react-qr-code";
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import {QRButton} from "./styles/UserQR.styled";
import secureLocalStorage from "react-secure-storage";
import {generateUserOTP} from "../../utils/generateOTP";
import {Box} from "@mui/material";

export default function ShowQRButton() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(null)
  const handleOpen = () => {
    const otp = generateUserOTP(secureLocalStorage.getItem("private-key"))
    setOtp(otp)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: "radial-gradient(#ffa700, #ffba00)",
    boxShadow: 24,
    borderRadius: "1rem",
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
            <QRCard otp={otp}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

function QRCard({otp}) {
  return (
    <QRCode value={otp}/>
  )
}
