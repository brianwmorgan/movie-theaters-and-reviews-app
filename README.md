# We Love Movies | Application Server

The We Love Movies server is a backend API built with RESTful architecture to handle HTTP requests from the frontend client application, which was designed by Thinkful. The server allows a user to look up movies, theaters, and reviews from the client app. It also allows an admin to update and delete reviews.  

## Links

[Server](https://movies-theaters-and-reviews-server.onrender.com/movies) deployed to Render (use the `/movies`, `/theaters`, or `/reviews` routes listed below)  
[Client App](https://we-love-movies-app-front-end.vercel.app/) designed by [Thinkful](https://github.com/Thinkful-Ed/starter-movie-front-end)  

## Technology

- JavaScript, Node.js, Express, PostgreSQL, Knex  
  
![Javascript icon](images/javascript.png)
![Node.js icon](images/node-js.png)
![Express icon](images/express.png)
![PostgreSQL icon](images/postgresql.png)
![Knex icon](images/knex.png)  
  
## Installation

### Server

1. Fork and clone this repository.
1. Run `npm install` to install project dependencies.
1. Run `npm start` to start the server locally.  

### Client Application

1. Go to Thinkful's [starter code on GitHub](https://github.com/Thinkful-Ed/starter-movie-front-end).
1. Fork and clone the repository.
1. Run `npm install` to install project dependencies.
1. Run `npm start' to start the client app locally.

## Backend API

### Routes

The API allows for the following routes:

Method | Route | Description
 -|-|-
| `GET` | `/movies` | Lists all movies.
| `GET` | `/movies/:movieId` | Reads a specific movie by `movie_id`.
| `GET` | `/movies/:movieId/theaters` | Lists all theaters that are playing a specific movie.
| `GET` | `/movies/:movieId/reviews` | Lists all reviews for a specific movie.
| `GET` | `/theaters` | Lists all theaters.
| `GET` | `/reviews` | Lists all reviews.
| `PUT` | `/reviews/:reviewId` | Updates a specific review by `review_id`.
| `DELETE` | `/reviews/:reviewId` | Deletes a specific review by `review_id`.

### HTTP Methods

| Route       | Get         | Put        | Delete       |      
| ----------- | ----------- | ---------- | ------------ |
| ```/movies```      | ✅      |❌      |       ❌       |
| ```/movies/:movieId```   | ✅        | ❌         | ❌         |
| ```/movies/:movieId/theaters```      |✅      | ❌    |       ❌       |
| ```/movies/:movieId/reviews```   | ✅        | ❌       | ❌         |
| ```/theaters```   | ✅        | ❌       | ❌         |
| ```/reviews```   | ✅       | ❌         | ❌         |
| ```/reviews/:reviewId```   | ❌       | ✅         | ✅         |

