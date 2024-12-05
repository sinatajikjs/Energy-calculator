function customRound(input) {
  return parseFloat(Number(input).toFixed(2));
}

function submit() {
  const inputs = {
    GasUnit: document.getElementById("gas-unit-price").value,
    GasStanding: document.getElementById("gas-standing-charge").value,
    ElectricityUnit: document.getElementById("electricity-unit-price").value,
    ElectricityStanding: document.getElementById("electricity-standing-charge")
      .value,
  };

  const newInputs = JSON.parse(JSON.stringify(inputs));

  const newValues = Object.values(inputs).map((value) => Number(value));
  Object.keys(newInputs).map(
    (key, index) => (newInputs[key] = newValues[index])
  );

  const getMonthlyStandingCharge = (input) => {
    return (input * 365) / 12;
  };

  const accStandingCharge = (() => {
    return (
      (getMonthlyStandingCharge(newInputs.GasStanding) +
        getMonthlyStandingCharge(newInputs.ElectricityStanding)) /
      100
    );
  })();

  const monthlyUsageKWH = {
    gas: Number(document.getElementById("gas-usage").value),
    electricity: Number(document.getElementById("electricity-usage").value),
  };

  const monthlyUsagePounds = {
    gas: (monthlyUsageKWH["gas"] * newInputs.GasUnit) / 100,
    electricity:
      (monthlyUsageKWH["electricity"] * newInputs.ElectricityUnit) / 100,
  };
  const shouldIncludeVat = document.getElementById("include-vat").checked;

  const totalMonthlyUsage =
    monthlyUsagePounds.gas + monthlyUsagePounds.electricity + accStandingCharge;

  const totalAmount = shouldIncludeVat
    ? totalMonthlyUsage * 1.05
    : totalMonthlyUsage;

  const amountToShow = `£${customRound(totalAmount)}`;

  document.getElementById("amount").innerText = amountToShow;
}
