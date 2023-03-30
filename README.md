# PZ-server-webpage
PZ-server-webpage is a project aimed at providing a user-friendly web interface for managing Project Zomboid (PZ) servers. The project consists of a frontend and a backend, both of which are actively being developed.

## Tags
project, web-interface, React.js, Node.js, Python, REST API

## Frontend
The frontend of PZ-server-webpage is built using React.js, a popular JavaScript library for building user interfaces. It uses various React components and Material-UI, a React UI framework, to build a clean and intuitive user interface that is easy to navigate and use.

One of the key features of the frontend is its use of real-time communication with the backend using the Socket.IO library. This allows the frontend to display real-time updates to the user, without the need for refreshing the page.

Another important feature of the frontend is its use of forms to allow users to modify the configuration of the PZ-server. The frontend uses a combination of built-in HTML form elements and custom React components to build a clean and intuitive interface for modifying the configuration. The changes made by the user are communicated to the backend using HTTP requests sent to the API provided by the backend.

## Backend
The backend of PZ-server-webpage is built using Python and a multithreaded Node.js Express server. It is responsible for managing the state of the PZ-server, including the configuration and map layout. The backend provides a REST API that is used by the frontend to communicate changes made to the configuration and receive updates on the state of the server.

## Future Plans
In the future, the developer plans to implement RCON to send commands to the server. Once that is implemented, they would like to have a player list and a method to perform quick actions such as giving an item or XP. Another feature they would like to implement down the road is a way to parse the map bin files and render the current map to the webpage, along with commands for precise vehicle spawning and teleportation. They also plan to add authentication for server hosts and users.

## Limitations
The developer has noted that being lightweight and performant is of utmost importance for this application since it is intended for server owners. They have not encountered any issues or limitations with the project currently.
