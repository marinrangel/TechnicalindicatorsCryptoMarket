// Configuración Binance
const Config = {
  BinanceApiKey: '',
  BinanceApiSecret: '',
  Intervalos: [
    {lapso: '1m', milisegundos: 60000},
    {lapso: '3m', milisegundos: 180000},
    {lapso: '5m', milisegundos: 300000},
    {lapso: '15m', milisegundos: 900000},
  ],
  REDIS_PORT: 6379,
  REDIS_HOST: 'localhost'
}

module.exports = Config;