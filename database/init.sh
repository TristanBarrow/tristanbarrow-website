#!/bin/bash
echo Are you Sure? This will erase all data in the database \(yes\):

read override
if [ $override = y ] || [ $override = yes ]
then 
    echo Resetting Database...
    cat ./database/init.sql | psql
    # cat ./database/init.sql | heroku pg:psql
else 
    echo Exiting.
fi


