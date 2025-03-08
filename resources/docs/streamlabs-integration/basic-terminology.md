---
title: Basic Terminology
description: A quick introduction to the plugin's architecture
position: 1
slug: basic-terminology
---

To start off, let's quickly define some of the basic terms we're going to be using when talking about the plugin.

When someone donates, a [**Streamlabs event**](./event-types) is going to be sent from the server over the API to the plugin. You'll have certain **actions** configured to [show **messages**](./messages) to the player and [execute some **commands**](./commands). An action can only respond to one event at a time, and can have certain [**conditions**](./conditions), limiting when the action will be excuted based on data from the event. To prevent players spamming your actions, you might want to add a few [**rate limiters**](./rate-limiters) as well and to make your stream a bit more exciting, you could also add some [**donation goals**](./goals). While doing all of that, you should definitely check out how to use the [**configuration system**](./configuration).

Here's a fancy graph showing how all of those terms relate to eachother ~(yes I know it's misaligned)~:

![A diagram showing the relations between the terms explained](https://github.com/user-attachments/assets/151f131e-0921-47e8-9861-f217d0cc03f8)