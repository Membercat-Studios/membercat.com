---
title: Rate Limiters
description: Prevent your viewers from spamming certain actions
position: 7
slug: rate-limiters
---

Rate limiters can be used to prevent users from spamming certain donations, or make an action only excecute once for each user.
A rate limiter has a **value** which is used to specify what exactly should be used to limit access. For example, using `{user}` will limit access for each user individually, while putting "" (nothing) will limit access for everyone.

## Rate Limiter types
There are different types of rate limiters, all have with functionality. Currently, the following types of rate limiters exist:
- **once**: Only allows the value to be used once, and rejects any attempts of triggering the action with that value more that one time.
- **interval**: Limits the value to be used once in the gived interval. The interval can be defined using the `interval` parameter (in seconds), and `reset_while_pending` specifies whether the timer will be reset to 0 if the value is reused while the timer is still running.

## State retention
Rate limiters will only retain thier state as long as the plugin is active. Restarting the server will clear all of those states, so for example users who have been blocked before will get access to actions again.

## Examples
```yaml
actions:
  spammed_action:
    ...
     rate_limiter:
       type: once
       value: '{user}'  
```
This example rate limiter will only execute this action **once** for every user, meaning they won't ever be able to execute it again.

```yaml
actions:
  interval_action:
    ...
     rate_limiter:
       type: interval
       value: ''
       interval: 300
```
This rate limiter will only allow the action to get triggered every 5 minutes (= 300 seconds), regardless of the user triggering it.