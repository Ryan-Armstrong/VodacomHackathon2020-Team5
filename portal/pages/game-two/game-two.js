Page({
  data: {
    state: { title: "Vodacom" }
  },
  onReady() {},
  onLoad() {
    const state = getApp().gameState;
    console.log(state);
    if (state !== {}) {
      this.setData({ state });
    }
  },
  onUnload() {}
});
