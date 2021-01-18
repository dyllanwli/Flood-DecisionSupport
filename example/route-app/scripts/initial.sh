echo "coping default grunt"


set -x
# Copy `Gruntfile.default.js` to `Gruntfile.js`
cp Gruntfile.default.js Gruntfile.js

# Copy `weathercheck.default.txt` to `weathercheck.txt`.
cp app/weathercheck.default.txt app/weathercheck.txt

set +x
echo "finished"