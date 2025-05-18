FROM node:22-bookworm-slim

RUN apt update

# 日本語対応
RUN apt install -y locales && \
    sed -i -e 's/# ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen

ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# 証明書
RUN apt install -y ca-certificates
