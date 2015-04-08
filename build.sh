#!/bin/bash
cordova build android
mv ./platforms/android/ant-build/MainActivity-debug.apk ./love.apk
echo "Now install 'love.apk' on your device!"
