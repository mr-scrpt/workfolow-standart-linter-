import { ShowCtrl } from 'showctrl'
console.log('in')
const options = {
  parentClass: 'menu-simple',
  controllerClass: 'menu-simple__controller',
  boxClass: 'menu-simple__box',
  relativeBoxClass: 'menu-simple',
  bp: 994,
}
new ShowCtrl(options)

const optionsTest = {
  parentClass: 'menu-test',
  controllerClass: 'menu-test__controller',
  boxClass: 'menu-test__box',
  relativeBoxClass: 'menu-test',
  bp: 994,
}
new ShowCtrl(optionsTest)
