import React from 'react';

const timeFormat = (seconds) => {
  const min = Math.floor(seconds / 60) < 10 ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60)
  const sec = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60
  return min + ':' + sec;
}

function Controller(props) {
  return (
    <div>
      <span id="timer-label" className="timer-label">{props.state.isBreak ? 'Break: ' : 'Session: '}</span>
      <span id="time-left" className="timer-left">{props.state.isBreak ? timeFormat(props.state.secondsBreak) : timeFormat(props.state.secondsSession)}</span>
      <p className="break-length">Break Length</p>
      <div className="break">
        <button id="break-increment" className="break-increment"
          onClick={props.handleOptions}
        >+</button>
        <span id="break-length">{props.state.lenghtBreak}</span>
        <button id="break-decrement" className="break-decrement"
          onClick={props.handleOptions}>-</button>
      </div>
      <p id="session-label" className="session-length">Session Length</p>
      <div className="session">
        <button id="session-increment" className="session-increment"
          onClick={props.handleOptions}
        >+</button>
        <span id="session-length" >{props.state.lenghtSession}</span>
        <button id="session-decrement" className="session-decrement"
          onClick={props.handleOptions}
        >-</button>
      </div>
      <div className="group-button">
        <button id="start_stop" className="start-stop"
          onClick={() => { props.handleStartTime() }}>
          {props.state.timerRunning ? 'Stop' : 'Start'}</button>
        <button id="reset" className="reset" onClick={props.handleReset}>Reset</button>
      </div>
      <audio id="beep" src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" type="audio/wav"></audio>
    </div>
  )
}
export default Controller;