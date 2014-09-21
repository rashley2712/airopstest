	$(document).ready(function(){
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var d=new Date();
		var utcM =d.getUTCMinutes();if (utcM.toString().length == 1) {utcM = "0" + utcM;}
		var mM =d.getMinutes();if (mM.toString().length == 1) {mM = "0" + mM;}
		var xMonth = d.getMonth()+6;
		document.getElementById("curDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
		document.getElementById("confDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
		//document.getElementById("sumDate").innerHTML=d.getDate()+' '+ months[d.getMonth()] + ' ' + d.getFullYear();
		document.getElementById("locTime").innerHTML=d.getHours()+':'+ mM;
		document.getElementById("utcTime").innerHTML=d.getUTCHours()+':'+ utcM;
		//document.getElementById("sumDateN").innerHTML=d.getDate()+' '+ months[xMonth] + ' ' + d.getFullYear();

	$("#aDfct>button").on("click", function(){$("#nDfct").show("fast");return false;});
	$("#stButt").on("click",function(){
		$("#vOper,#vMaint,#vSumm").hide("fast");
		$("#vStart").show("slow");
		$("ol.breadcrumb span").attr("class","glyphicons glyphicons-nameplate")
		$("ol.breadcrumb li:nth-child(2)").html("Startup");
		return false;
		});
	$("#mButt").on("click",function(){
		$("#vOper,#vStart,#vSumm").hide("fast");
		$("#vMaint").show("slow");
		$("ol.breadcrumb span").attr("class","glyphicons glyphicons-settings")
		$("ol.breadcrumb li:nth-child(2)").html("Maintenance");
		return false;
		});
	$("#oButt").on("click",function(){
		$("#vStart,#vMaint,#vSumm").hide("fast");
		$("#vOper").show("slow");
		$("ol.breadcrumb span").attr("class","glyphicons glyphicons-airplane")
		$("ol.breadcrumb li:nth-child(2)").html("Operational");
		return false;
		});
	$("#suButt").on("click",function(){
		$("#vOper,#vMaint,#vStart").hide("fast");
		$("#vSumm").show("slow");
		$("ol.breadcrumb span").attr("class","glyphicons glyphicons-notes");
		$("ol.breadcrumb li:nth-child(2)").html("Summary");
		return false;
		});
/*AirportCodes*/
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 
var airports = ["DNAA","DNCA","DNEN","DNIB","DNIL","DNJO","DNKA","DNKN","DNMA","DNMM","DNPO","DNSO","DNYO"];
//var airLoc =[,"Calabar Intl., Calabar","Enugu Airport, Enugu","New Ibadan, Ibadan","Ilorin Airport, Ilorin","Jos Aiport, Jos","New Kaduna Airport, Kaduna","Mallam Aminu Intl., Kano","Maiduguri Airport, Maiduguri","Muritala Mohammed, Lagos","Port Harcourt Aiport, P.H","Sokoto Airport, Sokoto","Yola Airport, Yola"];
var airP = new Array();airP[0]="DNAA";airP[1]="DNCA";airP[2]="DNEN";airP[3]="DNIB";airP[4]="DNIL";airP[5]="DNJO";airP[6]="DNKA";airP[7]="DNKN";airP[8]="DNMA";airP[9]="DNMM";airP[10]="DNPO";airP[11]="DNSO";airP[12]="DNYO";

var airL = new Array();airL[0]="Nnamdi Azikiwe Intl., Abuja";airL[1]="Calabar Intl., Calabar";airL[2]="Enugu Airport, Enugu";airL[3]="New Ibadan, Ibadan";airL[4]="Ilorin Airport, Ilorin";airL[5]="Jos Aiport, Jos";airL[6]="New Kaduna Airport, Kaduna";airL[7]="Mallam Aminu Intl., Kano";airL[8]="Maiduguri Airport, Maiduguri";airL[9]="Muritala Mohammed, Lagos";airL[10]="Port Harcourt Aiport, P.H";airL[11]="Sokoto Airport, Sokoto";airL[12]="Yola Airport, Yola";
$('#depOpt .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'airports',
  displayKey: 'value',
  source: substringMatcher(airports)
});
$("#onSup").on("click",function(){
	alert (airports);
	})
//function findAirport() {for (i=0; i<airP.length; i++) {document.write("<li>"+airP[i].link(airL[i])+"</li>");}}


/*StartupScript*/
	$("#fConf .cfm").on("click",function(){$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED");$("#fConf .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");$("#fConf input, #fConf select").attr("disabled","disabled");return false;});
	$("#fConf .edBtn").on("click",function(){$("#fConf .cfmD").removeClass("cfmD").addClass("cfm").html("CONFIRM");$("#fConf .cirStat").removeClass("cirStat").addClass("cirStatW");$("#fConf input, #fConf select").removeAttr("disabled");return false});
	
	$("#fCrew .cfm").on("click",function(){$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED");$("#fCrew .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");$("#fCrew input, #fCrew select").attr("disabled","disabled");return false;});
	$("#fCrew .edBtn").on("click",function(){$("#fCrew .cfmD").removeClass("cfmD").addClass("cfm").html("CONFIRM");$("#fCrew .cirStat").removeClass("cirStat").addClass("cirStatW");$("#fCrew input, #fCrew select").removeAttr("disabled");return false;});		
			
	$("#fAirStat .cfm").on("click",function(){$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED");$("#fAirStat .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");$("#fAirStat input, #fAirStat select").attr("disabled","disabled");return false;});
	$("#fAirStat .edBtn").on("click",function(){$("#fAirStat .cfmD").removeClass("cfmD").addClass("cfm").html("CONFIRM");$("#fAirStat .cirStat").removeClass("cirStat").addClass("cirStatW");$("#fAirStat input, #fAirStat select").removeAttr("disabled");return false;});		
			
	$("#fMulti .cfm").on("click",function(){$(this).removeClass("cfm").addClass("cfmD").html("CONFIRMED");$("#fMulti .cirStatW").removeClass("cirStatW").addClass("cirStat").html("OK");$("#fMulti input, #fMulti select").attr("disabled","disabled");return false;});
	$("#fMulti .edBtn").on("click",function(){$("#fMulti .cfmD").removeClass("cfmD").addClass("cfm").html("CONFIRM");$("#fMulti .cirStat").removeClass("cirStat").addClass("cirStatW");$("#fMulti input, #fMulti select").removeAttr("disabled");return false;});
	
	$("#addBtn").on("click",function(){
		
		});
	/*$("#regN,#clSgn,#locN").autocomplete({
	source: [ "c++", "java", "php" ] 
	});*/
	$("#accBtn").on("click",function(){
		var regN =$("#regN>option").text();
		var clSgn =$("#clSgn").val();
		var locN = $("#depOpt>option").val();
		var confDate =$("#confDate").text();
		var locTime =$("#locTime").text();
		var utcTime =$("#utcTime").text();
		var cPic =$("#cPic").text();
		var cSic =$("#cSic").text();
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
		  url: "./conn/startup.php",
		  data: {regN:regN,clSgn:clSgn,locN:locN,confDate:confDate,locTime:locTime,utcTime:utcTime,cPic:cPic,cSic:cSic,cHca:cHca,ste1hrs:ste1hrs,ste2hrs:ste2hrs,ste1cyc:ste1cyc,ste2cyc:ste2cyc,stAirhrs:stAirhrs,stLands:stLands,apuHrs:apuHrs}
		})
		  .done(function() {
			alert( "Data Saved!");
			$("#oButt").click();
			});
	});
	$("#logB").on("click",function(){
		var userN =$("#userN").val();
		var passW =$("#passW").val();
		$.ajax({
		  type: "POST",
		  url: "./conn/login.php",
		  data: {userN:userN,passW:passW},
		  dataType:"json",
		  success: function(data){
			if(data.error == 1){
				alert("Login Unsuccessful!");
				$("#loginF").trigger("reset");
			}else{
				alert( "Login Successful!");
				$("#loginV").hide("fast");
				$("#bGin").show("fast");
			}
			}
		});
	});

	var supportsLocalstorage = function(){
		return 'localStorage' in window && window['localStorage'] !== null
	}

	// Host Reachable function
   var hostReachable = function () {
   
   // Handle IE and more capable browsers
   var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
   var status;
   
   // Open new request as a HEAD to the root hostname with a random param to bust the cache
   xhr.open( "HEAD", "//www.tbcmainland.org/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );
   //xhr.open( "HEAD", "//localhost:85/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );
   
   // Issue request and handle response
   try {
   xhr.send();
   var isOnline = ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 );
   isOnline==true? $(".breadcrumb").append("[online]"): $(".breadcrumb").append("[offline]");
   return true;
   } catch (error) {
   $(".breadcrumb").append("[offline]");
   return false;
   }    
   }
});
