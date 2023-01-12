import React from 'react';
import './App.css';
import * as mui from "@mui/material/";
import { styled } from "@mui/material/styles"
import { listItemAvatarClasses } from '@mui/material/';


const CssTextField = styled(mui.TextField)({
  textAlign: "center",
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'cyan',
    },
  },
});

class App extends React.Component<{}, { list: string[], finished: string[] }> { //first one for props, second for state

  constructor(props: any) {
    super(props)
    this.state = {
      list: [],
      finished: [],
    }
  }

  submit() {
    let userInput = (document.getElementById("input") as HTMLInputElement).value
    let lista = this.state.list
    lista.push(userInput)
    this.setState({ list: lista })
  }

  // remove() {
  //   let lista = this.state.list
  //   lista.pop()
  //   this.setState({ list: lista })
  // }

  appendToFinnished() {

    let finishedList = this.state.finished
    let toDoList = this.state.list

    if (this.state.list.length > 0) {
      let pushedItem = toDoList[this.state.list.length - 1]
      finishedList.push(pushedItem)
      toDoList.pop()
    }

    this.setState({ finished: finishedList, list: toDoList })
  }

  clear() {
    this.setState({ finished: [], list: [] })
  }

  // add finished list on the left to display removed items from the central list (preferably with a cap)
  render() {
    return (
      <div className="App">
        <div className='titles'>
          <div style={{ marginLeft: "5vw" }}>
            <mui.Box sx={{ border: 2, borderColor: 'grey.500', borderRadius: '12px', height: "450px" }}>
              <h2>FINISHED LIST</h2>
              <br />
              <ul style={{ width: "300px", height: "300px", overflow: "auto" }} >
                {this.state.finished.map((element: any) => {
                  return <li> {element} </li>
                })}
              </ul>
            </mui.Box>
          </div>
          <div style={{ marginLeft: "15vw", marginRight: "30vw" }}>
            <mui.Box sx={{ border: 2, borderColor: 'grey.500', borderRadius: '12px', height: "450px" }}>
              <h2>TO DO LIST</h2>
              <br />
              <ul style={{ width: "300px", height: "175px", overflow: "auto", paddingLeft: "120px" }}>
                {this.state.list.map((element: any) => {
                  return <li> {element} </li>
                })}
              </ul>
              <br />
              <CssTextField size="small" sx={{ marginBottom: 2 }} id="input"></CssTextField>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <mui.Button variant='contained' color="error" sx={{ marginBottom: 2 }} onClick={this.submit.bind(this)}>SUBMIT</mui.Button>
                <mui.Button variant='contained' color="success" sx={{ marginBottom: 2, marginLeft: 2 }} onClick={this.appendToFinnished.bind(this)}>FINISH</mui.Button>
                <mui.Button variant='contained' sx={{ marginBottom: 2, marginLeft: 2 }} onClick={this.clear.bind(this)}>CLEAR</mui.Button>
              </div>
            </mui.Box>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
