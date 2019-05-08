import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

import firebase from '../../../modules/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'

import { TicTacToe } from 'tw-ttt'

const backSymbol = require('../../../assets/back-symbol.svg')
const crossImage = require('../../../assets/cross-white.svg')
const circleImage = require('../../../assets/circle-white.svg')

const SLOT_SIZE = 150
const BOARD_SPACE_SIZE = 15

const BOARD_SIZE = SLOT_SIZE * 3 + BOARD_SPACE_SIZE * 2
const DIAGONAL_SIZE = Math.sqrt((BOARD_SIZE ** 2) * 2)

const boardClassnames = [
  'top-left', 'top-middle', 'top-right',
  'center-left', 'center', 'center-right',
  'bottom-left', 'bottom-middle', 'bottom-right'
]

function Room(props) {
  const { history, match } = props

  const { roomId } = match.params

  const verifyHasPermissions = () => {
    const { metadata } = value || {}
    if (error || (metadata && !metadata.fromCache && room && (room.users.length < 2 || room.await))) {
      history.replace('/')
    }
  }

  const verifyChangePlayerTurn = () => {
    const turn = isReady && user.uid === room.currentPlayer

    setIsTurn(turn)

    if (turn && !isTurn) {
      setTimeLeft(10)
    }
  }

  const onChangeTimeLeft = () => {
    if (timeLeft > 0) {
      const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)

      return () => clearTimeout(id)
    } else {
      if (room) {
        const slot = getRandomSlot()
        
        if (slot !== null) {
          setValue(slot)
        }

        changeTurn()
      }
    }
  }

  const setValue = async (index) => {
    if (isTurn) {
      const board = room.board.map((value, i) => i === index ? whoIAm : value)

      await changeTurn()
      await document.set({ board }, { merge: true })

      tictac.current.hydrate(board)

      const status = tictac.current.checkResult()

      await document.set({ status }, { merge: true })
    }
  }

  const getRandomSlot = () => {
    if (isReady) {
      let i
      for (i = Math.floor(Math.random() * room.board.length - 1); i < room.board.length; i++) {
        if (room.board[i] === null) {
          return i
        }
      }

      for (let j = 0; j < i; j++) {
        if (room.board[j] === null) {
          return j
        }
      }

      return null
    }
  }

  const changeTurn = async () => {
    const nextPlayer = room.users.find(u => u !== user.uid)

    await document.set({
      currentPlayer: nextPlayer
    }, { merge: true })
  }

  const verifyWin = () => {
    if (isReady) {
      const { status } = room

      if (status) {
        if (status === 'draw') {

        } else {
          const { winner } = status

          if (winner === whoIAm) {
            const id = setTimeout(() => history.replace('/you-win'), 2000)

            return () => clearTimeout(id)
          } else {
            const id = setTimeout(() => history.replace('/you-loose'), 2000)

            return () => clearTimeout(id)
          }
        }
      }
    }
  }

  const document = firebase.firestore().collection('rooms').doc(roomId)

  const [isTurn, setIsTurn] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const { initialising, user } = useAuthState(firebase.auth())
  const { error, loading, value } = useDocument(document)

  const isReady = !initialising && !loading && value

  useEffect(verifyHasPermissions, [error, value])

  useEffect(onChangeTimeLeft, [timeLeft])
  useEffect(verifyChangePlayerTurn, [user, value])

  useEffect(verifyWin, [value])

  const tictac = useRef(new TicTacToe())

  const room = value ? value.data() : null

  const whoIAm = isReady ? (room.users[0] === user.uid ? 'cross' : 'circle') : null

  const board = isReady ? room.board : new Array(9).fill(null)

  const renderContent = () => (
    <AppBar>
      <BackButton>
        <img src={backSymbol} alt="back" />
      </BackButton>

      <PlayerTurn>{isTurn ? 'Sua vez' : 'Aguarde'}</PlayerTurn>

      <Time className={isTurn && 'show'}>{timeLeft}s</Time>
    </AppBar>
  )

  return (
    <Wrapper>
      {isReady && renderContent()}

      <Board>
        {board.map((value, i) => (
          <Slot
            key={i}
            type={whoIAm}
            onClick={() => setValue(i)}
            className={[boardClassnames[i], !!value ? 'selected' : '', isTurn ? 'is-turn' : ''].join(' ')}

            value={value}
          >
          </Slot>
        ))}

        <WinnerBar status={room && room.status} />
      </Board>
    </Wrapper>
  )
}

