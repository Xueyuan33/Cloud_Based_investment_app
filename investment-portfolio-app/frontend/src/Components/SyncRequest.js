export default function SyncRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    if (xhr.status === 200) {
       return JSON.parse(xhr.responseText);
    } else {
       throw new Error('Request failed: ' + xhr.statusText);
    }
  }