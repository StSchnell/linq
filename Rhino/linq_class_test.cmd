@echo off
REM Begin---------------------------------------------------------------

java -cp ".;rhino-1.7.14.jar" org.mozilla.javascript.tools.jsc.Main linq_class_test.js
java -cp ".;rhino-1.7.14.jar" linq_class_test
REM java -cp ".;rhino-1.7R4.jar" org.mozilla.javascript.tools.jsc.Main linq_class_test.js
REM java -cp ".;rhino-1.7R4.jar" linq_class_test
del linq_class_test.class

REM End-----------------------------------------------------------------