Room.propTypes = {
  match: PropTypes.object.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.main};

  display: flex;
  align-items: flex-start;
  justify-content: center;

  flex-wrap: wrap;
`

const AppBar = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0px 20px;
`

const PlayerTurn = styled.h4`
  color: #fff;
  font-weight: normal;

  font-size: 16px;
`

const Time = styled.span`
  color: #fff;
  font-size: 16px;

  min-width: 30px;

  opacity: 0;
  transform: scale(0);

  transition: transform opacity .3s;

  &.show {
    opacity: 1;
    transform: scale(1);
  }
`

const BackButton = styled.button`
  border: none;
  outline: none;
  appearence: none;

  cursor: pointer;

  background-color: transparent;

  height: 35px;

  img {
    height: 100%;
  }
`

const Board = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  width: ${BOARD_SIZE}px;

  background-color: #1660a0;

  position: relative;
`

const Slot = styled.div`
  width: ${SLOT_SIZE}px;
  height: ${SLOT_SIZE}px;

  background-color: ${props => props.theme.main};

  position: relative;

  &.selected {
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('${props => props.value === 'cross' ? crossImage : (props.value === 'circle' ? circleImage : null)}');
  }

  &:hover:not(.selected) {
    &::after {
      content: "";
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('${props => props.type === 'cross' ? crossImage : (props.type === 'circle' ? circleImage : null)}');

      opacity: .5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: 0;
    }

    cursor: not-allowed;

    &.is-turn {
      cursor: pointer;
    }
  }

  &.top-left {
    margin-right: ${BOARD_SPACE_SIZE / 2}px;
    margin-bottom: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.top-middle {
    margin-left: ${BOARD_SPACE_SIZE / 2}px;
    margin-right: ${BOARD_SPACE_SIZE / 2}px;
    margin-bottom: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.top-right {
    margin-left: ${BOARD_SPACE_SIZE / 2}px;
    margin-bottom: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.center-left {
    margin-top: ${BOARD_SPACE_SIZE / 2}px;
    margin-right: ${BOARD_SPACE_SIZE / 2}px;
    margin-bottom: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.center {
    margin: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.center-right {
    margin-left: ${BOARD_SPACE_SIZE / 2}px;
    margin-top: ${BOARD_SPACE_SIZE / 2}px;
    margin-bottom: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.bottom-left {
    margin-top: ${BOARD_SPACE_SIZE / 2}px;
    margin-right: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.bottom-middle {
    margin-left: ${BOARD_SPACE_SIZE / 2}px;
    margin-top: ${BOARD_SPACE_SIZE / 2}px;
    margin-right: ${BOARD_SPACE_SIZE / 2}px;
  }

  &.bottom-right {
    margin-left: ${BOARD_SPACE_SIZE / 2}px;
    margin-top: ${BOARD_SPACE_SIZE / 2}px;
  }
`

const WinnerBar = styled.div`
  position: absolute;

  height: 0;
  width: 10px;
  background-color: rgba(150, 150, 150, 0.8);

  ${props => {
    if (props.status) {
      if (props.status === 'draw') {

      } else {
        const { type, detail } = props.status

        if (type === 'diagonal') {
          return css`
            height: ${DIAGONAL_SIZE}px;
            transform: rotate(${detail === 'main' ? '-45deg' : '45deg'});
          `
        }
      }
    }
  }}
`

export default Room