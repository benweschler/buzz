import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import {StyledIconButton} from "../../components/global/StyledButtons";
import {useState} from "react";
import Fade from "@mui/material/Fade";
import {Box} from "@mui/material";
import {modalStyle} from "../../components/modalStyles";
import Modal from "@mui/material/Modal";
import QRScannerCard from "./QRScannerCard";

export default function QRScannerButton() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <StyledIconButton onClick={handleOpen}>
        <QrCodeScannerRoundedIcon/>
      </StyledIconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <QRScannerCard onClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
