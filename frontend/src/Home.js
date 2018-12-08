import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h2>Welcome to S1MPLE 50LVER</h2>
                    <p>
                        A simple solver for problems in Polynomial Regression, Quadratic Spline Interpolation, and Simplex.
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;