
$(document).ready(function() {
  // $.sidebarMenu($('.sidebar-menu'))

  /// show popup
  $(".bus-button-confirm").on("click", function(event){
      $('#popupConfirmDelete').modal('show');
  });

  $(".open-find-id").on("click", function(event){
      $('#popupfind-id').modal('show');
  });

  $(".open-postcode-member").on("click", function(event){
      $('#popuppostcode-member').modal('show');
  });
  // end show popup

  // add height
   


  // jquery page mamber
  if ($('.selectpickermember').length) {
    $('.selectpickermember').selectpicker({
      style: 'btn-info',
      size: 4,
      minDate : moment()
    });
  }

  // input radio check
  $('.member-sub input.radio1:radio').change(function () {
    if ($(this).is(":checked")) {
        $(".member-sub").addClass('show-item1');
        $(".member-sub").removeClass('show-item2');
    }
    else {
        
    };
  });
  $('.member-sub input.radio2:radio').change(function () {
    if ($(this).is(":checked")) {
        $(".member-sub").addClass('show-item2');
        $(".member-sub").removeClass('show-item1');
    }
    else {
        
    };
  });

  // input radio bussiness sub detail
  $('.check-itemselect input.radio1:radio').change(function () {
    if ($(this).is(":checked")) {
        $(".show-radiobusiness-detail").addClass('show-item1');
        $(".show-radiobusiness-detail").removeClass('show-item2');
    }
    else {
        
    };
  });
  $('.check-itemselect input.radio2:radio').change(function () {
    if ($(this).is(":checked")) {
        $(".show-radiobusiness-detail").addClass('show-item2');
        $(".show-radiobusiness-detail").removeClass('show-item1');
    }
    else {
        
    };
  });

  // input radio request list
  $('.radio-check-request-list input.radio1:radio').change(function () {
    if ($(this).is(":checked")) {
     $("#buttonSubmitRequestCounselor").removeClass("disabled")
        $(".request-list-radio1").addClass('show-radio1');
        $(".request-list-radio2").removeClass('show-radio2');
    }
    else {
        
    };
  });
  $('.radio-check-request-list input.radio2:radio').change(function () {
    if ($(this).is(":checked")) {
     $("#buttonSubmitRequestCounselor").removeClass("disabled")
        $(".request-list-radio1").removeClass('show-radio1');
        $(".request-list-radio2").addClass('show-radio2');
    }
    else {
        
    };
  });

  $(document.body).on('click', '.approval-request-detail .form-footer .v1', function(e) {
      $(".form-footer1.style1").addClass('show');
      $(".approval-request-detail .form-footer .v1").addClass('show-before red');
      $(".form-footer1.style2").removeClass('show');
      $(".approval-request-detail .form-footer .v2").removeClass('show-before red');
  });
  $(document.body).on('click', '.approval-request-detail .form-footer .v2', function(e) {
      $(".form-footer1.style2").addClass('show');
      $(".approval-request-detail .form-footer .v2").addClass('show-before red');
      $(".form-footer1.style1").removeClass('show');
      $(".approval-request-detail .form-footer .v1").removeClass('show-before red');
  });

  (function($) {
    function inputuploadimg() {
        if (!$('.tr-file-upload.image-upload').length) return;

        $('.tr-file-upload.image-upload').each(function() {
          var fileUpload = $(this);
          var showFileInfo = fileUpload.find('.show-file-info');
          var inputFile = fileUpload.find('.input-file');
          var previewImage = fileUpload.find('.preview-image > img');
          var previewImageBg = fileUpload.find('.preview-image > .image-bg');

          previewImage.attr('src') == '' ? previewImage.closest('.preview-image').addClass('no-image') : previewImage.closest('.preview-image').removeClass('no-image');
          previewImageBg.attr('style') == undefined ? previewImageBg.closest('.preview-image').addClass('no-image') : previewImageBg.closest('.preview-image').removeClass('no-image');
          
          var readURL = function(input) {
            if (input.files && input.files[0]) {
              var reader = new FileReader();

              reader.onload = function(e) {
                previewImage.attr('src', e.target.result);
                previewImageBg.attr('style', 'background-image: url("' + e.target.result + '");');
              }

              reader.readAsDataURL(input.files[0]);
            }
          };
          inputFile.on('change', function() {
            var thisInputFile = $(this);
            var file = thisInputFile[0].files[0];
            var fileName = file.name;
            // alert(fileName);
            showFileInfo.empty().text(fileName);
          });

          fileUpload.find('.input-file').on('change', function() {
            readURL(this);
          });
        });
    }
    function addcolum() {
      
      $(".add-field").click(function(){
        // $(this).closest(".program-detail div.md-ct .item-img-section").empty();
        $(".coun-field .link-dowload").addClass('show-button');
        $(".coun-field .add-item-field").append('<tr class="add-select"><td><input type="text" name="name" data-required="1" class="form-control"/></td><td><div class="inputfile busine-detail"><div class="tr-file-upload image-upload"><label class="btn green btn-select-file">찾아보기<input type="file" class="hidden input-file"></label><div class="preview-image"><img src="../../assets/images/demo_single_2.jpg" alt="thumbnail"></div></div></div></td></td><td><div class="inputfile busine-detail"><div class="tr-file-upload image-upload"><label class="btn green btn-select-file">찾아보기<input type="file" class="hidden input-file"></label><div class="preview-image"><img src="../../assets/images/demo_single_2.jpg" alt="thumbnail"></div></div></div></td><td><select name="selecttext" class="form-control selectpickermember selectpickeraddclass pull-right addclas-on"><option value="0">Yes</option><option value="1">No</option></select></td><td class="show-text1"><span class="text1">보험사</span><select name="selecttext" class="form-control selectpickermember pull-right show-select1"><option value="0">심리적 증상</option><option value="1">심리적 증상</option></select></td><td><select name="selecttext" class="form-control selectpickermember pull-right"><option value="0">Yes</option><option value="1">No</option></select></td><td><select name="selecttext" class="form-control selectpickermember pull-right"><option value="0">심리적 증상</option><option value="1">심리적 증상</option></select></td></tr>');
        $('.selectpickermember').selectpicker('refresh');
         inputuploadimg(); 
      });
    }

    $(window).on('load', function() {
      addcolum();
    });

    // slide banner
    function addpanner() {
      $('#slide-banner').on('change', function(){
        var minditem = $('#slide-banner').selectpicker('val');
        var testimonials= $('.content-mind');
       // $('.member-main-top').html('');
          for (var i = 0; i < 5; i++) {
            // Using $() to re-wrap the element.
            // $(testimonials[i]).html('Testimonial by each loop');.html('Testimonial '+(index+1)+' by each loop');
            if(i< minditem){
              $(".slide-banner .main-content").removeClass('total-select0');
              $(".slide-banner .main-content").removeClass('total-select1');
              $(".slide-banner .main-content").removeClass('total-select2');
              $(".slide-banner .main-content").removeClass('total-select3');
              $(".slide-banner .main-content").addClass('total-select'+i);
              $(testimonials[i]).html('<div class="main-left"><select name="selecttext" title="선택..." class="form-control selectpickermember text-left"><option data-hidden="true"></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div><div class="main-right"><div class="item-upload"><div class="inputfile"><div class="tr-file-upload image-upload"><div class="preview-image"><img src="../../assets/images/no-img.png" alt="thumbnail"/><div class="content-input"><label class="btn green btn-select-file">찾아보기<input type="file" class="hidden input-file"/></label><div class="input-icon input-large input-inline right"><span class="show-file-info"></span></div></div></div></div></div></div></div>');
              $('.selectpickermember').selectpicker('refresh');
              inputuploadimg(); 
            }else{
               $(testimonials[i]).html('');
            }
          }
    
      });
    // var busiyear1 = $('#busiyear1').selectpicker('val');
    // alert(busiyear1);
    }
    $(window).on('load', function() {
      addpanner();
    });

    // intro page banner
    function addintropage() {
      $('#intro-page').on('change', function(){
        var minditem = $('#intro-page').selectpicker('val');
        var testimonials= $('.content-mind');
       // $('.member-main-top').html('');
          for (var i = 0; i < 5; i++) {
            // Using $() to re-wrap the element.
            // $(testimonials[i]).html('Testimonial by each loop');.html('Testimonial '+(index+1)+' by each loop');
            if(i< minditem){
            $(testimonials[i]).html('<div class="item-upload"><div class="inputfile"><div class="tr-file-upload image-upload"><div class="preview-image"><img src="../../assets/images/demo_single_2.jpg" alt="thumbnail"/></div><label class="btn green btn-select-file">찾아보기<input type="file" class="hidden input-file"/></label><div class="input-icon input-large input-inline right"><span class="show-file-info"></span></div></div></div></div>');
            // $('.selectpickermember').selectpicker('refresh');
            inputuploadimg(); 
            }else{
               $(testimonials[i]).html('');
            }
          }
    
      });
    // var busiyear1 = $('#busiyear1').selectpicker('val');
    // alert(busiyear1);
    }
    $(window).on('load', function() {
      addintropage();
    });
    $(document).ready( function(){
      $(".page-account-vp .list-tabs li:eq(0)").addClass('active');

      $(".tabs-content .acountstab").not(':eq(0)').addClass('hide');

      $(".page-account-vp .list-tabs li a").click(function(){

          var $this = $(this),
          $href = this.hash,
          $tab = $($href),

          $currentTab = $(".tabs-content .acountstab:visible");

          $(".page-account-vp .list-tabs li").removeClass('active');

          $this.parent().addClass('active');

          $currentTab.addClass('hide');

          $tab.removeClass('hide');

          return false;

      });
    });
    $(document).ready( function(){
      $(".menu-ccn").click(function(){
        if(!$(".page-sidebar").hasClass("active")){
          $(".page-sidebar").addClass("active");
        }
        
        else{
          $(".page-sidebar").removeClass("active");
        }
      })
    });

  })(jQuery);

  
    


  
  (function($) {
    $(document.body).on('change', '.selectpickeraddclass', function() {
      var valoption = $('.selectpickeraddclass').selectpicker('val');
      // alert(valoption);
      if(valoption = 1){
        $(".show-text1").addClass('show-select');
        // alert(valoption);
      }
      else{
        $("show-text1").removeClass('show-select');
        // alert(valoption);
      }
    });
   })(jQuery);

   $(".checkall label input").click(function () {
    if ($(this).is(":checked")){
      var isAllChecked = 0;
      $(".checkall label input").each(function(){
        if(!this.checked)
           isAllChecked = 1;
      })              
      if(isAllChecked == 0){ 
        $(".checkall input#all").prop("checked", true); 
        $.uniform.update('.checkall input#all');
      }     
    }else {
      $(".checkall input#all").prop("checked", false);
      $.uniform.update('.checkall input#all');
    }
  });


   var status = $('.checkall input#all').is(':checked');
   if(status == true){
    $('.checkall label input').attr('checked', status);
    $.uniform.update('.checkall label input');
   }
   else{
    
   }
   
   $('.checkall input#all').bind('click', function(){
      var status = $(this).is(':checked');
      $('.checkall label input').attr('checked', status);
      $.uniform.update('.checkall label input');
    });

   //paditech
   $('#element_avia_2_1').on('click', function(){
    
      var status = $(this).is(':checked');
      var status2 = $('#element_avia_3_1').is(':checked');
      if(status2 == true){ 
        alert(1);
        $(this).prop('checked', false);
      } 
      else{
        alert(2);
        
        $(this).prop('checked', true);
      }
      // $('.checkall label input').attr('checked', status);
    });

   $('#popupGiveRetrieveHelloCoin').bind('click', function(){
      var status = $(this).is(':checked');
      $('.checkall label input').attr('checked', status);
      $.uniform.update('.checkall label input');
    });

   //tooltip
   $(function () {
      $('[data-toggle="tooltip"]').tooltip({html:true})
    })

  $('#checked-push input').change(function () {
    if ($(this).is(":checked")) {
        $("#checked-push").addClass('active');
        $("#tab-none").addClass('active');
    }
    else {
        $("#checked-push").removeClass('active');
        $("#tab-none").removeClass('active');
    };
  });
  

});

