@echo off
REM Begin---------------------------------------------------------------

REM This is the current version
java -cp ".;rhino-1.7.14.jar" org.mozilla.javascript.tools.jsc.Main linq_class_test.js
java -cp ".;rhino-1.7.14.jar" linq_class_test

REM This is a really old version but used in the context of VMware Aria Automation
REM java -cp ".;rhino-1.7R4.jar" org.mozilla.javascript.tools.jsc.Main linq_class_test.js
REM java -cp ".;rhino-1.7R4.jar" linq_class_test

del linq_class_test.class

REM End-----------------------------------------------------------------
