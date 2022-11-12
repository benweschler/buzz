import styled from "styled-components";
import './Feed.css';
import Events from './events.json';

function Feed() {
  const filter = () => true;
  return (
    <Container>
      <List>
        <h1>Events</h1>
        <button>Filter</button>
        {buildEventCards(filter)}
      </List>
    </Container>
  );
}

function buildEventCards(filter) {
  const cards = [];
  const events = [...Events].filter(filter);
  for(let i = 0; i < events.length; i++) {
    cards.push(
      <Event
        number={i}
        name={Events[i].title}
        organizer={Events[i].organizer}
      />
    );
  }

  return cards;
}

function Event(props) {
  return (
    <div className='row'>
      <Card>{props.number}</Card>
      <div className='list'>
        <h2>{props.name}</h2>
        <div>{props.organizer}</div>
      </div>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
`;

const Card = styled.div`
  margin: 20px;
  background: #fff;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export default Feed;
