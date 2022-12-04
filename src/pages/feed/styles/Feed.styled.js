import styled from 'styled-components'
import {StyledErrorMessage} from "../../../components/globalStyles";

export const Scaffold = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  padding-top: 100px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%
`

export const EventView = styled.div`
  display: ${({visible}) => visible ? "grid" : "none"};
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
`

export const FilterRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
`

export const LoadingIndicator = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const ImageLoadError = styled(StyledErrorMessage)`
  padding: 75px;
`
