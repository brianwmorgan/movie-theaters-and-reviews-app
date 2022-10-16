# We Love Movies | Application Server

We Love Movies is a full-stack application that allows a user to look up movies, theaters, and reviews. It also allows an admin to edit content. The frontend was designed by Thinkful. I designed the backend server with a RESTful architecture to handle all HTTP requests made by the frontend.

## Links

[Backend](https://welovemovies-backend-brian.herokuapp.com/movies) deployed to Heroku (use `/reserva` or `/tabl` routes listed below)

## Technology

- JavaScript, Node.js, Express, Knex  
  
![Javascript icon](images/javascript.png)
![Node.js icon](images/node-js.png)
![Express icon](images/express.png)
![Knex icon](images/knex.png)  
  
## Installation

### Backend

1. Fork and clone this repository.
1. Run `npm install` to install project dependencies.
1. Run `npm start` to start the server locally.  

### Frontend

1. Go to Thinkful's [starter code on GitHub](https://github.com/Thinkful-Ed/starter-movie-front-end).
1. Fork and clone the repository.
1. Run `npm install` to install project dependencies.
1. Run `npm start' to start the client app locally.

## Backend

### Routes

The API allows for the following routes:

Method | Route | Description
 -|-|-
| `GET` | `/reservations` | Lists all reservations for the current date.
| `GET` | `/reservations?date=YYYY-MM-DD` | Lists all reservations on the query date.
| `POST` | `/reservations` | Creates a new reservation. No `reservation_id` or `status` need to be provided. All other fields are required.
| `GET` | `/reservations/:reservation_id` | Reads a specific reservation by `reservation_id`.
| `PUT` | `/reservations/:reservation_id` | Updates a specific reservation by `reservation_id`.
| `PUT` | `/reservations/:reservation_id/status` | Updates the status of a specific reservation by `reservation_id`.
| `GET` | `/tables` | Lists all tables.
| `POST` | `/tables` | Creates a new table. Only `table_name` and `capacity` need to be provided.
| `PUT` | `/tables/:table_id/seat` | Assigns a table to a reservation and changes that reservation's `status` to _seated_.
| `DELETE` | `/tables/:table_id/seat` | Removes a reservation from a table and changes that reservation's `status` to _finished_.

### HTTP Methods

| Route       | Get         | Put        | Post         | Delete       |      
| ----------- | ----------- | ---------- | ------------ | ------------ |
| ```/reservations```      | ✅      |❌      | ✅    |       ❌       |
| ```/reservations/:reservation_id```   | ✅        | ✅       | ❌         | ❌         |
| ```/reservations/:reservation_id/status```      | ❌      |✅      | ❌    |       ❌       |
| ```/tables```   | ✅        | ❌       | ✅         | ❌         |
| ```/tables/:table_id```   | ✅        | ❌       | ❌         | ❌         |
| ```/tables/:table_id/seat```   | ❌        | ✅       | ❌         | ✅         |
