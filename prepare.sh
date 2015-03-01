#!/bin/bash
mv platforms/android/ platforms/android.bak/
cordova platform add android
cp -R platforms/android.bak/* platforms/android/
rm -rf platforms/android.bak/
echo "Success! Now run `./build.sh`"
