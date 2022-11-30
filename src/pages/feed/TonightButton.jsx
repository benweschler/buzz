import {useTheme} from "styled-components";
import Explosion from "./Explosion";
import {useState} from "react";
import {Container, StyledTonightButton} from "./styles/TonightButton.styled";

export default function TonightButton({toggleTheme}) {
  const [repeatDelay, setRepeatDelay] = useState(0);
  const [explosionSize, setExplosionSize] = useState("0");
  const theme = useTheme();

  const explode = () => {
    if(explosionSize === "0")
      setExplosionSize("350")
    else
      setRepeatDelay(repeatDelay === 0 ? 1 : 0)
  }

  return (
    <Container>
      <StyledTonightButton className="button">
        <Explosion
          color={theme.main}
          size={explosionSize}
          delay={0}
          repeatDelay={repeatDelay}
          repeat={0}
        />
        <button
          onClick={() => {
            toggleTheme()
            if (theme.brightness === "light") explode()
          }}>
          <h2>What's Buzzin' Tonight</h2>
        </button>
      </StyledTonightButton>
    </Container>
  )
}
