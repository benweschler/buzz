import styled, {useTheme} from "styled-components";
import Explosion from "./Explosion";
import {useState} from "react";

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

const StyledTonightButton = styled.div`
  width: 350px;
  height: 350px;
  position: absolute;
  pointer-events: none;

  button {
    width: 300px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: color 200ms ease-in;
    border-radius: 0.5rem;
    pointer-events: all;
    cursor: pointer;

    border: ${({theme}) => theme.brightness === "light"
            ? "black"
            : "rgba(239,71,161,0.5)"} 1px solid;
    background: ${({theme}) => theme.brightness === "light"
            ? theme.highlightCard
            : "rgba(239,71,161,0.5)"};
    color: ${({theme}) => theme.text};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: center;
  pointer-events: none;
`