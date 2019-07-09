(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Patient Reports";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/reportingservice/patientreports/labbillingdata/2016-01-01/2016-10-01", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                  
                "BillID": data[i].billid,
                "Billdate": data[i].billdate,
                "Hospital": data[i].hospital,
                "Hospital Unit": data[i].unit,
                "MRN": "data[i].mrn",
                "GENDER": data[i].gender,
                "PATIENTTYPE": "",          // need to map keys
                "COUNTRY": "",              // need to map keys
                "STATE": "",                // need to map keys
                "CITY": "",                 // need to map keys
                "PINCODE":"",               // need to map keys
                "Encountertype": data[i].encounter,
                "DEPARTMENT": data[i].department,
                "DOCTOR": data[i].doctor,
                "Payor": data[i].payor,
                "Admittingbedname": data[i].admintingbedname,
                "Ward": data[i].ward,
                "Billtype": data[i].billtype,
                "Cheifcomplient": data[i].Cheifcomplient,
                "Createdby": data[i].createdby,
                "Createddatetime": data[i].createddatetime,
                "Modifiedby": data[i].modifiedby,
                "Modifieddatetime": data[i].modifieddatetime,
                "Admissiondatetime": data[i].admissiondatetime,
                "ExpectedDischargeDttm": data[i].expecteddischargedttm,
                "Itemdescription": data[i].itemdescription,
                "Quantity": data[i].quantity,
                "Amount": data[i].unitprice,
                "Packagename": data[i]._id,
                "Currency": data[i].currency,
                "TPA": data[i].tpa,
                "BillingGroup": data[i].billinggroup,
                "BillingSubgroup": data[i].billingsubgroup,
                "Ordercategory": data[i].ordercategory,
                "OrderSubcategory": data[i].ordersubcategory,   
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
        {
            id: "BillID",
            alias: "Patient Name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Billdate",
            alias: "Bill date",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Hospital",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Hospital Unit",
            dataType: tableau.dataTypeEnum.string
        },{
            id:"MRN",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Age",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "PATIENTTYPE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "COUNTRY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "STATE",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "CITY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "PINCODE",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Encountertype",
            alias: "Encounter type",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "DEPARTMENT",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "DOCTOR",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Payor",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Admittingbedname",
            alias: "Admitting bed name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Ward",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Billtype",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Cheifcomplient",
            dataType: tableau.dataTypeEnum.string
        },{
            id:"Createdby",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Createddatetime",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Modifiedby",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Modifieddatetime",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Admissiondatetime",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "ExpectedDischargeDttm",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Itemdescription",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Quantity",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Amount",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Packagename",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Currency",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "TPA",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "BillingGroup",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "BillingSubgroup",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Ordercategory",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "OrderSubcategory",
            dataType: tableau.dataTypeEnum.string
        }
    ];
    
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
});