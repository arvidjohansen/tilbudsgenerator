

console.log("hei");

var formEl = document.getElementById("form");
var resultEl = document.getElementById("result");

var priser = {
    '50mbit':399,   
    '100mbit':599,
    '300mbit':799,
    '500mbit':999,
    'tv-basis':399,
    'tv-premium':599,
    'ekstra-dekoder':399,
    'wifi-extender':499,
}

function getFormValues(){
    ret = []
    ret['navn'] = formEl.elements['navn']['value'];
    ret['ditt-navn'] = formEl.elements['ditt-navn']['value'];
    ret['internett'] = formEl.elements['internett']['value'];
    ret['ekstra-dekoder'] = formEl.elements['ekstra-dekoder']['checked']
    ret['wifi-extender'] = formEl.elements['wifi-extender']['checked']
    ret['rabatt-månedlig'] = formEl.elements['rabatt-månedlig']['value']
    ret['rabatt-engangskost'] = formEl.elements['rabatt-engangskost']['value']
    return ret
}
function getPriceTable(input){
    var kostnader = 'Produkt\t\t\tMånedspris\tEngangskostnad\n';
    var totalMånedlig = 0;
    var totalEngangskost = 0;

    if (input['internett']){
        kostnader += 'Internett ' + ret['internett'] + '\tkr ' + priser[ret['internett']] + ',-\tkr 0,-\n'
        totalMånedlig += priser[ret['internett']];
    }
    if (input['wifi-extender']){
        kostnader += 'Wifi-extender\t\tkr 0,-\t\tkr '+ priser['wifi-extender'] + ',-\n';
        totalEngangskost += priser['wifi-extender'];
    }
    if (input['ekstra-dekoder']){
        kostnader += 'Ekstra dekoder\t\tkr 0,-\t\tkr '+ priser['ekstra-dekoder'] + ',-\n'; 
        totalEngangskost += priser['ekstra-dekoder'];
    }
    return kostnader

}

function updateIntroText(input){
    resultEl.innerHTML = '';
    resultEl.innerHTML += 'Hei ' + input['navn'];
    resultEl.innerHTML += ' og takk for en hyggelig samtale.\n\n';
    resultEl.innerHTML += 'Sender deg som avtalt tilbud på ';
    if (input['internett']){
        //internett + ?
        resultEl.innerHTML += input['internett'] + ' internett';
        
        if (input['ekstra-dekoder'] && input['wifi-extender']){
            //internett, ekstra dekoder og wifi-extender
            resultEl.innerHTML += ', ekstra TV-dekoder og wifi-extender.\n';
        }else if (input['ekstra-dekoder']){
            //internett og ekstra dekoder
            resultEl.innerHTML += ' og ekstra TV-dekoder.\n';
        }else if (input['wifi-extender']){
            //internett og wifi-extender
            resultEl.innerHTML += ' og wifi-extender.\n'
        }else {
            //bare internett
            resultEl.innerHTML += '.\n'
        }
    }else if (input['ekstra-dekoder'] && input['wifi-extender']){
        //bare wifi extender og ekstra tv-dekoder
        resultEl.innerHTML += 'ekstra dekoder og wifi-extender.\n';
    }else if (input['ekstra-dekoder']){
        //bare ekstra dekoder
        resultEl.innerHTML += 'ekstra dekoder.\n'
    }else if (input['wifi-extender']){
        //bare wifi extender
        resultEl.innerHTML += 'wifi-extender.\n'
    }
    resultEl.innerHTML += '\n';
}

/*
function disableInternettElements(){
    let elements = formEl.elements['internett'];
    console.log(elements);
    for (var i=0;i<=elements.length;i++){
        elements[i].readOnly = true;
    }
}
*/

function updateResult(){
    
    //Prepairing the intro-text
    input = getFormValues();
    updateIntroText(input);
    
    //Calculating kostnader
    var kostnader = getPriceTable(input);
    resultEl.innerHTML += kostnader + '\n\n';


    resultEl.innerHTML += 'Med vennlig hilsen ';
    resultEl.innerHTML += input['ditt-navn'];
}
formEl.addEventListener('submit',function(e){
    e.preventDefault();
    updateResult();
});