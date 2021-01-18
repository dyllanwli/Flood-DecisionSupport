# !/bin/bash

# This shell is used to install the apps
# run ./scripts/install.sh

npm install grunt-cli@1.3.2 -g


# install all modules listed as dependencies in package.json
npm install

echo "*** node_modules installed \n\n"

# install dependencies listed in bower.json
node_modules/bower/bin/bower install

echo "*** bower installed \n\n"

# Switch to bower_components/angular folder:
cd bower_components/angularjs-slider

# install all modules listed as dependencies in package.json
npm install

echo "*** angularjs-slider installed \n\n"


echo "initialing apps"
./initial.sh