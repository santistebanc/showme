import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const defaulturl = 'https://media1.britannica.com/eb-media/88/80588-004-0B5DCB41.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: defaulturl, result: ''};
  }
  componentDidMount(){
    this.analize();
  }
  handleChangeURL(event) {
    this.setState({url: event.target.value});
  }
  handleClickAnalize(){
    this.analize();
  }
  analize(){
    const payload = {url: this.state.url};
    const data = JSON.stringify( payload );
    const self = this;
    fetch(`/recognize`,{method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, mode: 'cors',  body: data}).then(function(res){
        console.log('funcionaaa');
      res.json().then(function(data) {
            console.log(data);
            self.setState({result: data});
          });
    });
  }
  render() {
    let classifiers = this.state.result && this.state.result.images[0].classifiers;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ShowMe</h2>
        </div>
        <p className="App-intro">Ingresa dirección de la imagen (max 2MB)</p>
        <input style={{width:'500px'}} type="text" value={this.state.url} onChange={this.handleChangeURL.bind(this)}/><button onClick={this.handleClickAnalize.bind(this)}>Analizar</button>
        <br/>
        <br/>
        <img src={this.state.url} className="imagechosen" alt="what-is-going-to-be-recognized" />
        <br/>
        <br/>
        <ul>
        {classifiers && classifiers.map((c,i)=><li key={i}>
            <table><tbody>{c.classes.map((s,i)=><tr key={i}><td>{s.class}</td><td>{s.score}</td></tr>)}</tbody></table>
        </li>)}</ul>
      </div>
    );
  }
}

export default App;
