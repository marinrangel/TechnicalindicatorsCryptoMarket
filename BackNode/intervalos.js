const Indicators = require("./technicalindicators");
const conRedis = require("./redis");
const conf = require("./config");

const binance = require("node-binance-api")().options({
  APIKEY: conf.BinanceApiKey,
  APISECRET: conf.BinanceApiSecret,
  useServerTime: true
});

const getRedis = key => {
  red = new conRedis();
  return new Promise((resolve, reject) => {
    try {
      red.client.get(key, (err, object) => {
        if (red.client) red.client.quit();

        if (err) {
          reject(err);
        } else {
          resolve(object);
        }
      });
    } catch (error) {
      if (red.client) red.client.quit();

      console.log("error", error);
    }
  });
};

const setRedis = (key, datos) => {
  red = new conRedis();
  return new Promise((resolve, reject) => {
    try {
      console.log("key:", key);
      red.client.set(key, JSON.stringify(datos), (err, object) => {
        if (red.client) red.client.quit();

        if (err) {
          reject(err);
        } else {
          resolve(object);
        }
      });
    } catch (error) {
      if (red.client) red.client.quit();

      console.log("error", error);
    }
  });
};

const getSymbols = () => {
  getRedis("Symbols")
    .then(result => {
      return JSON.parse(result);
    })
    .then(createIntervals)
    .catch(error => {
      console.log("error", error);
    });
};

const createIntervals = symbols => {
  console.log("Create Intervals");
  if (symbols !== null && symbols.length > 0) {
    conf.Intervalos.forEach(element => {
      setInterval(() => {
        intervalFunc(element.lapso, symbols);
      }, element.milisegundos);
    });
  } else console.log("There are no symbols to display, not create Intervals.");
};

const intervalFunc = (interval, symbols) => {
  forInterval(interval, symbols)
    .then(indicators => {
      setRedis("Interval_" + interval, indicators);
    })
    .catch(console.log);
};

const forInterval = (interval, symbols) => {
  return new Promise((resolve, reject) => {
    console.log("Interval " + interval);
    var arrayPromises = [];

    try {
      symbols.forEach(element => {
        let result = getHistorical(element, interval)
          .then(calculateIndicators)
          .catch(console.log);

        arrayPromises.push(result);
      });

      resolve(Promise.all(arrayPromises));
    } catch (error) {
      reject(error);
    }
  });
};

const calculateIndicators = result => {
  const ind = new Indicators();

  console.log(
    "Calculate Indicator: " + result.symbol + "_" + result.interval
  );

  try {
    ind.calculateIndicators(result);

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const getHistorical = (element, interval) => {
  console.log("Get Historical " + element + ", interval " + interval);
  return new Promise((resolve, reject) => {
    binance.candlesticks(
      element,
      interval,
      (error, ticks, symbol) => {
        try {
          var instrument = {
            symbol: symbol,
            interval: interval,
            prices: []
          };

          if (ticks !== undefined && ticks.length > 0) {
            ticks.forEach(tick => {
              let [
                time,
                open,
                high,
                low,
                close,
                volume,
                closeTime,
                assetVolume,
                trades,
                buyBaseVolume,
                buyAssetVolume,
                ignored
              ] = tick;
              instrument.prices.push(parseFloat(close));
            });
          }

          resolve(instrument);
        } catch (error) {
          console.log("error-symbol: ", symbol);
          console.log("error-interval: ", element.interval);
          console.log("error: ", error);
          reject(error);
        }
      },
      { limit: 1000, endTime: 1514764800000 }
    );
  });
};

getSymbols();
