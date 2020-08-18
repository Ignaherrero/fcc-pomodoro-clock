import React from 'react';
import styled from 'styled-components';
import Controller from './Components/Controller';
// FIXME refactorizar componentes

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lenghtBreak: 5,
      lenghtSession: 25,
      secondsSession: 1500,
      secondsBreak: 300,
      currentTimer: '25:00',
      timerRunning: false,
      isBreak: false
    };
    this.timerId = null;
    this.handleOptions = this.handleOptions.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleOptions(e) {
    switch (e.target.id) {
      case 'break-increment':
        if (!this.state.timerRunning && this.state.lenghtBreak < 60) {
          this.setState({
            lenghtBreak
              : this.state.lenghtBreak + 1 >= 1 ? this.state.lenghtBreak + 1 : this.state.lenghtBreak,
            secondsBreak: this.state.secondsBreak + 60 >= 0 ? (this.state.lenghtBreak + 1) * 60 : this.state.secondsBreak
          })
        }
        break;
      case 'break-decrement':
        if (!this.state.timerRunning && this.state.lenghtBreak > 1) {
          this.setState({
            lenghtBreak: this.state.lenghtBreak - 1 >= 1 ? this.state.lenghtBreak - 1 : this.state.lenghtBreak,
            secondsBreak: this.state.secondsBreak - 60 >= 0 ? (this.state.lenghtBreak - 1) * 60 : this.state.secondsBreak
          })
        }
        break;
      case 'session-increment':
        if (!this.state.timerRunning && this.state.lenghtSession < 60) {
          this.setState({
            lenghtSession
              : this.state.lenghtSession + 1 >= 1 ? this.state.lenghtSession + 1 : this.state.lenghtSession,
            currentTimer: `${this.state.lenghtSession + 1}:00`,
            secondsSession: this.state.secondsSession + 60 >= 0 ? (this.state.lenghtSession + 1) * 60 : this.state.secondsSession
          })
        }
        break;
      case 'session-decrement':
        if (!this.state.timerRunning && this.state.lenghtSession > 1) {
          this.setState({
            lenghtSession: this.state.lenghtSession - 1 >= 1 ? this.state.lenghtSession - 1 : this.state.lenghtSession,
            currentTimer: `${this.state.lenghtSession - 1}:00`,
            secondsSession: this.state.secondsSession - 60 >= 0 ? (this.state.lenghtSession - 1) * 60 : this.state.secondsSession
          })
        }
        break;
      default:
        break;
    }
  }
  handleStartTime() {
    if (this.state.timerRunning) {
      clearInterval(this.timerId)
      this.setState({ timerRunning: false })
    } else {
      this.controlTimer()
      this.setState({ timerRunning: true })
    }
  }
  componentWillMount() {
    clearInterval(this.timerId)
  }
  componentDidUpdate() {
    if (this.state.secondsSession < 0 || this.state.secondsBreak < 0) {
      this.setState({
        isBreak: !this.state.isBreak,
        secondsBreak: this.state.lenghtBreak * 60,
        secondsSession: this.state.lenghtSession * 60
      })
      document.getElementById('beep').play()
    }
  }
  controlTimer() {
    this.timerId = setInterval(() => {
      if (this.state.isBreak) {
        this.setState({
          secondsBreak: this.state.secondsBreak - 1,
        })
      } else {
        this.setState({
          secondsSession: this.state.secondsSession - 1,
        })
      }
    }, 1000)
  }
  handleReset() {
    this.setState({
      lenghtBreak: 5,
      lenghtSession: 25,
      secondsSession: 1500,
      secondsBreak: 300,
      currentTimer: '25:00',
      timerRunning: false,
      isBreak: false
    })
    clearInterval(this.timerId)
    const sound = document.getElementById('beep')
    sound.pause()
    sound.currentTime = 0
  }
  render() {
    return (
      <div>
        <h1 className="title">Pomodoro Clock</h1>
        <p id="break-label" className="break-label">Break Label</p>
        <Controller
          handleOptions={this.handleOptions}
          state={this.state}
          handleStartTime={this.handleStartTime}
          handleReset={this.handleReset}
          ref={this.audioRef}
        />
      </div>
    );
  }
}
export default App;