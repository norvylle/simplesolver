import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
/* import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
<BootstrapTable keyField='id' headerAlign={'center'} data={ data } columns={ columns } caption={"Fairways Shipping Company"} cellEdit={cellEdit}/>

const columns = [{
      dataField: 'id',
      text: 'Plant'
  }, {
      dataField: 'supply',
      text: 'Supply'
  }, {
      dataField: 'sac',
      text: 'Sacramento, CA'
  }, {
      dataField: 'slc',
      text: 'Salt Lake City, UT'
  }, {
      dataField: 'alb',
      text: 'Albuquerque, NM'
  }, {
      dataField: 'chi',
      text: 'Chicago, IL'
  }, {
      dataField: 'nyc',
      text: 'New York City, NY'
  }
  ];
  

let data = [
    {id:"Denver", supply: 310, sac: 10, slc: 8, alb: 6, chi: 5, nyc: 4},
    {id:"Phoenix", supply: 260, sac: 6, slc: 5, alb: 4, chi: 3, nyc: 6},
    {id:"Dallas", supply: 280, sac: 3, slc: 4, alb: 5, chi: 5, nyc: 9},
    {id: " ", supply: "Demands by:", sac: 180, slc: 80, alb: 200, chi: 160, nyc: 220},
    {id:"Shipping:", supply: 0, sac: 0, slc: 0, alb: 0, chi: 0, nyc: 0}
];

let cellEdit = cellEditFactory({ mode: 'click', blurToSave: true, nonEditableRows: () => [" "] })
*/

// const autoBind = require('auto-bind');

class Simplex extends Component {
    render() {
        return (
            <div>
                <h1>Simplex</h1>
                
            </div>
        );
    }
}

export default Simplex;