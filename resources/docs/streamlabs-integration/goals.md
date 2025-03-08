---
title: Donation Goals
description: Create different goal types and execute any action when a goal is completed
position: 8
slug: goals
---

Donation goals can be used to let certain things happen when a goal set by the streamer is reached.
A goal can either be `running` or `stopped`, stopped meaning the goal will still show up, but nothing can be added to it anymore. Goals will automatically stop themselves upon being reached, but can also be manually stopped using `/streamlabs goal stop`.

Only one goal can be active at a time, meaning to start a new one, you'll need to `remove` the currently active one first. You could do this using `/streamlabs goal remove`, but starting a new goal will automatically remove the old one as well. The remove command is useful if you don't want the goal to show up anymore at all.

## Goal Types
To start a goal, you'll first have to create a **goal type**. Goal types define what kind of events should increase the goal by how much, and what happens once it's reached. The actual "amount" of the goal, so for example how many bits you want to reach, will be specified once you actually start the goal and is not defined by the goal type.
```yaml
goal_types:
  ...
  bits_goal:
    add_amount: '{amount}'
    conditions:
    - '{_type}=twitch_bits'
    messages:
    - '[title]<gold>Donation goal reached!'
    - '[subtitle]<red>Exploding the streamer...'
    commands:
    - 'execute at {player} run summon tnt'
```
Let's take a look at this example goal type. The `add_amount` property specifies how much we want to add to the goal every time it gets triggered, this could be as simple as a "1" to add 1 to the goal each time, or in this case, we're using the `{amount}` placeholder to add the amount of bits donated. Note that you can also use **any math expression** in here, just like the [execution count](./commands#execution-count) in commands.

The `conditions` let you specify when something will be added to the goal, those will be checked on every Streamlabs event. To filter out only twitch bits events, we're using the **_type** [internal placeholder](./event-types#placeholders-for-every-event-type).

At last, donation goals also support messages, commands and rate limiters (like any action), which will be run when the goal is reached.
To start a goal, run `/streamlabs goal start {goal_type} {amount}` with `goal_type` being the goal type you want to use and `amount` being the actual amount you want to reach (for example 2000 to set a goal at 2000 bits)!