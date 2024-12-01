import React, { Component } from "react";
import "../App.css";
import "./stopwatch.css";
import Button from "@mui/material/Button";
import { Stack, Radio } from "@mui/material";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    stoppedTime: null,
    selectedOption: "",
  };

  handleOptionChange = (event) => {
    this.setState(state => ({
      ...state,
      selectedOption: event.target.value
    }));
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState(
      {
        timerOn: false,
        stoppedTime: this.getTimeFromDate(this.state.timerTime),
      },
      () => {
        this.props.onStop(this.state.stoppedTime,this.state.selectedOption);
        // this.props.onStop(this.state.selectedOption);
      }
    );
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
      stoppedTime: null,
    });
  };

  getTimeFromDate = (time) => {
    const date = new Date(time);
    let hours = ("0" + date.getUTCHours()).slice(-2);
    let minutes = ("0" + date.getUTCMinutes()).slice(-2);
    let seconds = ("0" + date.getUTCSeconds()).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    let backgroundColor = "#FFFFFF"; // Default white color

    if (this.state.selectedOption === "prepareSpeech") {
      if (timerTime >= 5 * 60 * 1000 && timerTime < 6 * 60 * 1000) {
        backgroundColor = "#00FF00"; // Green color
      } else if (timerTime >= 6 * 60 * 1000 && timerTime < 7 * 60 * 1000) {
        backgroundColor = "#FFFF00"; // Yellow color
      } else if (timerTime >= 7 * 60 * 1000) {
        backgroundColor = "#FF0000"; // Red color
      }
    } else if (this.state.selectedOption === "tableTopic") {
      if (timerTime >= 1 * 60 * 1000 && timerTime < 1.5 * 60 * 1000) {
        backgroundColor = "#00FF00"; // Green color
      } else if (timerTime >= 1.5 * 60 * 1000 && timerTime < 2 * 60 * 1000) {
        backgroundColor = "#FFFF00"; // Yellow color
      } else if (timerTime >= 2 * 60 * 1000) {
        backgroundColor = "#FF0000"; // Red color
      }
    } else if (this.state.selectedOption === "evaluation") {
      if (timerTime >= 2 * 60 * 1000 && timerTime < 2.5 * 60 * 1000) {
        backgroundColor = "#00FF00"; // Green color
      } else if (timerTime >= 2.5 * 60 * 1000 && timerTime < 3 * 60 * 1000) {
        backgroundColor = "#FFFF00"; // Yellow color
      } else if (timerTime >= 3 * 60 * 1000) {
        backgroundColor = "#FF0000"; // Red color
      }
    }

    return (
      <div>
        <div className="Stopwatch">
          <div className="Stopwatch-display" style={{ backgroundColor }}>
            {hours} : {minutes} : {seconds} : {centiseconds}
          </div>
          <div className="Stopwatch-buttons">
            {!this.state.timerOn && this.state.timerTime === 0 && (
              <Button
                className="start-button"
                variant="contained"
                onClick={this.startTimer}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#772432",
                  color: "#F2DF74",
                  padding: "18px 36px",
                  fontSize: "18px",
                }}
              >
                Start
              </Button>
            )}
            {this.state.timerOn && (
              <Button
                className="stop-button"
                variant="contained"
                onClick={this.stopTimer}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#772432",
                  color: "#F2DF74",
                  padding: "18px 36px",
                  fontSize: "18px",
                }}
              >
                Stop
              </Button>
            )}
            {!this.state.timerOn && this.state.timerTime > 0 && (
              <Button
                className="resume-button"
                variant="contained"
                onClick={this.startTimer}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#772432",
                  color: "#F2DF74",
                  padding: "18px 36px",
                  fontSize: "18px",
                }}
              >
                Resume
              </Button>
            )}
            {!this.state.timerOn && this.state.timerTime > 0 && (
              <Button
                className="reset-button"
                variant="contained"
                onClick={this.resetTimer}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#772432",
                  color: "#F2DF74",
                  padding: "18px 36px",
                  fontSize: "18px",
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        <div className="speech-selectors">
          <Stack>
            <label>
              <Radio
                value="prepareSpeech"
                checked={this.state.selectedOption === "prepareSpeech"}
                onChange={this.handleOptionChange}
                sx={{
                  color: "#772432",
                  "&.Mui-checked": {
                    color: "#772432",
                  },
                }}
              />
              Prepared Speech
            </label>
            <label>
              <Radio
                value="tableTopic"
                checked={this.state.selectedOption === "tableTopic"}
                onChange={this.handleOptionChange}
                sx={{
                  color: "#772432",
                  "&.Mui-checked": {
                    color: "#772432",
                  },
                }}
              />
              Table Topic
            </label>
            <label>
              <Radio
                value="evaluation"
                                checked={this.state.selectedOption === "evaluation"}
                onChange={this.handleOptionChange}
                sx={{
                  color: "#772432",
                  "&.Mui-checked": {
                    color: "#772432",
                  },
                }}
              />
              Evaluation
            </label>
          </Stack>
        </div>
      </div>
    );
  }
}

export default Stopwatch;

