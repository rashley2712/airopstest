    $("#locTime, #utcTime").html(moment().format("HH:mm"));
    $("#confDate").html(moment.utc().format("LL"));
    $("#aircraft_id").val($("select[name=air_reg]").val());
    $("#bOff,#tOff,#lndng,#bOn").mask("?99:99");
    $("#defectlogged, #defectdate").mask('99/99/9999');

	var inClass = "input.custom-combobox-input";
    /* Glitch on keyboard exit */ 
    //$("input").on("focus",function(){$("header").css({position:"absolute"});$(window).scrollTop(0)});
    //$("input").on("blur",function(){$("header").css({position:"fixed"})});

    // Convert form data to JS object with jQuery
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var inFlight, isConnected = false;
    var DOMAIN = "http://www.tbcmainland.org/";
    var today = moment.utc().format("YYYY/MM/DD");
    var sectorid = 1; // Sector counter 
    var id = $("select[name=air_reg]").val();
    var sectorData = [];
    var air_id = 0;

    Offline.options = {
        checks: {
            xhr: {
                url: DOMAIN + "airops"
            }
        },
        reconnect: {
            // How many seconds should we wait before rechecking.
            initialDelay: 5
        }
    }

    var supportsLocalstorage = function() {
        return 'localStorage' in window && window['localStorage'] !== null
    }

    // Host Reachable function
    var hostReachable = function() {
        if (Offline.state == "up") {
            return true;
        } else {
            return false;
        }
    }

    var inSync = function() {
        if (hostReachable()) {
            $(".pull-left").html('<span id="syncStatus_" style="backgroud-color:green;">OK</span>&nbsp;Sync Status: Connected');
            $("#airBtn, #subAir").removeAttr('disabled');
        } else {
            $(".pull-left").html('<span id="syncStatus">XX</span>&nbsp;Sync Status: Offline');
            $("#airBtn, #subAir").attr('disabled', 'disabled');
        }
    }

    var date_air = function(date) {
        return (date != "") ? moment(date).format("D MMM, YYYY") : "None";
    }

    var nIntervID;
    // Auto-Update time fields every minute
    var updateTime = function() {
        nIntervID = window.setInterval(function() {
            $("#lndng,#bOn").val(moment.utc().format("HH:mm"));
        }, 60 * 1000);
    }
    var stopAutoUp = function() {
        window.clearInterval(nIntervID)
    }

    inSync();
    window.setInterval(inSync, 2000); // Check Status every 5s 

    // Load aircraft stats
    var getAirstats = function(id) {
        if (id.length) {
            $.get(DOMAIN + "airops/conn/get_aircraftstats.php", {
                "aircraftid": id
            }, function(html) {
                $("#maintenance").replaceWith(html);
            });
        }
    }

    // Load aircraft documents 
    var getAirDocs = function(id) {
        if (id) {
            $.get(DOMAIN + "airops/conn/get_aircraftdocs.php", {
                "aircraftid": id
            }, function(data) {
                $("#aircraft_docs").html(data);
            });
			$("#docuHead").show();
        }
    }

    var defectStatus = function(status) {
        if (status == 0) {
            return '<span class="badge badge-success">&nbsp;</span>';
        } else if (status == 1) {
            return '<span class="badge badge-warning">&nbsp;</span>';
        } else if (status == 2) {
            return '<span class="badge badge-danger">&nbsp;</span>';
        }
    }
    var defect_id = 0;
    // Load defects
    var getDefects = function(id) {
        if (id > 0) {
            $("#defects_view, ._trUnd").html(""); 
            if (hostReachable) {
                $.ajax({
                    type: "POST",
                    url: DOMAIN + "airops/conn/defects.php",
                    data: {
                        "aircraftid": id,
                        "flag": 1
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.length > 0) {
                            $.each(result, function(i, v) {
                                $("#defects_view").append('<tr><td>' + v.defect + '</td><td>' + moment(v.logged).format("D MMM, YYYY") + '</td> <td>' + v.actiontaken + '</td> <td>' + v.engineer + '</td> <td>' + moment(v.created_at).format("D MMM, YYYY") + '</td> <td>' + defectStatus(v.status) + '</td> <td>' + v.daysleft + '</td></tr>');
                                $("._trUnd").append('<tr></tr><tr><td><span class="sumDef">'+ v.defect +'</span></td> <td><span class="sumDefActN"></span><span class="sumDefActN">'+v.actiontaken+'</span></td> <td><span class="sumDefDate">'+moment(v.logged).format("D MMM, YYYY") +'</span></td> <td><span class="sumDefEng">'+v.engineer+'</span></td> <td><span class="sumDefRem">'+v.daysleft+'</span></td> </tr>');
                            });
                        }
                    }
                });
            } else {
                // Load defects in localstorage 
                var data = "";
                for (var i = 0; i <= defect_id; i++) {
                    if (window.localStorage[id + "_def_" + i] != undefined) {
                        data = JSON.parse(window.localStorage[id + "_def_" + i]);
                        $("#defects_view").append('<tr><td>' + data[0].value + '</td><td>' + date_air(data[1].value) + '</td> <td>' + data[2].value + '</td> <td>' + data[3].value + '</td> <td>' + date_air(data[4].value) + '</td> <td>' + defectStatus(0) + '</td> <td>' + data[5].value + '</td> </tr>');
                    }
                }
            }
        }
    } 

    // New Defects
    $("#aDfct_").click(function(e) {
        e.preventDefault();
        var err = 0;
        $("form#defect input").each(function() {
            if (this.value == "") {
                alert_air("Invalid input detected");
                $(this).focus();
                err = 1;
                return false;
            }
        });

        if (err == 0) {
            var data = $("form#defect").serializeArray();
            data.push({
                name: "flag",
                value: 2
            });
            data.push({
                name: "aircraftid",
                value: parseInt(id)
            });

            // Save to localstorage and update table
            window.localStorage[id + "_def_" + defect_id] = JSON.stringify(data);
            $("#defects_view").append('<tr><td>' + data[0].value + '</td><td>' + date_air(data[1].value) + '</td> <td>' + data[2].value + '</td> <td>' + data[3].value + '</td> <td>' + date_air(data[4].value) + '</td> <td>' + defectStatus(0) + '</td> <td>' + data[5].value + '</td> </tr>');

            if (hostReachable) { // Submit to db
                $.post(DOMAIN + "airops/conn/defects.php", data, function(data) {});
            }

            defect_id += 1;
            $("form#defect").find('input[type="text"],input[type="date"],input[type="number"]').val("");
        }
    });

    // Load aircraft details 
    var getAircraft = function(id) {
        if (id) {
            $.get(DOMAIN + "airops/conn/getAircraft.php", {
                "aircraftid": id
            }, function(html) {
                $("#sumTit").replaceWith(html);
                getAirstats(id);
                getAirDocs(id);
                getDefects(id);
            });
        }
    }

    // Last Previous Air  
    var prev = 0; //previous air flag
    var previousAir = function() {
        $.getJSON(DOMAIN + "airops/conn/process_air.php", {
            id: air_id
        }, function(data) {
            if (data.length > 0) {
                console.log(data[0]['aircraftid']);
                //prev = 1;
                sectorid = data.length + 1; // Reset sector count
                sectorData = []; // Empty array 
                inFlight = true;
                resetSectorForm();
                air_id = data[0]['air_id'];

                $("select[name=air_reg]").val(data[0]['aircraftid']).trigger("change"); // Set Aircraft ID 
                $("#secOpt").html('');

                $.each(data, function(i, v) {
                    $("#secOpt").append('<option value="' + (i + 1) + '">' + (i + 1) + '</option>');
                    window.localStorage['sector' + (i + 1)] = JSON.stringify(v);
                    console.log((i + 1) + "++" + window.localStorage['sector' + (i + 1)]);
                });
                alert_air("Previous Air Loaded");
            } else {
                alert_air("No Previous Air");
            }
        });
    }

    //var dirty = false;
    var loadSector = function(id) {
        // if (id != $("#secOpt option:last").val()) {
        if (id.length) {
            if (typeof window.localStorage["sector" + id] !== "undefined") {
                $("#sector_frm "+inClass+":first").prop('readonly', false);
                var data = JSON.parse(window.localStorage['sector' + id]);
                // Set form fields jfda.jo
                $("#sector_frm "+inClass+":first").val(data['from']);
                $(".tConf "+inClass+":first").val(data['from']);
                //$("#depart, #depart_").html($("#frOpt option:selected").data("airport"));

                //$("#toOpt").val(data[5].value);
                $("#sector_frm "+inClass+":eq(1)").val(data['to']);
                //$("#arrive").html($("#toOpt option:selected").data("airport")); 

                $("#picOpt").val(data['pic']);
                $("#sicOpt").val(data['sic']);
                $("#headOpt").val(data['hca']);
                $("#paxOpt").val(data['pax']);
                $("#natOpt").val(data['nature']);
                $("#cliOpt").val(data['client']);
                $("#bOff").val(data['block_off']);
                $("#tOff").val(data['flight_off']);
                $("#lndng").val(data['flight_on']).trigger('change');
                $("#bOn").val(data['block_on']).trigger('change');
                $("#dFuel").val(data['departure_fuel']);
                $("#aFuel").val(data['arrival_fuel']);
                $("#fUsed").html(data['departure_fuel'] - data['arrival_fuel']);
                $("#sLnd").val(data['leg']);
                $("#nmDist").val(data['dist']);
                $("#kmDist").html(parseFloat($("#nmDist").val()) * 1.852).toFixed(2);

                $("#fuelreceipt").attr("src", "");
            }
        } else {
            resetSectorForm();
        }
    }

    // Summary Tab
    var getSummary = function(id) {
        //var id = $("select[name=air_reg]").val();
        //$.get("http://www.tbcmainland.org/airops/conn/loadSummary.php", {"aircraftid":id}, function(html){ 
        //$("#sectordetails").replaceWith(html); 
        //});
        var html = "";
        console.log("Printing sectors....");
        if (inFlight) {
            $("#sumSecD").show();
            $("#msg").hide();
            $("#sectordetails").html("");

            var total_fTime = total_bTime = total_legs = total_fuel = total_pax = 0;
            // Show sectors      
            for (var i = 1; i < sectorid; i++) {
                console.log("Showing: " + i);
                if (typeof window.localStorage["sector" + i] !== "undefined") {
                    html += "<tr><td>" + i + "</td>";
                    console.log("Sector[" + i + "]");

                    var data = JSON.parse(window.localStorage['sector' + i]);
                    // Temp dirty hack
                    var bOff = moment(today + " " + data['block_off']);
                    var bOn = moment(today + " " + data['block_on']);
                    var btime = parseFloat(bOn.diff(bOff, "m") / 60).toFixed(1).replace("-", "");

                    //var fUsed = data[16].value - data[17].value;
                    var fUsed = data['departure_fuel'] - data['arrival_fuel'];

                    html += "<td align='center'>" + data['from'] + "</td>";
                    html += "<td align='center'>" + data['to'] + "</td>";

                    html += "<td align='center'>" + data['dist'] + "</td>";
                    html += "<td align='center'>" + data['pic'] + "</td>";
                    html += "<td align='center'>" + data['sic'] + "</td>";
                    html += "<td align='center'>" + data['hca'] + "</td>";
                    html += "<td align='center'>" + btime + "</td>";

                    html += "<td align='center'>" + data['airframe'] + "</td>";
                    html += "<td align='center'>" + data['airframe'] + "</td>";
                    html += "<td align='center'>" + data['airframe'] + "</td>";
                    html += "<td align='center'>" + data['airframe'] + "</td>";
                    html += "<td align='center'>" + btime + "</td>";
                    html += "<td align='center'>" + btime + "</td>";
                    html += "<td align='center'>" + data['leg'] + "</td>";

                    html += "<td align='center'>" + fUsed + "</td>";
                    html += "<td align='center'>" + data['pax'] + "</td>";
                    html += "<td align='center'>" + data['nature'] + "</td>";
                    html += "<td align='center'>" + data['client'] + "</td></tr>";

                    total_fTime += Math.round(data['airframe'] * 10) / 10;
                    total_bTime += Math.round(btime * 10) / 10;
                    total_legs += parseInt(data['leg']);
                    total_fuel += parseInt(fUsed);

                    total_pax += parseInt(data['pax']);
                }
            }

            html += "<tr><td colspan='7' align='right'><b><i>Sub-Total:&nbsp;&nbsp;</b></i></td>";
            html += "<td style='margin-right:5px'>" + total_bTime.toFixed(1) + "</td>";
            html += "<td style='margin-right:5px'>" + total_fTime.toFixed(1) + "</td>";
            html += "<td>" + total_fTime.toFixed(1) + "</td>";
            html += "<td>" + total_fTime.toFixed(1) + "</td>";
            html += "<td>" + total_fTime.toFixed(1) + "</td>";
            html += "<td>" + total_bTime.toFixed(1) + "</td>";
            html += "<td>" + total_bTime.toFixed(1) + "</td>";
            html += "<td>" + total_legs + "</td>";
            html += "<td>" + total_fuel + "</td>";
            html += "<td>" + total_pax + "</td>";
            html += "<td colspan='2'></td></tr>";
            $("#sectordetails").append(html);
        } else {
            $("#sumSecD").hide();
            $("#msg").show();
        }

        if (id.length) {
            //Load Crew
            $.get(DOMAIN + "airops/conn/getCrew.php", {
                "aircraftid": id
            }, function(html) {
                $("#crewlist").html(html);
            });
        } else {
            $("#crewlist").html("No Aircraft Selected");
        }
    }

    var resetSectorForm = function() {
        var arrived = $("#sector_frm "+inClass+":eq(1)").val(); // Save arrival airport
        $("#sector_frm "+inClass+":eq(1)").val("").focus();
        // Reset form fields 
        $('#sector_frm').find('input[type=text],input[type=time],input[type=number],input[type=file],#depart,#arrive').val("");
        $("#paxOpt").val(0);
        $("#sLnd").val(1);
        $("#depart").html(""); // Disable from option
        $("#cliOpt").val("------");
        $("#sector_frm "+inClass+":first, .tConf "+inClass+":first").val(arrived).prop('readonly', true);

        var opVal = $("#frOpt").find("option[value=" + arrived + "]");
        var code = opVal.data("airport");
        $("#apName1, #apName2").html(code);
        $("#apName3").html("");

        $("#fuelreceipt").attr("src", "");
		$("#fuelDeets>form").trigger("reset");
        $("#fUsed,#bTime,#fTime,#kmDist").html("0");
    }

    var dirty = function() {
        if ($("#secOpt").val() != $("#secOpt option:last").val()) return true;
        else return false;
    }

    var alert_air = function(msg, callback) { // Custom alert 
        navigator.notification.alert(msg, (callback == undefined) ? true : callback, 'AirOps', 'OK');
        navigator.notification.beep(1);
    }

    // Padd Zeros recursively 
    function pad(str) {
        // str = str.toString();
        // return str.length < 5 ? pad("0" + str, 5) : str;

        return str;
    }

    $(".fReceipt").on("change", gotPic);

    function gotPic(e) {
        if (e.target.files.length == 1 &&
            e.target.files[0].type.indexOf("image/") == 0) {
            $("#fuelreceipt").attr("src", URL.createObjectURL(event.target.files[0]));
        }
    }

    $("select[name=air_reg]").change(function(e) {
        $("#aircraft_id").val($(this).val());
        id = $("select[name=air_reg]").val();
        getAircraft(id);
        //getSummary();
    });

    // Air Controls
    $("#airBtn").click(function(e) {
        e.preventDefault();
        previousAir();
    });

    $("#startAir").click(function(e) {
        e.preventDefault();
        inFlight = false;
        sectorid = prev = 1;
        $("#logOut").dialog("close");
        $("select#regN").val("----").focus();
    });

    // ********** Summary ************* //  
    $("#suButt").click(function(e) {
        e.preventDefault();
        var id = $("select[name=air_reg]").val();
        getSummary(id);
    });

    // ********** Operational ************* // 

    // Load selected sector
    $("#secOpt").change(function(e) {
        e.preventDefault();
        loadSector($(this).val());
    });


    // Display UTC and start auto-update
    $("#bStart").click(function(e) {
        e.preventDefault();
        $("#bOff").val(moment.utc().format("HH:mm"));
        updateTime();
        //alert("::"+moment.utc().format("h:mm:ss"));
    });

    // Display UTC
    $("#bStop").click(function(e) {
        e.preventDefault();
        $("#bOn").val(moment.utc().format("HH:mm"));
        stopAutoUp();
    });

    // stop auto-update 
    $("#lndng,#bOn").focus(stopAutoUp);

    // To be continued....
    // var timeDiff = function(a, b) {
    //     var tOff = moment(today + " " + $("#tOff").val());
    //     var landing = moment(today + " " + $(this).val());
    //     var diff = parseFloat(landing.diff(tOff, "m") / 60).toFixed(1).replace("-", "");
    // }

    // Calculate Flight time 
    $("#lndng").change(function(e) {
        e.preventDefault();
        var self = this;
        var tOff = moment(today + " " + $("#tOff").val());
        var landing = moment(today + " " + $(this).val());
        if (!moment(today + " " + $(this).val()).isValid()) {
            alert_air("Flight time cannot be Calculated");
            $(this).focus();
            return;
        }
        var diff = parseFloat(landing.diff(tOff, "m") / 60).toFixed(1).replace("-", "");
        $("input[name=airframe]").val(diff);
        $("#fTime").html(pad(diff));
    });

    // Calculate Block time  
    $("#bOn").change(function(e) {
        e.preventDefault();
        var bOff = moment(today + " " + $("#bOff").val());
        var bOn = moment(today + " " + $(this).val());
        if (!moment(today + " " + $(this).val()).isValid()) {
            alert_air("Invalid block on time");
            $(this).focus();
            return;
        }
        var diff = parseFloat(bOn.diff(bOff, "m") / 60).toFixed(1).replace("-", "");
        $("input[name=blockTime]").val(diff);
        $("#bTime").html(pad(diff));
    });

    // Calculate and display fuel used
    $("#aFuel, #dFuel").keyup(function() {
        $("#fUsed").html($("#dFuel").val() - $("#aFuel").val());
    });

    // Convert and display distance to km
    $("#nmDist").keyup(function(e) {
        $("#kmDist").html(($(this).val() * 1.852).toFixed(2));
    });

    // Submit Sector
    $("#subSec").click(function(e) {
        e.preventDefault();

        // Validate all fields
        var err = 0;
        $("form#sector_frm input").each(function() {
            if (this.value == "") {
                //alert_air("Invalid input detected ");
                alert("Invalid entry detected!"); 
                $(this).focus();
                err = 1;
                return false;
            } 
        }); 
        if (err == 0) {
            // Increase sector count and update dropdown                            
            inFlight = true;

            // push to global sector array 
            var sector = $("form#sector_frm").serializeObject();
            sector.from = $("#sector_frm "+inClass+":first").val();
            sectorData.push(sector); 

            window.localStorage['sector' + sectorid] = JSON.stringify(sector);

            // alert_air("Sector " + sectorid + " Saved!", resetSectorForm);
            alert("Sector " + sectorid + " Saved!");getSummary(id);
            resetSectorForm();

            sectorid += 1;
            $("#secOpt").append('<option value="' + sectorid + '">' + sectorid + '</option>');
            $("#secOpt").val(sectorid);
            //$("#frOpt").prop('readonly', true);
        }
    	
	});


    // Submit Air - test
    $("#subAir").click(function(e) {

        e.preventDefault();

        if (hostReachable) {
            if (sectorData.length > 0) { // Submit sectorData at once 
                $.ajax({
                    type: "POST",
                    url: DOMAIN + "airops/conn/add_sector.php",
                    data: {
                        air: sectorData
                    },
                    beforeSend: function() {
                        $(".progress").show();
                    },
                    success: function(data) {
                        console.log("Response Data: " + data);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });

                alert_air("AIR Successfully Submitted"); 
                // Reset localstorage variables   
                for (var i = 0; i < defect_id; i++) {
                    window.localStorage[id + '_def_' + i] = "";
                }
            } else {
                alert_air('Oops! No AIR to submit');
            }
        } else {
            alert_air('AIRs can only be submitted in online mode.');
            //window.localStorage.setItem("sector_data", sectorData);
        }

        sectorid = prev = 1; // Reset sector count / previous air flag
        sectorData = []; // Empty array
        resetSectorForm();
        $("#secOpt").html('<option value="1">1</option>');
        //$(".progress").fadeOut("slow");
        inFlight = false;
        $(".progress-bar").fadeOut("slow");
    });