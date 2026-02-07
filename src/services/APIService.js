import api from "../lib/axios";

export default {
  getAdvice() {
    return api(`/advice?timestamp=${Date.now()}`)
  }
}