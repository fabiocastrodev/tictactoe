import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import styled, { keyframes } from 'styled-components'

import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'

const heartSymbol = require('../../../assets/heart-symbol.svg')

function Finish(props) {
  const { history, match } = props

  const { roomId } = match.params

  const { error, loading, value } = useDocument(
    firebase.firestore().collection('rooms').doc(roomId)
  )

  return (
    <Wrapper>
      <ContentWrapper>
        <Icon src={heartSymbol} alt="heart" />

        <Message>Encontrando jogador...</Message>
      </ContentWrapper>
    </Wrapper>
  )
}

Finish.propTypes = {
  match: PropTypes.object.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.main};

  display: flex;
  align-items: center;
  justify-content: center;
`

const blink = keyframes`
  to {
    visibility: hidden;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  animation: ${blink} 0.7s steps(5, start) infinite;
`

const Icon = styled.img`
  width: 150px;
  height: 150px;
`

const Message = styled.h4`
  color: #fff;
  font-weight: normal;
`

export default Finish