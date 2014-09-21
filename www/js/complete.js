(function ($) {
            $.widget("custom.combobox", {
                 _create: function () {
                     this.wrapper = $("<span>")
                         .addClass("custom-combobox")
                         .insertAfter(this.element);
                     this.element.hide();
                     this._createAutocomplete();
                 },
                 _createAutocomplete: function () {
                     var selected = this.element.children(":selected"),
                         value = selected.val() ? selected.text() : "";
                     this.input = $("<input>")
                         .appendTo(this.wrapper)
                         .val(value)
                         .attr("title", "")
                         .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                         .autocomplete({
                             delay: 0,
                             minLength: 0,
                             source: $.proxy(this, "_source")
                         })
                         .tooltip({
                             tooltipClass: "ui-state-highlight"
                         });
						 //var tou = jQuery.Event( "click touchend" );
                     this._on(this.input,{
                         autocompleteselect: function (event, ui) {
                             ui.item.option.selected = true;
                             this._trigger("select", event, {
                                 item: ui.item.option
                             });
                         },
                         autocompletechange: "_removeIfInvalid"
                     });
                 },
                 _source: function (request, response) {
                     var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                     response(this.element.children("option").map(function () {
                         var text = $(this).text();var dVal = $(this).val();
                         if (this.value && (!request.term || matcher.test(text)))
                             return {
                                 label: text,
                                 value: dVal,
                                 option: this
                             };
                     }));
                 },
                 _removeIfInvalid: function (event, ui) {
                     // Selected an item, nothing to do
                     if (ui.item) {
                         return;
                     }
                     // Search for a match (case-insensitive)
                     var value = this.input.val(),
                         valueLowerCase = value.toLowerCase(),
                         valid = false;
                     this.element.children("option").each(function () {
                         if ($(this).text().toLowerCase() === valueLowerCase) {
                             this.selected = valid = true;
                             return false;
                         }
                     });
                     // Found a match, nothing to do
                     if (valid) { 
                         return;
                     }
                     // Remove invalid value
                     this.input.val("").focus().css("border-color","red");
                     this.input.autocomplete("instance").term = "";
                 },
                 _destroy: function () {
                     this.wrapper.remove();
                     this.element.show();
                 }
            })//.addTouch();
        })(jQuery);
var inClass = "input.custom-combobox-input";
            jQuery(document).ready(function() {
                // Init Theme Core
                Core.init();
                $("#frOpt").combobox();
                $("#toOpt").combobox();
                $("#depOpt").combobox();
				$("#fConf "+inClass).focusout(function(e){
					   e.preventDefault();                                  	
					   var aPort = $("#fConf "+inClass).val();
					   var opVal = $('#depOpt').find('option[value="'+aPort+'"]');
					   var code = opVal.data("airport");
					   //if(aPort==){}
					   $("#apName1").html(code);
					   $("#sector_frm "+inClass+":first").val(aPort);
					   $("#apName2").html(code);
				   });
				   $("#sector_frm "+inClass+":first").focusout(function(e){
					   e.preventDefault();                                  	
					   var aPort = $("#sector_frm "+inClass+":first").text();
					   var opVal = $('#frOpt').find('option[value="'+aPort+'"]');
					   var code = opVal.data("airport");
					   //if(aPort==){}
					   $("#apName2").html(code);
				   });
				   $("#sector_frm "+inClass+":eq(1)").focusout(function(e){
					   e.preventDefault();                                  	
					   var aPort = $("#sector_frm "+inClass+":eq(1)").val();
					   var opVal = $('#toOpt').find('option[value="'+aPort+'"]');
					   var code = opVal.data("airport");
					   //if(aPort==){}
					   $("#apName3").html(code);
				   });
});
/*Autocomplete End*/