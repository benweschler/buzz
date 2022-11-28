import {useState} from 'react';
import styled from "styled-components";
import EventCard from './EventCard'
import Events from '../../constants/events.json';
import Constants from '../../constants/Constants'
import FilterChip from "./FilterChip";

function Feed({toggleTheme}) {
  const [selectedTags, setSelectedTags] = useState([])
  function filter(element) {
    for(let tagId of selectedTags) {
      if(!element.tags.includes(tagId)) return false;
    }

    return true;
  }

  return (
    <Scaffold>
      <Wrapper>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <FilterRow>
          {TagFilters(selectedTags, setSelectedTags)}
        </FilterRow>
        <h1>Popular Events <span style={{color: "#a4a4a4"}}>at UCLA</span></h1>
        <EventView>{buildEventCards(filter)}</EventView>
      </Wrapper>
    </Scaffold>
  );
}

function buildEventCards(filter) {
  const cards = [];
  const events = [...Events].filter(filter);
  for (let event of events) {
    cards.push(
      <EventCard
        key={event.id}
        title={event.title}
        organizer={event.organizer}
        image={event.image}
        description={event.description}
        attendees={event.attendees}
        location={event.location}
        price={event.price}
        tags={event.tags}
        date="Mon, Nov 1, 12:32pm"
      />
    );
  }

  return cards;
}

function TagFilters(selectedTags, setSelectedTags) {
  let filters = []
  for (let [id, tag] of Object.entries(Constants.tags)) {
    filters.push(
      <FilterChip
        key={id}
        selected={selectedTags.includes(id)}
        icon={tag.icon}
        name={tag.name}
        onClick={() => setSelectedTags(
          selectedTags.includes(id)
            ? selectedTags.filter(e => e !== id)
            : [...selectedTags, id]
        )}
      />
    )
  }

  return filters;
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

const FilterRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
`;

export default Feed;
