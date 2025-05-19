FROM node:22-bookworm-slim

# Install bash-completion and certificates
RUN apt update && \
    apt install -y bash-completion ca-certificates

# Set up Japanese locale
RUN apt install -y locales && \
    sed -i -e 's/# ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen

ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# Enable Git command completion (if available)
RUN cat <<'EOF' >> ~/.bashrc

if [ -f /usr/share/bash-completion/completions/git ]; then
  . /usr/share/bash-completion/completions/git
fi
EOF

# Optional: Customize the shell prompt to your preference
# This prompt shows the current directory and Git branch (if inside a Git repo)
RUN cat <<'EOF' >> ~/.bashrc

git_branch() {
  git branch 2>/dev/null | grep '\*' | sed 's/* //'
}
export PS1='\[\e[32m\]\u\[\e[0m\] ➜ \[\e[34m\]\[\e[1m\]\w\[\e[0m\] (\[\e[31m\]\[\e[1m\]$(git_branch)\[\e[0m\]) \$ '
EOF