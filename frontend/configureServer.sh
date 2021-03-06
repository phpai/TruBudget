#!/bin/bash

# Remove previous proxy pass entries
sed -i "/proxy_pass/d" /etc/nginx/conf.d/default.conf

# Set default values
prod_host=localhost
prod_port=8080
test_host=localhost
test_port=8080

# Check if the required env variables are set otherwise localhost will be used.
if [ -n "$PROD_API_HOST" ]; then
  prod_host=$PROD_API_HOST
fi

if [ -n "$PROD_API_PORT" ]; then
  prod_port=$PROD_API_PORT
fi

if [ -n "$TEST_API_HOST" ]; then
  test_host=$TEST_API_HOST
fi

if [ -n "$TEST_API_HOST" ]; then
  test_port=$TEST_API_PORT
fi

# add the proxy pass and store the conf into the nginx conf directory
sed -i -e "/# pathToApi/i\\
  proxy_pass http://$prod_host:$prod_port/;" /etc/nginx/conf.d/default.conf
sed -i -e "/# pathToTestApi/i\\
  proxy_pass http://$test_host:$test_port/;" /etc/nginx/conf.d/default.conf

sed -i -e "s/^\(\s*include \/etc\/nginx\/sites-enabled\)/#&/" /etc/nginx/nginx.conf

nginx -g "daemon off;"

