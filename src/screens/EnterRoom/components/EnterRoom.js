import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { SharedElement } from '@taito/react-sheltr'

import Logout from '../../../components/Logout'
import Title from '../../../components/Title'

import PasswordSymbol, {
  DisplaySymbol
} from '../../../components/PasswordSymbol'

const backgroundImage = require('../../../assets/background.svg')

function EnterRoom(props) {
  const { history } = props

  const [symbols, setSymbols] = useState([])

  const { user } = useAuthState(firebase.auth())

  const onClick = async symbol => {
    const newSymbols = [...symbols, symbol]

    if (newSymbols.length < 4) {
      setSymbols(newSymbols)

      if (newSymbols.length === 3) {
        try {
          const roomId = await tryRoom(newSymbols)

          if (roomId) {
            history.replace(`/room/${roomId}`)
          }
        } catch (e) {
          alert(e.message)
        }
      }
    }
  }

  const tryRoom = async (symbols) => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('rooms')
        .where('await', '==', true)
        .where('password', '==', symbols.map(s => s.value).join(''))
        .get()

      const [document] = snapshot.docs

      if (document) {
        const room = document.data()
        const doc = firebase.firestore().collection('rooms').doc(document.id)

        await doc.set({
          await: false,
          users: [...room.users, user.uid],
          photos: [...room.photos, user.photoURL],
        }, { merge: true })

        return document.id
      } else {
        setSymbols([])
      }
    } catch (e) {
      throw e
    }
  }

  return (
    <Wrapper>
      <SharedElement sharedId='border-left' startOnUnmount>
        {sharedProps => <ImageWrapper {...sharedProps} />}
      </SharedElement>

      <ContentWrapper>
        <div>
          <Title description='Selecione o código da sala:'>Entrar em uma partida</Title>

          <div>
            <PasswordSymbol backgroundColor="#d447e6" onClick={onClick} />

            <DisplaySymbol value={symbols} />
          </div>
        </div>
      </ContentWrapper>
      <Logout />
    </Wrapper>
  )
}

EnterRoom.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
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

  max-width: 600px;
`

export default EnterRoom
