import QRCode from "react-qr-code";

export default function QRCard() {
  return (
    <QRCode
      size={256}
      value={"Ben says hi"}
    />
  )
}
