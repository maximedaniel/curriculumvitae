# README

## Debug Docker Image locally
- Open Docker
- Open a terminal
- (Optional) Enter `docker system prune -f`
- Enter `docker build -t tydius/courses:latest .`
- Enter `SET SHINY_APP_PATH="/C/Users/m.daniel/workspace/curriculumvitae/courses/zotero/app" && SET SHINY_LOG_PATH="/C/Users/m.daniel/workspace/curriculumvitae/courses/zotero/app/zotero/log"`
- Enter `docker run -d -p 8080:3838 -v %SHINY_APP_PATH%:/srv/shiny-server/ -v %SHINY_LOG_PATH%:/var/log/shiny-server/ tydius/courses:latest`

## Buid and Deploy Docker Image

- Open Docker
- Open a terminal
- Enter `docker build -t tydius/courses:latest .`
- Enter `docker run -d -p 8080:3838 tydius/courses:latest`
