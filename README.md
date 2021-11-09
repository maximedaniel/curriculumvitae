## Open ssh connexion to OVH VPS
0. Open PuTTY on Windows
1. Enter Hostname and Mdp
1. Enter `docker run -p 80:5000 --name curriculumvitae tydius/curriculumvitae`
2. Enter `docker run -d --name ouroboros -v /var/run/docker.sock:/var/run/docker.sock pyouroboros/ouroboros`

## Managing NodeJS version
nvm list
nvm use <v> | nvm install <v>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Run Develop branch

- Open a terminal
- Enter `npm start`

## Add, Commit and Push Develop branch to Master branch

- Open a terminal
- Enter `git add --all`
- Enter `git status`
- Enter `git commit -m '<commit_message>'`
- Enter `git push --force origin develop`, push local DEVELOP branch to remote one
- Enter `git push origin develop:master`, push local DEVELOP branch to remote MASTER branch

## Buid and Deploy Docker Image

- Open Docker
- Open a terminal
- Enter `docker build -t tydius/curriculumvitae:latest .`
- Enter `docker login`
- Enter `docker push tydius/curriculumvitae:latest`
