#!/bin/bash
mv platforms/android/ platforms/android.bak/
cordova platform add android
cordova plugin add https://github.com/phonegap-build/PushPlugin.git
cp -R platforms/android.bak/* platforms/android/
rm -rf platforms/android.bak/
echo "Success! Now run './build.sh'"
