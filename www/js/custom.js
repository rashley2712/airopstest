$(document).ready(function(){
	var DOMAIN = "http://www.tbcmainland.org/";
var inClass = "input.custom-combobox-input";
$(document).on({ajaxStart: function(){$(".modal-backdrop").show("fast");},ajaxStop: function(){$(".modal-backdrop").hide("fast");}});
	$("form").submit(function(){return false;});
	$("input").on("focus",function(){$("header").css({position:"fixed"});/*$(window).scrollTop(0)*/});
	$("input").on("blur",function(){$("header").css({position:"fixed"})});
	$("#portForm").on("show","ui-dialog-titlebar-close",function(){$(this).css("background-color","#CC0000");});
	var logV = document.getElementById("loginV");
	logV.addEventListener('keydown', function (event) {if (event.keyCode === 13){$("#logB").click();return false;}});
	$(document).keydown(function(e){if(e.whicdrollh == 13) {e.preventDefault();return false;};});
	$("#docuHead").on("click",function(){$("#accContent").toggle();})
	//if($("#loginV").is(":visible")){$(document).keydown(function(e){if(e.which == 13) {$("#logB").click()};});};
/*Date & Time Functions*/
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var d=new Date();
	var utcM =d.getUTCMinutes();if (utcM.toString().length == 1) {utcM = "0" + utcM;}
	var mM =d.getMinutes();if (mM.toString().length == 1) {mM = "0" + mM;}
	var xMonth = d.getMonth()+6;
	document.getElementById("curDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
	document.getElementById("confDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
	var realDate = document.getElementById("realDate").value = d.getFullYear()+'/'+d.getMonth() +'/'+d.getDate();
	document.getElementById("logDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
	document.getElementById("locTime").value=d.getHours()+':'+ mM;
	document.getElementById("utcTime").value=d.getUTCHours()+':'+ utcM;
	document.getElementById("logTime").innerHTML=d.getUTCHours()+':'+ utcM +'\u00A0'+'utc';
/*Gallons - Liters Conversion*/
	function convGal() {var flLit = $("#flLit").val();var cvGal = flLit*0.264172;$("#flGal").val(cvGal.toFixed(2));};$("#flLit").on("keyup",convGal);
	function convLit() {var flGal = $("#flGal").val();var cvLit = flGal*3.78541;$("#flLit").val(cvLit.toFixed(2));};$("#flGal").on("keyup",convLit);
/*Navigation Buttons*/
	$("#stButt").on("click",function(){$("#vOper,#vMaint,#vSumm").hide("fast");$("#vStart").show("slow");$("ol.breadcrumb span").attr("class","glyphicons glyphicons-nameplate");$("ol.breadcrumb li:nth-child(2)").html("Startup");$(this).css("border","1px solid #000f89");$("#mButt,#oButt,#suButt").css("border","1px solid #d2d2d2");return false;});
	$("#mButt").on("click",function(){$("#vOper,#vStart,#vSumm").hide("fast");$("#vMaint").show("slow");$("ol.breadcrumb span").attr("class","glyphicons glyphicons-settings");$("ol.breadcrumb li:nth-child(2)").html("Maintenance");$(this).css("border","1px solid #000f89");$("#stButt,#oButt,#suButt").css("border","1px solid #d2d2d2");return false;});
	$("#oButt").on("click",function(){$("#vStart,#vMaint,#vSumm").hide("fast");$("#vOper").show("slow");$("ol.breadcrumb span").attr("class","glyphicons glyphicons-airplane");$("ol.breadcrumb li:nth-child(2)").html("Operational");$(this).css("border","1px solid #000f89");$("#mButt,#stButt,#suButt").css("border","1px solid #d2d2d2");return false;});
	$("#suButt").on("click",function(){$("#vOper,#vMaint,#vStart").hide("fast");$("#vSumm").show("slow");$("ol.breadcrumb span").attr("class","glyphicons glyphicons-notes");$("ol.breadcrumb li:nth-child(2)").html("Summary");$(this).css("border","1px solid #000f89");$("#mButt,#oButt,#stButt").css("border","1px solid #d2d2d2");$("#pdfMake").show();return false;});
/*Dialogs*/
	$("#logOut").dialog({resizable: false,autoOpen: false,modal:true,draggable:false});
	$("#maddCrew").dialog({resizable: false,autoOpen:false,modal: true,width:328,draggable:false});
	$("#portForm,#portForm2").dialog({resizable: false,autoOpen: false,modal:true,draggable:false});
	$("#fuelDeets").dialog({resizable: false,width: 400,height:"auto",autoOpen: false,modal:true,draggable:false});
	$("#nDfct").dialog({resizable: false,width: 350,autoOpen: false,modal:true,draggable:false});
	$("#cProb").dialog({resizable: false,autoOpen:false,modal:true,width:"auto",draggable:false});
/*Dialog Buttons*/
	$("#exBtn").on("click",function(){$("#logOut").dialog("open");});
	$("#adFlFm").on("click",function(){$("#fuelDeets").dialog("open");});
	$("#addPort").on("click",function(){$("#portForm").dialog("open");});
	$("#addPort2").on("click",function(){$("#portForm2").dialog("open");});
	$("#aDfct").on("click",function(){$("#nDfct").dialog("open");});
		
/*StatusBar Reg No. & Call Sign*/
	$("#regN").change(function(e){var aRegi = $("#regN option:selected").text();e.preventDefault();$("#aRegi").html(aRegi);});
	$("#clSgn").change(function(e){var aType = $("#clSgn").val();e.preventDefault();$("#aType").html(aType);});
/*Confirm Panel*/
	$("#fConf .cfm").on("click",function(){if($("#fConf input").val()!="" && $("#fConf select option:selected").val()!=0 && $("#deptd input").val()!=""){$("#confBt").removeClass("cfm").addClass("cfmD").html("CONFIRMED").attr("disabled","disabled");$("#fConf .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");if($("#crEdBt").hasClass("cfmD")&&$("#craftBt").hasClass("cfmD")&&$("#multiBt").hasClass("cfmD")){$("#accBtn").css("background-color","#009900")};}else if($("#fConf input").val()=="" || $("#fConf select option:selected").val()==0 || $("#deptd input").val()==""){$(this).removeClass("cfm").addClass("cfmDR").html("CONFIRMED").attr("disabled","disabled");$("#fConf .cirStatW").removeClass("cirStatW").addClass("cirStatR").html("!").css("pointer-events","auto");alert("All fields must be completed!");}$("#fConf input, #fConf select").attr("disabled","disabled");$("#addPort").css("pointer-events","none");return false;});
	if($("#fConf button").hasClass("cirStatR")){$(this).on("click",function(){alert ("All fields must be completed!") }) }
	$("#fConf .edBtn").on("click",function(){$("#accBtn").css("background-color","#000f89");$("#confBt").removeClass("cfmD cfmDR").addClass("cfm").html("CONFIRM").removeAttr("disabled");$("#fConf .cirStat").removeClass("cirStat").addClass("cirStatW").html("");$("#fConf .cirStatA").removeClass("cirStatA").addClass("cirStatW").html("");$("#fConf .cirStatR").removeClass("cirStatR").addClass("cirStatW").html("");$("#fConf input, #fConf select").removeAttr("disabled");$("#addPort").css("pointer-events","");return false});
/*Crew Panel*/
	$("#fCrew .cfm").on("click",function(){ 
		//var crew = $("#fCrew").serializeArray(); 
		var fPic = $("#cPic>option").val();
		var fSic = $("#cSic>option").val();
		var fHca = $("#cHca>option").val();
		$.ajax({
			url: DOMAIN + "airops/conn/checkCrew.php",
			type:"POST",
			data: {pic:fPic,sic:fSic,hca:fHca},
			dataType:"json",
			success: function(data) { 
				$.each(data, function(i, v) {
					if(v.daysleft < 7){
						$("#crEdBt").removeClass("cfm").addClass("cfmD").html("CONFIRMED").attr("disabled","disabled");
						$("#fCrew .cirStatW").removeClass("cirStatW").addClass("cirStatA").html("SEE");
					}else if(v.daysleft > 7){
						$("#crEdBt").addClass("cfmD").html("CONFIRMED").attr("disabled","disabled");
						$("#fCrew .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");
					}$("#seeCrew").css("pointer-events","auto");
					$("#cProb").dialog({
						open: function(event,ui){
							$.each(data, function(i, v){if(v!=="undefined"){
							$("#issuS").append("<tr><td>"+v.member+"</td><td>"+v.docType+"</td><td>"+v.docNo+"</td><td>"+v.expires+"</td><td>"+v.daysleft+"</td></tr>");
							}	});
							},
					});	$("#seeCrew").on("click",function(){$("#cProb").dialog("open");});
				});  
			}
		}).done(function(){
			if($("#confBt").hasClass("cfmD")&&$("#craftBt").hasClass("cfmD")&&$("#multiBt").hasClass("cfmD")){$("#accBtn").css("background-color","#009900")}else{};
		$("#fCrew select").attr("disabled","disabled");
		});
		return false;});		
	$("#crEdt").on("click",function(){$("#accBtn").css("background-color","#000f89");if($("#crEdBt").hasClass("cfmD"||"cfmDO")){$("#crEdBt").removeClass("cfmD"||"cfmDO").addClass("cfm").html("CONFIRM").removeAttr("disabled");;$("#fCrew input, #fCrew select").removeAttr("disabled");}else if($("#crEdBt").hasClass("cfm")){$("#maddCrew").dialog("open");}
	$("#seeCrew").removeClass("cirStat").addClass("cirStatW").html("")||$("#fCrew .cirStatA").removeClass("cirStatA").addClass("cirStatW").html("");$("#seeCrew").css("pointer-events","none");
	return false;});
/*Aircraft Status Panel*/
	$("#fAirStat .cfm").on("click",function(){$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED").attr("disabled","disabled");$("#fAirStat .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");if($("#crEdBt").hasClass("cfmD")&&$("#confBt").hasClass("cfmD")&&$("#multiBt").hasClass("cfmD")){$("#accBtn").css("background-color","#009900")};$("#fAirStat input, #fAirStat select").attr("disabled","disabled");return false;});
	$("#fAirStat .edBtn").on("click",function(){$("#accBtn").css("background-color","#000f89");$("#craftBt").removeClass("cfmD cfmDR").addClass("cfm").html("CONFIRM").removeAttr("disabled");$("#fAirStat .cirStat").removeClass("cirStat").addClass("cirStatW").html("");$("#fAirStat .cirStatA").removeClass("cirStatA").addClass("cirStatW").html("");$("#fAirStat .cirStatR").removeClass("cirStatR").addClass("cirStatW").html("");$("#fAirStat input, #fAirStat select").removeAttr("disabled");return false;});		
/*Multi Panels*/
	$("#fMulti .cfm").on("click",function(){
		if($(".ccBox input:checked").length == $(".ccBox input").length){
		$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED").attr("disabled","disabled");$("#fMulti .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");
		if($("#crEdBt").hasClass("cfmD")&&$("#craftBt").hasClass("cfmD")&&$("#confBt").hasClass("cfmD")){
			$("#accBtn").css("background-color","#009900")};}else{
				$(this).removeClass("cfm").addClass("cfmDR").html("CONFIRMED");$("#fMulti .cirStatW").removeClass("cirStatW").addClass("cirStatR").html("!");
				alert ("Please check the Pilot Acceptance boxes to accept defects and proceed.")};
			$("#fMulti input, #fMulti select").attr("disabled","disabled");
			return false;});
			
	$("#fMulti .edBtn").on("click",function(){$("#accBtn").css("background-color","#000f89");
	$("#multiBt").removeClass("cfmD cfmR").addClass("cfm").html("CONFIRM");$("#fMulti .cirStat").removeClass("cirStat").addClass("cirStatW").html("");$("#fMulti .cirStatR").removeClass("cirStatR").addClass("cirStatW").html("");$("#fMulti input").removeAttr("disabled");return false;});
/*Login AJAX*/
	$("#logRez").on("change",function(){
		if($(this).val() == "Other"){$("#othLab,#othRez").show("fast")}else{$("#othLab,#othRez").css("display","none")};
		});
	$("#logB").on("click",function(){
		if($("#logRez option:selected").val() == "Other"){var logRez = $("#othRez").val();}else{var logRez = $("#logRez option:selected").val();};
		var userN =$("#userN").val();
		var passW =$("#passW").val();
		var usrPic = $("#picURL").val();
		var usrType = $("#uType option:selected").val();
		$.ajax({
		  type: "POST",
		  url: DOMAIN + "airops/conn/login.php",
		  data: {userN:userN,passW:passW},
		  dataType:"json",
		  success: function(data){
			if(data.error == 1){
				alert("Login Unsuccessful!");
				$("#loginF").trigger("reset");
				if($("#cVas").is(":visible")){resetCam();}
			}else{
				$("#loginV").hide("fast");
				$("#bGin").show("fast");
				$.ajax({
					  type: "POST",
					  url: DOMAIN + "airops/conn/login_events.php",
					  data: {userN:userN,passW:passW,logRez:logRez,usrType:usrType,usrPic:usrPic}
					}).done(function(){
						var now = Date.now();$("#curUsr").val(userN);$("#tmStmp").val(now);
						var curUsr = $("#curUsr").val();var tmStmp = $("#tmStmp").val();
						$.post(DOMAIN + "airops/conn/loggedin.php",{curUsr:curUsr,tmStmp:tmStmp})
						
						});
			}
			}
		});
	});
/*Startup AJAX*/
	$("#accBtn").on("click",function(){
		if($("#crEdBt").hasClass("cfmD") && $("#confBt").hasClass("cfmD") &&$("#multiBt").hasClass("cfmD") && $("#craftBt").hasClass("cfmD")){
		var regN =$("#regN>option").text();
		var clSgn =$("#clSgn").val();
		var locN = $("#deptd "+inClass).val();
		var confDate =$("#realDate").val();
		var locTime =$("#locTime").text();
		var utcTime =$("#utcTime").text();
		var cPic =$("#cPic").text();
		var cSic =$("#cSic").text();
		var adCrew =$(".addedCrew").text();
		var cHca =$("#cHca").text();
		var ste1hrs =$("#ste1hrs").text();
		var ste2hrs =$("#ste2hrs").text();
		var ste1cyc =$("#ste1cyc").text();
		var ste2cyc =$("#ste2cyc").text();
		var stAirhrs =$("#stAirhrs").text();
		var stLands =$("#stLands").text();
		var apuHrs =$("#apuHrs").val();
		$.ajax({
		  type: "POST",
		  url: DOMAIN + "airops/conn/startup.php",
		  data: {regN:regN,clSgn:clSgn,locN:locN,confDate:confDate,locTime:locTime,utcTime:utcTime,cPic:cPic,cSic:cSic,cHca:cHca,adCrew:adCrew,ste1hrs:ste1hrs,ste2hrs:ste2hrs,ste1cyc:ste1cyc,ste2cyc:ste2cyc,stAirhrs:stAirhrs,stLands:stLands,apuHrs:apuHrs}
		}).done(function() {
			$("#oButt").click();
			});
		}else{
			alert ("You must confirm all panels and the Status indicators cannot be red!")}
	});
/*Add Airport AJAX*/
	$("#subPort2").on("click",function(){
		var icao = $("#portForm2 .addIcao").val();
		var portName = $("#portForm2 .addPortName").val();
		var portCity = $("#portForm2 .addPortCity").val();
		$.ajax({
			type: "POST",
			url: DOMAIN + "airops/conn/addAirport.php",
			data: {icao:icao,portName:portName,portCity:portCity},
			success: function(data){
				if(data !== "1"){
				$("#portForm2").dialog("close");
				$("#portForm2 form").trigger("reset");
				$('#toOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$('#depOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$('#frOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$("#totd "+inClass).val(icao);
				}else{alert ("ICAO is already in the database! Please re-confirm it doesn't already exist in dropdown.")};
				}
			});
		});
	$("#subPort").on("click",function(){
		var icao = $("#portForm .addIcao").val();
		var portName = $("#portForm .addPortName").val();
		var portCity = $("#portForm .addPortCity").val();
		$.ajax({
			type: "POST",
			url: DOMAIN + "airops/conn/addAirport.php",
			data: {icao:icao,portName:portName,portCity:portCity},
			success: function(data){
				if(data !== "1"){
				$("#portForm").dialog("close");
				$("#portForm form").trigger("reset");
				$('#depOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$('#toOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$('#frOpt option:last-child').after('<option value="'+icao+'" data-airport="'+portName+','+portCity+'">'+icao+' ['+portName+', '+portCity+']</option>');
				$("#deptd "+inClass).val(icao);$("#frtd "+inClass).val(icao);
				}else{alert ("ICAO is already in the database! Please re-confirm it doesn't already exist in dropdown.")};
				}
			});
		});
/*Add Crew AJAX*/
	$("#aCrew input[type=checkbox]").change(function(){if(this.checked){$("#crewClaim").css("color","black")};});
	$("#saveCrew").on("click",function(){
		//var form = $("#
		//for(i=0; i<form.childNodes.length; i++)
		//if($("#aCrew input").val()!=""){
		var name = $("#adName").val();
		var position = $("#adPos").val();
		var licenseNo = $("#adLicNo").val();
		var licenseType = $("#adLicTp").val();
		var medicalExp = $("#adMed").val();
		if($("#aCrew input[type=checkbox]").is(":checked")){
		$.ajax({
			type: "POST",
			url: DOMAIN + "airops/conn/addCrew.php",
			data: {name:name,position:position,licenseNo:licenseNo,licenseType:licenseType,medicalExp:medicalExp},
			success: function(data){
				$("#maddCrew").dialog("close");
				$("#aCrew").trigger("reset");
				$('#addedCrew').html('<span class="addedCrew">'+name+' - '+position+'</span>');
				$('#addedHead').html('Added Crew');
				}
			});
			}else{
				$("#crewClaim").css("color","red").effect("pulsate",{times:1},2000);
				}
		//}else{alert ("All fields must be completed.")};
		});
/*Fuel Receipt AJAX*/
	$("#subFuel").on("click",function(){
		var supply =$("#flSupp").val();
		var location =$("#flLoc").val();
		var invoice = $("#flRct").val();
		var liters =$("#flLit").val();
		var gallons =$("#flGal").val();
		var name =$("#flNme").val();
		var comments =$("#flCmnt").val();
		var imgLoc =$("#picURLF").val();
		$.ajax({
		  type: "POST",
		  url: DOMAIN + "airops/conn/fuel_receipts.php",
		  data: {supply:supply,location:location,invoice:invoice,liters:liters,gallons:gallons,name:name,comments:comments,imgLoc:imgLoc}
		})
		  .done(function() {
			alert( "Receipt Saved!");
			$("#fuelDeets").dialog("close");
			});
	});
/*Sector 2 PDF AJAX*/	
$("#pdfMake").on("click", function(){
            var data = $("#sumSecDiv").html();
                $.ajax
                    ({
                    type: "POST",
                    url: DOMAIN +"airops/conn/toPdf.php",
                    data: data,
                    //cache: false,
                    success: function()
                        {
                            alert("Thank you");
                        }
                    });
                return false;
        });
/*Logout Buttons*/
	$("#contAir").on("click",function(){$("#logOut").dialog("close");});
	$("#logoButt").on("click",function(){window.open(DOMAIN + "airops","_self")});

/*Typehead*/

/*GeoLocation*/
// Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geoLoc');
        element.value = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

/*Close Tag*/
});