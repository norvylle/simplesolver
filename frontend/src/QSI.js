import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Alert, Form, Panel, FormGroup, Col, Button } from 'react-bootstrap';
import request from "superagent";

const autoBind = require('auto-bind');

class QSI extends Component {
    constructor(props){
        super(props)
        this.state={
            accepted: null,
            rejected: null,
            answer: [],
            reject: false,
            dropMessage: 'Add .csv file here. Click here to open File Dialog'
        }
        autoBind(this);
    }

    async onDrop(accepted, rejected) {
        await this.setState({ accepted: accepted, rejected: rejected })
        if(this.state.reject){
            await this.setState({dropMessage: 'Add .csv file here. Click here to open File Dialog'})
            console.log(this.state.answer)
        }else{            
            this.setState({dropMessage: accepted[0].name})
        }
    }

    handleSubmit() {
        if(this.state.accepted){
            const req = request.post('http://localhost:8080/qsi');

            this.state.accepted.forEach(file => {
                req.attach("upload", file)
                .then( res => {
                    // let string = JSON.stringify(res.body)[0][0]
                    this.setState({answer: res.body[0]})
                });
            });
            
        }
    }

    AlertRejected(props) {
        const reject = props.reject
        if (reject) {
            return (<Alert bsStyle="warning">Please provide a valid CSV file.</Alert>)
        }
        else {
            return (<div />)
        }
    }

    render() {
        return (
            <div>
                <h1>Quadratic Spline Interpolation</h1>
                <this.AlertRejected reject={this.state.reject} />
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', flexDirection: 'row', paddingTop: 20 }}>
                        <Dropzone multiple={false} accept=".csv" onDropRejected={() => this.setState({ reject: true })} onDropAccepted={() => this.setState({ reject: false })} onDrop={this.onDrop} style={{ height: '70%', border: '5px dotted black', width: '80%', alignSelf: 'center' }}><p style={{ textAlign: "center", padding: 5, fontSize: 20, fontWeight: 'lighter'}}>{this.state.dropMessage}</p></Dropzone>
                        <Form style={{ horizontal: 'true', width: '80%' }}>
                            <FormGroup>
                                <Col sm={5}>
                                <Button bsSize='large' bsStyle='primary' onClick={this.handleSubmit}>Solve</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div style={{ width: '50%', flexDirection: 'row', paddingTop: 20 }}>
                        <Panel>
                            <Panel.Heading><h3>Results</h3></Panel.Heading>
                            <Panel.Body>
                            <ul>
                            {
                                this.state.answer.map((item,index)=>{
                                    return(<li key={index}>{item}</li>)
                                })
                            }
                            </ul>
                            </Panel.Body>
                            <Panel.Body><div>Graph</div></Panel.Body>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default QSI;