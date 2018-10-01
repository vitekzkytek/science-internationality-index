#git
sudo apt-get update
sudo apt-get install git-core
git clone XXXXXXXXXXXXX


# PSQL client
sudo apt install postgresql-client-common
sudo apt-get install postgresql-client

#SSH Tunnel to RDS
#cd ~
#mkdir ~/db-admin/
#mkdir ~/db-admin/ssh
wget https://www.dropbox.com/s/owukwkeqjafj3k9/idea-webserver-keypair.pem?dl=1 -O ~/db-admin/ssh/idea-webserver-keypair.pem 
chmod 400 ~/db-admin/ssh/idea-webserver-keypair.pem
ssh -N -L 5432:science-internationality-dbinstance.c3aa5fkeiz2h.us-east-2.rds.amazonaws.com:5432 ubuntu@ec2-18-188-88-0.us-east-2.compute.amazonaws.com -i ~/db-admin/ssh/idea-webserver-keypair.pem

#mc




#DOCKER
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo groupadd docker
sudo usermod -aG docker $USER

#Node.js
sudo apt-get update
sudo apt-get install nodejs


#DOWNLOAD PRISMA CONFIGURATION FILES
#mkdir prisma
#cd prisma
#wget https://www.dropbox.com/s/adacu7bvg5vvma2/datamodel.graphql?dl=1 -O datamodel.graphql
#wget https://www.dropbox.com/s/lo5awr4dwluzjpv/docker-compose.yml?dl=1 -O docker-compose.yml
#wget https://www.dropbox.com/s/udb296avqs8c5c5/prisma.yml?dl=1 -O prisma.yml

#prisma
docker-compose up -d
prisma deploy
prisma generate

