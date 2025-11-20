var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name--1146707516",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "186",
        "ok": "172",
        "ko": "14"
    },
    "minResponseTime": {
        "total": "60",
        "ok": "60",
        "ko": "111"
    },
    "maxResponseTime": {
        "total": "517",
        "ok": "501",
        "ko": "517"
    },
    "meanResponseTime": {
        "total": "101",
        "ok": "75",
        "ko": "425"
    },
    "standardDeviation": {
        "total": "110",
        "ok": "40",
        "ko": "161"
    },
    "percentiles1": {
        "total": "69",
        "ok": "68",
        "ko": "506"
    },
    "percentiles2": {
        "total": "74",
        "ok": "72",
        "ko": "509"
    },
    "percentiles3": {
        "total": "504",
        "ok": "98",
        "ko": "517"
    },
    "percentiles4": {
        "total": "514",
        "ok": "209",
        "ko": "517"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 172,
    "percentage": 92
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 14,
    "percentage": 8
},
    "meanNumberOfRequestsPerSecond": {
        "total": "9.3",
        "ok": "8.6",
        "ko": "0.7"
    }
},
contents: {
"req_post--register-570162258": {
        type: "REQUEST",
        name: "POST /register",
path: "POST /register",
pathFormatted: "req_post--register-570162258",
stats: {
    "name": "POST /register",
    "numberOfRequests": {
        "total": "100",
        "ok": "86",
        "ko": "14"
    },
    "minResponseTime": {
        "total": "61",
        "ok": "61",
        "ko": "111"
    },
    "maxResponseTime": {
        "total": "517",
        "ok": "501",
        "ko": "517"
    },
    "meanResponseTime": {
        "total": "126",
        "ok": "77",
        "ko": "425"
    },
    "standardDeviation": {
        "total": "142",
        "ok": "47",
        "ko": "161"
    },
    "percentiles1": {
        "total": "71",
        "ok": "71",
        "ko": "506"
    },
    "percentiles2": {
        "total": "77",
        "ok": "74",
        "ko": "509"
    },
    "percentiles3": {
        "total": "508",
        "ok": "101",
        "ko": "517"
    },
    "percentiles4": {
        "total": "517",
        "ok": "176",
        "ko": "517"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 86,
    "percentage": 86
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 14,
    "percentage": 14
},
    "meanNumberOfRequestsPerSecond": {
        "total": "5",
        "ok": "4.3",
        "ko": "0.7"
    }
}
    },"req_post--authentic-1554613508": {
        type: "REQUEST",
        name: "POST /authenticate",
path: "POST /authenticate",
pathFormatted: "req_post--authentic-1554613508",
stats: {
    "name": "POST /authenticate",
    "numberOfRequests": {
        "total": "86",
        "ok": "86",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "60",
        "ok": "60",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "333",
        "ok": "333",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "73",
        "ok": "73",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "32",
        "ok": "32",
        "ko": "-"
    },
    "percentiles1": {
        "total": "67",
        "ok": "67",
        "ko": "-"
    },
    "percentiles2": {
        "total": "69",
        "ok": "69",
        "ko": "-"
    },
    "percentiles3": {
        "total": "91",
        "ok": "91",
        "ko": "-"
    },
    "percentiles4": {
        "total": "184",
        "ok": "184",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 86,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "4.3",
        "ok": "4.3",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
