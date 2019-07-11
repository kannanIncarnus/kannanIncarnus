<link src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js" type="text/javascript"></link>

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
            $.getJSON("https://demo.incarnus.com:8850/thirdparty/reportingservice/patientreports/getregisteredpatients/2019-06-01/2019-07-04", function(resp) {
                var data = resp.registeredpatients,
                    tableData = [];
            // instantiate a moment object
            var dateObj = moment();

                // Iterate over the JSON object
                for (var i = 0, len = data.length; i < len; i++) {
                    var dateFormat = "yyyy-MM-dd HH:mm:ss";
 
                        var regDate = dateObj(data[i].regdatetime).format(dateFormat);
                    tableData.push({
                        "regid": data[i].regid,
                        "id": data[i]._id,
                        "PatientName": data[i].firstname,
                        "createdat": data[i].createdat,
                        "regdatetime": regDate,
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
                doneCallback();
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
                dataType: tableau.dataTypeEnum.string
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
                id: "patientFeed",
                alias: "Patient reports are listed here...........",
                columns: cols
            };
        
            schemaCallback([tableSchema]);
        };
    })();
