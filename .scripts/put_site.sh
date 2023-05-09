PARENT_DIR="$(cd "$(dirname "$0")/.." && pwd)/"
rsync $PARENT_DIR -azP --exclude=".*" -e ssh $WEBSITE_REMOTE_DIR
