---
title: Event Types and Placeholders
description: An introduction to placeholders and available event types
position: 2
slug: event-types
---

This page will give you detailed information about all of the available event types. Event types are specified in the `action` field of any action and determine which Streamlabs event (for example gifted youtube memberships or a twitch donation) will trigger that action:
```yaml
  example_reward:
    enabled: true
    action: (Event type)
    ...
```

## Placeholders
Depending on the event type, you can use different **placeholders** in the rest of the action configuration. Those placeholders include things like the donated amount of money, donation message and the donator. Placeholders are always written in this format:
```yaml
"Normal text with a {placeholder}"
```
The `{placeholder}` gets entirely replaced by the value of that placeholder at the time of action execution.
Note that [**PlaceholderAPI placeholders**](https://github.com/PlaceholderAPI/PlaceholderAPI) are also supported in all places where Streamlabs placeholders can be used!

### Placeholders for every event type
The following placeholders are available on every event:
- **user**: The user related to the event

There are some placeholders that are considered to be **internal**, meaning they contain information related to how the plugin processed the event instead of information about the actual event. Those placeholders start with an underscore and can be seen in `/test` autocompletion when you start to type a placeholder beginning with an underscore. Internal placeholders can be used to determine things like the event type or current action, which can be useful in cases where that information is lost (custom placeholders, rate limiters). The following internal placeholders are usable:
- **_type**: The ID of the current streamlabs event.
- **_api_type**: The Streamlabs ID of the current event (only used in the Streamlabs API)
- **_action**: The ID of the current action, if available
- **_platform**: The platform on which the current event occured (either "streamlabs", "youtube" or "twitch")
- **_pl_count**: How many placeholders currently exist within this event
- **_pl_count_event**: How many placeholders currently exist within this event (excluding custom placeholders)

## Available Event Types

### streamlabs_donation
Triggered when someone donates money through **Streamlabs tipping**. This event type also works as a base for every other donation event, `amount` and `amount_double` have a different meaning depending on the event, `amount_formatted` will be empty in some cases, `currency` can either be a real currency, or something like "Bits" in other events.

**Placeholders**
- **amount**: The amount of money donated, without the decimal point (for example 2, 6, 10, 100, 10000)
- **amount_double**: The amount of money donated with the decimal point (for example 2.5, 6, 10, 100.7, 10000.54)
- **amount_formatted**: The amount of money, formatted with the currency (for example $20.4, 20.4€)
- **currency**: The currency of the donation (for example USD or EUR, for a full list, take a look at the [Streamlabs API Documentation](https://dev.streamlabs.com/docs/currency-codes))
- **message**: The message sent with the donation, if no such message exists, it stays empty.

### twitch_bits
Triggered when someone cheers with **Twitch Bits**.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the amount of twitch bits donated.*

### twitch_follow
Triggered when someone **follows** on twitch.

### twitch_host
No clear documentation is available on this, seems to be similar or related to **Twitch Raids**.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the amount viewers.*

### twitch_raid
Triggered when someone **raids** the twitch stream.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the amount of raiders.*

### twitch_subscription
Triggered when someone **subscribes** on twitch.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the tier of subscription chosen by the user.*
- **months**: How many months of subscription this user already has
- **months_streak**: How many months this user has been subscribed for since the last time of not being subscribed
- **sub_type**: Either **sub** for a normal subscription or **resub** for a renewed subscription
- **sub_plan**: The name of the chosen subscription plan/tier

### youtube_subscription
Triggered when someone **subscribes** on youtube *(this is NOT the membership event)*.

### youtube_gift_memberships
Triggered when someone **gifts memberships** on youtube.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the amount of memberships gifted.*
- **tier**: The tier of membership gifted
- **tier_name**: The name of the gifted membership tier


### youtube_receive_membership
Triggered when someone **receives** a gifted membership on youtube.

**Placeholders**
- **tier**: The tier of membership received
- **tier_name**: The name of the gifted membership tier
- **gifter**: The person who gifted this membership to the user

### youtube_membership
Triggered when someone buys a **Youtube Membership**.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type, with `amount` being the membership tier the user bought.*
- **tier_name**: The name of the membership tier bought
- **months**: How many months of membership this user already has
- **first_membership_date**: The date and time of the first membership bought by this user

### youtube_superchat
Triggered when someone sends a **Youtube Superchat**.

**Placeholders**
- *All placeholders from the `streamlabs_donation` event type.*