$(document.body).on('click', '.item-button .btn' , function(){
  if($(this).hasClass('green')){
      $(this).removeClass('green');
      $(this).siblings().addClass('green');
  }
  else {
      $(this).addClass('green');
      $(this).siblings().removeClass('green');
      }
  });

// jquery coupon popup
$(document.body).on('click', '#send_coupon' , function(){
  var couponnumber   = $(".coupon-number").text();
  var couponnote  = $(".coupon-note").text();
  $("#coupon-number").val(couponnumber);
  $("#popup-coupon-note").text(couponnote);
});


$(document).ready(function() {
  (function($)
 {
    if (!$('.st-file-doc-upload').length) return;
    $('.st-file-doc-upload').each(function() {
      var fileUploadWrapper = $(this);
      var inputFile = fileUploadWrapper.find('.input-file');
      var showFileInfo = fileUploadWrapper.find('.show-file-info');
      inputFile.on('change', function() {
        var thisInputFile = $(this);
        var file = thisInputFile[0].files[0];
        var fileName = file.name;
        var fileSize = file.size;
        var fileExtension = fileName.split('.').pop().toLowerCase();
        var listExtensionArray = ['pdf'];
        var inArrayExtension = $.inArray(fileExtension, listExtensionArray);
        if(inArrayExtension >= 0){
            showFileInfo.empty().text(fileName);
        }else{
          alert('ファイル形式が正しくありません, pdf');
        }
      });
    });
  })(jQuery);
});
(function($){
    if (!$('.st-file-upload').length) return;
    $('.st-file-upload').each(function() {
      var fileUploadWrapper = $(this);
      var inputFile = fileUploadWrapper.find('.input-file');
      var showFileInfo = fileUploadWrapper.find('.show-file-info');

      inputFile.on('change', function() {
        var thisInputFile = $(this);
        var file = thisInputFile[0].files[0];
        var fileName = file.name;
        var fileSize = file.size;
        var fileExtension = fileName.split('.').pop().toLowerCase();
        var listExtensionArray = ['jpg', 'gif', 'png'];
        var inArrayExtension = $.inArray(fileExtension, listExtensionArray);
        if(inArrayExtension >= 0){
            showFileInfo.empty().text(fileName);
        }else{
          alert('ファイル形式が正しくありません, jpg,gif,png');
        }
        
      });
    });
  })(jQuery);
