var YellowDuration = 0
var SwitchingDuration = 0;
var TotalDuration = 0;
var GreenDuration = 0;

var TimerIntervalID = 0;


function OnStartSimulation() {
    if (false == Validation()) {
        ShowValidationError();
        return false;
    }

    ShowValidationSuccess();

    
    ShowDemo();

    return true;
}

function ShowDemo() {
    TrafficLightTrigger();
    TimerIntervalID = setInterval(TrafficLightTrigger, 2 * SwitchingDuration);
    setTimeout(EndDemo, TotalDuration);

}

function EndDemo() {
    clearInterval(TimerIntervalID);
    document.getElementById("Start_Simulation").disabled = false;
}



function TrafficLightTrigger() {
    Start("#North");
    Start("#South");
    setTimeout(Start, SwitchingDuration, "#West");
    setTimeout(Start, SwitchingDuration, "#East");
}

function Start(trafficlight) {
    console.log(" Start invoked");
    Trigger(trafficlight);
    setTimeout(Trigger, GreenDuration, trafficlight);
    setTimeout(Trigger, SwitchingDuration, trafficlight);
}

function Trigger(trafficlight)
{
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