# README

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

## Buid and Deploy Docker Image

- Open Docker
- Open a terminal
- Enter `docker build -t tydius/curriculumvitae:latest .`, Dockerfile will run `npm run build`
- Enter `docker login`
- Enter `docker push tydius/curriculumvitae:latest`

## If problem with CI then open ssh connexion to OVH VPS

1. Open PuTTY on Windows
2. Enter Hostname and Mdp
3. Enter `docker run -p 80:5000 --name curriculumvitae tydius/curriculumvitae`
4. Enter `docker run -d --name ouroboros -v /var/run/docker.sock:/var/run/docker.sock pyouroboros/ouroboros`
