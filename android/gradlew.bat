@echo off
setlocal
set DIRNAME=%~dp0
if "%JAVA_HOME%"=="" (
  set JAVA_EXE=java.exe
) else (
  set JAVA_EXE=%JAVA_HOME%\bin\java.exe
)
"%JAVA_EXE%" %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=gradlew" -classpath "" -jar "%DIRNAME%gradle\wrapper\gradle-wrapper.jar" %*
exit /b %ERRORLEVEL%
