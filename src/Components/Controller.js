import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
-webkit-font-smoothing: antialiased;
font-size: 2rem;
border: 2px solid white;
color: white;
border-radius: 12px;
cursor: pointer;
outline: none;
background-color: #660033;
font-weight: 300;
margin: 10px;
width: ${props => props.width ? props.width : '100px'};
Button:hover {color: red}
`
const Span = styled.span`
font-size:${props => props.currentTimer ? '3rem' : '2rem'};
font-weight:${props => props.currentTimer ? '500' : 'lighter'};
`
const timeFormat = (seconds) => {
  const min = Math.floor(seconds / 60) < 10 ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60)
  const sec = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60
  return min + ':' + sec;
}
// TODO usar destrucuting para simplificar el codigo.
function Controller(props) {
  return (
    <div>
      <Span id="timer-label">{props.state.isBreak ? 'Break: ' : 'Session: '}</Span>
      <Span id="time-left">{props.state.isBreak ? timeFormat(props.state.secondsBreak) : timeFormat(props.state.secondsSession)}</Span>
      <div>
        <div>
          <p >Break Length</p>
          <Button id="break-increment"
            onClick={props.handleOptions}
            width={"50px"}
          >+</Button>
          <Span id="break-length">{props.state.lenghtBreak}</Span>
          <Button id="break-decrement"
            onClick={props.handleOptions}
            width={"50px"}>-</Button>
        </div>
        <div>
          <p id="session-label">Session Length</p>
          <Button id="session-increment"
            onClick={props.handleOptions}
            width={"50px"}
          >+</Button>
          <Span id="session-length" >{props.state.lenghtSession}</Span>
          <Button id="session-decrement"
            onClick={props.handleOptions}
            width={"50px"}
          >-</Button>
        </div>
      </div>
      <Button id="start_stop"
        onClick={() => { props.handleStartTime() }}>
        {props.state.timerRunning ? 'Stop' : 'Start'}</Button>
      <Button id="reset" onClick={props.handleReset}>Reset</Button>
      {/* FIXME agregar ref en vez de como esta ahora */}
      <audio id="beep" src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" type="audio/wav"></audio>
    </div>
  )
}
export default Controller;