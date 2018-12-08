import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { columns1, columns0 } from './rowElements'; 

let cellEdit = cellEditFactory({ mode: 'click', blurToSave: true, nonEditableRows: () => [" ","Totals:"] })

const autoBind = require('auto-bind');

class Simplex extends Component {
    constructor(props){
        super(props)
        this.state={
            constraints: [
                {id:"Denver", supply: 310, sac: 10, slc: 8, alb: 6, chi: 5, nyc: 4},
                {id:"Phoenix", supply: 260, sac: 6, slc: 5, alb: 4, chi: 3, nyc: 6},
                {id:"Dallas", supply: 280, sac: 3, slc: 4, alb: 5, chi: 5, nyc: 9},
                {id: " ", supply: "Demands by:", sac: 180, slc: 80, alb: 200, chi: 160, nyc: 220},
                {id:"Shipping:", supply: 0, sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0}
            ],
            answer:[
                {id:"Denver", total: 0, sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0},
                {id:"Phoenix", total: 0, sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0},
                {id:"Dallas", total: 0, sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0},
                {id: "Totals:", sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0},
            ]
        }
    }
    
    render() {
        return (
            <div>
                <h1>Simplex</h1>
                <BootstrapTable keyField='id' headerAlign={'center'} data={ this.state.constraints } columns={ columns0 } caption={"Shipping Costs from Plant to Warehouse (Fairways Woods Company)"} cellEdit={cellEdit}/>
                <BootstrapTable keyField='id' headerAlign={'center'} data={ this.state.answer } columns={ columns1 } caption={"Number to ship from Warehouse to Plant (Fairways Woods Company)"}/>
            </div>
        );
    }
}

export default Simplex;