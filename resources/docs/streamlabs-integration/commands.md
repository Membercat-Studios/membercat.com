---
title: Commands
description: Run any minecraft command based on event placeholders
position: 5
slug: commands
---

The plugin is able to execute any minecraft or plugin command when an action gets triggered. For example, a donation could give the streamer some diamonds or spawn a bunch of zombies with the donator's name!

## Example Configuration
```yaml
actions:
  example_reward:
    ...
    commands:
      - "give @a diamond {amount}"
      - "effect give {player} regeneration 4 6"
      - "[{amount}/10]execute at {player} run summon zombie ~ ~ ~ {CustomName:'[{\"text\":\"{user}\"}]'}"
```
This example configuration will give everyone in the server the donated amount of money as minecraft diamonds, give the streamer the regeneration effect for a bit and spawn **the amount of donated money divided by ten** zombies with the donator's name. *I bet I'll never see a sentence like that again...*

## Placeholders and Affected Players
Any placeholder supported by the event type of the current action can be used in any of the commands, using a non-existent placeholder or misspelling it will just use the placeholder instead of the actual value in the command. In additon to normal placeholders, commands also support a special `{player}` placeholder. If any command contains this placeholder, it will be executed for every player in the `affected_players` configuration, replacing the placeholder with the name of each player.

This can be useful if commands should only be executed for a specific player (for example, the streamer) or a specific group of players, without having to repeat the command for every player. The `affected_players` configuration can also be changed using the `/streamlabs player` sub-command for easy access (no need to reload the config afterwards).

## Execution Count
Another feature to avoid repeating commands and allow command execution to be even more placeholder-driven are **Execution Counts**, which determine how often a command will be executed. If a command with an execution count set contains a `{player}` placeholder, it will be executed that many times for every player in the `affected_players` configuration.

### Format
Execution counts are defined in two square brackets in front of the entire command, make sure **not to put a space between the execution amount and the command**!
```yaml
commands:
  - "[10]msg @a hello"
  - "[{amount}]execute at {player} run summon bee"
  - "[{amount}/10]execute at {player} run summon bee"
```
The brackets can contain any combination of numbers, placeholders and math expressions. This allows for commands to be ran exactly 10 times, times the amount of donated money or times the amount of donated money divided by ten, as shown in the example above. Note that more complex math expressions are also supported.