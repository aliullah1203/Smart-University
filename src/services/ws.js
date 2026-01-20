// Simple WebSocket client with reconnect and event callbacks
const DEFAULT_PATH = "/ws/updates";

class WSClient {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
    this.backoff = 1000;
    this.maxBackoff = 30000;
    this.connected = false;
    this._init();
  }

  _getUrl() {
    const base = process.env.REACT_APP_API_URL || window.location.origin;
    try {
      const u = new URL(base);
      const proto = u.protocol === "https:" ? "wss:" : "ws:";
      return proto + "//" + u.host + DEFAULT_PATH;
    } catch (e) {
      // fallback
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      return proto + "//" + window.location.host + DEFAULT_PATH;
    }
  }

  _init() {
    const url = this._getUrl();
    try {
      this.socket = new WebSocket(url);
    } catch (e) {
      this._scheduleReconnect();
      return;
    }
    this.socket.onopen = () => {
      this.connected = true;
      this.backoff = 1000;
    };
    this.socket.onmessage = (ev) => {
      let payload = null;
      try {
        payload = JSON.parse(ev.data);
      } catch (e) {
        return;
      }
      for (const fn of this.listeners) fn(payload);
    };
    this.socket.onclose = () => {
      this.connected = false;
      this._scheduleReconnect();
    };
    this.socket.onerror = () => {
      this.socket.close();
    };
  }

  _scheduleReconnect() {
    setTimeout(() => this._init(), this.backoff);
    this.backoff = Math.min(this.backoff * 1.5, this.maxBackoff);
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

const wsClient = new WSClient();
export default wsClient;
