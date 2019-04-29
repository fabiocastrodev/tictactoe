import React from 'react'

import styled, { keyframes } from 'styled-components'

import { SharedElement } from '@taito/react-sheltr'

import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Button from '../../../components/Button'

const heartSymbol = require('../../../assets/heart-symbol.svg')
const keySymbol = require('../../../assets/key-symbol.svg')
const playSymbol = require('../../../assets/play-symbol.svg')

const backgroundImage = require('../../../assets/background.svg')
const borderBottomRightImage = require('../../../assets/border-bottom-right.svg')

function Choose(props) {
  const { initialising, user } = useAuthState(firebase.auth())
  
  let displayName = ''
  if (user) {
    if (user.isAnonymous) {
      displayName = 'anônimo'
    } else {
      displayName = user.displayName
    }
  }

  return (
    <Wrapper>
      <SharedElement sharedId="border-left" startOnUnmount>
        {sharedProps => (
          <ImageWrapper {...sharedProps}>
          </ImageWrapper>
        )}
      </SharedElement>

      <ContentWrapper>
        <div>
          <MessageWraper className={user ? 'animate' : ''}>
            <span className="name">Olá, {displayName}</span>
            <span className="choose">Escolha como começar:</span>
          </MessageWraper>

          <div>
            <ActionButton
              borderColor="#f7206b"

              backgroundColor="#dd2767"
              backgroundColorHover="#fd2f77"

              fullWidth
            >
              <img src={heartSymbol} />
              Jogar agora
            </ActionButton>

            <ActionButton
              borderColor="#084bd6"

              backgroundColor="#1981d4"
              backgroundColorHover="#1470c0"

              fullWidth
            >
              <img src={keySymbol} />
              Criar partida
            </ActionButton>

            <ActionButton
              borderColor="#f7206b"

              backgroundColor="#dd2767"
              backgroundColorHover="#fd2f77"

              fullWidth
            >
              <img src={playSymbol} />
              Entrar em uma partida
            </ActionButton>
          </div>
        </div>
      </ContentWrapper>

      <BorderBottomRightImage src={borderBottomRightImage} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  overflow: hidden;

  position: relative;
`

const ImageWrapper = styled.div`
  width: 5%;
  height: 100%;

  overflow-y: hidden;

  background-size: cover;
  background-position-x: right;
  background-image: url('${backgroundImage}');

  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  flex-grow: 1;
  flex-direction: column;

  padding: 40px 80px;
`

const showMessage = keyframes`
  from {
    transform: translateY(-200%);
  }

  to {
    transform: translateY(0%);
  }
`

const MessageWraper = styled.div`
  & .name {
    display: block;
    margin-bottom: 10px;

    font-size: 14px;
  }

  & .choose {
    display: block;

    font-size: 18px;
  }

  visibility: hidden;
  
  &.animate {
    visibility: visible;
    animation: ${showMessage} 1s steps(5, start) 1;
  }

  margin-bottom: 20px;
`

const showBorderBottomRight = keyframes`
  from {
    transform: translate(100%)
  }

  to {
    transform: translate(0%)
  }
`

const BorderBottomRightImage = styled.img`
  position: absolute;

  right: 0;
  bottom: 0;

  width: 10%;

  @media (min-width: 700px) {
    width: 200px;
  }

  animation: ${showBorderBottomRight} 0.7s steps(5, start) 1;
`

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    height: 30px;
    margin-right: 10px;
  }
`

export default Choose