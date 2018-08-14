/**
 * 下拉加载
 * 在created生命周期里面调用handleScroll函数,调用组件方法对象必须包含this._getData函数，在请求接口完成后执行
 * this.isRequest = true
 * this.page = res.page
 */
let paging = {
  data () {
    return {
      page: {}, // 分页对象
      currPage: 1, // 当前页数
      isRequest: false, // 防止重复请求
      loadFlag: false
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () { // 监听滚动函数处理
      // 内容高度，视图高度，滚动高度
      let [contentHeight, viewHeight, scrollHeight] = [window.document.body.scrollHeight, window.innerHeight, window.pageYOffset]
      if (contentHeight === 0) return
      if ((scrollHeight + viewHeight >= contentHeight - 20) && this.isRequest) {
        this.currPage++
        this.isRequest = false
        if (this.currPage <= this.page.pageCount) this._getData(this.currPage)
      }
    }
  }
}

export {
  paging
}
