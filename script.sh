echo 1. What is in this directory?
ls -a
echo

echo 2. Is Node.js installed?
node -v
echo

echo 3. Install the project
npm ci
echo

echo 4. What is the workspace location?
echo $RUNNER_WORKSPACE
echo

echo 5. Who is running the script?
whoami
echo

echo 6. How is the disc laid out?
df
echo

echo 7. What environment variables are available?
env
echo
