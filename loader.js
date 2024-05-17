/*
    Author: AIServers
*/
/// Varibles ///
// Startup Verification Targets //
const VerificationTargets = [
    ["https://aiservers.glitch.me","GET"]
]
function SendRequest(Target,Protocal){
    const XHR = new XMLHttpRequest
    let JsonResponse
    XHR.open(Protocal,Target,true)
    XHR.onload = function(){
        if (XHR.status >= 200 && XHR.status < 300){
            JsonResponse = JSON.parse(XHR.responseText)
        }
    }
    XHR.send();
    return JsonResponse
}
function VerifyTargets(){
    let Results = []
    for (let Index in VerificationTargets){
        var Object = VerificationTargets[Index]
        var Target = Object[0]
        var Protocal = Object[1]
        var JsonResponse = SendRequest(Target,Protocal)
        let Success = false
        if (JsonResponse){
            Success = true
        } else {
            Success = false
        }
        Results.push([Target,Protocal,Success])
    }
    return Results
}
function Main(){
    var VerificationResults = VerifyTargets()
    let Operational = true
    for (let Index in VerificationResults){
        var Object = VerificationResults[Index]
        var Target = Object[0]
        var Success = Object[2]
        if (Success){
            console.log("[INFO]: Loaded Resource: ",Target)
        } else {
            console.log("[ERROR]: Failed to Load Resource: ",Target)
            Operational = false
        }
    }
}
Main()