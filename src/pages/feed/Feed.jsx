import {useMemo, useState} from 'react';
import styled from "styled-components";
import EventCard from  './EventCard'
import Events from '../../events.json';

function Feed() {
  const [filter, setFilter] = useState(() => () => true);
  const eventCards = useMemo(() => buildEventCards(filter), [filter]);

  return (
    <Scaffold>
      <Wrapper>
        <h1>Events</h1>
        <div>
          <button onClick={() => setFilter(() => () => true)}>
            Show All
          </button>
          <button onClick={() => setFilter(() => () => false)}>
            Show None
          </button>
        </div>
        {eventCards}
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
        name={Events[i].title}
        organizer={Events[i].organizer}
        image={Events[i].image}
        description={Events[i].description}
        attendees={Events[i].attendees}
        location={Events[i].location}
        price={Events[i].price}
        date="Mon, Nov 1, 12:32pm"
      />
    );
  }

  return cards;
}

const Scaffold = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export default Feed;
