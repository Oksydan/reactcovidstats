export const formatDate = (d) => {
  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}


export const prepareData = ({ country, cases, deaths, tests }) => {
  const dataObject = {
    name: country,
    newCases: cases.new ? +cases.new.replace("+", "") : null,
    activeCases: cases.active,
    criticalCases: cases.critical,
    recoveredCases: cases.recovered,
    totalCases: cases.total,
    newDeaths: deaths.new ? +deaths.new.replace("+", "") : null,
    totalDeaths: deaths.total,
    totalTests: tests.total,
  };

  return dataObject;
};