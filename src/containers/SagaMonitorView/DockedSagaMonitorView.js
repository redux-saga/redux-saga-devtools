import * as React from "react";
import SagaMonitorView from "./SagaMonitorView";
import Dock from "../../components/Dock"

export class DockedSagaMonitorView extends React.Component {
    render() {
        return (
            <Dock>
                <SagaMonitorView />
            </Dock>
        )
    }
}