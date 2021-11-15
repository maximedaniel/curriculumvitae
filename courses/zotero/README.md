# README

## Buid and Deploy Docker Image

- Open Docker
- Open a terminal
- Enter `docker build -t tydius/zotero:latest .`
- Enter `docker login`
 `SET SHINY_APP_PATH="/C/Users/m.daniel/workspace/curriculumvitae/courses/zotero/app/"`
 `SET SHINY_LOG_PATH="/C/Users/m.daniel/workspace/curriculumvitae/courses/zotero/log/"`
- Enter `docker run -d -p 8080:3838 -v %SHINY_APP_PATH%:/srv/shiny-server/ -v %SHINY_LOG_PATH%:/var/log/shiny-server/ rocker/shiny:4.1.2`
