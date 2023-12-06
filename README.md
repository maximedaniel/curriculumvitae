# README

## Debugging
- Open a terminal
- Enter `npm start`

## Managing NodeJS version

nvm list
nvm use <v> | nvm install <v>

## Run Develop branch

- Open a terminal
- Enter `git fetch`
- Enter `git checkout develop`
- Enter `git pull`
- Enter `npm start`

## Add, Commit and Push Develop branch to Master branch

- Open a terminal
- Enter `git add *`
- Enter `git status`
- Enter `git commit -m '<commit_message>'`
- Enter `git push`, push local DEVELOP branch to remote one
- Enter `git push origin develop:master`, push local DEVELOP branch to remote MASTER branch

## Build Docker Image
- Open a terminal
- (Optional) Enter `build.bat`
OR
- Open Docker
- Open a terminal
- (Optional) Enter `docker system prune -f`
- Enter `docker build -t tydius/curriculumvitae:latest .`, Dockerfile will run `npm run build`
- Enter `docker run -p 80:5000 -t tydius/curriculumvitae:latest`

## Deploy Docker Image
- Open a terminal
- (Optional) Enter `deploy.bat`
OR
- Open Docker
- Open a terminal
- Enter `docker login`
- Enter `docker push tydius/curriculumvitae:latest`
- (Optional) Enter `docker system prune -f`

## If problem with CI then open ssh connexion to OVH VPS

1. Open PuTTY on Windows
2. Enter Hostname and Mdp
3. Check Watchtower is running this `docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --interval 30`