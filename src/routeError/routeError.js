import React from 'react';

class RouteError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStatedfromError() {
        return { hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return(
                <h2>Something went wrong, please try again</h2>
            );
        }
        return this.props.children;
    }
}

export default RouteError;

