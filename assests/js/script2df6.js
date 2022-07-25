(function($){
	'use strict';
	var $win = $(window), $body = $('body'), $doc = $(document);
	
	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () { 
		wwCurrent = winwidth(); 
	});
    
    //Sticky Nav
	var $is_sticky = $('.is-sticky'), $topbar = $('.topbar'), $topbar_wrap = $('.topbar-wrap');
	if ($is_sticky.length > 0 ) {
		var $navm = $is_sticky.offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop(), $topbar_height = $topbar.height();
			if($scroll > $navm.top){
                if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');$topbar_wrap.css('padding-top', $topbar_height);}

            } else {
                if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');$topbar_wrap.css('padding-top', 0);}
            }
		});
	}
    
    //Data Percent
    var $data_percent = $('[data-percent]');
    if($data_percent.length > 0){
        $data_percent.each(function() {
            var $this = $(this), $this_percent = $this.data('percent');
            $this.css('width', $this_percent + '%');
        });
    }
    
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $("a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}
    
    // Countdown Clock
    var $count_token_clock = $('.countdown-clock');
	if ($count_token_clock.length > 0 ) {
		$count_token_clock.each(function() {
			var $self = $(this), datetime = $self.attr("data-date");
			$self.countdown(datetime).on('update.countdown', function(event) {
				$(this).html(event.strftime('<div><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Day</span></div>' + '<div><span class="countdown-time">%H</span><span class="countdown-text">Hour</span></div>' + '<div><span class="countdown-time">%M</span><span class="countdown-text">Min</span></div>' + '<div><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Sec</span></div>'));
			});
		});
	}
    
	// Select
	var $select = $('.select');
	if ($select.length > 0) {
        $select.each(function() {
			var $this = $(this);
            $this.select2({
                theme: "flat"
            });
		});
	}
	var $select_bdr = $('.select-bordered');
	if ($select_bdr.length > 0) {
        $select_bdr.each(function() {
			var $this = $(this);
            $this.select2({
                theme: "flat bordered"
            });
		});
	}

    // Toggle section On click
    var _trigger = '.toggle-tigger', _toggle = '.toggle-class';
    
    if ($(_trigger).length > 0 ) {
		$doc.on('click', _trigger, function(e){
            var $self = $(this);
            $(_trigger).not($self).removeClass('active');
            $(_toggle).not($self.parent().children()).removeClass('active');
            $self.toggleClass('active').parent().find(_toggle).toggleClass('active');
            e.preventDefault();
        });
	}
    
    $doc.on('click', 'body', function(e){
        var $elm_tig = $(_trigger), $elm_tog = $(_toggle);
		if (!$elm_tog.is(e.target) && $elm_tog.has(e.target).length===0 && 
            !$elm_tig.is(e.target) && $elm_tig.has(e.target).length===0) {
                $elm_tog.removeClass('active');
                $elm_tig.removeClass('active');
		}
	});
    
    // Mobile Nav
    var $toggle_nav = $('.toggle-nav'),  $navbar = $('.navbar');
    if($toggle_nav.length > 0){
        $toggle_nav.on('click', function(e){
            $toggle_nav.toggleClass('active');
            $navbar.toggleClass('active');
            e.preventDefault();
        });
    }
    $doc.on('click', 'body', function(e){
		if (!$toggle_nav.is(e.target) && $toggle_nav.has(e.target).length===0 && 
            !$navbar.is(e.target) && $navbar.has(e.target).length===0) {
            $toggle_nav.removeClass('active');
            $navbar.removeClass('active');
		}
	});
    
    function activeNav(navbar){
        if(wwCurrent < 991){
            navbar.delay(500).addClass('navbar-mobile');
        }else{
            navbar.delay(500).removeClass('navbar-mobile');
        }
    }
    activeNav($navbar);
    $win.on('resize', function () { 
        activeNav($navbar);
	});
    
    
    // Tooltip
    var $tooltip = $('[data-toggle="tooltip"]');
    if($tooltip.length > 0){
        $tooltip.tooltip();
    }
  
    //Copy Text to Clipboard
    function copytoclipboard(triger,action,feedback){
        var supportCopy = document.queryCommandSupported('copy'), $triger = triger, $action = action, $feedback = feedback;
        
        $triger.parent().find($action).removeAttr('disabled').select();
        if (supportCopy===true) {
            
            document.execCommand("copy");
            $feedback.text('Copied to Clipboard').fadeIn().delay(1000).fadeOut();
            $triger.parent().find($action).attr('disabled', 'disabled');
        } else {
            window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
        }

    }
    
    // Copyto clipboard Feedback Function
    function feedback (el, state) {
        if (state==='success'){
            $(el).parent().find('.copy-feedback').text('Copied to Clipboard').fadeIn().delay(1000).fadeOut();
        } else {
            $(el).parent().find('.copy-feedback').text('Faild to Copy').fadeIn().delay(1000).fadeOut();
        }
    }
    // Copyto clipboard 
    var clipboard = new ClipboardJS('.copy-clipboard');
    clipboard.on('success', function(e) {
        feedback(e.trigger, 'success'); e.clearSelection();
    }).on('error', function(e) {
        feedback(e.trigger, 'fail');
    });
    
    // Copyto clipboard In Modal
    var clipboardModal = new ClipboardJS('.copy-clipboard-modal', {
        container: document.querySelector('.modal')
    });
    clipboardModal.on('success', function(e) {
        feedback(e.trigger, 'success'); e.clearSelection();
    }).on('error', function(e) {
        feedback(e.trigger, 'fail');
    });
    
   
    // Dropzone
	var $upload_zone = $('.upload-zone');
	if ($upload_zone.length > 0 ) {
        Dropzone.autoDiscover = false;
		$upload_zone.each(function(){
			var $self = $(this);
			$self.addClass('dropzone').dropzone({ url: "/images" });
		});
	}

    //magnificPopup	Content
	var $image_popup = $('.image-popup');
	if ($image_popup.length > 0 ) {
		$image_popup.magnificPopup({
			type: 'image',
			preloader: true,
			removalDelay: 400,
			mainClass: 'mfp-fade'
		});
	}
    
    // Data Tables
    var $data_table = $('.dt-refs');
    if($data_table.length > 0){
       $data_table.DataTable({
           "ordering": false,
           "autoWidth": false,
           "dom":'<t><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
           "pageLength": 5, 
           "bPaginate" : $('.data-table tbody tr').length>5,
           "iDisplayLength": 5,
           "language": {
                "search": "",
                "searchPlaceholder": "Type in to Search",
                "info": "_START_ -_END_ of _TOTAL_",
                "infoEmpty": "No records",
                "infoFiltered": "( Total _MAX_  )",
                "paginate": {
                    "first":      "First",
                    "last":       "Last",
                    "next":       "Next",
                    "previous":   "Prev"
                },
            },
        });
    }
    
    
    var $data_table_filter = $('.dt-filter-init');
    if($data_table_filter.length > 0){
       var $data_table_fltr = $data_table_filter.DataTable({
           "ordering": false,
           autoWidth: false,
           "dom":'<"row justify-content-between pdb-1x"<"col-9 col-sm-6 text-left"f><"col-3 text-right"<"data-table-filter relative d-inline-block">>><t><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
           "pageLength": 10, 
           "bPaginate" : $('.data-table tbody tr').length>6,
           "iDisplayLength": 10,
           "language": {
                "search": "",
                "searchPlaceholder": "Type in to Search",
                "info": "_START_ -_END_ of _TOTAL_",
                "infoEmpty": "No records",
                "infoFiltered": "( Total _MAX_  )",
                "paginate": {
                    "first":      "First",
                    "last":       "Last",
                    "next":       "Next",
                    "previous":   "Prev"
                },
            },
        });
        
      
        
        var $data_filter = $('.data-filter');
        $data_filter.on('change', function(){
            var _thisval = $(this).val();
            $data_table_fltr.columns('.dt-tnxno').search( _thisval ? _thisval : '', true, false ).draw();
        });
    }
    
   
    // Bootstrap Modal Fix
    var $modal = $('.modal');
    $modal.on('shown.bs.modal', function () {
        if(!$body.hasClass('modal-open'))  {
            $body.addClass('modal-open');
        }
    });
    
    // Dropdown
    var $drop_toggle = $('.drop-toggle');	
	if ($drop_toggle.length > 0 ) {
		$drop_toggle.on("click",function(e){
			if ($win.width() < 991) {
				$(this).parent().children('.navbar-dropdown').slideToggle(400);
				$(this).parent().siblings().children('.navbar-dropdown').slideUp(400);
				$(this).parent().toggleClass('current');
				$(this).parent().siblings().removeClass('current');
				e.preventDefault();
			}
		});
	}	
	
	$("#account_frm_PIN").keyup(function() {                  
        $('#account_frm_PIN_two').val(this.value);             
    });


	$(".payment-system .pay-option-label").click(function() {
		var curr = $(this).data('curr');
		var rate = $(this).data('rate');
		
		var wmin = $(this).data('wmin');

		var pamount1 = $(this).data('pamount1');
		var pamount2 = $(this).data('pamount2');
		var pamount3 = $(this).data('pamount3');
		var pamount4 = $(this).data('pamount4');
		var pamount5 = $(this).data('pamount5');
		var pamount6 = $(this).data('pamount6');
		var pamount7 = $(this).data('pamount7');
		var pamount8 = $(this).data('pamount8');
		var pamount9 = $(this).data('pamount9');
		var pamount10 = $(this).data('pamount10');

		var balance = $(this).data('balance');
		
		$('.note-min').show();
		
		$('.tag-note').hide();
		if (curr === 'XRP' || curr === 'XMR') {
			$('.tag-note').show();
		}

		$('#add_Sum, #new_Sum').val('');
		
		$('.withdraw .note-min .note-text').html('The minimum amount you can withdraw is <strong>' + wmin + ' ' + curr + '</strong>.');
		
		$('.invest .note-min .note-text').html('<strong>' + pamount1 + ' ' + curr + '</strong> is minimum amount for investment.');
		
		$( "input[type='text']#add_Sum, input[type='text']#new_Sum" ).keyup(function() {
			var amount = $('#add_Sum, #new_Sum').val();
			$('.calc-amount').html('~' + parseFloat(amount*rate).toFixed(2));
		});
		
		$('.curr').html(curr);
		$('.pamount1').html(pamount1);
		$('.pamount2').html(pamount2);
		$('.pamount3').html(pamount3);
		$('.pamount4').html(pamount4);
		$('.pamount5').html(pamount5);
		$('.pamount6').html(pamount6);
		$('.pamount7').html(pamount7);
		$('.pamount8').html(pamount8);
		$('.pamount9').html(pamount9);
		$('.pamount10').html(pamount10);

		$(".withdraw .amount-suggest").show();
		$(".withdraw .amount-suggest a").click(function() {
			var wamount = $('span', this).html();
			$('#add_Sum, #new_Sum').val(wamount);
			$('.calc-amount').html('~' + parseFloat(wamount*rate).toFixed(2));
			return false;
		});	
		
		$('.amnt-min span').html(wmin);
		$('.amnt-all span').html(balance);
		
	});
	
	$(".exchange #add_PSys").on("change",function(){
			
		var emin = $("#add_PSys option:selected").attr('data-emin');
		var balall = $("#add_PSys option:selected").attr('data-all');
		
		$('.amnt-min span').html(emin);
		$('.amnt-all span').html(balall);
		
		$('.amount-suggest').show();
		
		$(".exchange .amount-suggest a").click(function() {
			var eamount = $('span', this).html();
			$('#add_Sum').val(eamount);
			showComis();
			return false;
		});	
		
	});
	
	$('input:radio[name=Plan], input:radio[name=new_Plan]').on("change",function(){
		$('.plan').hide();
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '1') {
			$('.plan1').show();
		}
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '2') {
			$('.plan2').show();
		}
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '3') {
			$('.plan3').show();
		}
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '4') {
			$('.plan4').show();
		}
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '5') {
			$('.plan5').show();
		}
		if ($("input[name='Plan']:checked, input[name='new_Plan']:checked").val() === '6') {
			$('.plan6').show();
		}
	});
	
	$('#token').on("change",function(){
		var rate = $("#token option:selected").attr('data-rate');
		var rate2 = $("#token option:selected").attr('data-rate2');
		var curr = $("#token option:selected").attr('data-curr');
		
		$('.token-calc-note').show();
		
		$('.token-calc-note .rate').html(rate);
		$('.token-calc-note .rate2').html(parseFloat(rate2/rate).toFixed(0));
		$('.token-calc-note .curr, .token-pay-currency .curr').html(curr);

		$( "#token-base-amount" ).keyup(function() {
			var amount = $('#token-base-amount').val();
			$('.token-amount').html(parseFloat((amount*rate2)/rate).toFixed(6));
		});		
		
	});

	
	
	
	function showComis(){$('#csum').html('');$('#sum2').html('');$.ajax({type: 'POST',url: 'ajax',data: 'module=balance&do=getsum'+'&oper='+$('#add_Oper').val()+'&cid='+$('#add_PSys').val()+'&sum='+$('#add_Sum').val()+'&cid2='+$('#add_PSys2').val(),success:function(ex){ex=eval(ex);$('#ccurr').html(ex[0]);$('#csum').html(ex[1]);$('#sum2').html(ex[2]);}});}tid=0;tf=function(){clearTimeout(tid);tid=setTimeout(function(){ showComis(); }, 200);};$('#add_PSys').change(tf);$('#add_Sum').keypress(tf);$('#add_PSys2').change(tf);showComis();
    
    
})(jQuery);