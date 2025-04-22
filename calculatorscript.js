
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

    bod = -5.96963814136802 
    - 0.0796890798750022 * computedwhac 
    + 0.267287884817956 * computedtemp 
    + 0.0012106465298565 * computedrf;

    disox = 25.346134937383 
    - 18.162843612709 * computedwhac 
    - 0.797532164668797 * computedtemp 
    - 0.0218214942692021 * computedrf 
    + 3.66214963005695 * computedwhac * computedwhac 
    + 0.0003831812558317 * computedtemp * computedtemp 
    + 0.0000026391425843 * computedrf * computedrf 
    + 0.604466399340218 * computedwhac * computedtemp 
    + 0.0139826849565213 * computedwhac * computedrf 
    + 0.0009176198833357 * computedtemp * computedrf 
    - 0.0007447014793646 * computedwhac * computedtemp * computedrf;

    fc = 3.7 - 20.1120381777305 * computedwhac 
    + 0.629837032249179 * computedtemp 
    - 0.160836132125871 * computedrf 
    + 4.18721111879697 * computedwhac * computedwhac 
    - 0.0189607840950437 * computedtemp * computedtemp 
    - 0.0000093305129161 * computedrf * computedrf 
    + 0.46475030882002 * computedwhac * computedtemp 
    + 0.161948103899138 * computedwhac * computedrf 
    + 0.0066336069760361 * computedtemp * computedrf 
    - 0.0064363642004059 * computedwhac * computedtemp * computedrf;
    

    ph = 6.32200916990859 
    + 4.20247110290381 * computedwhac 
    + 0.0183676553568897 * computedtemp 
    + 0.0588385314961386 * computedrf 
    + 0.318434438084706 * computedwhac * computedwhac 
    + 0.0019700903493682 * computedtemp * computedtemp 
    + 0.0000013280654752 * computedrf * computedrf 
    - 0.161798179436803 * computedwhac * computedtemp 
    - 0.0696918570546904 * computedwhac * computedrf 
    - 0.0023970831131222 * computedtemp * computedrf 
    + 0.0028167710092365 * computedwhac * computedtemp * computedrf;
    

    ammonia = -34.887127991911 
    - 20.9300208131494 * computedwhac 
    + 3.09358964338367 * computedtemp 
    - 0.0886840849473376 * computedrf 
    - 2.98619248282331 * Math.pow(computedwhac, 2) 
    - 0.0735019059514106 * Math.pow(computedtemp, 2) 
    + 0.000002722683721 * Math.pow(computedrf, 2) 
    + 0.933863755462643 * computedwhac * computedtemp 
    + 0.0472164005455918 * computedwhac * computedrf 
    + 0.0033659823894808 * computedtemp * computedrf 
    - 0.0018264398784996 * computedwhac * computedtemp * computedrf;

    nitrate = 5.34408641916579 
    - 1.21120724717597 * computedwhac 
    - 0.240281225696217 * computedtemp 
    - 0.0006012659656849 * computedrf;

    phosphate = -12.0009156809473 
             + 11.7444915168474 * computedwhac 
             + 0.4949100735191 * computedtemp 
             + 0.0241031005698706 * computedrf 
             + 0.0965957481454291 * computedwhac * computedwhac 
             - 0.0043207547876708 * computedtemp * computedtemp 
             - 0.0000012117841511 * computedrf * computedrf 
             - 0.453556846423537 * computedwhac * computedtemp 
             - 0.041931015146627 * computedwhac * computedrf 
             - 0.00097240571126 * computedtemp * computedrf 
             + 0.0016997736398341 * computedwhac * computedtemp * computedrf;

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
            FClaguna = 17.8255290745475 
            + 0.137591325868602 * bodDisplay 
            - 1.03008052446161 * disoxDisplay
            - 0.0003682548744485 * fcDisplay
            - 0.446990494710632 * ph 
            - 2.79981978245062 * ammoniaDisplay
            + 0.646949393719925 * nitrateDisplay
            + 1.23420696603556 * phosphateDisplay;
            
            fishCount = Math.pow(0.02 * FClaguna + 1, 1 / 0.02);
            document.getElementById("answer").textContent = `Laguna = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "rizal":
            FCrizal = -9.39632580946488 
            + 0.0671537232292146 * bodDisplay
            - 0.321675066889337 * disoxDisplay
            + 0.0008873935112914 * fcDisplay
            + 1.44721151573367 * phDisplay
            - 0.30862709748541 * ammoniaDisplay
            - 0.766425257434133 * nitrateDisplay
            - 2.59762457790903 * phosphateDisplay;

            fishCount = (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) / (1 + Math.exp((FCrizal - 0.436622) / 0.868131));
            document.getElementById("answer").textContent = `Rizal = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "taguig":
            FCtaguig = 364469.668407766
            + 9587.18270647752 * bodDisplay
            + 2155.99463876575 * disoxDisplay
            + 240.246124730839 * fcDisplay
            - 99967.651697831 * phDisplay
            + 147507.556639371 * ammoniaDisplay
            + 322922.215190419 * nitrateDisplay
            - 178310.646598282 * phosphateDisplay
            + 438.814766145436 * bodDisplay * bodDisplay
            - 0.0088522559042053 * fcDisplay * fcDisplay
            + 6726.81266232586 * phDisplay * phDisplay
            - 620097.22006516 * ammoniaDisplay * ammoniaDisplay
            - 5885.55361289034 * nitrateDisplay * nitrateDisplay
            - 13.5267928815601 * bodDisplay * fcDisplay
            - 1864.88867307752 * bodDisplay * phDisplay
            + 14948.0173151641 * bodDisplay * ammoniaDisplay
            + 14700.1178546766 * bodDisplay * nitrateDisplay
            + 35588.2124170803 * bodDisplay * phosphateDisplay
            + 6.63097993868699 * disoxDisplay * fcDisplay
            - 86611.1050987138 * disoxDisplay * ammoniaDisplay
            + 7793.55676865209 * disoxDisplay * phosphateDisplay
            - 26.4982120652278 * fcDisplay * phDisplay
            + 61.5134277024959 * fcDisplay * ammoniaDisplay
            - 88.5608058777565 * fcDisplay * nitrateDisplay
            - 143.618962818928 * fcDisplay * phosphateDisplay
            + 57118.579129105 * phDisplay * ammoniaDisplay
            - 41836.157851043 * phDisplay * nitrateDisplay
            + 491782.149235428 * ammoniaDisplay * phosphateDisplay
            + 82746.2045352212 * nitrateDisplay * phosphateDisplay;

            fishCount = FCtaguig
            document.getElementById("answer").textContent = `Taguig/Muntinlupa = ${fishCount.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "all":
            FClaguna = 17.8255290745475 
            + 0.137591325868602 * bodDisplay 
            - 1.03008052446161 * disoxDisplay
            - 0.0003682548744485 * fcDisplay
            - 0.446990494710632 * ph 
            - 2.79981978245062 * ammoniaDisplay
            + 0.646949393719925 * nitrateDisplay
            + 1.23420696603556 * phosphateDisplay;

            FCrizal = -9.39632580946488 
            + 0.0671537232292146 * bodDisplay
            - 0.321675066889337 * disoxDisplay
            + 0.0008873935112914 * fcDisplay
            + 1.44721151573367 * phDisplay
            - 0.30862709748541 * ammoniaDisplay
            - 0.766425257434133 * nitrateDisplay
            - 2.59762457790903 * phosphateDisplay;
            
            FCtaguig = 364469.668407766
            + 9587.18270647752 * bodDisplay
            + 2155.99463876575 * disoxDisplay
            + 240.246124730839 * fcDisplay
            - 99967.651697831 * phDisplay
            + 147507.556639371 * ammoniaDisplay
            + 322922.215190419 * nitrateDisplay
            - 178310.646598282 * phosphateDisplay
            + 438.814766145436 * bodDisplay * bodDisplay
            - 0.0088522559042053 * fcDisplay * fcDisplay
            + 6726.81266232586 * phDisplay * phDisplay
            - 620097.22006516 * ammoniaDisplay * ammoniaDisplay
            - 5885.55361289034 * nitrateDisplay * nitrateDisplay
            - 13.5267928815601 * bodDisplay * fcDisplay
            - 1864.88867307752 * bodDisplay * phDisplay
            + 14948.0173151641 * bodDisplay * ammoniaDisplay
            + 14700.1178546766 * bodDisplay * nitrateDisplay
            + 35588.2124170803 * bodDisplay * phosphateDisplay
            + 6.63097993868699 * disoxDisplay * fcDisplay
            - 86611.1050987138 * disoxDisplay * ammoniaDisplay
            + 7793.55676865209 * disoxDisplay * phosphateDisplay
            - 26.4982120652278 * fcDisplay * phDisplay
            + 61.5134277024959 * fcDisplay * ammoniaDisplay
            - 88.5608058777565 * fcDisplay * nitrateDisplay
            - 143.618962818928 * fcDisplay * phosphateDisplay
            + 57118.579129105 * phDisplay * ammoniaDisplay
            - 41836.157851043 * phDisplay * nitrateDisplay
            + 491782.149235428 * ammoniaDisplay * phosphateDisplay
            + 82746.2045352212 * nitrateDisplay * phosphateDisplay;

            let lagunaFC = Math.pow(0.02 * FClaguna + 1, 1 / 0.02);
            let rizalFC = (19138 * Math.exp((FCrizal - 0.436622) / 0.868131) + 1207.26) / (1 + Math.exp((FCrizal - 0.436622) / 0.868131));

            document.getElementById("answer").textContent = `Laguna = ${lagunaFC.toFixed(2)} mt (t)`;
            document.getElementById("answera").textContent = `Rizal = ${rizalFC.toFixed(2)} mt (t)`;
            document.getElementById("answerb").textContent = `Taguig/Muntinlupa = ${FCtaguig.toFixed(2)} mt (t)`;
            break;
        default:
            document.getElementById("answer").textContent = "Invalid location";
    }

}
