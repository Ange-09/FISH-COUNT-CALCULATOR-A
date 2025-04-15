
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
        computedwhac = (whacm1 + whacm2 + whacm3) / 3
    }

    // Water Quality Variable Display
    let bod, disox, fc, ph, ammonia, nitrate, phosphate;
    let bodDisplay, disoxDisplay, fcDisplay, phDisplay, ammoniaDisplay, nitrateDisplay, phosphateDisplay;

    bod = computedrf + computedtemp + computedwhac;
    disox = computedrf * 0.5 + computedtemp * 0.3 + computedwhac * 0.2;
    fc = computedrf * 0.4 + computedtemp * 0.4 + computedwhac * 0.2;
    ph = computedrf * 0.3 + computedtemp * 0.5 + computedwhac * 0.2;
    ammonia = computedrf * 0.2 + computedtemp * 0.3 + computedwhac * 0.5;
    nitrate = computedrf * 0.3 + computedtemp * 0.2 + computedwhac * 0.5;
    phosphate = computedrf * 0.2 + computedtemp * 0.4 + computedwhac * 0.4;

    bodDisplay = bod * 1;
    disoxDisplay = disox * 1;
    fcDisplay = fc * 1;
    phDisplay = ph * 1;
    ammoniaDisplay = ammonia * 1;
    nitrateDisplay = nitrate * 1;
    phosphateDisplay = phosphate * 1;

    document.getElementById("bodValue").textContent = bodDisplay.toFixed(2);
    document.getElementById("disoxValue").textContent = disoxDisplay.toFixed(2);
    document.getElementById("fcValue").textContent = fcDisplay.toFixed(2);
    document.getElementById("phValue").textContent = phDisplay.toFixed(2);
    document.getElementById("ammoniaValue").textContent = ammoniaDisplay.toFixed(2);
    document.getElementById("nitrateValue").textContent = nitrateDisplay.toFixed(2);
    document.getElementById("phosphateValue").textContent = phosphateDisplay.toFixed(2);

    // Estimated Fish Count

    let FClaguna, FCrizal, FCtaguig;
    let location = document.getElementById("location").value;

    switch (location){
        case "laguna":
            FClaguna = bod * 0.5 + disox * 0.3 + fc * 0.2;
            fishCount = FClaguna
            document.getElementById("answer").textContent = `Laguna - ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "rizal":
            FCrizal = bod * 0.4 + disox * 0.4 + fc * 0.2;
            fishCount = FCrizal
            document.getElementById("answer").textContent = `Rizal - ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "taguig":
            FCtaguig = bod * 0.3 + disox * 0.5 + fc * 0.2;
            fishCount = FCtaguig
            document.getElementById("answer").textContent = `Taguig/Muntinlupa - ${fishCount.toFixed(0)}`;
            document.getElementById("answera").textContent = "";
            document.getElementById("answerb").textContent = "";
            break;
        case "all":
            FClaguna = bod * 0.5 + disox * 0.3 + fc * 0.2;
            FCrizal = bod * 0.4 + disox * 0.4 + fc * 0.2;
            FCtaguig = bod * 0.3 + disox * 0.5 + fc * 0.2;
            document.getElementById("answer").textContent = `Laguna - ${FClaguna.toFixed(0)}`;
            document.getElementById("answera").textContent = `Rizal - ${FCrizal.toFixed(0)}`;
            document.getElementById("answerb").textContent = `Taguig/Muntinlupa - ${FCtaguig.toFixed(0)}`;
            break;
        default:
            document.getElementById("answer").textContent = "Invalid location";
    }

}
