import React from 'react'
import styled, { keyframes } from 'styled-components'

// const homeSymbol = require('../assets/home-symbol.svg')
const borderBottomImg = require('../assets/border-bottom-right.svg')

function Logout() {
  return (
    <Wrapper>
      {/* <img src={homeSymbol} /> */}
    </Wrapper>
  )
}

const showBorderBottomRight = keyframes`
  from {
    transform: translate(100%)
  }

  to {
    transform: translate(0%)
  }
`

const Wrapper = styled.div`
  position: absolute;

  right: 0;
  bottom: 0;

  width: 10%;
  height: 10%;

  @media (min-width: 700px) {
    width: 200px;
    height: 200px;

    &:hover {
      transform: scale(2);
    }
  }

  transform: scale(1);
  transform-origin: bottom right;

  transition: transform .7s steps(5, start);

  background: url('${borderBottomImg}');
  background-size: cover;

  animation: ${showBorderBottomRight} .7s steps(5, start) 1;
`

export default Logout