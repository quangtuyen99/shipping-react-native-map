import React, { Component } from 'react'

function genericContainer(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            return (props);
        }

        render() {
            return <WrappedComponent />;
        }
    }
}

export default genericContainer;