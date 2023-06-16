rsync . -azP --exclude=".*" -e ssh $WEBSITE_REMOTE_DIR
