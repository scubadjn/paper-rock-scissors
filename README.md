# Paper Rock Scissor game

## Quickstart
```
npm install -g yarn
yarn install
yarn start
```
#### Linting
```
yarn lint
```

#### Unit tests
```
yarn test
```

#### System tests
```
yarn cucumber
```

#### run linting and all tests
```
yarn all
```

#### transpile to ES5
```
yarn build
```

#### minify
```
yarn bundle
```

#### depoy on linux using docker-compose
* pre requirement: yarn build && yarn bundle
```
deploy:docker:linux
```

TODO
* improve logging
* Docs are created manually.... should be autogenerated
* expose namespace for consumers for autogenerating tests