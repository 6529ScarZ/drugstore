function ReaderModal () {
$("#createModal").empty().append("<div class='modal' id='ReaderModal' role='dialog' aria-labelledby='exampleModalLabel'>"
                                    +"<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>"
                                    +"<h5 class='modal-title' id='ReaderModalLabel'></h5>"
                                    +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
                                    +"<div class='modal-body' id='modelStore'><span id='Store_detail'></span></div>"
                                    +"<div class='modal-footer'><button type='button' class='btn btn-primary' id='subnhso'>บันทึก</button><button type='button' class='btn btn-danger' data-dismiss='modal'>ปิด</button></div></div></div></div>");
    $('#ReaderModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  //var recipient = button.data('whatever')
  var modal = $(this)
  modal.find('.modal-title').text('Set JSmartcardReader')
  $('span#Store_detail').empty().append($("<input type='text' class='form-control' id='Readerurl' placeholder='JSmartcardReader URL'>"))
  
            if (typeof(Storage) !== "undefined") {
                 var Readerurl = localStorage.getItem("Readerurl");
                 
                 if(Readerurl != ''){
                $("#Readerurl").val(Readerurl)
            } 
            }    
            $("button#subnhso").click(function (e) {
            e.preventDefault();
            modal.modal('hide');
            localStorage.setItem("Readerurl", $("#Readerurl").val());
            })
//   $.getJSON('JsonData/comp_Data.php',{data: recipient},function (data) {
//        $('span#Store_detail').empty().append("ชือร้าน : "+data[0].comp_name+"  &nbsp;&nbsp;เลขที่เสียภาษี : "+data[0].comp_vax+"<br>"
//                            +"ที่อยู่ : "+data[0].comp_address+"<br>"
//                            +"หมายเลขโทรศัพท์ : "+data[0].comp_tell+"<br>หมายเลขโทรศัพท์มือถือ : "+data[0].comp_mobile+"<br>หมายเลขโทรสาร : "+data[0].comp_fax);
//
//    });

});
}