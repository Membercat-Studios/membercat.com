---
title: Conditions
description: A powerful system to limit action execution based on placeholders
position: 6
slug: conditions
---

Conditions can be used to limit the execution of an action to specific cases, for example, only executing an action if the donated amount is higher than 50$.

## Example Configuration
```yaml
actions:
  example_reward:
    ...
    conditions:
      - "{amount}>50"
      - "{amount}<100"
      - "{currency}=USD"
```
The configuration above will make sure that the action `example_reward` only triggers when the donated amount is between 50 and 100 USD.
You can add as many conditions as you want, for the action to execute, all of the conditions have to be **true**.

## Format
A condition consists of 2 **elements** and one **operator**. For the first condition in the example above, the `{amount}` placeholder is the first element, the `>` is the operator and the `50` is the second element. Both elements can either be text, numbers or a placeholder. Be aware that misspelling placeholders will just convert them to text and only placeholders from the event type specified in the current action can be used. Also make sure not to include unneccessary spaces as those might cause problems as well.
```yaml
conditions:
  - "(element 1)(operator)(element 2)"
```

## Inverting
Any condition can be inverted by adding a `!` in front of the rest.
```yaml
conditions:
  - "!(element 1)(operator)(element 2)"
  - "!{message}.>i hate cats" # Example
```
The example condition above will only execute the action if the donation message does not contain the text "i hate cats".

## Operators
Currently, the plugin supports **7** different operators for comparing elements. Operators can require the element(s) to be of a specific type, so either numeric or just text (placeholders count as the value they get replaced with here). The following operators are currently supported:
- `=` (Equality operator): Checks whether two elements equal eachother, independent of the element type (number, text)
- `>` (Larger than operator): Checks if element 1 is larger than element 2, requires both of them to be a number
- `>=` (Larger-equals operator): Checks if element 1 is larger than element 2 or equal to element 2, requires both of them to be a number
- `<` (Smaller than operator): Checks if element 1 is smaller than element 2, requires both of them to be a number
- `<=` (Smaller-equals operator): Checks if element 1 is smaller than element 2 or equal to element 2, requires both of them to be a number
- `.>` (Contains operator): Checks if element 2 contains element 1, requires both of them to be text
- `<.` (Opposite contains operator): Checks if element 1 contains element 2, requires both of them to be text

## Donation conditions
Every action can optionally contain a set of **Donation Conditions**, which can be used to limit the execution based on the donated amount in different currencies.
```yaml
donation_conditions:
  - "USD>10.2"
  - "USD<50"
  - "EUR>10"
  - "EUR<50"
```
The donation conditions above will only execute the action if someone donates either between 10€ and 50€ or 10.2$ and 50$. Note that only the conditions in the `donation_conditions` list that use the currency of the actual donation will be checked. Donation conditions also support any operator, be aware that placeholders are not currently supported. The currency (for example `USD` in the example above) will work exactly like the `{amount_double}` placeholder when checking the conditions.

## Changing Modes
Using the `mode` parameter, you can change how conditions are processed. **AND**, the default, will only allow the action to execute if ALL of the conditions are true. **OR** will allow the action to execute if any of the conditions are true. Please note that the `mode` parameter only affects normal conditions and not donation conditions!
```yaml
mode: OR
conditions:
  - "{user}=codingcat"
  - "{user}=Domplanto"
```

## Nesting conditions
If you need to achieve some more complex logic, you might need to start **nesting conditions**. This allows you to check for conditions such as: *"If the user donated more than 100 bits, and included 'creeper' or 'aw man' in thier message"*.
```yaml
actions:
  spawn_creeper:
    ...
    action: twitch_bits
    conditions:
      - "{amount}>100"
      - mode: OR
        conditions:
          - "{message}.>creeper"
          - "{message}.>aw man"
```
Here, we've added a condition to check for the amount of bits, and then added a nested **condition group** with the mode set to OR to check our message.