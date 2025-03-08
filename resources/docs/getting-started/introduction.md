---
title: Introduction
description: Get started with our platform
position: 1
slug: introduction
---

# Welcome to Membercat Studios

Welcome to our documentation! Here you'll find comprehensive guides and documentation to help you start working with our projects as quickly as possible.

## Getting Started

Our platform offers several key features to help you build amazing Minecraft experiences:

-   **Project Management**: Easily manage your Minecraft projects
-   **Version Control**: Keep track of all your changes
-   **Collaboration Tools**: Work together with your team

## Quick Start Guide

1. **Install Dependencies**

    ```bash
    npm install membercat-sdk
    ```

2. **Configure Your Project**

    ```json
    {
        "name": "my-awesome-project",
        "version": "1.0.0",
        "membercat": {
            "projectId": "your-project-id"
        }
    }
    ```

3. **Start Building!**

    ```java
    import com.membercat.sdk.Project;

    public class MyAwesomeProject {
        public static void main(String[] args) {
            Project project = new Project("your-project-id");
            project.initialize();
        }
    }
    ```

## Need Help?

If you need assistance, you can:

-   Join our [Discord](https://dc.kasai.gg) community
-   Check out our [GitHub](https://github.com/membercat-studios) repositories
-   Browse our [Modrinth](https://modrinth.com/organization/membercat) projects

> **Tip**: Make sure to check our [FAQ](/docs/getting-started/faq) section for common questions and answers.

---

Ready to get started? Check out our [Project Setup](/docs/getting-started/project-setup) guide!
