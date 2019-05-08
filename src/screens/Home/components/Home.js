import React, { useEffect } from 'react'

import styled, { keyframes } from 'styled-components'

import Button from '../../../components/Button'

import { SharedElement } from '@taito/react-sheltr'

import { auth } from 'firebase'
import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const logoImage = require('../../../assets/tw-logo.svg')
const backgroundImage = require('../../../assets/background.svg')

const crossImage = require('../../../assets/cross.svg')
const circleImage = require('../../../assets/circle.svg')

function Home(props) {
  const { initialising, user } = useAuthState(firebase.auth())

  useEffect(() => {
    if (user) {
      navigate()
    }
  }, [initialising, user])

  const navigate = () => props.history.replace('/choose')

  const loginAnonymously = async () => {
    try {
      await firebase.auth().signInAnonymously()
    } catch (e) {
      alert(e.message)
    }
  }

  const loginWithFB = async () => {
    const provider = new auth.FacebookAuthProvider()

    firebase.auth().languageCode = 'pt_BR'

    provider.setCustomParameters({
      display: 'popup'
    })

    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      alert(e.message)
    }
  }

  const loginWithGoogle = async () => {
    const provider = new auth.GoogleAuthProvider()

    firebase.auth().languageCode = 'pt_BR'

    provider.setCustomParameters({
      display: 'popup'
    })

    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Wrapper>
      <SharedElement sharedId="border-left" startOnUnmount>
        {sharedProps => (
          <ImageWrapper {...sharedProps}>
            <LogoImage src={logoImage} alt="Techweek 2019" title="Techweek 2019" />
          </ImageWrapper>
        )}
      </SharedElement>

      <ActionsWrapper>
        <Title>
          <ItemTitle>
            <img src={circleImage} alt="O" />
            <span>Tac</span>
          </ItemTitle>
          <Divider />
          <ItemTitle>
            <img src={crossImage} alt="X" />
            <span>Toe</span>
          </ItemTitle>
        </Title>

        <Actions>
          <MessageWrapper>
            <span>Escolha como acessar:</span>
          </MessageWrapper>

          <Button
            borderColor="#084bd6"

            backgroundColor="#1981d4"
            backgroundColorHover="#1470c0"

            onClick={loginWithFB}
          >
            Entrar com Facebook
          </Button>

          <Button
            borderColor="#d63f2c"

            backgroundColor="#e25c4d"
            backgroundColorHover="#dd4b39"

            onClick={loginWithGoogle}
          >
            Entrar com Google
          </Button>

          <Button
            borderColor="#f7206b"

            backgroundColor="#dd2767"
            backgroundColorHover="#fd2f77"

            onClick={loginAnonymously}

            disabled={initialising}
          >
            {initialising ? 'Carregando...' : 'Entrar como anônimo'}
          </Button>
        </Actions>
      </ActionsWrapper>
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
  width: 40%;
  height: 100%;

  @media (min-width: 700px) {
    width: 55%;
  }

  overflow-y: hidden;

  background-size: cover;
  background-position-x: right;
  background-image: url('${backgroundImage}');

  display: flex;
  align-items: center;
  justify-content: center;
`

const roll = keyframes`
  from {
    transform: translateX(-150%) rotate(-180deg);
  }

  to {
    transform: translateX(0%) rotate(0deg);
  }
`

const LogoImage = styled.img`
  height: 70%;
  width: 70%;

  animation: ${roll} 1.2s steps(8, start) 1;
`

const blink = keyframes`
  to {
    visibility: hidden;
  }
`

const MessageWrapper = styled.div`
  margin-bottom: 20px;
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  flex-grow: 1;
  flex-direction: column;

  padding: 10px 40px;
`

const Title = styled.h1`
  font-size: 50px;
  text-shadow: 0px 2px ${props => props.theme.shadow};

  animation: ${blink} 0.7s steps(5, start) infinite;
`

const ItemTitle = styled.div`
  display: flex;
  align-items: center;

  & img {
    height: 40px;
    margin-right: 10px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 8px;

  margin: 10px 0;

  background-color: ${props => props.theme.dark};
  box-shadow: 0px 2px ${props => props.theme.shadow};
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
`

export default Home