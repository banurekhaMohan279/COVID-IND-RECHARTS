const bodyParser = require("body-parser");
const cors = require("cors");
const csv = require("csv-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");

const data = [];
fs.createReadStream("cowin_vaccine_data_statewise.csv")
  .pipe(csv())
  .on("data", row => {
    data.push(row);
  })
  .on("end", () => {
    console.log("Data Loaded Successfully");
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));
const port = 3002;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

/**
 * List the places available from the dataset that is currently loaded
 */
app.get("/series", (req, res) => {
  const targets = Array.from(new Set(data.map(val => val["State"])));
  res.send(targets);
});

/**
 * List the raw data from the backend
 */
app.get("/data/:series", (req, res) => {
  const series = req.params.series;
  res.send(
    data.slice(-100).map(row => ({
      date: row["Updated On"],
      Dose1: row["First Dose Administered"],
      Dose2: row["Second Dose Administered"],
      Male: row["Male(Individuals Vaccinated)"],
      Female: row["Female(Individuals Vaccinated)"]
    }))
  );
});

/**
 * Main endpoint for predicting the results from the target provided. The target should be provided as a string as
 * returned by the list-targets endpoint
 */
app.get("/results/:target", (req, res) => {
  const target = req.params.target;

  // Run some validation on the input
  if (!target) {
    throw new Error(
      "Invalid request passed to endpoint, missing target from query params"
    );
  }

  const validKeys = Object.keys(data[0]);

  // Build out the fake responses for predictions and featureImportances
  const predictions = [];
  for (let item of data.slice(2, data.length)) {
    predictions.push({
      index: item.index,
      prediction: item[target] * (Math.random() + 0.5)
    });
  }

  const featureImportance = {};
  let remaining = 1;
  for (let key of validKeys) {
    if (key === target || key === "index") {
      continue;
    }
    const importance = Math.random() / 3;
    if (importance < remaining) {
      featureImportance[key] = importance;
      remaining = remaining - importance;
    } else {
      featureImportance[key] = remaining;
      remaining = 0;
    }
  }

  const confusionMetric = {};
  let confusionRemaining = data.length;
  for (let key of ["falsePositive", "truePositive", "falseNegative"]) {
    const count = Math.floor(Math.random() * confusionRemaining);
    confusionMetric[key] = count;
    confusionRemaining = confusionRemaining - count;
  }
  confusionMetric.trueNegative = confusionRemaining;

  const response = {
    confusionMetric,
    featureImportance,
    modelSummary: {
      algo_type: "linear.OLS",
      n_retrain: 0,
      n_training_gap: 0,
      n_training_warmup: 0,
      n_window_size: -1,
      scaling: "no_scaling",
      training_mode: "offline",
      weight_decay: 0.0
    },
    predictions,
    scoring_metrics: {
      pearsonR: Math.random(),
      spearmanRho: Math.random(),
      meanAbsError: Math.random() * 2,
      medianAbsError: Math.random() * 2,
      percentageAbsError: Math.random() * 100,
      signMatch: Math.random()
    }
  };
  res.send(response);
});

app.listen(port, () =>
  console.log(`Test app listening at http://localhost:${port}`)
);
