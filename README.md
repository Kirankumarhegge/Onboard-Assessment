# Onboard Assess with Auth Flow

## Description
Onboard Assess is an assessment platform where users sign up with a unique name and password. The assessment consists of single and multiple-choice questions. Sub-questions are dynamically displayed based on the user's answers to the main questions. For example, the first question is "Do you exercise?" with two options: Yes or No. If the user answers "Yes", a sub-question is displayed. If the user answers "No", the sub-question is skipped, and the user is moved to the next main question.

All answers are saved in the database, and users can navigate back to previous screens to view their answers. If a user navigates back from the third question to the second question (a child question), the backend checks if the conditions from the first question match before showing the second question. If not, the user is redirected to the first question. Upon signup, an access token is issued and validated with all subsequent APIs. If the token is missing or invalid, the user is redirected to an error page.

## Table of Contents
1. [Video](#screenshots-and-video)
2. [Technologies](#technologies)
3. [File Setup](#file-setup)
4. [How to use](#How-to-use)

## Screenshots and Video

https://github.com/user-attachments/assets/c0795493-9811-49db-a771-880550018a9e



## Technologies

### Frontend:
1. **React.js**: Used for building the dynamic user interface.
2. **Tailwind CSS**: Applied for styling the components to ensure a responsive and modern design.
3. **React Router DOM**: Implemented to handle routing within the application.
4. **States and useEffect**: Utilized for managing application state and side effects during component lifecycle.
5. **Axios**: Used for making API requests to the backend, handling HTTP methods like GET and POST.

### Backend:
1. **Node.js**: Server-side runtime environment for executing JavaScript code outside of the browser.
2. **MongoDB**: NoSQL database used for storing user answers and assessment data.
3. **Axios**: Also used here for making HTTP requests from the backend.
4. **Express.js**: Lightweight framework for managing routing, middleware, and handling HTTP requests/responses.

## File Setup

### Frontend:
- **App.jsx**: This file maintains the routing logic for the application.
- **Component files**: Used to ensure reusability and separation of concerns, allowing modular and efficient code structure.
```
-- client
   /src
     -- App.jsx
   /components
     -- Welcome.jsx
     -- Signup.jsx
     -- OnBoardAssess.jsx
     -- ErrorComponent.jsx
     -- AssessmentCompleted.jsx
```



### Backend:
- **index.js**: This is the main entry point where the server is created, database connections are initialized, CORS (Cross-Origin Resource Sharing) is enabled, and routes are set up.
- **Controllers**: Responsible for handling the logic and functionality of each endpoint.
- **Routes**: Defines the API paths and connects them with appropriate controller functions.
- **Models**: MongoDB schema definitions for storing and managing data in the database.
```
-- server
   -- index.js
   /config
     -- db.js
   /controllers
     -- assessControllers.js
     -- userControllers.js
   /model
     -- user.js
     -- onboard.js
   /routes
     -- userRoutes.js
     -- assessRoutes.js
```


## How to use
To clone and run this application you will need Git and Node.js (which comes with npm) installed on your computer.


Clone this Repository
```
$ git clone
```

Open Terminal

```
Terminal 1
$ cd server
$ npm i
```

To run backend
```
$ npm start
```


Open another terminal
```
Terminal 2
$ cd client
$ npm i
```

To run frontend
```
$ npm run dev
```
Create a file named .env and replace to your telegram bot token and db string
```
DATABASE_URL = 'MONGO_DB_CONNECTION_URL'
JWT_SECRET = "ANY_RANDOM_CHARACTERS";
```
