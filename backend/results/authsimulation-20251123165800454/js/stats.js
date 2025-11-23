var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name--1146707516",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "184",
        "ok": "168",
        "ko": "16"
    },
    "minResponseTime": {
        "total": "79",
        "ok": "79",
        "ko": "154"
    },
    "maxResponseTime": {
        "total": "786",
        "ok": "786",
        "ko": "718"
    },
    "meanResponseTime": {
        "total": "214",
        "ok": "181",
        "ko": "566"
    },
    "standardDeviation": {
        "total": "182",
        "ok": "137",
        "ko": "218"
    },
    "percentiles1": {
        "total": "137",
        "ok": "129",
        "ko": "711"
    },
    "percentiles2": {
        "total": "244",
        "ok": "199",
        "ko": "712"
    },
    "percentiles3": {
        "total": "712",
        "ok": "472",
        "ko": "717"
    },
    "percentiles4": {
        "total": "725",
        "ok": "728",
        "ko": "718"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 168,
    "percentage": 91
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
    "count": 16,
    "percentage": 9
},
    "meanNumberOfRequestsPerSecond": {
        "total": "10.222",
        "ok": "9.333",
        "ko": "0.889"
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
        "ok": "84",
        "ko": "16"
    },
    "minResponseTime": {
        "total": "79",
        "ok": "79",
        "ko": "154"
    },
    "maxResponseTime": {
        "total": "718",
        "ok": "712",
        "ko": "718"
    },
    "meanResponseTime": {
        "total": "253",
        "ok": "194",
        "ko": "566"
    },
    "standardDeviation": {
        "total": "212",
        "ok": "150",
        "ko": "218"
    },
    "percentiles1": {
        "total": "147",
        "ok": "136",
        "ko": "711"
    },
    "percentiles2": {
        "total": "293",
        "ok": "224",
        "ko": "712"
    },
    "percentiles3": {
        "total": "712",
        "ok": "527",
        "ko": "717"
    },
    "percentiles4": {
        "total": "717",
        "ok": "712",
        "ko": "718"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 84,
    "percentage": 84
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
    "count": 16,
    "percentage": 16
},
    "meanNumberOfRequestsPerSecond": {
        "total": "5.556",
        "ok": "4.667",
        "ko": "0.889"
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
        "total": "84",
        "ok": "84",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "79",
        "ok": "79",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "786",
        "ok": "786",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "168",
        "ok": "168",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "121",
        "ok": "121",
        "ko": "-"
    },
    "percentiles1": {
        "total": "128",
        "ok": "128",
        "ko": "-"
    },
    "percentiles2": {
        "total": "181",
        "ok": "181",
        "ko": "-"
    },
    "percentiles3": {
        "total": "349",
        "ok": "349",
        "ko": "-"
    },
    "percentiles4": {
        "total": "764",
        "ok": "764",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 84,
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
        "total": "4.667",
        "ok": "4.667",
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
