import {useEffect, useState} from 'react';
import {useTheme} from "styled-components";
import EventCard from './EventCard'
import Events from '../../constants/events.json';
import Constants from '../../constants/Constants'
import FilterChip from "./FilterChip";
import TonightButton from "./TonightButton"
import axios from "axios";
import {EventView, FilterRow, Scaffold, Wrapper} from "./styles/Feed.styled";

export default function Feed({toggleTheme}) {
  const [selectedTags, setSelectedTags] = useState([])
  const theme = useTheme()
  useEffect(() => {
    async function getEvents() {
      const events = await axios.put(
        "http://localhost:4000/api/utilities/filter",
        {
          tags: selectedTags,
          tonight: theme.brightness === "light"
        }
      );
      console.log(events.data)
    }

    getEvents()

    return (() => {
      if(theme.brightness === "dark")
        toggleTheme()
    })
  }, [selectedTags, theme.brightness, toggleTheme])


  function filter(element) {
    for(let tagId of selectedTags) {
      if(!element.tags.includes(tagId)) return false;
    }

    return true;
  }

  return (
    <Scaffold>
      <Wrapper>
        <h1>Popular Events <span style={{color: "#a4a4a4"}}>at UCLA</span></h1>
        <TonightButton toggleTheme={toggleTheme}/>
        <FilterRow>
          {TagFilters(selectedTags, setSelectedTags)}
        </FilterRow>
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
