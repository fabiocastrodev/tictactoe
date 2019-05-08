import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

function DisplaySymbol(props) {
  const { value } = props

  const [a, b, c] = value

  return (
    <Wrapper>
      <SymbolIcon className={a && 'active'}>
        <img src={a && a.resource} alt={a && a.name} />
      </SymbolIcon>

      <SymbolIcon className={b && 'active'}>
        <img src={b && b.resource} alt={b && b.name} />
      </SymbolIcon>

      <SymbolIcon className={c && 'active'}>
        <img src={c && c.resource} alt={c && c.name} />
      </SymbolIcon>
    </Wrapper>
  )
}

DisplaySymbol.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      resource: PropTypes.string.isRequired
    })
  ).isRequired
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`

const SymbolIcon = styled.div`
  width: 100px;
  height: 100px;

  margin: 12px 0;
  border-radius: 10px;

  border: 5px solid ${props => props.theme.dark};

  transition: box-shadow .3s;

  img {
    width: 100%;
    height: 100%;

    transform: scale(0);
    transition: transform .3s steps(3, start);

    filter: brightness(0);
  }

  &.active {
    box-shadow: 2px 2px 0 ${props => props.theme.shadow};

    img {
      transform: scale(1);
    }
  }
`

export default DisplaySymbol