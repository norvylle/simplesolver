import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Alert, Form, Panel, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';
import request from "superagent";
import { isNull, isNaN } from 'util';

const autoBind = require('auto-bind');

class Regression extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accepted: null,
            rejected: null,
            answer: [],
            reject: false,
            imageLoaded: false,
            fxText: "",
            x: NaN,
            degree: NaN,
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

    handleX(e) {
        this.setState({x: e.target.value})
    }

    handleSubmit() {
        if(this.state.degree > 0 && !this.reject && this.state.accepted){
            this.setState({alert: 'Please provide a valid CSV file.', reject: false, imageLoaded: false})
            
            const req = request.post(`http://localhost:8080/polyreg?degree=${this.state.degree}`)

            this.state.accepted.forEach(file => {
                req.attach("upload", file)
                .then( res => {
                    // let string = JSON.stringify(res.body)[0][0]
                    this.setState({answer: res.body[0]})
                    let f = this.state.answer.f[0].split(" ")
                    this.setState({fxText: f[0]+0+f[1]+" = "+this.state.answer.f[1]+this.state.answer.f[2], imageLoaded: true})
                })
                
            });
        }else{
            if(!this.reject && isNaN(this.state.degree)){
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

    Functions(props){
        const loaded = props.loaded
        if(loaded){
            return(<li>{this.state.fxText}</li>)
        }else{
            return(<div/>)
        }

    }

    Graph(props){
        const imageLoaded = props.imageLoaded
        if(imageLoaded){
            return(<img src={this.state.answer.uri[0]} alt="graph"/>)
        }else{
            return (<h3>Graph</h3>)
        }
    }

    render() {
        return (
            <div>
                <h1>Polynomial Regression</h1>
                <this.AlertRejected reject={this.state.reject} />
                <div style={{ display: 'flex' }}>
                    <div style={{height: '150px', width: '50%', flexDirection: 'row', paddingTop: 20 }}>
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
                            <FormGroup bsSize="large" >
                                <Col componentClass={ControlLabel} sm={10}>X</Col>
                                <Col sm={5}> <FormControl type='number' onChange={this.handleX} disabled={!this.state.imageLoaded}/></Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div style={{ width: '50%', flexDirection: 'row', paddingTop: 20 }}>
                        <Panel>
                            <Panel.Heading><h3>Results</h3></Panel.Heading>
                            <Panel.Body>
                                <ul>
                                    <this.Functions loaded={this.state.imageLoaded}/>
                                </ul>
                            </Panel.Body>
                            <Panel.Body>
                                <this.Graph imageLoaded={this.state.imageLoaded}/>
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default Regression;