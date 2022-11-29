import styled, {useTheme} from "styled-components";
import Explosion from "./Explosion";
import {useState} from "react";

export default function TonightButton({toggleTheme}) {
  const [repeatDelay, setRepeatDelay] = useState(0);
  const theme = useTheme();

  const explode = () => setRepeatDelay(repeatDelay === 0 ? 1 : 0);

  return (
    <Container>
      <StyledTonightButton className="button">
        <Explosion
          className="explosion"
          color="orange"
          size="350"
          delay={0}
          repeatDelay={repeatDelay}
          repeat={0}
        />
        <button
          onClick={() => {
            toggleTheme()
            if(theme.brightness === "light") explode()
          }}>
          <h1>What's Happening Tonight</h1>
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
    pointer-events: all;

    /* Make button transparent */
    background: transparent;
    border: none !important;
    color: ${({theme}) => theme.text};
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: center;
  pointer-events: none;
`
