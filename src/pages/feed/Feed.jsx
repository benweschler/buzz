import {useMemo, useState} from 'react';
import styled from "styled-components";
import './Feed.css';
import Events from './events.json';

function Feed() {
  const [filter, setFilter] = useState(() => () => true);
  const eventCards = useMemo(() => buildEventCards(filter), [filter]);

  return (
    <Container>
      <List>
        <h1>Events</h1>
        <div className="row">
          <button onClick={() => setFilter(() => () => true)}>
            Show All
          </button>
          <button onClick={() => setFilter(() => () => false)}>
            Show None
          </button>
        </div>
        {eventCards}
      </List>
    </Container>
  );
}

function buildEventCards(filter) {
  const cards = [];
  const events = [...Events].filter(filter);
  for (let i = 0; i < events.length; i++) {
    cards.push(
      <Event
        key={i}
        name={Events[i].title}
        organizer={Events[i].organizer}
        url={Events[i].image}
        description={Events[i].description}
      />
    );
  }

  return cards;
}

function Event({name, organizer, url, description}) {
  return (
    <div className='row'>
      <Card>
        <img src={url} alt={name} />
        <Gradient/>
        <p>{name}</p>
      </Card>
      <div className='eventDetails'>
        <h2>{organizer}</h2>
        <span>{description}</span>
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: relative;

  p {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 5%;
    bottom: 0;
    font-size: 25px;
    color: white;
    text-align: center;
    font-weight: 600;
  }

  img {
    border-radius: 20px;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  width: 100%;
  height: 33%;
  bottom: 0;
  border-radius: 20px;
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Feed;
