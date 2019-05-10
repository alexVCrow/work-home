import React, { Component } from 'react';

export default class ErrorBoundry extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch() {
        console.log('sdfjjsf')
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return <div className='row alert alert-danger d-flex justify-content-center'>
                Произошла ошибка!
            </div>
        }

        return this.props.children;
    }
}