# README

## Buid and Deploy Docker Image

- Open Docker
- Open a terminal
- Enter `docker build -t tydius/courses:latest .`
- Enter `SET SHINY_APP_PATH="/C/Users/maxd5/OneDrive/Documents/curriculumvitae/courses/zotero/app/"`
- Enter `SET SHINY_LOG_PATH="/C/Users/maxd5/OneDrive/Documents/curriculumvitae/courses/zotero/log/"`
- Enter `docker run -d -p 8080:3838 -v %SHINY_APP_PATH%:/srv/shiny-server/ -v %SHINY_LOG_PATH%:/var/log/shiny-server/ tydius/courses:latest`
