
import React from 'react'
import { Link } from 'react-router-dom'
import { ImgOrgCard, OrgCardWrapper, TitleOrgCard } from './styles/UserOrgCard.styled'

const OrgCard = (
    {
        name,
        image,
        id,
        
    }
) => {
  return (
    <Link to={"/organization-page/" + id}>
      <OrgCardWrapper>
        <ImgOrgCard src={image}/>
        <TitleOrgCard>{name}</TitleOrgCard>
      </OrgCardWrapper>
    </Link>
  )
}

export default OrgCard