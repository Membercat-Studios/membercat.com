# membercat.com

A high quality website built all for Membercat Studios.

## Stack

-   Frontend
    -   React
    -   TailwindCSS
    -   Inertia.js
-   Backend
    -   Laravel
-   Database
    -   SQLite

## Prerequisites

-   Node.js v18+
-   PHP v8.1+
-   Composer
-   Web Server (Apache, Nginx, etc.)

## Development Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/Membercat-Studios/membercat.com.git
    cd membercat
    ```

2. Install dependencies:

    ```sh
    composer install
    npm install
    ```

3. Copy the example environment file and configure it:

    ```sh
    cp .env.example .env
    ```

4. Generate an application key:

    ```sh
    php artisan key:generate
    ```

5. Run the development server:
    ```sh
    php artisan serve
    npm run dev
    ```
