---
title: Configuration and Issues
description: An introduction to the plugin's configuration structure and issue system
position: 3
slug: configuration
---

This page will explain the function of basic configuration elements, such as the `streamlabs` section, `affected_players` and how to read and fix issues in your config. Other topics covering how to use more complex parts of the config (such as actions, custom placeholders, etc.) have thier own wiki pages where you can find detailed guides on how to use them.

## The Streamlabs section
The first section of the config, named `streamlabs` is used to configure basic settings, such as the socket token.
```yaml
streamlabs:
  socket_token: iNSerTyoUrTokeNheRe123456789 # The token used to connect to the streamlabs server
  show_status_messages: true # Whether the plugin should display stauts messages, such as "Lost connection to the server" in chat
  auto_connect: true # If disabled, the plugin will not try to connect at startup or when using /streamlabs reload (the latter only applies if no connection is currently established)
```
The socket token works similar to a password and username, allowing the plugin to access your streamlabs account and receive events from your it. *(The socket token only allows clients to **receive** events from your account, it is not able to modify your stream/account in any way, which differenciates it from the API access token!)*

`send_status_messages` will determine whether status messages get sent, note that those will only be sent to players with the `streamlabs.status` permission.

## Affected players
The `affected_players` list contains usernames of players who will receive messages sent by actions and who will be listed in the [`{player}` placeholder in commands](./commands#placeholders-and-affected-players).
Affected players can also be modified directly by `/streamlabs player add/remove {player}` without having to reload the config.

# Configuration Issues
If something goes wrong in your config, the plugin won't just scream at you and refuse to load the config, but instead try to keep loading it and afterwards show a detailed explanation of what went wrong to you. This explanation takes the form of **Config Issues**.

![A screenshot with a bunch of configuration issues](https://github.com/user-attachments/assets/d2d435b9-6d6a-4b39-96c0-6b00537c6566)

## Issue Levels
Config issues will be shown in a list like this every time you reload and issues were detected in your config. A config issue is split up into multiple parts, starting with the **issue level**.

Issues with the **HINT** level are small hints that could be problems, but not neccessarily, and are mostly in place to detect smaller issues like a missing bracket somewhere.

If an issue has the **WARNING** level, it indicates that something failed to load completely, or is clearly incorrect and should be fixed immediately.

The **ERROR** level is the highest level available, and indicates some kind of internal error in the plugin or a failure to load the configuration file alltogehter. Internal errors often have an **exception message** / **stack trace** in the console associated with them, which should be reported on [the issues page](https://github.com/Membercat-Studios/Streamlabs-Integration/issues). Please DO NOT report ERROR level warnings related to yaml errors in your config, as those are caused by formatting/syntax errors in your file and are not related to any internal errors!

## Config Paths
Any found issue will read something like `[LEVEL/... at /a/lot/of/slashes]:`. The part after the "at" is the path the issue is located at. You can trace this down in your yaml config to find the exact element causing the issue:
```yaml
custom_placeholders:
  test:
    default_value: 'false'
    'true':
      conditions:
        - '{user}=codingcat'
        - mode: OR
          conditions:
            - '{message}cat'
            - '{message}=kitty'
```
Let's say we have this *very realistic* scenario of our custom placeholder `test`, which is supposed to check for codingcat ~(wow that's me)~ sending either "cat" or "kitty" as a message. But oh no, we're somehow missing the operator in the 1st condition down there! Well no problem, the plugin has detected that for us, and sent an issue. Now how do we actually find the faulty condition? We can see that our issue path is `/custom_placeholders/test/true/conditions/1/conditions/0`.

So lets take a look into the `custom_placeholders` field, in the `test` placeholder's value `true`, and take a look at the 2nd element of the `conditions`. Note that element counting starts with 0, so `/conditions/1` is actually referring to the 2nd element in the list. If we now take a look at the `conditions` of that nested group, we can see that the condition missing an operator is the 1st one (`/conditions/0`). If you're seeing the issues through in-game chat, you can also hover over the path to get more details on what type certain elements are.

## Issue Grouping
If you have **a lot** of issues, or even a lot of instances of the same issue, the plugin will group them together in order to keep the output easy to read. For example, let's say you really don't like MiniMessage for some reason:

![A screenshot of 25 grouped issues](https://github.com/user-attachments/assets/cb89b64b-a13b-48ab-97a8-b59d7b96f123)

The `x25` in front of the issue indicated that there are 25 issues of that type, and all of them have been grouped together into one. As a result of that, the path is no longer visible, since there are 25 of them. Now, you obviously need the paths to actually fix the issues, so to actually get a list of every issue without any grouping, you can click *"show the issues in console"*, which will display a full, unfiltered list in your server's console. Note that if you have a lot of different issues, the plugin will cut off some of them and also give you the option to view all of them in the console.

## Suppressing Issues
A kind of annoying **issue** with this entire system ~(no pun intended)~, especially with HINTs is that they could trigger if you did something that set them off, but whatever you did doesn't actually affect your config negatively. If that's the case, you'd be stuck with the plugin complaining about "that one missing bracket" everytime when reloading. This is why **issue suppresing** exists. Basically, by adding `__suppress: []` to any section of the config, you can suppress a specific issue in all of the sub-elements of that section.

### Issue IDs
Now how does the plugin actually know what issues you're trying to suppress? Remember that strange text next to the issue level I haven't talked about at all (for example `HINT/HB0`)? That is called an **issue ID**. They are used to identify a specific issue and can also be used to **suppress** that specific issue in your config.

Now let's actually suppress some issues. Let's say we have this piece of configuration causing an issue since we're missing a second bracket:
```yaml
actions:
  test:
    enabled: true
    action: twitch_follow
    messages:
      - '[ message with an open bracket'
```
But our intention here is actually to have a message starting with an open bracket instead of using the brackets to specify a message type.
To suppress the bracket issue, we need to put `__suppress: ["HB0"]` somewhere (HB0 being the ID of that hint we're trying to suppress). Now we could just put it in the top layer of the file, right next to actions like this:
```yaml
__suppress: ["HB0"]
actions:
  ...
```
But there's one issue with that, since we now suppressed HB0 at the top level of our file, ALL elements in the config are not going to cause this issue. This means that, if we actually miss a bracket in some other place where it was supposed to be used for a message type, the plugin wouldn't inform us.
That is why we should put the suppress property in our `test` action instead, where it will only affect that one action.
```yaml
actions:
  test:
    __suppress: ["HB0"]
   ...
```
Now, we'll only have the issue suppressed in that action, and it will still work in every other place in the config. Globally suppressing an issue (putting the suppress property at the top level of your file) can sometimes be useful, for example if you have an issue you don't want all over your config, but if that's not the case, you should always put `__suppress` as low as possible. Note that you can't put suppress in lists like the `actions` list, or the `custom_placeholders` list, since the plugin will think you're trying to create an action/placeholder with the name "__suppress".