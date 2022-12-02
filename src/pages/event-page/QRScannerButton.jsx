import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import {useState} from "react";
import Fade from "@mui/material/Fade";
import {Box} from "@mui/material";
import {modalStyle} from "../../components/modalStyles";
import Modal from "@mui/material/Modal";
import QRScannerCard from "./QRScannerCard";
import {NavBarItem} from "../../components/global/styles/Navbar.styled";
import {QRScannerButtonRow} from "./styles/QRScannerButton.styled";

export default function QRScannerButton({eventID}) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <NavBarItem onClick={handleOpen}>
        <QRScannerButtonRow>
          Scan Tickets <QrCodeScannerRoundedIcon/>
        </QRScannerButtonRow>
      </NavBarItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <QRScannerCard eventID={eventID} onClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
