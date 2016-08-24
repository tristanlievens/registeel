import * as Robot from 'robotjs'
import * as _ from 'lodash'
const oldKeyTap = Robot.keyTap
Robot.keyTap = function () {
  console.log(_.values(arguments));
  oldKeyTap.apply(this, _.values(arguments))
}

const oldKeyToggle = Robot.keyToggle
Robot.keyToggle = function () {
  console.log(_.values(arguments));
  oldKeyToggle.apply(this, _.values(arguments))
}
