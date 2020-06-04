'use strict'

class UI 
{
  constructor() {
    this.YellowDurationInput     = document.getElementById("YellowDuration")
    this.SwitchingDurationInput  = document.getElementById("SwitchingDuration")
    this.TotalDurationInput      = document.getElementById("TotalDuration")
    this.Start_Simulation        = document.getElementById("Start_Simulation")
    this.trafficFeedback         = document.querySelector(".traffic-feedback")
    this.trafficSuccess          = document.querySelector(".traffic-success")

    this.North        = "#North"
    this.South        = "#South"
    this.West         = "#West"
    this.East         = "#East"

    this.__YellowDuration    = 0
    this.__SwitchingDuration = 0
    this.__TotalDuration     = 0
    this.__GreenDuration     = 0
    this.__TimerIntervalID   = 0
  }

  // Method Submit Form Traffic
  submitTrafficForm = () => {
    console.log("Salut tout le monde")

    if (false == this._validationForm()) {
      return false
    }

    this._ShowValidationSuccess()
    this._showLight()

  }

  _showLight = () => {
    this._TrafficLightTrigger()
    
    this.__TimerIntervalID = setInterval(this.__TimerIntervalID, 2 * this.__SwitchingDuration)
    setTimeout(this._endLight, this.__TotalDuration)
  }

  _TrafficLightTrigger = () => {
    this._startLight(this.North)
    this._startLight(this.South)
    setTimeout(this._startLight, this.__SwitchingDuration, this.West)
    setTimeout(this._startLight, this.__SwitchingDuration, this.East)
  }

  _startLight = (trafficlight) => {
    this._trafficTrigger(trafficlight)
    setTimeout(this._trafficTrigger, this.__GreenDuration, trafficlight)
    setTimeout(this._trafficTrigger, this.__SwitchingDuration, trafficlight)
  }

  _endLight = () => {
    clearInterval(this._TimerIntervalID)
    this.Start_Simulation.disabled = false
  }

  _trafficTrigger = (trafficlight) => {

    console.log('trigger invoked')

    if ($(trafficlight).length == 0)
    {
        return false;
    }

    var CurrNode = $(trafficlight).find('.ON');

    // 
    if (CurrNode.prev().length) {
        // If the current node is ON and it's second & 3rd node
        CurrNode
            .removeClass('ON')
            .prev()
            .addClass('ON');
    }
    else {
        // If the current node is ON and first node of type 'p' then move to the last.
        CurrNode
            .removeClass('ON')
            .parent()
            .find('p:last')
            .addClass('ON');
    }

    return true;
  }

  // Method Validation
  _validationForm = () => {

    this.__YellowDuration    = this._validateInput("YellowDuration")
    this.__SwitchingDuration = this._validateInput("SwitchingDuration")
    this.__TotalDuration     = this._validateInput("TotalDuration")

    if( this.__YellowDuration === false ){
      this._errorShow('YellowDuration')
      return false
    }

    if( this.__SwitchingDuration === false ){
      this._errorShow('SwitchingDuration')
      return false
    }

    if( this.__TotalDuration === false ){
      this._errorShow('TotalDuration')
      return false
    }

    if ( this._ValidateAllValues() === false ) {
      this._errorShow('GreenDuration')
      return false
    }

    this.__GreenDuration = this.__SwitchingDuration - this.__YellowDuration

    return true
  }

  // Function check Input Validation
  _validateInput = (fieldName) => {

    let _tmpElement      = document.getElementById(fieldName)
    let _tmpElementValue = _tmpElement.value
    let _value = parseInt(_tmpElement.value)

    if( (_tmpElement == null) ){
      return false
    }
    
    if( (isNaN(_value) === true) ){
      return false
    }

    if( (_tmpElementValue <= 0) ){
      return false
    }
    
    return _value
  }

  // Function check Validate Value
  _ValidateAllValues = () => {

    if (this.__TotalDuration < this.__SwitchingDuration || this.__SwitchingDuration < this.__YellowDuration) {
        return false
    }

    return true
  }

  // Function check Input Validation
  _errorShow = (msgErrorType) => {

    let _msgError

    if(msgErrorType == 'GreenDuration'){
      _msgError = `<p>Values is not correct !</p>`
    }
    else {
      _msgError = `<p>${msgErrorType} value cannot be empty or negative !</p>`
    }

    this.trafficFeedback .classList.add('showItem')
    this.trafficFeedback .innerHTML = _msgError

    setTimeout(() => {
      this.trafficFeedback.classList.remove('showItem')
    }, 4000)
  }

  // Function show validation success
  _ShowValidationSuccess = () => {

    let _msgSuccess = `<p>Input value validation success!</p>`

    this.trafficSuccess .classList.add('showItem')
    this.trafficSuccess .innerHTML = _msgSuccess
    this.Start_Simulation.disabled = true

    setTimeout(() => {
      this.trafficSuccess.classList.remove('showItem')
    }, 4000)
  }

}

// Export Class UI
export {UI}