# web-install
Automatically create symlinks and .desktop files for Nativefier applications on Linux

## Introduction
A wrapper for [Nativefier](https://github.com/rispig/Nativefier) that provides a "full" installation of single-page web apps on Linux

```bash
$ npm install -g web-install
```

## Usage
```
web-install [--title <appname>] <URL>
```

e.g.

```bash
$ sudo web-install --title GitHub github.com
```

'title' is not required but is recommended for pretty app names

It is recommended to run this as root to avoid permissions errors