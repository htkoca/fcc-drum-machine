// libraries
import React from '~/react';

// components
import Card from '~/react-bootstrap/Card';
import Button from '~/react-bootstrap/Button';
import Pad from '@/js/components/Pad';

// variables
import { banks } from '@/js/defaultState';

// export
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      bank: 0,
      bankObj: banks[0],
      volume: 50,
      display: 'Power: On'
    };
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleBank = this.handleBank.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  handlePower (e){
    let newPower = this.state.power ? 0 : 1;
    this.setState({
      power: newPower,
      display: newPower ? 'Power: On' : 'Power: Off'
    });
  }
  handleVolume(e){
    this.setState({
      volume: e.target.value,
      display: `Volume: ${e.target.value}`
    })
  }
  handleBank (e){
    let newBank = this.state.bank ? 0 : 1;
    this.setState({
      bank: newBank,
      bankObj: banks[newBank],
      display: `Bank: ${banks[newBank].title}`
    });
  }
  updateDisplay(displayStr = ''){
    this.setState({
      display: displayStr
    })
  }
  render() {
    return (
      <main id='drum-machine' className='py-4'>
        <div className='container'>
          <Card>
            <Card.Header>Drum Machine</Card.Header>
            <div className="row no-gutters">
              <div className="col col-12 col-md-6 col-control">
                <div className="row no-gutters">
                  { this.state.bankObj.pads.map((pad, idx) => (
                    <Pad
                      power={this.state.power}
                      bank={this.state.bank}
                      volume={this.state.volume}
                      code={pad.code}
                      title={pad.title}
                      src={pad.src}
                      updateDisplay={this.updateDisplay}
                      key={idx}
                    />
                  )) }
                </div>
              </div>
              <div className="col col-12 col-md-6 col-panel">
                <div className="mb-3">
                  <Button
                    variant={this.state.power ? 'success' : 'danger'}
                    onClick={this.handlePower}
                  >
                    Toggle Power
                  </Button>
                </div>
                <div id="display" className="display mb-3">
                  <strong>{this.state.display}</strong>
                </div>
                <div className="mb-0">
                  <div className="form-group">
                    <label htmlFor="volume">Volume</label>
                    <input
                      id="volume"
                      className="form-control-range"
                      type="range"
                      min="1"
                      max="100"
                      value={this.state.volume}
                      onChange={this.handleVolume}
                      disabled={!this.state.power}
                    />
                  </div>
                </div>
                <div className="mb-0">
                  <Button
                    variant={this.state.bank ? 'warning' : 'primary'}
                    onClick={this.handleBank}
                    disabled={!this.state.power}
                  >
                    Change Drum Bank
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    );
  }
}