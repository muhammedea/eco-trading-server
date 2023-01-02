var express = require("express");
var package = require("../package.json");
var router = express.Router();
var crypto = require("crypto");
var uuid4 = require("uuid");
var redis = require("redis");

/*const redis_client = redis.createClient({
  url: 'redis://localhost:6379'
});
redis_client.connect();
redis_client.ping();*/

function is_json(str) {
  try {
    return !!str && JSON.parse(str);
  } catch (e) {
    return false;
  }
}
var counter = 1;
function getOrderJson(maker, isSell, amountA, amountB, processTime) {
  counter++;
  return {
    order: {
      sender: "0x0000000000000000000000000000000000000000",
      maker: maker,
      taker: "0x0000000000000000000000000000000000000000",
      takerTokenFeeAmount: "0",
      makerAmount: amountA,
      takerAmount: amountB,
      makerToken: isSell
        ? "0xbE593B942715FCb68C4062024f2A9be92f429C6a"
        : "0x46DA39648179376DEF71076dFC5F45171239ecEd",
      takerToken: isSell
        ? "0x46DA39648179376DEF71076dFC5F45171239ecEd"
        : "0xbE593B942715FCb68C4062024f2A9be92f429C6a",
      salt: "40584472803756371677282334946406041345967204" + counter,
      verifyingContract: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
      feeRecipient: "0x0000000000000000000000000000000000000000",
      expiry: "2000000000",
      chainId: 80001,
      pool: "0x0000000000000000000000000000000000000000000000000000000000000000",
    },
    metaData: {
      orderHash:
        "0xe4b47eb16a24c7e2de185e64ad9234b13052f1f60a0a7c108f3ec0feec3cf8ac",
      remainingFillableTakerAmount: "10000000",
      createdAt: "2021-03-05T15:32:18.473Z",
      ...(processTime ? {processTime} : null)
    },
  };
}

router.get("/", function (req, res, next) {
  res.json({ server: "Ecolarium 0x trading api", version: 0.1 });
});

// GET /orderbook/v1/?baseToken= &quoteToken=
router.get("/orderbook/v1/", function (req, res, next) {
  console.log(req.url, req.query);
  const json = {
    bids: {
      total: 15,
      page: 1,
      perPage: 20,
      records: [
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '0998000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '0997000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '0996000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '0994000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '0990000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '0990000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '0990000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '0990000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '99990000000000000000', '101000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '126100000000000000000', '130000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1261000000000000000000', '1300000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1485000000000000000000', '1500000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '126100000000000000000', '130000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1261000000000000000000', '1300000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1485000000000000000000', '1500000000000000000000'),
      ],
    },
    asks: {
      total: 15,
      page: 1,
      perPage: 20,
      records: [
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1000100000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1001000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1002000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1003000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1010000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1010000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1010000000000000000', '1000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1010000000000000000', '1000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '101000000000000000000', '100000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '131300000000000000000', '130000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1213200000000000000000', '1200000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1518000000000000000000', '1500000000000000000000'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '131560000000000000000', '130000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1316900000000000000000', '1300000000000000000000'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1524000000000000000000', '1500000000000000000000'),
      ],
    },
  };
  res.json(json);
});

// GET /orderbook/v1/orders [...order params...]
// extra query param "trader". The address of either the maker or the taker
router.get("/orderbook/v1/orders", function (req, res, next) {
  console.log(req.url, req.query);
  const json = {
    bids: {
      total: 0,
      page: 1,
      perPage: 20,
      records: [],
    },
    asks: {
      total: 0,
      page: 1,
      perPage: 20,
      records: [],
    },
  };
  res.json(json);
});

// POST /orderbook/v1/order
router.post("/orderbook/v1/order", async function (req, res, next) {
  console.log(req.url, req.query, req.body);
  res.status(400);
});

// GET /orderbook/v1/recent_trades?baseToken= &quoteToken=
router.get("/orderbook/v1/recent_trades", function (req, res, next) {
  console.log(req.url, req.query);
  const json = {
    processed_orders: {
      total: 0,
      page: 1,
      perPage: 20,
      records: [
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '1010000000000000000', '1000000000000000000', '2023-01-01T23:31:47.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '1000000000000000000', '1000000000000000000', '2023-01-01T23:30:12.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '5000000000000000000', '5000000000000000000', '2023-01-01T23:12:23.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '200000000000000000', '200000000000000000', '2023-01-01T23:06:56.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '10000000000000000', '9980000000000000', '2023-01-01T22:30:37.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '10001000000000000000', '10000000000000000000', '2023-01-01T22:30:11.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '100000000000000000000', '99700000000000000000', '2023-01-01T22:12:12.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '10010000000000000', '10000000000000000', '2023-01-01T22:11:18.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1000000000000000000', '0996000000000000000', '2023-01-01T22:05:02.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '1002000000000000000', '1000000000000000000', '2023-01-01T22:04:16.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", true, '1003000000000000000', '1000000000000000000', '2023-01-01T21:36:15.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", true, '1010000000000000000', '1000000000000000000', '2023-01-01T21:35:35.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1000000000000000000', '0994000000000000000', '2023-01-01T21:11:25.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", true, '1010000000000000000', '1000000000000000000', '2023-01-01T21:11:22.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1000000000000000000', '990000000000000000', '2023-01-01T21:10:08.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1000000000000000000', '990000000000000000', '2023-01-01T21:09:27.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", true, '1010000000000000000', '1000000000000000000', '2023-01-01T20:37:32.611Z'),
        getOrderJson("0x7B8080FEf623D06f0530FC5F5e2585053A0b756F", false, '1000000000000000000', '990000000000000000', '2023-01-01T20:37:25.611Z'),
        getOrderJson("0xfF2d57beE0784AC15b9251239b746C0429dAD66e", false, '1000000000000000000', '990000000000000000', '2023-01-01T20:31:04.611Z'),
      ],
    },
  };
  res.json(json);
});

// GET /orderbook/v1/stats?baseToken= &quoteToken=
router.get("/orderbook/v1/stats", function (req, res, next) {
  console.log(req.url, req.query);
  res.json({
    currentPriice: "1.01",
    lowest24hour: "0.99",
    highest24hour: "1.012",
    volume24hour: "120860.50",
  });
});

module.exports = router;
