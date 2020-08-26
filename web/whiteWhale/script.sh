#!/bin/bash
curl -d "username=admin&password=wIhE5tAhKc56" http://localhost:5000/login/ |  jq . > resp.json
TOKEN=`jq .jwttoken resp.json` 
echo ${TOKEN:1:-1}
curl -d -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN:1:-1}" http://localhost:5000/flag/
