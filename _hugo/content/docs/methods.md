---
date: 2016-10-12T14:27:57+02:00
description: Live Validator will recognize the following methods
menu:
  main:
    weight: 4
title: Methods
type: doc
---
### setRequired
{{% muted %}}Parameters: {boolean} \<doCheck = false\>{{% /muted %}}
This will mark the input(s) as required. The theme should take care of any visuals that it will use to indicate that the input is required. You can specify if a check should be done to see if the input(s) is/are currently empty at the same time (false by default), else this will happen automatically when the input is changed.

### unsetRequired
{{% muted %}}Parameters: None{{% /muted %}}
Use this to make the input(s) unrequired. Like [setRequired](#setrequired), the theme should handle the removal of the visual mark which indicated that the input was required. A check is automatically run with this call to remove any visuals that may no longer be needed.

#### Example of changing required state
{{% example "method-setRequired-unsetRequired" %}}
{{% alert %}}Notice how the input is marked as missing when setRequired is clicked because it has true for the `doCheck` option. Also notice how unsetRequired automatically removes the missing visual if needed.{{% /alert %}}

### enableLive
{{% muted %}}Parameters: {boolean} \<doCheck = false\>{{% /muted %}}
This turns live validation on - validation that happens as the user types input. It cause all the checks set in [checks]({{<ref "options.md#checks" >}}) to be checked on each input event. Here the option `doCheck` can also be used to indicate that a full check should be run after live validation has been enabled.

### disableLive
{{% muted %}}Parameters: None{{% /muted %}}
Use this if you want to disable the live validation. This will cause the set [checks]({{<ref "options.md#checks" >}}) to only be run when the input looses focus.

#### Example of changing live validation state
{{% example "method-enableLive-disableLive" %}}

### addChecks
{{% muted %}}Parameters: {array} checks{{% /muted %}}
This method allows you to add a check or multiple checks after LiveValidator has been instantiated. This can be useful when you want to change the validation based on other inputs.

### removeChecks
{{% muted %}}Parameters: {array} checks{{% /muted %}}
It is also possible to remove checks as is needed after instantiation.

### removeAllChecks
{{% muted %}}Parameters: None{{% /muted %}}
You can also clear all checks and start fresh using this.

#### Example of changing the checks
{{% example "method-changeChecks" %}}

### isValid
{{% muted %}}Parameters: None{{% /muted %}}
This can be used to check if an input is valid. It will rerun the required check and then the other testers if needed.
{{% alert %}}When called using jQuery it will run on all inputs in the selector and on all children of the selector(s).{{% /alert %}}

### destroy
{{% muted %}}Parameters: None{{% /muted %}}
Use this when you want to destroy the plug-in.
