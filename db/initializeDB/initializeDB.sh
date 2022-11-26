#!/bin/bash

mongoimport -h localhost:27017 -d CanYouCookIt -c recipes --jsonArray --drop ./db/initializeDB/recipes.json
mongoimport -h localhost:27017 -d CanYouCookIt -c myrecipes --jsonArray --drop ./db/initializeDB/myrecipes.json
mongoimport -h localhost:27017 -d CanYouCookIt -c ingredients --jsonArray --drop ./db/initializeDB/ingredients.json
mongoimport -h localhost:27017 -d CanYouCookIt -c inventory --jsonArray --drop ./db/initializeDB/inventory.json

