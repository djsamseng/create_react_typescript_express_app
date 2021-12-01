# Template to create a React app with an Express backend

```bash
mkdir project_name && cd project_name
```

.gitignore
```
# dependencies
**/node_modules
**/.pnp
**/.pnp.js

# testing
**/coverage

# production
**/build
**/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# python environment
pycli/env
**/__pycache__
```

```
mkdir server && cd server
yarn init -y
```

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist/js",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["src/types/*.ts", "node_modules", ".vscode"]
}
```

```bash
yarn add typescript -g
yarn add express cors
yarn add -D @types/node @types/express @types/cors
yarn add -D concurrently nodemon
```

add to package.json
```json
{
  "scripts": {
    "build": "tsc",
    "start": "concurrently \"tsc -w\" \"nodemon dist/js/app.js\""
  }
}
```

create server/src/app.ts
```ts
import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";

const app = express();
const PORT = process.env.PORT || 4000;
const jsonParser = bodyParser.json();
const routes = Router();

app.use(cors());
app.use(routes);

const server = app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
routes.post("/goto", jsonParser, async (req, resp) => {
   console.log("Req:", req.body);
   resp.send({ success: true });
});
```

```bash
yarn build
yarn start
```

In another terminal window
```bash
cd ../
npx create-react-app client --template typescript
cd client
rm -rf ./.git
yarn add axios
```

Add the following overrides to client/package.json
```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "overrides": [
      {
        "files": ["**/*.ts?(x)"],
        "rules": {
          "@typescript-eslint/no-useless-constructor": "off"
        }
      }
    ]
  },
}
```

Update client/src/App.tsx
```tsx
import React from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "http://localhost:4000";

type AppProps = {};
type AppState = {};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  public componentDidMount() {
    this.makeRequest();
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
    console.log("Test request response:", resp);
  }
}

export default App;
```

```bash
yarn start
```

