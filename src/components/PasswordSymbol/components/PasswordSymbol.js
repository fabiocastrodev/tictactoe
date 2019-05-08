import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FlipMove from 'react-flip-move'

import styled from 'styled-components'

import symbolsAvailable from '../symbols'

import shuffle from '../../../utils/shuffle'

function PasswordSymbol(props) {
  const { shuffleDuration, onClick, backgroundColor } = props

  const [symbols, setSymbols] = useState(symbolsAvailable)

  const shuffleSymbols = () => setSymbols(shuffle(symbols))

  const onClickSymbol = (symbol) => {
    if (typeof onClick === 'function') {
      onClick(symbol)
    }

    shuffleSymbols()
  }

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <FlipMove
        typeName={null}
        duration={shuffleDuration}
      >
        {symbols.map(symbol => (
          <SymbolButton key={symbol.name} onClick={() => onClickSymbol(symbol)}>
            <img src={symbol.resource} alt={symbol.name} />
          </SymbolButton>
        ))}
      </FlipMove>
    </Wrapper>
  )
}

PasswordSymbol.defaultProps = {
  shuffleDuration: 600
}

PasswordSymbol.propTypes = {
  onClick: PropTypes.func,

  shuffleDuration: PropTypes.number,
  backgroundColor: PropTypes.string
}

const SYMBOL_HEIGHT = 120

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  width: 100%;

  background-color: ${props => props.backgroundColor};
  box-shadow: 4px 4px 0px ${props => props.theme.dark};

  padding: 10px 0;
  
  border-radius: 10px;
`

const Button = ({ innerRef, ...props }) => <button {...props} ref={innerRef} />

const SymbolButton = styled(
  React.forwardRef((props, ref) => (
    <Button {...props} innerRef={ref} />
  ))
)`
  border: none;
  outline: none;
  appearence: none;

  cursor: pointer;

  height: ${SYMBOL_HEIGHT}px;

  max-width: 33.3333%;
  flex-basis: 33.3333%;

  background-color: transparent;

  &:focus, &:visited, &:hover {
    outline: none;
  }

  &:hover img {
    transform: scale(1.2);
  }
`

export default PasswordSymbol