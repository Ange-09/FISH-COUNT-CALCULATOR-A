
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
        computedwhac = (whacAvg-1072.26)/(3825.68-1072.26)
    }
    else if (selection === "period") {
        computedrf = (rfm1 + rfm2 + rfm3) / 3
        computedtemp = (tempm1 + tempm2 + tempm3) / 3
        computedwhac = (((whacm1 + whacm2 + whacm3) / 3)-1072.26)/(3825.68-1072.26)
    }

    // Water Quality Variable Display
    let bod, disox, fc, ph, ammonia, nitrate, phosphate;
    let bodDisplay, disoxDisplay, fcDisplay, phDisplay, ammoniaDisplay, nitrateDisplay, phosphateDisplay;

    bod = -5.97 - 0.080 * computedwhac + 0.2673 * computedtemp + 0.001211 * computedrf;

    disox = 25.3 - 18.2 * computedwhac - 0.80 * computedtemp - 0.022 * computedrf
    + 3.66 * computedwhac * computedwhac 
    + 0.00038 * computedtemp * computedtemp 
    + 0.000003 * computedrf * computedrf 
    + 0.60 * computedwhac * computedtemp 
    + 0.014 * computedwhac * computedrf 
    + 0.00092 * computedtemp * computedrf 
    - 0.00074 * computedwhac * computedtemp * computedrf
    ;

    fc = 3.7 - 20.1 * computedwhac + 0.63 * computedtemp - 0.161 * computedrf
    + 4.19 * computedwhac * computedwhac
    - 0.019 * computedtemp * computedtemp
    - 0.000009 * computedrf * computedrf
    + 0.46 * computedwhac * computedtemp
    + 0.162 * computedwhac * computedrf
    + 0.00663 * computedtemp * computedrf
    - 0.00644 * computedwhac * computedtemp * computedrf
    ;
    

    ph = 6.3 + 4.2 * computedwhac + 0.02 * computedtemp + 0.0588 * computedrf
    + 0.32 * computedwhac * computedwhac
    + 0.0020 * computedtemp * computedtemp
    + 0.000001 * computedrf * computedrf
    - 0.162 * computedwhac * computedtemp
    - 0.0697 * computedwhac * computedrf
    - 0.00240 * computedtemp * computedrf
    + 0.00282 * computedwhac * computedtemp * computedrf;
    

    ammonia = -1314 + 6 * computedwhac + 150 * computedtemp - 0.035 * computedrf
    - 14.3 * Math.pow(computedwhac, 2) 
    - 5.75 * Math.pow(computedtemp, 2) 
    + 0.000045 * Math.pow(computedrf, 2) 
    + 0.05 * computedwhac * computedtemp 
    - 0.005 * computedwhac * computedrf 
    + 0.00068 * computedtemp * computedrf 
    + 6.5 * Math.pow(computedwhac, 3) 
    + 0.0732 * Math.pow(computedtemp, 3) 
    - 0.000000 * Math.pow(computedrf, 3) 
    + 0.0005 * computedwhac * computedtemp * computedrf;

    nitrate = 5.34 - 1.211 * computedwhac - 0.240 * computedtemp - 0.000601 * computedrf;

    phosphate = -12.0 + 11.7 * computedwhac + 0.49 * computedtemp + 0.0241 * computedrf
    + 0.10 * computedwhac * computedwhac
    - 0.0043 * computedtemp * computedtemp
    - 0.000001 * computedrf * computedrf
    - 0.45 * computedwhac * computedtemp
    - 0.042 * computedwhac * computedrf
    - 0.00097 * computedtemp * computedrf
    + 0.00170 * computedwhac * computedtemp * computedrf;
    

    bodDisplay = Math.pow(0.61 * bod + 1, 1 / 0.61);
    disoxDisplay = Math.pow(0.8 * disox + 1, 1 / 0.8);
    fcDisplay = Math.pow(-0.01 * fc + 1, 1 / -0.01);
    phDisplay = ph * 1;
    ammoniaDisplay = Math.pow(0.004 * ammonia + 1, 1 / 0.04);
    nitrateDisplay = Math.pow(0.13 * nitrate + 1, 1 / 0.13);
    phosphateDisplay = Math.pow(0.11 * phosphate + 1, 1 / 0.11);
    
    document.getElementById("bodValue").textContent = bodDisplay.toFixed(4);
    document.getElementById("disoxValue").textContent = disoxDisplay.toFixed(4);
    document.getElementById("fcValue").textContent = fcDisplay.toFixed(4);
    document.getElementById("phValue").textContent = phDisplay.toFixed(4);
    document.getElementById("ammoniaValue").textContent = ammoniaDisplay.toFixed(4);
    document.getElementById("nitrateValue").textContent = nitrateDisplay.toFixed(4);
    document.getElementById("phosphateValue").textContent = phosphateDisplay.toFixed(4);

    // Estimated Fish Count

    let FClaguna, FCrizal, FCtaguig;
    let location = document.getElementById("location").value;

    switch (location){
        case "laguna":
            FClaguna = 364470 
            + 9587 * bod 
            + 2156 * disox 
            + 240.2 * fc 
            - 99968 * ph 
            + 147508 * ammonia 
            + 322922 * nitrate 
            - 178311 * phosphate 
            + 439 * Math.pow(bod, 2) 
            - 0.00885 * Math.pow(fc, 2) 
            + 6727 * Math.pow(ph, 2) 
            - 620097 * Math.pow(ammonia, 2) 
            - 5886 * Math.pow(nitrate, 2) 
            - 13.53 * bod * fc 
            - 1865 * bod * ph 
            + 14948 * bod * ammonia 
            + 14700 * bod * nitrate 
            + 35588 * bod * phosphate 
            + 6.63 * disox * fc 
            - 86611 * disox * ammonia 
            + 7794 * disox * phosphate 
            - 26.50 * fc * ph 
            + 61.5 * fc * ammonia 
            - 88.6 * fc * nitrate 
            - 143.6 * fc * phosphate 
            + 57119 * ph * ammonia 
            - 41836 * ph * nitrate 
            + 491782 * ammonia * phosphate 
            + 82746 * nitrate * phosphate;
            
            fishCount = FClaguna
            document.getElementById("answer").textContent = `Laguna = ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "rizal":
            FCrizal = 296.2 - 23.3 * bod - 32.1 * disox + 139 * fc - 32.9 * ph - 207 * ammonia 
            - 286.9 * nitrate - 22.3 * phosphate + 1.493 * bod * bod + 181.1 * fc * fc 
            + 2258 * ammonia * ammonia - 9.46 * nitrate * nitrate - 61 * phosphate * phosphate 
            - 0.69 * bod * disox - 26.21 * bod * fc + 2.65 * bod * ph + 20.45 * disox * fc 
            + 3.68 * disox * ph + 1.78 * disox * nitrate - 31.4 * fc * ph + 153.9 * fc * ammonia 
            - 18.0 * fc * nitrate + 87.8 * fc * phosphate + 8.4 * ph * ammonia + 33.02 * ph * nitrate 
            - 217 * ammonia * phosphate - 197.8 * fc * fc * fc - 8759 * ammonia * ammonia * ammonia 
            + 523 * phosphate * phosphate * phosphate
            ;
            fishCount = FCrizal
            document.getElementById("answer").textContent = `Rizal = ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "taguig":
            FCtaguig = -1173 - 52.28 * bod - 2.6 * disox - 28.0 * fc + 271 * ph 
            + 1474 * ammonia - 5.60 * nitrate + 1904 * phosphate - 1.758 * disox * disox 
            + 25.4 * fc * fc - 16.83 * ph * ph - 894 * ammonia * ammonia + 0.58 * nitrate * nitrate 
            - 902 * phosphate * phosphate + 6.558 * bod * disox + 1.85 * bod * fc + 38.6 * bod * ammonia 
            - 32.6 * bod * phosphate + 3.22 * disox * ph - 196.4 * disox * ammonia - 84.4 * disox * phosphate 
            + 95.5 * fc * ammonia + 11.9 * fc * nitrate + 33 * fc * phosphate - 111.5 * ph * phosphate 
            - 139.8 * ammonia * nitrate - 840 * ammonia * phosphate + 7356 * ammonia * ammonia * ammonia
            ;
            fishCount = FCtaguig
            document.getElementById("answer").textContent = `Taguig/Muntinlupa = ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "all":
            FClaguna = 180224 + 11713 * bod + 12062 * disox + 323643 * fc - 66322 * ph 
            - 85690 * ammonia + 338012 * nitrate + 23364 * phosphate - 597 * disox * disox 
            - 80654 * fc * fc + 4657 * ph * ph - 1417496 * ammonia * ammonia 
            + 500 * nitrate * nitrate - 1732 * bod * ph + 3882 * bod * nitrate 
            + 26271 * bod * phosphate - 88880 * disox * ammonia - 1661 * disox * nitrate 
            + 3231 * disox * phosphate - 32218 * fc * ph + 118688 * fc * ammonia 
            - 104647 * fc * nitrate - 218223 * fc * phosphate + 99255 * ph * ammonia 
            - 38315 * ph * nitrate - 15430 * ph * phosphate + 247028 * ammonia * phosphate 
            + 69472 * fc * fc * fc + 4050967 * ammonia * ammonia * ammonia;

            FCrizal = 296.2 - 23.3 * bod - 32.1 * disox + 139 * fc - 32.9 * ph - 207 * ammonia 
            - 286.9 * nitrate - 22.3 * phosphate + 1.493 * bod * bod + 181.1 * fc * fc 
            + 2258 * ammonia * ammonia - 9.46 * nitrate * nitrate - 61 * phosphate * phosphate 
            - 0.69 * bod * disox - 26.21 * bod * fc + 2.65 * bod * ph + 20.45 * disox * fc 
            + 3.68 * disox * ph + 1.78 * disox * nitrate - 31.4 * fc * ph + 153.9 * fc * ammonia 
            - 18.0 * fc * nitrate + 87.8 * fc * phosphate + 8.4 * ph * ammonia + 33.02 * ph * nitrate 
            - 217 * ammonia * phosphate - 197.8 * fc * fc * fc - 8759 * ammonia * ammonia * ammonia 
            + 523 * phosphate * phosphate * phosphate;
            
            FCtaguig = -1173 - 52.28 * bod - 2.6 * disox - 28.0 * fc + 271 * ph 
            + 1474 * ammonia - 5.60 * nitrate + 1904 * phosphate - 1.758 * disox * disox 
            + 25.4 * fc * fc - 16.83 * ph * ph - 894 * ammonia * ammonia + 0.58 * nitrate * nitrate 
            - 902 * phosphate * phosphate + 6.558 * bod * disox + 1.85 * bod * fc + 38.6 * bod * ammonia 
            - 32.6 * bod * phosphate + 3.22 * disox * ph - 196.4 * disox * ammonia - 84.4 * disox * phosphate 
            + 95.5 * fc * ammonia + 11.9 * fc * nitrate + 33 * fc * phosphate - 111.5 * ph * phosphate 
            - 139.8 * ammonia * nitrate - 840 * ammonia * phosphate + 7356 * ammonia * ammonia * ammonia;

            document.getElementById("answer").textContent = `Laguna = ${FClaguna.toFixed(0)}`;
            document.getElementById("answera").textContent = `Rizal = ${FCrizal.toFixed(0)}`;
            document.getElementById("answerb").textContent = `Taguig/Muntinlupa = ${FCtaguig.toFixed(0)}`;
            break;
        default:
            document.getElementById("answer").textContent = "Invalid location";
    }

}
