

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
        kostnader += 'Internett ' + input['internett'] + '\tkr ' + priser[input['internett']] + ',-\tkr 0,-\n'
        totalMånedlig += priser[input['internett']];
    }
    if (input['wifi-extender']){
        kostnader += 'Wifi-extender\t\tkr 0,-\t\tkr '+ priser['wifi-extender'] + ',-\n';
        totalEngangskost += priser['wifi-extender'];
    }
    if (input['ekstra-dekoder']){
        kostnader += 'Ekstra dekoder\t\tkr 0,-\t\tkr '+ priser['ekstra-dekoder'] + ',-\n'; 
        totalEngangskost += priser['ekstra-dekoder'];
    }
    kostnader += '------------------------------------------------------\n'
    if (totalEngangskost > 0){
        kostnader += 'Sum engangskostnader\t\t\tkr ' + totalEngangskost + ',-\n';
        var rabattEngangskostKr = (totalEngangskost * (input['rabatt-engangskost']/100)).toFixed(2).replace('.',',');
        kostnader += '   Rabatt (' + input['rabatt-engangskost'] + '%)\t\t\t      - kr ' + rabattEngangskostKr +'\n';
        var totalEngangskostEtterRabatt = (totalEngangskost - parseFloat(rabattEngangskostKr.replace(',','.'))).toFixed(2).replace('.',',');;
        kostnader += 'Total engangkostnad\t\t\tkr '+ totalEngangskostEtterRabatt + '\n\n';
    }
    if (totalMånedlig > 0){
        kostnader += 'Sum månedlige kostnader\t\kr ' + totalMånedlig + ',-\n';
        var rabattMånedligKr = (totalMånedlig * (input['rabatt-månedlig']/100)).toFixed(2).replace('.',',');
        kostnader += '   Rabatt (' + input['rabatt-månedlig'] + '%)\t      - kr ' + rabattMånedligKr +'\n';
        var totalMånedligEtterRabatt = (totalMånedlig - parseFloat(rabattMånedligKr.replace(',','.'))).toFixed(2).replace('.',',');
        kostnader += 'Total pris pr måned\tkr '+ totalMånedligEtterRabatt + '\n';
    }
    return kostnader

}

function getIntroText(input){
    ret = '';
    ret += 'Hei ' + input['navn'];
    ret += ' og takk for en hyggelig samtale.\n\n';
    ret += 'Sender deg som avtalt tilbud på ';
    if (input['internett']){
        //internett + ?
        ret += input['internett'] + ' internett';
        
        if (input['ekstra-dekoder'] && input['wifi-extender']){
            //internett, ekstra dekoder og wifi-extender
            ret += ', ekstra TV-dekoder og wifi-extender.\n';
        }else if (input['ekstra-dekoder']){
            //internett og ekstra dekoder
            ret += ' og ekstra TV-dekoder.\n';
        }else if (input['wifi-extender']){
            //internett og wifi-extender
            ret += ' og wifi-extender.\n'
        }else {
            //bare internett
            ret += '.\n'
        }
    }else if (input['ekstra-dekoder'] && input['wifi-extender']){
        //bare wifi extender og ekstra tv-dekoder
        ret += 'ekstra dekoder og wifi-extender.\n';
    }else if (input['ekstra-dekoder']){
        //bare ekstra dekoder
        ret += 'ekstra dekoder.\n'
    }else if (input['wifi-extender']){
        //bare wifi extender
        ret += 'wifi-extender.\n'
    }
    ret += '\n';
    return ret;
}

function updateResult(){
    var input = getFormValues();
    
    //Adding intro-text
    var introText = getIntroText(input);
    resultEl.innerHTML = introText;
    
    //Adding kostnader
    var kostnader = getPriceTable(input);
    resultEl.innerHTML += kostnader + '\n\n';

    //Adding outro-text
    resultEl.innerHTML += 'Med vennlig hilsen ';
    resultEl.innerHTML += input['ditt-navn'];
}
formEl.addEventListener('submit',function(e){
    e.preventDefault();
    updateResult();
});
formEl.addEventListener('reset',function(e){
    resultEl.innerHTML = '';
});
