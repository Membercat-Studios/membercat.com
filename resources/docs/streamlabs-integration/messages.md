---
title: Messages
description: Display messages in chat and show titles
position: 4
slug: messages
---

The `messages` section of any action can be used to send messages in chat or as a title. Note that those messages will only be seen by players in the `affected_players` list in the configuration.

## Example Configuration
```yaml
actions:
  example_reward:
    ...
    messages:
      - "[message]{user} donated {amount_formatted}!"
      - "[message_centered]<aqua><purple><b>==></b></purple> {message} <purple><b><==</b></purple>
      - "[title]<red>New Donation!"
      - "[subtitle]<green>{user} <gold>donated <red>{amount_formatted}</red>!"
```
This example configuration will send a message in chat informing about the donation with the donator's message and show a title for affected players saying "New Donation!" and showing the donated amount.

## Message Types
Message types are determined by the name in square brackets at the start of the line. If those are left out, the plugin will use the default (currently `message`). The following message types are currently supported:
- **Chat messages** (`message`): Sends the specified message in chat
- **Centered chat messages** (`message_centered`): Sends the specified message in chat and automatically centers it *([@Mazurex](https://github.com/Mazurex) reminded me that the plugin obviously needed this functionallity)*
- **Title messages** (`title`): Shows a title with the specified message, usually used together with `subtitle`
- **Subtitle messages** (`subtitle`): Sets the subtitle of the current title to the given text

## Placeholders, Colors and Formatting
Any placeholder supported by the event type of the current action can be used in a message, be aware that misspelling them will show the placeholder instead of the actual value.

For colors and formatting, you should be using [MiniMessage Tags](https://docs.advntr.dev/minimessage), which are a great and modern way to format text in minecraft. You might also be farmiliar with the common &-based formatting system (for example `&c` for **red**), which is still supported in the plugin, but should not be used since it's obsolete and you won't be able to use MiniMessage in a message together with &-based formatting.