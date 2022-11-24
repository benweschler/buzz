import {useMemo, useState} from 'react';
import styled from "styled-components";
import EventCard from './EventCard'
import Events from '../../constants/events.json';

function Feed({toggleTheme}) {
  const [filter, setFilter] = useState(() => () => true);
  const eventCards = useMemo(() => buildEventCards(filter), [filter]);

  return (
    <Scaffold>
      <Wrapper>
        <div>
          <button onClick={() => setFilter(() => () => true)}>
            Show All
          </button>
          <button onClick={() => setFilter(() => () => false)}>
            Show None
          </button>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <h1>Popular Events <span style={{color: "#a4a4a4"}}>at UCLA</span></h1>
        <EventView>{eventCards}</EventView>
      </Wrapper>
    </Scaffold>
  );
}

function buildEventCards(filter) {
  const cards = [];
  const events = [...Events].filter(filter);
  for (let i = 0; i < events.length; i++) {
    cards.push(
      <EventCard
        key={i}
        title={Events[i].title}
        organizer={Events[i].organizer}
        image={Events[i].image}
        description={Events[i].description}
        attendees={Events[i].attendees}
        location={Events[i].location}
        price={Events[i].price}
        tags={Events[i].tags}
        date="Mon, Nov 1, 12:32pm"
      />
    );
  }

  return cards;
}

// This is a placeholder for the rest of the app scaffolding this page.
const Scaffold = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  padding-top: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%
`;

const EventView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
`;

export default Feed;
