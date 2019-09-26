# **CODE TEST**

The front end (client) is written with Vue.js and uses the Vuex state manager and TypeScript. The stateless component in the front end is TotalScore.vue which only displays the total score and contains no other logic than displaying information. The backend (server) is written in Node.js with Experss.js and TypeScript. The unit testing framework chosen is Jest, both on the client and the server.

#### Project structure

This sections covers some important folders and files within the project structure that has been added as part of this test.

bowling-calculator-client:

| File/Folder                        | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| src/components/ScoreCardComponents | Components related to and utilized by ScoreCard.vue          |
| src/services/bowlingAPIFetch.ts    | Service for fetching a new bowling scorecard from the server |
| tests/unit/*.spec.ts               | unit tests that check rendering of the ScoreCardComponents and handling of fetched data from the server. |
| tests/unit/\_\_mocks\_\_           | mocked services, in this project we mock calls to axios.get(). |

bowling-calculator-server:

| File/Folder                    | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| src/                           | source folder with all of our typescript files               |
| dist/                          | Production folder with generated javascript code             |
| dist/\_\_tests\_\_             | this folder contains the unit tests that test the varios models and classes. |
| dist/models/frame-model.ts     | contains classes that are used to model a bowling series, manely the frames. Each bowling game consists of 10 frames where frame 1-9 has two rolls and frame 10 has (potentially) three rolls. |
| dist/models/interfaces.ts      | contains all the interfaces used by the server, which includes what format a score card should have and how an error response should be structured. |
| dist/routes                    | This folder contains the Express routers used to setup different API endpoints. Allthough this project only has one. |
| dist/services/bowling-logic.ts | Like the name suggests, this file contains all the bowling-logic, such as validating and calculating the score of a set of rolls. |
| tsconfig.json                  | TypeScript configuration file.                               |
| Dockerfile                     | Setup for launching the server on docker, to do so type the following in the root of the server folder: <br />**docker build -t \<name-of-application\>**  <br />followed by:<br />**docker run -d -p 5000:5000 <name-of-application\>** |
| docker-compose.yml             | Instead of using docker you can use docker-compose to launch the application, the application will then use port 5000. To do so type the following in the root of the server folder:<br />**docker-compose up**<br />to close the application type<br />**docker-compose down** |