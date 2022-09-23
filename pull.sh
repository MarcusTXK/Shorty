#!/bin/bash
cd /home/shorty/url-shortener
sudo git pull origin staging
sudo docker-compose up -d