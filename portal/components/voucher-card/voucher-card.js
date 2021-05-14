Component({
  mixins: [],
  data: {
    voucherValue: 0,
    buyNowValue: 0,
    advanceAvailable: false,
    ID:0,
    
  },
  props: {
    onTap:()=>{},
    selected: false,
  },
  didMount() {
    this.setData({
      voucherValue: `R ${this.props.voucher.amount.toFixed(2)} Voucher`,
      buyNowValue: `Get R ${this.props.voucher.buyNowAmount.toFixed(2)} when you Buy Now` ,
      advanceAvailable: this.props.voucher.advanceAvailable,
      ID:this.props.ID,
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onTap(ID){
      this.props.onTap(ID);
    }
  },
});
