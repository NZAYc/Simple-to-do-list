import React from 'react';
import './App.css';
import * as mui from "@mui/material/";
import { styled } from "@mui/material/styles"
import List from '@mui/material/List';


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

  appendToFinnished(item: any) {

    // let finishedList = this.state.finished
    // let toDoList = this.state.list

    // if (this.state.list.length > 0) {
    //   let pushedItem = toDoList[this.state.list.length - 1]
    //   finishedList.push(pushedItem)
    //   toDoList.pop()
    // }

    // this.setState({ finished: finishedList, list: toDoList })

    let finishedList = [...this.state.finished, item];        // dont understand
    let toDoList = this.state.list.filter(i => i !== item);
    this.setState({ finished: finishedList, list: toDoList });
  }

  clear() {
    this.setState({ finished: [], list: [] })
  }

  render() {
    return (
      <div className="App">
        <div className='titles'>
          <div style={{ marginLeft: "5vw" }}>
            <mui.Box sx={{ border: 2, borderColor: 'grey.500', borderRadius: '12px', height: "600px", bgcolor: "#242424" }}>
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
            <mui.Box sx={{ border: 2, borderColor: 'grey.500', borderRadius: '12px', height: "600px", bgcolor: "#242424" }}>
              <h2>TO DO LIST</h2>
              <br />
              <List sx={{
                width: "400px", maxWidth: 360, paddingLeft: "60px", height: "300px",
                position: 'relative', overflow: 'auto', maxHeight: 300, '& ul': { padding: 0 },
              }} subheader={<li />}>
                <ul>
                  {this.state.list.map((item: any) => (
                    <li>

                      <mui.Button onClick={() => this.appendToFinnished(item)}
                        variant="outlined" color="secondary"
                        sx={{ marginBottom: 1, marginTop: 1 }}>

                        {item}

                      </mui.Button>

                    </li>
                  ))}
                </ul>
              </List>
              <br />
              <CssTextField size="small" sx={{ marginBottom: 2, marginTop: 2 }} id="input"></CssTextField>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <mui.Button variant='contained' color="success" sx={{ marginBottom: 2 }} onClick={this.submit.bind(this)}>SUBMIT</mui.Button>
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
