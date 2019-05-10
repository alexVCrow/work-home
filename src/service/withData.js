import React, { Component } from 'react';
import Spinner from '../spinner/spinner';

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        // componentDidUpdate(prevProps) {
        //     if (this.props.getData !== prevProps.getData) {
        //         this.update();
        //     }
        // }

        componentDidMount() {
            this.update();
        }

        update() {
            const { getData } = this.props.userService;
            this.setState( {
                loading: true,
                error: false
            });
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    });
                });
        }


        render() {
            const { data, loading, error } = this.state;
            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <h4>Error</h4>;
            }

            return <View {...this.props} data={data} />;
        }
    };
};

export default withData;