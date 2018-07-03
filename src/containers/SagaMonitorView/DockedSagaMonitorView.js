import * as React from "react";
import PropTypes from "prop-types";
import SagaMonitorView from "./SagaMonitorView";
import Dock from "../../components/Dock"

export class DockedSagaMonitorView extends React.Component {
    render() {
        return (
            <Dock>
                <SagaMonitorView darkTheme={this.props.darkTheme} />
            </Dock>
        )
    }

}

DockedSagaMonitorView.propTypes = {
    darkTheme: PropTypes.boolean
}