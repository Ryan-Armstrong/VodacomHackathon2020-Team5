import {icon_data} from './icon_src.js'
const app = getApp();

Component({
  data: {
    src: "",
    cssProps: `--color: var(--primary-white);
               --width:50rpx; --height:50rpx`
  },
  props: {
    onTap: () => { },
  },
  didMount() {
    if (icon_data[this.props.type] === undefined)
      throw new Error("Icon type is not defined or the type specified does not exist");
    let src = icon_data[this.props.type];
    this.setData({
      cssProps: `--color: ${this.props.color ? this.props.color : "var(--primary-white)"};
               --width:${this.props.width ? this.props.width : 50}rpx;
                --height:${this.props.height ? this.props.height : 50}rpx;
                --mask:url(${src}) 0 0/var(--width) var(--height);`
    })
    this.setData({ src: src })
  },
  methods:
  {
    onTap: function onTap() {
      this.props.onTap();
    }
  }
});


