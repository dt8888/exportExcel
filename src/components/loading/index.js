import LoadingComponent from './Loading'
import myButton from './MyButton'
const Loading = {
  install: function (Vue) {
    Vue.component('Loading', LoadingComponent)
  }
}
const MyButton = {
  install: function (Vue) {
    Vue.component('MyButton', myButton)
  }
}
export {
  Loading,
  MyButton
}
