---
date: 2016-07-20T16:01:23+02:00
description: These are the basic steps to get started with the plug-in
menu:
  main:
    weight: 2
title: Getting Started
type: doc
---
## Creation
To start using the plug-in, just call it on a jQuery object.

### Calling the plug-in
{{% example "options-required" %}}
{{% alert %}}Notice how the required attribute is detected on the input and handled by the theme to add the asterisk.{{% /alert %}}

### Passing options to the plug-in
It is also possible to overwrite the plug-in options per instantiation. Just pass in a object with any of the valid [options]({{< ref "docs/options.md" >}}).
{{% example "gs-options" %}}

### Passing options via data
The plug-in will also check for `data-*` attributes and combines them into the options. This makes it easy to have a lot of inputs with many options.
{{% example "gs-data-options" %}}
{{% alert %}}Note the example of how to set array & object options correctly - with the double quotes on the inside - this insures that they are parsed correctly.{{% /alert %}}

### Changing default options
Sometimes it is also needed to change the default options before initiating a set of inputs - setting the theme data is a good example of this.

To do this, just call the plug-in directly and pass in a object of [options]({{< ref "docs/options.md" >}}) to overwrite.
{{% example "gs-default-options" %}}

{{% alert %}}Also note how to instantiate multiple inputs with one call - which can be an alternative to overwriting the defaults. This is because the plug-in automatically filters the jQuery object to contain only supported inputs. They are also returned from the instantiation.{{% /alert %}}

## After creation
Now that you know how to create a instance of the plug-in on inputs, you will be able to do two primary things with this instance.

### Calling methods
The plug-in exposes some methods that can be called after instantiation. They can be called by passing them in as a string when calling the plug-in.
{{% example "gs-methods-call" %}}

### The mighty isValid method
The most important method is the `isValid` method. It will check if the jQuery object(s) - which is filtered to inputs only - is valid and passes all their constraints.
{{% example "gs-isValid-call" %}}
{{% alert %}}Note how the inputs with errors are marked - automatically by this method - using the theme to guide the user in fixing them.{{% /alert %}}
