// ==========================================
// SOLARIA CALC
// PROYECTO DEMOSTRATIVO
// ==========================================


const form =
  document.getElementById("solarForm");

const placeholder =
  document.getElementById("resultsPlaceholder");

const results =
  document.getElementById("resultsContent");

const panelsOutput =
  document.getElementById("panelResult");

const powerOutput =
  document.getElementById("powerResult");

const productionOutput =
  document.getElementById("productionResult");

const coverageOutput =
  document.getElementById("coverageResult");

const savingOutput =
  document.getElementById("savingResult");

const barPercentage =
  document.getElementById("barPercentage");

const barFill =
  document.getElementById("barFill");

const resultTitle =
  document.getElementById("resultTitle");

const resultMessage =
  document.getElementById("resultMessage");

const resetButton =
  document.getElementById("resetButton");



// ==========================================
// CÁLCULO
// ==========================================

form.addEventListener("submit", event => {

  event.preventDefault();


  // DATOS DEL USUARIO

  const monthlyConsumption =
    Number(
      document.getElementById("consumption").value
    );

  const roofArea =
    Number(
      document.getElementById("roofArea").value
    );

  const orientationFactor =
    Number(
      document.getElementById("orientation").value
    );

  const selfConsumptionFactor =
    Number(
      document.getElementById("homeType").value
    );



  // ==========================================
  // SUPUESTOS DEL MODELO DEMO
  // ==========================================

  const panelPower = 0.45;

  const panelArea = 2;

  const baseProductionPerKW = 1450;

  const electricityPrice = 0.20;



  // CONSUMO ANUAL

  const annualConsumption =
    monthlyConsumption * 12;



  // POTENCIA NECESARIA APROXIMADA

  const desiredPower =
    annualConsumption /
    (
      baseProductionPerKW *
      orientationFactor
    );



  // PANEL SEGÚN DEMANDA

  let panelsByConsumption =
    Math.ceil(
      desiredPower /
      panelPower
    );



  // PANEL SEGÚN TEJADO

  const maximumPanels =
    Math.floor(
      roofArea /
      panelArea
    );



  // USAMOS EL MENOR DE LOS DOS

  let panels =
    Math.min(
      panelsByConsumption,
      maximumPanels
    );



  // COMO MÍNIMO 1

  panels =
    Math.max(
      panels,
      1
    );



  // POTENCIA INSTALADA

  const installedPower =
    panels *
    panelPower;



  // PRODUCCIÓN

  const annualProduction =
    installedPower *
    baseProductionPerKW *
    orientationFactor;



  // COBERTURA

  const coverage =
    Math.min(
      (
        annualProduction /
        annualConsumption
      ) * 100,
      100
    );



  // ENERGÍA APROVECHADA

  const usableEnergy =
    Math.min(
      annualProduction *
      selfConsumptionFactor,
      annualConsumption
    );



  // AHORRO DEMO

  const annualSaving =
    usableEnergy *
    electricityPrice;



  // ==========================================
  // MOSTRAR RESULTADOS
  // ==========================================

  placeholder.style.display =
    "none";

  results.classList.add(
    "active"
  );


  panelsOutput.textContent =
    panels;


  powerOutput.textContent =
    installedPower
      .toFixed(1) +
    " kWp";


  productionOutput.textContent =
    Math.round(
      annualProduction
    ).toLocaleString("es-ES")
    +
    " kWh";


  coverageOutput.textContent =
    Math.round(
      coverage
    )
    +
    " %";


  savingOutput.textContent =
    Math.round(
      annualSaving
    ).toLocaleString("es-ES")
    +
    " €";


  barPercentage.textContent =
    Math.round(
      coverage
    )
    +
    " %";


  setTimeout(() => {

    barFill.style.width =
      coverage +
      "%";

  }, 100);



  // ==========================================
  // MENSAJE DINÁMICO
  // ==========================================

  if (
    maximumPanels <
    panelsByConsumption
  ) {

    resultTitle.textContent =
      "El tejado limita la instalación";

    resultMessage.textContent =
      "Según esta simulación, la superficie disponible no permitiría instalar todos los paneles necesarios para cubrir la demanda estimada.";

  }

  else if (
    coverage >= 90
  ) {

    resultTitle.textContent =
      "Potencial solar alto";

    resultMessage.textContent =
      "Según este modelo simplificado, la instalación podría producir una parte muy elevada del consumo eléctrico anual indicado.";

  }

  else if (
    coverage >= 60
  ) {

    resultTitle.textContent =
      "Buen potencial solar";

    resultMessage.textContent =
      "La simulación indica una cobertura relevante del consumo anual, aunque una instalación real necesitaría un estudio mucho más detallado.";

  }

  else {

    resultTitle.textContent =
      "Cobertura parcial";

    resultMessage.textContent =
      "El sistema simulado cubriría una parte del consumo. La orientación, el espacio disponible o la demanda limitan el resultado.";

  }


  // SCROLL AL RESULTADO EN MÓVIL

  if (
    window.innerWidth <
    900
  ) {

    document
      .getElementById("resultsCard")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  }

});



// ==========================================
// REINICIAR
// ==========================================

resetButton.addEventListener(
  "click",
  () => {

    form.reset();

    document
      .getElementById("consumption")
      .value = 350;

    document
      .getElementById("roofArea")
      .value = 40;


    results.classList.remove(
      "active"
    );

    placeholder.style.display =
      "flex";

    barFill.style.width =
      "0";


    document
      .getElementById("calculadora")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);
