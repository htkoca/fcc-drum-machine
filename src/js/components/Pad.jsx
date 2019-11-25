// libraries
import React from '~/react';
import changeCase from '~/change-case';

// components
import Button from '~/react-bootstrap/Button';

// export
export default class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: String.fromCharCode(props.code),
      button: React.createRef(),
      audio: React.createRef(),
      clicked: false,
    }
    this.handleCode = this.handleCode.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleCode);
  }
  componentDidUpdate() {
    if(!this.props.power && this.state.audio.current.currentTime > 0) {
      this.state.audio.current.pause();
      this.state.audio.current.currentTime = 0;
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCode);
  }
  handleCode (e){
    if(this.props.power && this.props.code === e.keyCode){
      this.state.button.current.focus();
      this.state.button.current.click();
    }
  }
  handleClick (e){
    this.setState({ clicked: true })
    this.props.updateDisplay(`Pad: ${this.props.title}`);
    try {
      this.state.audio.current.volume = this.props.volume/100;
      this.state.audio.current.currentTime = 0;
      this.state.audio.current.play();
    } catch (err){
      console.error(err);
    }
    setTimeout(() => {
      this.state.button.current.blur();
      this.setState({ clicked: false})
    }, 1000)
  }
  render() {
    return (
      <div className="col col-4 col-pad">
        <Button 
          id={changeCase.paramCase(this.props.title)} 
          className={{ 'drum-pad': true, 'btn-pad': true, 'active': this.state.clicked }} 
          variant={this.props.bank ? 'warning' : 'primary'} 
          onClick={this.handleClick} 
          disabled={!this.props.power} 
          ref={this.state.button} 
          accessKey={this.state.char}
        >
          {this.state.char}
          <audio 
            className="clip"
            id={this.state.char} 
            src={this.props.src} 
            ref={this.state.audio}
          />
        </Button>
      </div>
    );
  }
}