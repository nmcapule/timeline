
export function fixUrl(url: string) {
    if (!url.match(/http(s)?\:\/\//g)) {
      url = `http://${url}`;
    }
    return url;
  }
  