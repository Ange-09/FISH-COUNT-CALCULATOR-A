
// This function updates the visibility of input fields based on the selected data range from dropdown
function updateInputFields() {
    const selection = document.getElementById("dataRange").value;
    const avgDiv = document.getElementById("averageInputs");
    const periodDiv = document.getElementById("periodInputs");

    if (selection === "average") {
        avgDiv.style.display = "block";
        periodDiv.style.display = "none";
    } else if (selection === "period") {
        avgDiv.style.display = "none";
        periodDiv.style.display = "block";
    }
}

// Optional: set the correct visibility when the page loads
window.onload = function() {
    updateInputFields();
};

function calculate(){
    let rfAvg, tempAvg, whacAvg;
    let rfm1,tempm1, whacm1;
    let rfm2,tempm2, whacm2;
    let rfm3,tempm3, whacm3;
    let computedrf, computedtemp, computedwhac;
    let selection = document.getElementById("dataRange").value;


    //Input Variables
    rfAvg = parseFloat(document.getElementById("rfAvg").value);
    tempAvg = parseFloat(document.getElementById("tempAvg").value);
    whacAvg = parseFloat(document.getElementById("whacAvg").value);

    rfm1 = parseFloat(document.getElementById("rfm1").value);
    tempm1 = parseFloat(document.getElementById("tempm1").value);
    whacm1 = parseFloat(document.getElementById("whacm1").value);

    rfm2 = parseFloat(document.getElementById("rfm2").value);
    tempm2 = parseFloat(document.getElementById("tempm2").value);
    whacm2 = parseFloat(document.getElementById("whacm2").value);

    rfm3 = parseFloat(document.getElementById("rfm3").value);
    tempm3 = parseFloat(document.getElementById("tempm3").value);
    whacm3 = parseFloat(document.getElementById("whacm3").value);

    if (selection === "average") {
        computedrf = rfAvg
        computedtemp = tempAvg
        computedwhac = whacAvg
    }
    else if (selection === "period") {
        computedrf = (rfm1 + rfm2 + rfm3) / 3
        computedtemp = (tempm1 + tempm2 + tempm3) / 3
        computedwhac = ((whacm1 + whacm2 + whacm3) / 3)
    }

    // Water Quality Variable Display
    let bod, disox, fc, ph, ammonia, nitrate, phosphate;
    let bodDisplay, disoxDisplay, fcDisplay, phDisplay, ammoniaDisplay, nitrateDisplay, phosphateDisplay;

    bod = 19.088 +
    0.0278 * computedwhac -
    5.0624 * computedtemp -
    0.0322 * computedrf +
    0.0000004545 * computedwhac ** 2 +
    0.1767 * computedtemp ** 2 -
    0.000005148 * computedrf ** 2 -
    0.001199 * computedwhac * computedtemp +
    0.000001217 * computedwhac * computedrf +
    0.001225 * computedtemp * computedrf;

    disox =  13.1989 -
    0.002143 * computedwhac -
    0.2258 * computedtemp -
    0.001321 * computedrf +
    0.0000004628 * computedwhac ** 2;

    fc = 6.0578 -
    0.003888 * computedwhac +
    0.2041 * computedtemp +
    0.007169 * computedrf +
    0.0000004544 * computedwhac ** 2 -
    0.000009663 * computedrf ** 2;
    

    ph = 204.626 +
    0.0124 * computedwhac -
    23.8464 * computedtemp +
    0.1222 * computedrf -
    0.000001864 * computedwhac ** 2 +
    0.90997 * computedtemp ** 2 +
    0.00001875 * computedrf ** 2 -
    0.0003213 * computedwhac * computedtemp -
    0.00003432 * computedwhac * computedrf -
    0.005164 * computedtemp * computedrf +
    0.0000000002491 * computedwhac ** 3 -
    0.011 * computedtemp ** 3 -
    0.00000002025 * computedrf ** 3 +
    0.000001411 * computedwhac * computedtemp * computedrf;
    

    ammonia = -7.3368 -
    0.0002884 * computedwhac +
    0.1831 * computedtemp;

    nitrate = 5.8153 -
    0.00044 * computedwhac -
    0.2402 * computedtemp -
    0.0006012 * computedrf;

    phosphate =  -1.1228 +
    0.0002271 * computedwhac -
    0.0623 * computedtemp;

    bodDisplay = Math.pow(0.61 * bod + 1, 1 / 0.61);
    disoxDisplay = Math.pow(0.8 * disox + 1, 1 / 0.8);
    fcDisplay = Math.pow(-0.01 * fc + 1, 1 / -0.01);
    phDisplay = ph * 1;
    ammoniaDisplay = Math.pow(0.04 * ammonia + 1, 1 / 0.04);
    nitrateDisplay = Math.pow(0.13 * nitrate + 1, 1 / 0.13);
    phosphateDisplay = Math.pow(0.11 * phosphate + 1, 1 / 0.11);
    
    document.getElementById("bodValue").textContent = bodDisplay.toFixed(4) + " mg/L";
    document.getElementById("disoxValue").textContent = disoxDisplay.toFixed(4) + " mg/L";
    document.getElementById("fcValue").textContent = fcDisplay.toFixed(4) + " MPN/100mL";
    document.getElementById("phValue").textContent = phDisplay.toFixed(4);
    document.getElementById("ammoniaValue").textContent = ammoniaDisplay.toFixed(4) + " mg/L";
    document.getElementById("nitrateValue").textContent = nitrateDisplay.toFixed(4) + " mg/L";
    document.getElementById("phosphateValue").textContent = phosphateDisplay.toFixed(4) + " mg/L";
    
    // Estimated Fish Count

    let FClaguna, FCrizal, FCtaguig;
    let location = document.getElementById("location").value;

    switch (location){
        case "laguna":
            FClaguna =   541246 +
            29104 * bodDisplay -
            9651 * disoxDisplay -
            127203 * phDisplay -
            405481 * ammoniaDisplay -
            44219 * nitrateDisplay -
            27268 * phosphateDisplay -
            586 * bodDisplay ** 2 +
            7570 * phDisplay ** 2 -
            574475 * ammoniaDisplay ** 2 +
            99419 * phosphateDisplay ** 2 +
            1047 * bodDisplay * disoxDisplay -
            4259 * bodDisplay * phDisplay +
            20012 * bodDisplay * ammoniaDisplay -
            4181 * bodDisplay * nitrateDisplay +
            14212 * bodDisplay * phosphateDisplay +
            1130 * disoxDisplay * phDisplay -
            65219 * disoxDisplay * ammoniaDisplay +
            6567 * disoxDisplay * nitrateDisplay -
            6277 * disoxDisplay * phosphateDisplay +
            107144 * phDisplay * ammoniaDisplay +
            86333 * ammoniaDisplay * nitrateDisplay +
            196525 * ammoniaDisplay * phosphateDisplay;
            
            fishCount = FClaguna;
            document.getElementById("answer").textContent = `Laguna = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "rizal":
            FCrizal = 288 +
            0.001535 * fcDisplay -
            68.8 * phDisplay -
            61.9 * nitrateDisplay +
            4.1 * phDisplay ** 2 -
            1.39 * nitrateDisplay ** 2 +
            7.35 * phDisplay * nitrateDisplay;

            fishCount = (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) /
                        (1 + Math.exp((FCrizal - 0.436622) / 0.868131));
            document.getElementById("answer").textContent = `Rizal = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "taguig":
            FCtaguig = 90.8856 -
            20.6694 * disoxDisplay -
            0.0182 * phDisplay +
            1.2571 * disoxDisplay ** 2 +
            0.000002167 * phDisplay ** 2 +
            0.001991 * disoxDisplay * phDisplay;

            fishCount = (0.02*FCtaguig+1)**(1/0.02)
            document.getElementById("answer").textContent = `Taguig/Muntinlupa = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "all":
            FClaguna =   541246 +
            29104 * bodDisplay -
            9651 * disoxDisplay -
            127203 * phDisplay -
            405481 * ammoniaDisplay -
            44219 * nitrateDisplay -
            27268 * phosphateDisplay -
            586 * bodDisplay ** 2 +
            7570 * phDisplay ** 2 -
            574475 * ammoniaDisplay ** 2 +
            99419 * phosphateDisplay ** 2 +
            1047 * bodDisplay * disoxDisplay -
            4259 * bodDisplay * phDisplay +
            20012 * bodDisplay * ammoniaDisplay -
            4181 * bodDisplay * nitrateDisplay +
            14212 * bodDisplay * phosphateDisplay +
            1130 * disoxDisplay * phDisplay -
            65219 * disoxDisplay * ammoniaDisplay +
            6567 * disoxDisplay * nitrateDisplay -
            6277 * disoxDisplay * phosphateDisplay +
            107144 * phDisplay * ammoniaDisplay +
            86333 * ammoniaDisplay * nitrateDisplay +
            196525 * ammoniaDisplay * phosphateDisplay;

            FCrizal = 288 +
            0.001535 * fcDisplay -
            68.8 * phDisplay -
            61.9 * nitrateDisplay +
            4.1 * phDisplay ** 2 -
            1.39 * nitrateDisplay ** 2 +
            7.35 * phDisplay * nitrateDisplay;
            
            FCtaguig = 90.8856 -
            20.6694 * disoxDisplay -
            0.0182 * phDisplay +
            1.2571 * disoxDisplay ** 2 +
            0.000002167 * phDisplay ** 2 +
            0.001991 * disoxDisplay * phDisplay;

            let lagunaFC = FClaguna;
            let rizalFC =   (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) /
                            (1 + Math.exp((FCrizal - 0.436622) / 0.868131));
            let taguigFC = (0.02*FCtaguig+1)**(1/0.02);

            document.getElementById("answer").textContent = `Laguna = ${lagunaFC.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = `Rizal = ${rizalFC.toFixed(2)} mt (t)`;
            document.getElementById("answerb").textContent = `Taguig/Muntinlupa = ${taguigFC.toFixed(2)} mt (t)`;
            break;
        default:
            document.getElementById("answer").textContent = "Invalid location";
    }

}
