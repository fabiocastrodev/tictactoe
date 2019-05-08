import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

function Title(props) {
  const { children, description, ...otherProps } = props

  return (
    <Wrapper {...otherProps}>
      <span className="title">{children}</span>
      {description && (
        <span className="description">{description}</span>
      )}
    </Wrapper>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.node
}

const Wrapper = styled.div`
  & .title {
    display: block;
    margin-bottom: 10px;

    font-size: 14px;
  }

  & .description {
    display: block;

    font-size: 16px;
  }

  margin-bottom: 20px;
`

export default Title