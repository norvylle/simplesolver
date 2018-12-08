const columns0 = [{
    dataField: 'id',
    text: 'Plant',
    headerAlign: 'center',
    align: 'center',
}, {
    dataField: 'supply',
    text: 'Supply',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }            
}, {
    dataField: 'sac',
    text: 'Sacramento, CA',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'slc',
    text: 'Salt Lake City, UT',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'alb',
    text: 'Albuquerque, NM',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'chi',
    text: 'Chicago, IL',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'nyc',
    text: 'New York City, NY',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}
];

const columns1 = [{
    dataField: 'id',
    text: 'Plant',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }            
}, {
    dataField: 'total',
    text: 'Total',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }            
}, {
    dataField: 'sac',
    text: 'Sacramento, CA',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'slc',
    text: 'Salt Lake City, UT',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'alb',
    text: 'Albuquerque, NM',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'chi',
    text: 'Chicago, IL',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}, {
    dataField: 'nyc',
    text: 'New York City, NY',
    headerAlign: 'center',
    align: 'center',
    style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex === 3) {
        return {fontWeight: 'bold'}
        }
    }
}
];

export{
    columns0,
    columns1
}