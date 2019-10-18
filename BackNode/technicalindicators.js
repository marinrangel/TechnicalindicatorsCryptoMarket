const MACD = require("technicalindicators").MACD;
const SMA = require("technicalindicators").SMA;
const RSI = require("technicalindicators").RSI;
const Stoch = require("technicalindicators").StochasticRSI;
const BB = require("technicalindicators").BollingerBands;

const minimoReq = 15;

module.exports = class Indicators {
  calculateIndicators(instrument) {
    this.calculateRSI(instrument);
    this.calculateMACD(instrument);
    this.calculateSMA(instrument);
    // this.calculateStoch(instrument);
    this.calculateBB(instrument);
    this.assignRecommendation(instrument);
  }

  calculateRSI(instrument) {
    var inputRSI = {
      values: instrument.prices,
      period: 14
    };

    if (instrument.prices.length > minimoReq) {
      try {
        var _calculo = RSI.calculate(inputRSI);
        // instrument.RSI_14 = _calculo;
        instrument.RSI_14_last =
          _calculo.length > 1 ? _calculo[_calculo.length - 1] : undefined;
      } catch (error) {
        instrument.error = error;
      }
    }
  }

  calculateMACD(instrument) {
    if (instrument.prices.length > minimoReq) {
      var macdInput = {
        values: instrument.prices,
        fastPeriod: 5,
        slowPeriod: 8,
        signalPeriod: 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false
      };

      try {
        var _calculo = MACD.calculate(macdInput);
        // instrument.MACD = _calculo;
        instrument.MACD_last =
          _calculo.length > 1 ? _calculo[_calculo.length - 1] : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }
    }
  }

  calculateSMA(instrument) {
    if (instrument.prices.length > minimoReq) {
      var inputSMA = {
        values: instrument.prices,
        reversedInput: true
      };

      try {
        inputSMA.period = 20;
        var _calculoSMA = SMA.calculate(inputSMA);

        // instrument.SMA_20 = _calculo;
        instrument.SMA_20_last =
          _calculoSMA.length > 1
            ? _calculoSMA[_calculoSMA.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputSMA.period = 50;
        var _calculoSMA_50 = SMA.calculate(inputSMA);

        // instrument.SMA_50 = _calculoSMA_50
        instrument.SMA_50_last =
          _calculoSMA_50.length > 1
            ? _calculoSMA_50[_calculoSMA_50.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputSMA.period = 200;
        var _calculoSMA_200 = SMA.calculate(inputSMA);

        // instrument.SMA_200 = _calculoSMA_200;
        instrument.SMA_200_last =
          _calculoSMA_200.length > 1
            ? _calculoSMA_200[_calculoSMA_200.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }
    }
  }

  calculateStoch(instrument) {
    if (instrument.prices.length > minimoReq) {
      var inputStoch = {
        values: instrument.prices
      };

      try {
        inputStoch.period = 20;
        var _calculoStoch_20 = Stoch.calculate(inputStoch);

        // instrument.Stoch_20 = _calculoStoch_20;
        instrument.Stoch_20_last =
          _calculoStoch_20.length > 1
            ? _calculoStoch_20[_calculoStoch_20.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputStoch.period = 50;
        var _calculoStoch_50 = Stoch.calculate(inputStoch);

        // instrument.Stoch_50 = _calculoStoch_50
        instrument.Stoch_50_last =
          _calculoStoch_50.length > 1
            ? _calculoStoch_50[_calculoStoch_50.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputStoch.period = 200;
        var _calculoStoch_200 = Stoch.calculate(inputStoch);

        // instrument.Stoch_200 = _calculoStoch_200;
        instrument.Stoch_200_last =
          _calculoStoch_200.length > 1
            ? _calculoStoch_200[_calculoStoch_200.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }
    }
  }

  calculateBB(instrument) {
    if (instrument.prices.length > minimoReq) {
      var inputBB = {
        values: instrument.prices,
        stdDev: 2
      };

      try {
        inputBB.period = 20;
        var _calculoBB_20 = BB.calculate(inputBB);

        // instrument.BB_20 = _calculoBB_20;
        instrument.BB_20_last =
          _calculoBB_20.length > 1
            ? _calculoBB_20[_calculoBB_20.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputBB.period = 50;
        var _calculoBB_50 = BB.calculate(inputBB);

        // instrument.BB_50 = _calculoBB_50
        instrument.BB_50_last =
          _calculoBB_50.length > 1
            ? _calculoBB_50[_calculoBB_50.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }

      try {
        inputBB.period = 200;
        var _calculoBB_200 = BB.calculate(inputBB);

        // instrument.BB_200 = _calculoBB_200;
        instrument.BB_200_last =
          _calculoBB_200.length > 1
            ? _calculoBB_200[_calculoBB_200.length - 1]
            : undefined;
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }
    }
  }

  assignRecommendation(instrument) {
    if (instrument.prices.length > minimoReq) {
      try {
        instrument.lastPrice = instrument.prices[instrument.prices.length - 1];

        if (
          instrument.lastPrice >
          instrument.SMA_20_last >
          instrument.SMA_50_last >
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "STRONG BUY";
          instrument.algorithm =
            "lastPrice > SMA_20_last > SMA_50_last > SMA_200_last";
        } else if (
          instrument.SMA_20_last >
          instrument.lastPrice >
          instrument.SMA_50_last >
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "BUY";
          instrument.algorithm =
            "SMA_20_last > lastPrice > SMA_50_last > SMA_200_last";
        } else if (
          instrument.SMA_20_last >
          instrument.SMA_50_last >
          instrument.lastPrice >
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "SELL";
          instrument.algorithm =
            "SMA_20_last > SMA_50_last > lastPrice > SMA_200_last";
        } else if (
          instrument.SMA_20_last >
          instrument.SMA_50_last >
          instrument.SMA_200_last >
          instrument.lastPrice
        ) {
          instrument.recomendacion = "STRONG SELL";
          instrument.algorithm =
            "SMA_20_last > SMA_50_last > SMA_200_last > lastPrice";
        } else if (instrument.lastPrice < instrument.SMA_20_last > instrument.SMA_50_last) {
          instrument.recomendacion = "SELL";
          instrument.algorithm =
            "instrument.lastPrice < instrument.SMA_20_last > instrument.SMA_50_last";
        } else if (
          instrument.SMA_200_last >
          instrument.lastPrice >
          instrument.SMA_20_last >
          instrument.SMA_50_last
        ) {
          instrument.recomendacion = "BUY";
          instrument.algorithm =
            "SMA_200_last > lastPrice > SMA_20_last > SMA_50_last";
        } else if (
          instrument.SMA_50_last <
          instrument.lastPrice <
          instrument.SMA_20_last <
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "HOLD";
          instrument.algorithm =
            "SMA_50_last < lastPrice < SMA_20_last < SMA_200_last";
        } else if (
          instrument.SMA_200_last <
          instrument.SMA_50_last <
          instrument.lastPrice <
          instrument.SMA_20_last
        ) {
          instrument.recomendacion = "BUY";
          instrument.algorithm =
            "SMA_200_last < SMA_50_last < lastPrice < SMA_20_last";
        } else if (
          instrument.SMA_20_last <
          instrument.lastPrice <
          instrument.SMA_50_last <
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "SELL";
          instrument.algorithm =
            "SMA_20_last < lastPrice < SMA_50_last < SMA_200_last";
        } else if (
          instrument.SMA_200_last <
          instrument.lastPrice <
          instrument.SMA_50_last <
          instrument.SMA_20_last
        ) {
          instrument.recomendacion = "HOLD";
          instrument.algorithm =
            "SMA_200_last < lastPrice < SMA_50_last < SMA_20_last";
        } else if (
          instrument.lastPrice <
          instrument.SMA_200_last <
          instrument.SMA_50_last <
          instrument.SMA_20_last
        ) {
          instrument.recomendacion = "STRONG SELL";
          instrument.algorithm =
            "lastPrice < SMA_200_last < SMA_50_last < SMA_20_last";
        } else if (
          instrument.lastPrice <
          instrument.SMA_200_last <
          instrument.SMA_20_last <
          instrument.SMA_50_last
        ) {
          instrument.recomendacion = "STRONG SELL";
          instrument.algorithm =
            "lastPrice < SMA_200_last < SMA_20_last < SMA_50_last";
        } else if (
          instrument.lastPrice <
          instrument.SMA_20_last <
          instrument.SMA_200_last <
          instrument.SMA_50_last
        ) {
          instrument.recomendacion = "STRONG SELL";
          instrument.algorithm =
            "lastPrice < SMA_20_last < SMA_200_last < SMA_50_last";
        } else if (
          instrument.lastPrice >
          instrument.SMA_200_last >
          instrument.SMA_20_last >
          instrument.SMA_50_last
        ) {
          instrument.recomendacion = "STRONG BUY";
          instrument.algorithm =
            "lastPrice > SMA_200_last > SMA_20_last > SMA_50_last";
        } else if (
          instrument.lastPrice <
          instrument.SMA_50_last <
          instrument.SMA_20_last <
          instrument.SMA_200_last
        ) {
          instrument.recomendacion = "STRONG SELL";
          instrument.algorithm =
            "lastPrice < SMA_50_last < SMA_20_last < SMA_200_last";
        } else {
          instrument.recomendacion = "VALIDAR";
          instrument.error =
            "datos: lastPrice:" +
            instrument.lastPrice +
            ", SMA_20_last:" +
            instrument.SMA_20_last +
            ", SMA_50_last: " +
            instrument.SMA_50_last +
            ", SMA_200_last:" +
            instrument.SMA_200_last;
        }
      } catch (error) {
        console.log("error", error);
        instrument.error = instrument.error + "|error|" + error;
      }
    }
  }
};
