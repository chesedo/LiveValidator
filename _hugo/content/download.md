---
date: 2016-07-20T14:26:22+02:00
description: Use these instructions to get Live Validator for your project
menu:
    main:
        weight: 1
title: Download
type: doc
---

## Zip Download
To get the latest verion as a ZIP use the following button.

{{% button href="https://github.com/chesedo/LiveValidator/archive/master.zip" type="primary" %}}Download{{% /button %}}

### HTML Markup Example
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Page Title</title>
        <link rel="stylesheet" href="/css/LiveValidatorTheme.css" charset="utf-8">
    </head>
    <body>
        <form action="#" method="post">
            <!-- ... -->
        </form>
        <script src="js/jquery.min.js" charset="utf-8"></script>
        <script src="js/jquery-live-validator.min.js" charset="utf-8"></script>
        <script src="js/live-validator-theme-default.min.js" charset="utf-8"></script>
        <script type="text/javascript">
            $( function() {
                var inputs = $( 'form' ).LiveValidator();
            } );
        </script>
    </body>
</html>
```
{{% alert %}}Remember to include jQuery{{% /alert %}}

## Bower
If you are using Bower to manage your assets, then you will find the plugin listed as `live-validator`.

### Install
It can be installed using the following
```
bower install --save live-validator
```

### File structure
The zip file will contain the source JavaScript and style code under the `src` folder. It also has compiled and minified versions under the `dist` folder.

#### Source structure
Folder | Description
-------|----------------------------------------------------------------------
js     | Contains all the JavaScript code - the plugin code, tester and themes
less   | Contains the styles for the themes, if the theme needs extra styles

```markup
/js
    /autoChecks
        <!-- Used to auto detect check from HTML5 attributes (like `min` and `max`) -->
        /AutoChecks.js

    /core
        <!-- The core that binds everything together -->
        LiveValidator.js

    /plugin
        <!-- This creates the jQuery plugin -->
        LiveValidatorPlugin.js

    /tester
        <!-- Adds tests for HTML5 attributes (sort of a polyfill) - works together with AutoChecks.js -->
        html5validation.js

        <!-- The skeleton for the tester that can be extended with your own tests -->
        LiveValidatorTester.js

    /themes
        <!-- The default theme that will be used - can be excluded if using another -->
        Default.js

/less
    <!-- The styles for the default theme -->
    /LiveValidatorTheme.less
```

#### Distribution structure
Folder | Description
-------|----------------------------------------------------------------------
js     | Contains compiled version of the JavaScripts
css    | Contains the processed styles for the themes, if the theme needs extra styles

```markup
/js
    <!-- Contain the core, plugin, tester and auto checks detection code -->
    /jquery-live-validator.js
    /jquery-live-validator.min.js

    <!-- The JavaScript for the default theme -->
    /live-validator-theme-default.js
    /live-validator-theme-default.min.js

/css
    <!-- The styles for the default theme -->
    /LiveValidatorTheme.css
    /LiveValidatorTheme.min.css
```

### Needed files
If you want to include the source files into your own as a bundle maybe, then you will need these at the minimum:

- LiveValidatorPlugin.js
- LiveValidator.js
- LiveValidatorTester.js

And if you are using the distribution files, then one of the following is needed:

- jquery-live-validator.js
- jquery-live-validator.min.js

{{% alert %}}
The default theme is optional **as long as** another is supplied and set in the options. If you do not supply another or do not set the options to use it, then an error will result and the plugin will not work.
{{% /alert %}}
