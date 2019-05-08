import React from 'react'

import styled from 'styled-components'

import { SharedElement } from '@taito/react-sheltr'

import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Button from '../../../components/Button'
import Logout from '../../../components/Logout'
import Title from '../../../components/Title'

const heartSymbol = require('../../../assets/heart-symbol.svg')
const keySymbol = require('../../../assets/key-symbol.svg')
const playSymbol = require('../../../assets/play-symbol.svg')

const backgroundImage = require('../../../assets/background.svg')

function Choose(props) {
  const { history } = props

  const { user } = useAuthState(firebase.auth())
  
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
          <AnimatedTitle description="Escolha como começar:" className={user && 'show'}>
            Olá, {displayName}
          </AnimatedTitle>

          <div>
            <ActionButton
              borderColor="#f7206b"

              backgroundColor="#dd2767"
              backgroundColorHover="#fd2f77"

              fullWidth
            >
              <img src={heartSymbol} alt="heart" />
              Jogar agora
            </ActionButton>

            <ActionButton
              borderColor="#084bd6"

              backgroundColor="#1981d4"
              backgroundColorHover="#1270c0"

              fullWidth

              onClick={() => history.push('/create-room')}
            >
              <img src={keySymbol} alt="key" />
              Criar partida
            </ActionButton>

            <ActionButton
              borderColor="#d007e6"

              backgroundColor="#d447e6"
              backgroundColorHover="#d727e6"

              fullWidth

              onClick={() => history.push('/enter-room')}
            >
              <img src={playSymbol} alt="play" />
              Entrar em uma partida
            </ActionButton>
          </div>
        </div>
      </ContentWrapper>

      <Logout />
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

const AnimatedTitle = styled(Title)` 
  visibility: hidden;

  transform: translateY(-200%);
  transition: transform 1s steps(5, start);

  &.show {
    visibility: visible;
    transform: translateY(0%);
  }
`

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 30px;

  img {
    width: 40px;
    height: 30px;
    margin-right: 10px;
  }
`

export default Choose