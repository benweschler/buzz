
import React from 'react'
import { ImgOrgCard, OrgCardImgDiv, OrgCardWrapper, TitleDivOrgCard, TitleOrgCard } from './styles/UserOrgCard.styled'

const OrgCard = (
    {
        name,
        image,
    }
) => {
  return (
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
  )
}

export default OrgCard