import React from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "http://localhost:4000";
const WS_URL = "ws://localhost:4000/ws";

type AppProps = {};
type AppState = {};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  public componentDidMount() {
    this.makeRequest();
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("WS connected");
      ws.send(JSON.stringify({ subscribe: true }));
    };
    ws.onmessage = (evt) => {
      console.log("Got ws message from server:", evt.data);
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Edit <code>client/src/App.tsx</code></p>
        </header>
      </div>
    )
  }

  private async makeRequest() {
    const resp = await axios.post(BASE_URL + "/goto", {
      test: "test!"
    });
    console.log("Test request response:", resp.data);
  }

}

export default App;
