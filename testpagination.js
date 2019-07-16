(function () {
    var myConnector = tableau.makeConnector();
    var responsearray = [];

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {

            var dateObj = {
                startdate: $("#start-date").val().trim(),
                enddate: $("#end-date").val().trim(),
            }

            function isValidDate(datestring) {
                var d = new Date(datestring);
                return !isNaN(d.getDate());
            }

            if (isValidDate(dateObj.startdate) && isValidDate(dateObj.enddate))
            {
                tableau.connectionData = JSON.stringify(dateObj);
                tableau.connectionName = "test List";
                tableau.submit();
            }
            else {
                $("errorMsg").html("Enter valid dates. For example, 2000/01/01");
            }

        });
    });


    myConnector.getData = function (table, doneCallback) {

        var dataObj = JSON.parse(tableau.connectionData);
        var todate = dataObj.todate;

        let fromdate = table.incrementValue;
        if (!!fromdate) {
            console.log("lastcreatedat ==>"+fromdate);
        }
        else {
            fromdate = dataObj.startdate;
            todate = dataObj.todate;
        }

        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getregisteredpatientswithpagination/" + fromdate + "/" + todate, function (resp) {
            var data = resp.registeredpatients;
            let totalrecords = resp.totalrecords;

            tableData = [];
            responsearray.appendRows(data);

                // Iterate over the JSON object
                for (var i = 0, len = data.length; i < len; i++) {
                    
                    tableData.push({
                        "regid": data[i].regid,
                        "id": data[i]._id,
                        "PatientName": data[i].firstname,
                        "createdat": data[i].createdat,
                        "regdatetime": data[i].regdatetime,
                        "hospital": data[i].hospital,
                        "hospitalunit": data[i].hospitalunit,
                        "mrn": data[i].mm, //mm
                        "gender": data[i].gender,
                        "agegroup": data[i].agegroup,
                        "age": data[i].age,
                        "patienttype": data[i].patienttype,
                        "country": data[i].country,
                        "state": data[i].state,
                        "city": data[i].city,
                        "pincode": data[i].zipcode,
                        "latitude": data[i].hosplatitude,
                        "longitude": data[i].hosplongitude,
                        "createdby": data[i].createdby,
                        "createddatetime": data[i].createddatetime,
                        "modifiedby": data[i].modifiedby,
                        "modifieddatetime": data[i].modifieddatetime
                    });
                }
        
                table.appendRows(tableData);
                console.log("totalRecords: " + totalrecords);
                if (responsearray.length < totalrecords) {
                     console.log("fetching Again: " + responsearray.length);
                    myConnector.getData = function (table, doneCallback) {

                    };
                }
                else {
                    doneCallback();
                }
            });
        };
        
        myConnector.getSchema = function (schemaCallback) {
            var cols = [{
                id: "regid",
                dataType: tableau.dataTypeEnum.string
            },
                {
                id: "id",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PatientName",
                alias: "Patient Name",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "createdat",
                alias: "createdat",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "agegroup",
                alias: "agegroup",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "age",
                alias: "age",
                dataType: tableau.dataTypeEnum.int
            }, {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id:"regdatetime",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "patienttype",
                alias: "patienttype",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "country",
                alias: "country",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "state",
                alias: "state",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "city",
                alias: "city",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "pincode",
                alias: "pincode",
                dataType: tableau.dataTypeEnum.string
            },  
            {
                id: "createddatetime",
                alias: "createddatetime",
                dataType: tableau.dataTypeEnum.string
            }, 
            {
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "modifiedby",
                alias: "modifiedby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.string
            }
        ];
        
            var tableSchema = {
                id: "Registered",
                alias: "Patient reports are listed here...........",
                columns: cols,
                incrementColumnId: "createdat"
            };
        
            schemaCallback([tableSchema]);
        };
    })();
