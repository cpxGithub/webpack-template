/**
 * 设置页面title
 * @param {String} title
 */
let setTitle = title => {
  document.title = title
  // 暂时注释ios兼容设置，以后没有出现兼容问题，就删除
  // let mobile = navigator.userAgent.toLowerCase()
  // if (/iphone|ipad|ipod/.test(mobile)) {
  //   let iframe = document.createElement('iframe')
  //   iframe.style.visibility = 'hidden'
  //   iframe.style.display = 'none'
  //   iframe.setAttribute('src', require('../assets/img/close.png'))
  //   let iframeCallback = () => {
  //     setTimeout(() => {
  //       iframe.removeEventListener('load', iframeCallback)
  //       document.body.removeChild(iframe)
  //     }, 0)
  //   }
  //   iframe.addEventListener('load', iframeCallback)
  //   document.body.appendChild(iframe)
  // }
}

/**
 * vux组件PopupPicker数据处理，此组件数据形式必须为{name: xx, value: xx}，value为String类型
 * @param {Array} list - 原始数据
 * @param {String} keyName - 要转换的key名称
 * @param {String} valueName - 要转换的value名称
*/
let dataFitler = (list, keyName, valueName) => {
  let arr = []
  list.forEach((item, index) => {
    arr[index] = []
    if (keyName) {
      item.forEach(child => {
        arr[index].push({
          name: child[keyName],
          value: child[valueName].toString()
        })
      })
    } else {
      item.forEach(child => {
        arr[index].push(child.toString())
      })
    }
  })
  return arr
}

export default {
  setTitle,
  dataFitler
}
