
import React from 'react'
import { Link } from 'react-router-dom'
import { ImgOrgCard, OrgCardImgDiv, OrgCardWrapper, TitleDivOrgCard, TitleOrgCard } from './styles/UserOrgCard.styled'

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
        <OrgCardImgDiv>
          <ImgOrgCard src={image}>
          </ImgOrgCard>
        </OrgCardImgDiv>
        <TitleDivOrgCard>
          <TitleOrgCard>
            {name}
          </TitleOrgCard>

        </TitleDivOrgCard>


      </OrgCardWrapper>
    </Link>
  )
}

export default OrgCard