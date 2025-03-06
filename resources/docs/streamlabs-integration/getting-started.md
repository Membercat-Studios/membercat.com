---
title: Getting Started
description: A quick guide on how to setup a connection to streamlabs
position: 0
slug: getting-started
---

Welcome to the documentation, you can find a quick guide on basic setup and commands below.

After setting up the plugin, you should take a look at some [basic terminology](https://github.com/Membercat-Studios/Streamlabs-Integration/wiki/Basic-Terminology), and then continue reading from there.

---
## Obtaining your Streamlabs socket token
1. Go to your Streamlabs dashboard. Once there, click on your profile icon in the top right and select **Account Settings**
2. Next up, click on **API Settings** and copy your **Socket API Token**
3. After that, open up the plugin's `config.yml` and paste your socket token into the `socket_token` field
4. Enter `/streamlabs reload` ingame or in your server's console and wait for the plugin to connect

![Image showing the location of the Account Settings option](https://github.com/user-attachments/assets/d3c0c15f-0794-42c8-bdec-3acd9149472f)
![Image showing the location of the API Token](https://github.com/user-attachments/assets/7aa234bb-3401-45ed-9434-164781d35e2e)

# Commands
The plugin can be controlled using the `/streamlabs` command, which is available to every player with the `streamlabs.admin` permission.
The following sub-commands can be used:
- `/streamlabs reload (noreconnect)`: Reloads the configuration, applys changes and shows issues if any were found. By default, the command also reconnects to the Streamlabs server to make sure changed token settings are applied, however this can be disabled by using the `noreconnect` argument.
- `/streamlabs status`: Reports the status of the connection to the Streamlabs server
- `/streamlabs connect`: Attempts to connect to the Streamlabs server if not already connected
- `/streamlabs disconnect`: Manually disconnects from the server if connected
- `/streamlabs player add {name}`: Adds a player to the `affected_players` field in the config
- `/streamlabs player remove {name}`: Removes a player from the `affected_players` field
- `/streamlabs test {event_type} (bypassratelimiters) [placeholder=value]...`: Triggers the given event type, optionally bypassing rate limiters and using the placeholder values you specified. You should definitely use this command to test your config before using it live on stream!
- `/streamlabs ratelimiters reset`: Resets all of the **rate limiters** in your configuration
- `/streamlabs goal start {type} {amount}`: Starts a new **goal** of the given type, using the given amount
- `/streamlabs goal stop`: Tries to **stop** the currently active goal, freezing it in place
- `/streamlabs goal remove`: Tries to **remove** the currently active goal, completely deleting it