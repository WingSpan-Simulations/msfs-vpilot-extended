import React from "react";

export class AwaitingConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="awaiting-connection">Awaiting Connection...</div>;
  }
}
