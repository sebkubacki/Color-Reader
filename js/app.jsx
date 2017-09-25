import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class ColorReader extends React.Component {
      constructor(props){
        super(props)
        this.state = {
            text: '',
            color: 'white',
            info: '',
            type: '',
            rgb: '',
            hsl: '',
            hex: ''
          }
        }

        rgbToHex = () => {
          let indexR = this.state.text.indexOf('(');
          let indexG = this.state.text.indexOf(',');
          let indexB = this.state.text.lastIndexOf(',');
          let indexEnd = this.state.text.indexOf(')')
          let r = this.state.text.slice(indexR+1, indexG);
          let g = this.state.text.slice(indexG+1, indexB);
          let b = this.state.text.slice(indexB+1, indexEnd);
          console.log(b);
          r = Number(r).toString(16);
          g = Number(g).toString(16);
          b = Number(b).toString(16);
          let result = '#'+r+g+b;
          this.setState({info: `${this.state.text} \n
                                hex: ${result}`})
        }

        hexToRgb = () => {
          let r = this.state.text.slice(1, 3);
          let g = this.state.text.slice(3, 5);
          let b = this.state.text.slice(5, 7);
          r = parseInt(r, 16);
          g = parseInt(g, 16);
          b = parseInt(b, 16);
          let result = `rgb(${r}, ${g}, ${b})`;
          this.setState({info:`${result} \n hex: ${this.state.text}`})
        }

        handleInput = (e) => {
          this.setState({text: e.target.value})
        }

        handleSubmit = (e) => {
          e.preventDefault();
          if(this.state.text.slice(0, 4) == 'rgb(' || this.state.text.slice(0, 4) == 'hsl(' || this.state.text.slice(0, 1) == '#'){
              this.setState({color: this.state.text})
              this.setState({info: this.state.text})
              if (this.state.text.slice(0, 4) == 'rgb(') {
                this.rgbToHex();
                this.setState({type: 'rgb'})
              } else if (this.state.text.slice(0, 4) == 'hsl(') {
                this.setState({type: 'hsl'})
              } else if (this.state.text.slice(0, 1) == '#') {
                this.setState({type: 'hex'})
                console.log('hex');
                this.hexToRgb();
              }
          }
          else{
            this.setState({info: 'Invalid color format'})
            console.log(this.state.text.slice(0, 3));
          }
        }

        render(){
          return <div className='container'>
          <div>
            <form onSubmit={this.handleSubmit}>
            <label>
            Color:
              <input type='text' name='color' onChange={this.handleInput} value={this.state.text}></input>
              </label>
              <input type='submit' value='Change color'></input>

            </form>
            <p>Your color: {this.state.info}</p>
            </div>
            <div className='color-box' style={{backgroundColor: this.state.color}}>
            </div></div>
        }

      }






    class App extends React.Component{
      render() {
        return <ColorReader />
      }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
