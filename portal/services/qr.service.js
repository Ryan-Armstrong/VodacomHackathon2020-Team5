import { Subject } from "rxjs";

class QRService {
  app;

  constructor() {
    this.app = getApp();
    console.log(qrService);
  }

  scanImage(img) {
    console.log(img);
    const ctx = my.createCanvasContext("b64Encoder");
    console.log("----");
    console.log(ctx);
    ctx.drawImage(img, 2, 2, 250, 250);
    ctx.draw();
    setTimeout(() => {
      ctx
        .toDataURL({
          destWidth: 250,
          destHeight: 250
        })
        .then(base64Image => {
          // console.log(base64Image);
          // alert(base64Image);
          this.decodeQRToUrl(base64Image);
        });
    }, 1000);
    // this.decodeQRToUrl(img);
  }

  decodeQRToUrl(base64Image) {
    my.request({
      url: "https://qrcode.p.rapidapi.com/qrcode/decode",
      method: "POST",
      data: {
        // qrimage: base64Image
        qrimage: `{ value: "image (2).png", data: ${base64Image} }`
      },
      headers: {
        "x-rapidapi-host": "qrcode.p.rapidapi.com",
        "x-rapidapi-key": "77cfd44ecemsh5d9b953317e58e2p192bf7jsned5d2639ff3d",
        "x-fungenerators-api-secret": "tk2yBhGgU6APPD4Dxp1rNweF",
        "content-type": "application/x-www-form-urlencoded"
        // "content-type": "multipart/form-data"
      },
      dataType: "json",
      success: res => {
        console.log(res);
      },
      fail: res => {
        console.error(res);
        my.alert({ content: "fail" });
      }
    });
  }
}

const qrService = new QRService();

export default qrService;
