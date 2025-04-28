# HAUPCar Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## First Step
Create a database and name it anything you want.

## Second Step
<!-- change data in backend -->
Update the information in backend at `db.js` file:  
Fill in the following data:
  - `host`: "localhost" <br>
  - `user`: "your database username" <br>
  - `password`: "your database username" <br>
  - `database`: "your database name" <br>
  - `port`: your database port <br>

Then save the file.

## Third Step

Open a terminal, navigate to the `haupcar` directory, then to the `backend` directory:

run
### `cd haupcar`
and run
### `cd backend`

Then run:
### `npm run dev`
to launch the backend server.
It will automatically create the cars table if it does not already exist.

## Fourth Step
Open another terminal, navigate to the `haupcar`
thenrun
### `cd haupcar`
and run
### `npm run start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# In Websit
## Car List Page (Landing Page)
This page shows the list of cars and includes an "Add New Car" button.
If the database contains data, it will display here with Edit and Delete buttons.
- The Add button redirects to the Create page.
- The Edit button redirects to the Update page.
- The Delete button removes the data from the database.

## Add Car Page
Users can add a new car to the website.

## Edit/Update Car Page
Users can edit or update an existing car on the website.

 
