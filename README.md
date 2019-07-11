# Unit and integration testing in react
This document will help explain the process of setting up the environment and the various testing cases you can run into in the react ecosystem. 

* Simple (dumb) functional components
* Smart functional components
* useContext (WIP)
* Redux (coming soon)
* Material UI

# Setup
You will need to first install the following dependencies:

## Packages

```
"@testing-library/react":  "^8.0.1",
"@babel/cli":  "^7.2.3",
"@babel/node":  "^7.2.2",
"@babel/plugin-proposal-class-properties":  "^7.3.3",
"@babel/plugin-proposal-object-rest-spread":  "^7.0.0",
"@babel/plugin-syntax-dynamic-import":  "^7.2.0",
"@babel/plugin-transform-modules-commonjs":  "^7.5.0",
"@babel/plugin-transform-runtime":  "^7.5.0",
"@babel/polyfill":  "^7.2.5",
"@babel/preset-env":  "^7.5.0",
"@babel/preset-react":  "^7.0.0",
"@babel/runtime":  "^7.5.0",
"babel-jest":  "^23.4.2",
"react-test-renderer":  "^16.8.6",
"jest":  "^24.7.1",
"jest-dom":  "^3.1.3",
"jest-styled-components":  "^6.3.3"
```

### @testing-library/react
Is a library from kent.c.dodds which we will use to make our tests a little cleaner and easier, it will provide useful query and rendering utilities which we will use a lot of. 

### @babel/***
We will need babel and a wide selection of it plugins to make everything work, we are not transpiling through webpack during our tests. So everything is done on runtime and as a result some things need to be translated to make everything work. 

If you get any transpile errors, you may need to install extra babel plugins depending on what you are using. 

### react-test-renderer
Even though we have a render method from **jest** and **testing-library/react**, the one provided here is very useful when it comes to styled components and getting the correct styling from the DOM. 

### JEST
Is the main library we're using to write our tests, it comes with a ton of utility functions for making tests and generating coverage reports. 

## Configuration

### Package.json

```
"jest":  {
	"verbose":  true,
	"moduleNameMapper":  {
		"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":  "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|scss|less)$":  "<rootDir>/__mocks__/fileMock.js"
	}
}
```

**moduleNameMapper**
If useful for adding the Webpack aliases too, because babel is runtime we don't use Webpack and as a result things will break if we also do not add our Webpack aliases to this object. 

```
"transformIgnorePatterns": [
	"<rootDir>/node_modules/(?!(@package)/)"
]
```

**transformIgnorePatterns**
Are useful to avoid further complications with compiled packages, you replace the @brand with your package name and < product > if applicable to your product name. (This is in the case you have workspaces.)

**Script**

```
"test":  "jest \"src/.*\\.test\\.js\" --coverage --env=jsdom"
```

We have now setup the basic configuration for 

### babel.config.js
```
module.exports  =  function  (api)  {
	const presets =  ['@babel/preset-react',  '@babel/preset-env']
	const plugins =  ['@babel/plugin-transform-modules-commonjs',  '@babel/plugin-syntax-dynamic-import',  ['@babel/plugin-proposal-class-properties',  {  'loose':  true  }],  ['@babel/plugin-transform-runtime',  {  'regenerator':  true  }]]

	api.cache(true)

	return  {
		presets,
		plugins
	}
}
```

We want to make sure babel has access to all the plugins and presets we installed above.

### .env
``` 
SKIP_PREFLIGHT_CHECK=true
```
We add this to avoid seeing warnings and hints everytime we run the tests. 
