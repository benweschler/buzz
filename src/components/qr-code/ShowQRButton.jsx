import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useState} from "react";
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import {Box} from "@mui/material";
import {modalStyle} from "../modalStyles";
import {StyledIconButton} from "../global/StyledButtons";
import QRCard from "./QRCard";

export default function ShowQRButton() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <StyledIconButton onClick={handleOpen}>
        <QrCodeRoundedIcon/>
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
            <QRCard onClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
