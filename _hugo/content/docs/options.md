---
date: 2016-07-20T15:59:02+02:00
description: Here are all the options that can be set on instantiation or via defaults overwrite
menu:
  main:
    weight: 3
title: Options
type: doc
---
## Checks
{{% muted %}}Default: empty{{% /muted %}}
This is an array that holds the checks for the input(s). It is important to use valid object syntax when it is set via the `data-checks` attribute.

### Valid options
These options are valid when `html5validation.js` is included - they are all from their HTML5 equivalent and auto detected if `AutoChecks.js` is included.

Check     | Description
----------|----------------------------------------------------------------------------------------
min       | Minimum number that can be set on an input
max       | Maximum number that can be set on an input
minlength | The minimum number of characters needed on the input
maxlength | The maximum number of characters allowed on the input
pattern   | A regex pattern that the input has to match. Include the helper text in the `title` as it will be used if the pattern fails
isNumber  | Not an official HTML5 validator, but is used by "min" and "max" to make sure the input is a number.

This list can be extended by adding your own checks to the tester.

#### Pattern example (Auto detected)
{{% example "options-pattern" %}}

### Checks with parameters
Some checks need to be called with extra parameters. These can be passed to the check by setting the check to an object with the key as the check's name and the value will be the parameter.

Check     | Parameter
----------|----------------------------------------------------------------------------------------
min       | int
max       | int
minlength | int
maxlength | int
pattern   | object with a `regex` and `title` as keys
isNumber  | None

#### Parameters example
{{% example "options-parameters" %}}
{{% alert %}}Note how the value can be a string, int or object.{{% /alert %}}

## Live Enabled
{{% muted %}}Default: true{{% /muted %}}
`liveEnabled` is used to set whether checking should happen live as the user types. Setting it to false results in checking only happening once the input looses focus.

### Disabling live results
{{% example "options-live-enabled" %}}

## Required
{{% muted %}}Default: false{{% /muted %}}
Used to indicate if the input is required. It is automatically set when the input has the `required` property.

### Setting required via property detection
{{% example "options-required" %}}
{{% alert %}}Note that the theme automatically handles the asterisk{{% /alert %}}

## Theme
{{% muted %}}Default: undefined{{% /muted %}}
Set the theme object that you want to use here - see themes to get the correct name. If no theme is set or if the theme is invalid, then the default will be used.

### Theme Data
{{% muted %}}Default: { error: 'error', missing: 'missing', parentSelector: '.row' }{{% /muted %}}
The data, array or object that is set here will be passed to the theme as is. Consult the theme you are using to know how to overwrite some options.

## Debug
{{% muted %}}Default: false{{% /muted %}}
This option can be used to log debug information to the console. These can be helpful to find out why something is not working - like in a bug report.

### Options

Option    | Description
----------|-------------------------------------------
1 \| true | Show only 'DEBUG' data
2         | Also show 'INFO' data
3         | Also show 'ERROR' data
