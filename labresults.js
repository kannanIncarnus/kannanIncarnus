(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "Labresults List";
                tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var createdat = table.incrementValue

        if (!createdat) {
            createdat = "2000-01-01"
        }
        else {
            console.log("createdat: " + createdat);
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getlabresults/" + limit + "/" + pagenumber + "/" + createdat

        $.getJSON(queryPath, function (resp) {
            var data = resp.patients;
            var totalrecords = resp.totalrecords;

            data.sort(function(arg1,arg2){
                return new Date(arg1.createdat) - new Date(arg2.createdat);
            });

            console.log("totalRecords in the collection: " + totalrecords);
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                var serialno = (limit * (pagenumber-1)) + i;
                tableData.push({
                    "SNo": String(serialno+1),
                    "LABRESULTS": data[i].firstname,
                    "VisitID": data[i].firstname,
                    "VISITDATETIME": data[i].firstname,
                    "HOSPITAL": data[i].firstname,
                    "HOSPITALUNIT": data[i].firstname,
                    "MRN": data[i].firstname,
                    "GENDER": data[i].firstname,
                    "DOB": data[i].firstname,
                    "VisitType": data[i].firstname,
                    "COUNTRY": data[i].firstname,
                    "COUNTRY": data[i].firstname,
                    "COUNTRY": data[i].firstname,
                    "COUNTRY": data[i].firstname,
CITY
PLACE
PINCODE
DEPARTMENT
DOCTOR
ENCOUNTERTYPE
LABTEST
SPECIMENTYPE
SAMPLENUMBER
SAMPLECOLLDATETIME
PHLEBOTOMIST
SAMPLERECEIVEDTIME
TESTDONETIME
RESULTNAME
RESULTVALUE
REFRANGE
UOM
REMARKS
LABTECHNICIAN
PATHOLOGIST
APPROVEDDATETIME
CREATEDBY
CREATEDDATETIME
MODIFIEDBY
MODIFIEDDATETIME
Billing group
Billing subgroup
Order category
Order subcategory
                });
            }

            var currentrecords = (limit * pagenumber);
            if (currentrecords < totalrecords) {
                console.log("Fetching Again with currentrecords: " + currentrecords);
                pagenumber++;
                myConnector.getData(table, doneCallback);
            }
            else {
                pagenumber = 1;
                table.appendRows(tableData);
                console.log("CompletedRecords: " + tableData.length);
                tableData = [];
                doneCallback();
            }
            });
        };
        
        myConnector.getSchema = function (schemaCallback) {
            var cols = [{
                id: "id",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "SNo",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PatientName",
                alias: "Patient Name",
                dataType: tableau.dataTypeEnum.string
            }];
        
            var tableSchema = {
                id: "Patients",
                alias: "Patient lab reports are listed here...........",
                columns: cols,
                incrementColumnId: "createdat"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();
