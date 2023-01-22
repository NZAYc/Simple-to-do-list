import React from 'react';
import './App.css';
import * as mui from "@mui/material/";



class FinishedList extends React.Component<{}, { finished: string[] }> {
    constructor(props: any) {
        super(props)
        this.state = {
            finished: [],
        }
    }

    clearFinished() {
        this.setState({ finished: [] })
    }

    render() {
        return (
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
        )
    }
}

export default FinishedList