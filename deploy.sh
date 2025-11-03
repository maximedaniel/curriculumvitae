

#!/bin/bash
virtual_host="www.maximedaniel.me"
user_machine="root@82.64.250.105"


echo "Building quarto website..."
quarto render


echo "Removing remote directory..."

ssh $user_machine << EOF
mkdir /root/docker/cv
cd  /root/docker/cv
docker rm -f cv
rm -r *
EOF


echo "Zipping and sending local directory..."

tar -czvf cv.tar.gz _site Dockerfile
scp cv.tar.gz $user_machine:/root/docker/cv/cv.tar.gz
rm cv.tar.gz

echo "Building and runing remote directory..."

ssh $user_machine << EOF
cd /root/docker/cv
tar -xzvf cv.tar.gz
rm cv.tar.gz
docker build --no-cache -t cv .
docker run -d --name cv -p 5000:5000 -t cv
EOF




