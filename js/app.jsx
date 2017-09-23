import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class ColorReader extends React.Component {
      constructor(props){
        super(props)
        this.state = {
            text: '',
            color: 'lightgray',
            info: ''
          }
        }

        handleInput = (e) => {
          this.setState({text: e.target.value})
        }

        handleSubmit = (e) => {
          e.preventDefault();
          if(this.state.text.slice(0, 3) == 'rgb' || this.state.text.slice(0, 3) == 'hsl' || this.state.text.slice(0, 1) == '#'){
              this.setState({color: this.state.text})
              this.setState({info: this.state.text})
              this.setState({text: ''})
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
