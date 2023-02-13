import React from "react";

type AwaitingConnectionProps = {}
export class AwaitingConnection extends React.Component<AwaitingConnectionProps> {
  constructor(props: AwaitingConnectionProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="awaiting-connection">Awaiting Connection...</div>;
  }
}
