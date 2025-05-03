
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
            FClaguna =   -71874.2516 + 3403.8017 * bodDisplay + 2262.1574 * disoxDisplay + 359.7628 * fcDisplay + 8941.4596 * phDisplay 
            - 555938.2609 * ammoniaDisplay + 258427.555 * nitrateDisplay - 91071.9993 * phosphateDisplay + 1578.2134 * bodDisplay * bodDisplay 
            - 531094.4265 * ammoniaDisplay * ammoniaDisplay - 3328.6075 * nitrateDisplay * nitrateDisplay - 14.8151 * bodDisplay * fcDisplay 
            - 1611.4812 * bodDisplay * phDisplay + 6728.1092 * bodDisplay * ammoniaDisplay + 9508.1098 * bodDisplay * nitrateDisplay 
            + 22392.3036 * bodDisplay * phosphateDisplay + 3.9601 * disoxDisplay * fcDisplay - 95702.4078 * disoxDisplay * ammoniaDisplay 
            - 40.6626 * fcDisplay * phDisplay + 161.9052 * fcDisplay * ammoniaDisplay - 116.1383 * fcDisplay * nitrateDisplay + 149626.466 * phDisplay * ammoniaDisplay 
            - 32207.285 * phDisplay * nitrateDisplay + 158911.3812 * ammoniaDisplay * nitrateDisplay + 224303.1266 * ammoniaDisplay * phosphateDisplay 
            + 27706.6192 * nitrateDisplay * phosphateDisplay;
            
            fishCount = FClaguna;
            fishCount = isNaN(fishCount) || fishCount < 0 ? 0 : fishCount;
            document.getElementById("answer").textContent = `Laguna = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "rizal":
            FCrizal = 1418.7104 - 33.3082 * bodDisplay + 6.8853 * disoxDisplay - 0.1184 * fcDisplay - 346.812 * phDisplay + 2062.3839 * ammoniaDisplay 
            - 4.9618 * nitrateDisplay + 23.6939 * phosphateDisplay - 1.525 * bodDisplay * bodDisplay - 3.3272 * disoxDisplay * disoxDisplay 
            - 0.00003794 * fcDisplay * fcDisplay + 18.0923 * phDisplay * phDisplay - 11.4861 * nitrateDisplay * nitrateDisplay 
            + 226.2403 * phosphateDisplay * phosphateDisplay + 0.00714 * bodDisplay * fcDisplay + 4.3392 * bodDisplay * phDisplay 
            + 38.7234 * bodDisplay * phosphateDisplay + 0.003803 * disoxDisplay * fcDisplay + 5.5507 * disoxDisplay * phDisplay 
            - 40.45 * disoxDisplay * ammoniaDisplay + 2.3497 * disoxDisplay * nitrateDisplay + 0.0177 * fcDisplay * phDisplay 
            - 0.1484 * fcDisplay * ammoniaDisplay + 0.0472 * fcDisplay * nitrateDisplay - 0.4255 * fcDisplay * phosphateDisplay 
            - 198.2209 * phDisplay * ammoniaDisplay - 15.7109 * phDisplay * phosphateDisplay - 482.2224 * ammoniaDisplay * nitrateDisplay;

            fishCount = (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) /
                        (1 + Math.exp((FCrizal - 0.436622) / 0.868131));
            fishCount = isNaN(fishCount) || fishCount < 0 ? 0 : fishCount;
            document.getElementById("answer").textContent = `Rizal = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "taguig":
            FCtaguig = -199.7645 - 66.0003 * bodDisplay + 17.3138 * disoxDisplay + 20.2422 * phDisplay + 1757.3924 * ammoniaDisplay 
            + 335.6692 * nitrateDisplay + 1495.3421 * phosphateDisplay - 1.2915 * bodDisplay * bodDisplay 
            - 1.436 * disoxDisplay * disoxDisplay + 640.9735 * ammoniaDisplay * ammoniaDisplay + 383.459 * phosphateDisplay * phosphateDisplay 
            + 8.1801 * bodDisplay * disoxDisplay + 76.157 * bodDisplay * ammoniaDisplay + 8.5391 * bodDisplay * nitrateDisplay 
            + 9.198 * bodDisplay * phosphateDisplay - 242.3827 * disoxDisplay * ammoniaDisplay + 15.8196 * disoxDisplay * nitrateDisplay 
            - 90.8185 * disoxDisplay * phosphateDisplay - 54.8223 * phDisplay * nitrateDisplay - 94.7751 * phDisplay * phosphateDisplay 
            - 1757.6186 * ammoniaDisplay * phosphateDisplay - 279.7743 * nitrateDisplay * phosphateDisplay;

            fishCount = (0.02*FCtaguig+1)**(1/0.02)
            fishCount = isNaN(fishCount) || fishCount < 0 ? 0 : fishCount;
            document.getElementById("answer").textContent = `Taguig/Muntinlupa = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "all":
            FClaguna =   -71874.2516 + 3403.8017 * bodDisplay + 2262.1574 * disoxDisplay + 359.7628 * fcDisplay + 8941.4596 * phDisplay 
            - 555938.2609 * ammoniaDisplay + 258427.555 * nitrateDisplay - 91071.9993 * phosphateDisplay + 1578.2134 * bodDisplay * bodDisplay 
            - 531094.4265 * ammoniaDisplay * ammoniaDisplay - 3328.6075 * nitrateDisplay * nitrateDisplay - 14.8151 * bodDisplay * fcDisplay 
            - 1611.4812 * bodDisplay * phDisplay + 6728.1092 * bodDisplay * ammoniaDisplay + 9508.1098 * bodDisplay * nitrateDisplay 
            + 22392.3036 * bodDisplay * phosphateDisplay + 3.9601 * disoxDisplay * fcDisplay - 95702.4078 * disoxDisplay * ammoniaDisplay 
            - 40.6626 * fcDisplay * phDisplay + 161.9052 * fcDisplay * ammoniaDisplay - 116.1383 * fcDisplay * nitrateDisplay + 149626.466 * phDisplay * ammoniaDisplay 
            - 32207.285 * phDisplay * nitrateDisplay + 158911.3812 * ammoniaDisplay * nitrateDisplay + 224303.1266 * ammoniaDisplay * phosphateDisplay 
            + 27706.6192 * nitrateDisplay * phosphateDisplay;

            FCrizal = 1418.7104 - 33.3082 * bodDisplay + 6.8853 * disoxDisplay - 0.1184 * fcDisplay - 346.812 * phDisplay + 2062.3839 * ammoniaDisplay 
            - 4.9618 * nitrateDisplay + 23.6939 * phosphateDisplay - 1.525 * bodDisplay * bodDisplay - 3.3272 * disoxDisplay * disoxDisplay 
            - 0.00003794 * fcDisplay * fcDisplay + 18.0923 * phDisplay * phDisplay - 11.4861 * nitrateDisplay * nitrateDisplay 
            + 226.2403 * phosphateDisplay * phosphateDisplay + 0.00714 * bodDisplay * fcDisplay + 4.3392 * bodDisplay * phDisplay 
            + 38.7234 * bodDisplay * phosphateDisplay + 0.003803 * disoxDisplay * fcDisplay + 5.5507 * disoxDisplay * phDisplay 
            - 40.45 * disoxDisplay * ammoniaDisplay + 2.3497 * disoxDisplay * nitrateDisplay + 0.0177 * fcDisplay * phDisplay 
            - 0.1484 * fcDisplay * ammoniaDisplay + 0.0472 * fcDisplay * nitrateDisplay - 0.4255 * fcDisplay * phosphateDisplay 
            - 198.2209 * phDisplay * ammoniaDisplay - 15.7109 * phDisplay * phosphateDisplay - 482.2224 * ammoniaDisplay * nitrateDisplay;
            
            FCtaguig = -199.7645 - 66.0003 * bodDisplay + 17.3138 * disoxDisplay + 20.2422 * phDisplay + 1757.3924 * ammoniaDisplay 
            + 335.6692 * nitrateDisplay + 1495.3421 * phosphateDisplay - 1.2915 * bodDisplay * bodDisplay 
            - 1.436 * disoxDisplay * disoxDisplay + 640.9735 * ammoniaDisplay * ammoniaDisplay + 383.459 * phosphateDisplay * phosphateDisplay 
            + 8.1801 * bodDisplay * disoxDisplay + 76.157 * bodDisplay * ammoniaDisplay + 8.5391 * bodDisplay * nitrateDisplay 
            + 9.198 * bodDisplay * phosphateDisplay - 242.3827 * disoxDisplay * ammoniaDisplay + 15.8196 * disoxDisplay * nitrateDisplay 
            - 90.8185 * disoxDisplay * phosphateDisplay - 54.8223 * phDisplay * nitrateDisplay - 94.7751 * phDisplay * phosphateDisplay 
            - 1757.6186 * ammoniaDisplay * phosphateDisplay - 279.7743 * nitrateDisplay * phosphateDisplay;

            let lagunaFC = FClaguna;
            let rizalFC =   (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) /
                            (1 + Math.exp((FCrizal - 0.436622) / 0.868131));
            let taguigFC = (0.02*FCtaguig+1)**(1/0.02);

            lagunaFC = isNaN(lagunaFC) || lagunaFC < 0 ? 0 : lagunaFC;
            rizalFC = isNaN(rizalFC) || rizalFC < 0 ? 0 : rizalFC;
            taguigFC = isNaN(taguigFC) || taguigFC < 0 ? 0 : taguigFC;

            document.getElementById("answer").textContent = `Laguna = ${lagunaFC.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = `Rizal = ${rizalFC.toFixed(2)} mt (t)`;
            document.getElementById("answerb").textContent = `Taguig/Muntinlupa = ${taguigFC.toFixed(2)} mt (t)`;
            break;
        default:
            document.getElementById("answer").textContent = "Invalid location";
    }

}
