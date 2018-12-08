import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Alert, Form, Panel, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';
import request from "superagent";
import { isNull } from 'util';

const autoBind = require('auto-bind');

class Regression extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accepted: null,
            rejected: null,
            answer: [],
            reject: false,
            degree: -1,
            dropMessage: 'Add .csv file here. Click here to open File Dialog',
            alert: 'Please provide a valid CSV file.'
        }
        autoBind(this);
    }

    async onDrop(accepted, rejected) {
        await this.setState({ accepted: accepted, rejected: rejected })
        if(this.state.reject){
            this.setState({dropMessage: 'Add .csv file here. Click here to open File Dialog'})
        }else{
            this.setState({dropMessage: accepted[0].name})
        }
    }

    handleDegree(e) {
        this.setState({degree: e.target.value})
    }

    handleSubmit() {
        if(this.state.degree > 0 && !this.reject && this.state.accepted){
            this.setState({alert: 'Please provide a valid CSV file.', reject: false})
            
            const req = request.post(`http://localhost:8080/polyreg?degree=${this.state.degree}`)

            this.state.accepted.forEach(file => {
                req.attach("upload", file)
                .then( res => {
                    // let string = JSON.stringify(res.body)[0][0]
                    //this.setState({answer: res.body[0]})
                    console.log(res.body)
                });
            });
        }else{
            if(!this.reject && this.state.degree < 0){
                this.setState({alert: 'Please provide the necessary field/file.', reject: true})
            }
            else if(isNull(this.state.accepted)){
                this.setState({alert: 'Please provide a CSV File.', reject: true})
            }
            else{
                this.setState({alert: 'Please provide a Degree.', reject: true})
            }
        }
    }

    AlertRejected(props) {
        const reject = props.reject
        if (reject) {
            return (<Alert bsStyle="warning">{this.state.alert}</Alert>)
        }
        else {
            return (<div />)
        }
    }

    render() {
        return (
            <div>
                <h1>Polynomial Regression</h1>
                <this.AlertRejected reject={this.state.reject} />
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', flexDirection: 'row', paddingTop: 20 }}>
                        <Dropzone multiple={false} accept=".csv" onDropRejected={() => this.setState({ reject: true })} onDropAccepted={() => this.setState({ reject: false })} onDrop={this.onDrop} style={{ height: '70%', border: '5px dotted black', width: '80%', alignSelf: 'center' }}><p style={{ textAlign: "center", padding: 5, fontSize: 20, fontWeight: 'lighter'}}>{this.state.dropMessage}</p></Dropzone>
                        <Form style={{ horizontal: 'true', width: '80%' }}>
                            <FormGroup bsSize="large" >
                                <Col componentClass={ControlLabel} sm={10}>Degree</Col>
                                <Col sm={5}> <FormControl type='number' min='1' max='100' onChange={this.handleDegree} /></Col>
                            </FormGroup>
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
                            <Panel.Body>Graph</Panel.Body>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default Regression;