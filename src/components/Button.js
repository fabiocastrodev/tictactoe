import PropTypes from 'prop-types'

import styled from 'styled-components'

const shadowWidth = 4
const outlineWidth = 6

const Button = styled.button`
  padding: 20px;
  display: inline-block;

  width: ${props => props.fullWidth ? '100%' : 'auto'}

  position: relative;

  text-align: left;
  text-decoration: none;

  font-family: inherit;
  cursor: pointer;

  color: #fff;

  margin: 10px ${outlineWidth}px;

  background: ${props => props.backgroundColor}
  box-shadow: inset -${shadowWidth}px -${shadowWidth}px 0px 0px ${props => props.borderColor};

  &:hover, &:focus {
    background: ${props => props.backgroundColorHover}
    box-shadow: inset -${shadowWidth * 1.5}px -${shadowWidth * 1.5}px 0px 0px ${props => props.borderColor};
  }

  &:before, &:after {
    content: '';
    position: absolute;
    
    width: 100%;
    height: 100%;

    box-sizing: content-box;
  }

  &:before {
    left: 0;
    top: -${outlineWidth}px;

    border-top: ${outlineWidth}px black solid;
    border-bottom: ${outlineWidth}px black solid;
  }

  &:after {
    top: 0;
    left: -${outlineWidth}px;

    border-left: ${outlineWidth}px black solid;
    border-right: ${outlineWidth}px black solid;
  }
`

Button.defaultProps = {
  borderColor: '#084bd6',

  backgroundColor: '#1981D4',
  backgroundColorHover: '#1470C0'
}

Button.propTypes = {
  borderColor: PropTypes.string,

  backgroundColor: PropTypes.string,
  backgroundColorHover: PropTypes.string
}

export default Button