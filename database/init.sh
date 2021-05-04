#!/bin/bash
echo Are you Sure? This will erase all data in the database \(yes\):

read override
if [ $override = y ] || [ $override = yes ]
then 
    echo Resetting Database...
    cat ./database/init.sql | psql
    curl --location --request POST 'localhost:8000/api/user/create' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: connect.sid=s%3A0oJoGA98S0RTIYg2XrdBI88CLHLds6ln.8okDHWKl89bkZnpwGVm2%2FqmHTdKVF1%2Bcu6pjpEr8p%2Bg' \
    --data-raw '{
        "username": "TristanBarrow",
        "password": "tempPassword"
    }'
else 
    echo Exiting.
fi


