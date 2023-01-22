import React from 'react';
import './App.css';
import * as mui from "@mui/material/";
import { styled } from "@mui/material/styles"
import List from '@mui/material/List';
import { Dialog } from '@mui/material';
import { Paper } from '@mui/material';


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

class App extends React.Component<{}, { list: any, finished: string[] }> { //first one for props, second for state

  constructor(props: any) {
    super(props)
    this.state = {
      list: [],
      finished: [],
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  submit() {
    let userInput = (document.getElementById("input") as HTMLInputElement).value
    let newItem = {
      id: Date.now(),
      text: userInput,
      openDialog: false
    }
    let tempList = this.state.list
    tempList.push(newItem)
    this.setState({ list: tempList })
  }

  appendToFinnished(item: any) {
    let toDoList = this.state.list.filter((i: { id: any; }) => i.id !== item.id);     // state list - the item
    let finishedList = [...this.state.finished, item];          // state finished + item
    this.setState({ list: toDoList, finished: finishedList });
  }

  handleOpenDialog = (id: number) => {
    let list = [...this.state.list];
    let index = list.findIndex(i => i.id === id);       // stromy explain find index pls
    list[index].openDialog = true;
    this.setState({ list });
  };

  handleEdit = (item: any) => {
    let userInput = (document.getElementById(`input-${item.id}`) as HTMLInputElement).value;
    let list = [...this.state.list];
    let index = list.findIndex(i => i.id === item.id);  // stromy explain find index pls
    list[index].text = userInput;
    list[index].openDialog = false;
    this.setState({ list });
  };

  clearToDo() {
    this.setState({ list: [] })
  }

  clearFinished() {
    this.setState({ finished: [] })
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
                  return <li style={{
                    marginTop: 20, fontFamily: 'Arial'
                  }}> {element.text} </li>
                })}
              </ul>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 92 }}>
                <mui.Button variant='contained' sx={{ marginBottom: 2, marginLeft: 2 }} onClick={this.clearFinished.bind(this)}>CLEAR THE LIST</mui.Button>
              </div>
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
                {this.state.list.map((item: any) => (
                  <li>
                    <mui.Button sx={{ marginTop: 1 }} variant='contained' color='error' onClick={this.appendToFinnished.bind(this)}>X</mui.Button>
                    <mui.Button sx={{ marginLeft: 2, marginTop: 1 }} variant='outlined' onClick={() => this.handleOpenDialog(item.id)}>
                      {item.text}
                    </mui.Button>
                    <Dialog open={item.openDialog} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, height: '25%' } }} maxWidth="xs">

                      <mui.Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <mui.TextField sx={{ marginTop: 5 }} id={`input-${item.id}`} label="Edit to-do item" variant="outlined" defaultValue={item.text} />
                        <mui.Button sx={{ marginTop: 5 }} variant='contained' onClick={() => this.handleEdit(item)}>Save</mui.Button>
                      </mui.Box>

                    </Dialog>
                  </li>
                ))}
              </List>
              <br />
              <CssTextField size="small" sx={{ marginBottom: 2, marginTop: 2 }} id="input"></CssTextField>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <mui.Button variant='contained' color="success" sx={{ marginBottom: 2 }} onClick={this.submit.bind(this)}>SUBMIT</mui.Button>
                <mui.Button variant='contained' sx={{ marginBottom: 2, marginLeft: 2 }} onClick={this.clearToDo.bind(this)}>CLEAR THE LIST</mui.Button>
              </div>
            </mui.Box>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
