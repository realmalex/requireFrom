## requireFrom

Require from a directory relative to node_modules, flattening your require paths. Using requireFrom you won't have to manage complex relative paths between each component of your node app.

## Code Example

Simple usage anywhere in your node app:
````js
    var lib = require('requirefrom')('lib');
    var myModule = lib('myModule');
````

For more complex usage, let's assume this example directory structure:

    node_modules/
    lib/
      components/
        framework/
          veiws/
            login.js
            signup.js
          models/
            user/
              index.js
      utlity/
        normalize/
          user.js
    package.json

Any file in this project could then include these files with the following code:
````js
var
    requireFrom = require('requirefrom')
  , views = requireFrom('lib/components/framework/views/')
  , models = requireFrom('lib/components/framework/models/')
  , utility = requireFrom('lib/utility/')

  , loginForm = views('login.js')
  , signupForm = views('signup.js')

  , userModel = models('user')

  , normalizeUser = utility('normalize/user.js')
````

Without requireFrom, each file would need to maintain paths relative each other file, for example:
````js
var
    loginForm = require('../../framework/views/login.js')
  , signupForm = require('../../framework/views/signup.js')

  , userModel = require('../../framework/models/user')

  , normalizeUser = require('../../../utlity/normalize/user.js')
````



## Motivation

There hasn't been a conlusive method to prevent relative path complexity. You can read about them [here](https://gist.github.com/branneman/8048520). Each method either pollutes global, damages portablity of your app, or might confuse someone unfamiliar with your technique. I hadn't seen anyone considering requireFrom's method of using a dependency to find the relative path of your project.

## Installation

Install using npm. Add "requirefrom" to your dependencies in package.json before running `npm install`, or do that automatically with `npm install --save requirefrom`.