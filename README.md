# laravel-elixir-loopback-angular-sdk

This Laravel Elixir extension allows you to easily generate your Loopback app AngularJS SDK.

## Installation

```sh
$ npm install laravel-elixir-loopback-angular-sdk --save-dev
```

## Usage

Add this extension to your Gulpfile, like so:

```js
var elixir = require('laravel-elixir');

require('laravel-elixir-loopback-angular-sdk');

elixir(function(mix) {
   mix.lbServices();
});
```

This will generate `lb-services.js` in your public JS output folder.

If you'd like to generate the SDK in a different output folder, you may pass a full path as first argument to the lbServices() method, like so:

```js
mix.lbServices('./client/js/lib/lb-services.js');
```

Finally, if you want to override the default options of [loopback-sdk-angular](https://www.npmjs.com/package/loopback-sdk-angular) module, you may pass an object as the second argument:

```js
mix.lbServices(null, {ngModuleName: "myApi"});
```

# FAQ

### How can I fix this Babel notice `[BABEL] Note: The code generator has deoptimised the styling of ".../lb-services.js" as it exceeds the max of "100KB".`?

This is the default Babel configuration, You can use the babel ignore option to exclude the generated file from the files to be transformed:

```js
var elixir = require('laravel-elixir');

var config = elixir.config;

config.js.babel.options.ignore = 'client/js/lb-services.js';

// ...

```


