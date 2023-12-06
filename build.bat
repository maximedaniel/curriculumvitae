docker system prune -f
docker build -t tydius/curriculumvitae:latest .
docker run -p 80:5000 -t tydius/curriculumvitae:latest