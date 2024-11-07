# ai-agents-generator-react-component-library

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Running the Application

To start the application, use:

```bash
npm run dev
```

## Database Setup

To run a PostgreSQL database using Docker, execute the following command:

```bash
docker run --name infcom -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
```

This command will create a new PostgreSQL container with the specified user and password.

## Usage

After setting up the database, you can connect your application to it and start using the features provided by the library.
