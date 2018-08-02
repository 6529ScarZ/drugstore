function NHSOModal () {
$("#createModal").empty().append("<div class='modal' id='NHSOModal' role='dialog' aria-labelledby='exampleModalLabel'>"
                                    +"<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>"
                                    +"<h5 class='modal-title' id='NHSOModalLabel'></h5>"
                                    +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
                                    +"<div class='modal-body' id='modelStore'><span id='Store_detail'></span></div>"
                                    +"<div class='modal-footer'><button type='button' class='btn btn-primary' id='subnhso'>บันทึก</button><button type='button' class='btn btn-danger' data-dismiss='modal'>ปิด</button></div></div></div></div>");
    $('#NHSOModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  //var recipient = button.data('whatever')
  var modal = $(this)
  modal.find('.modal-title').text('Set NHSO')
  $('span#Store_detail').empty().append($("<input type='text' class='form-control' id='nhso_token' placeholder='NHSO token key'><br>")
                                        ,$("<input type='text' class='form-control' id='nhso_cid' placeholder='เลขบัตรประชาชน'>"))
            if (typeof(Storage) !== "undefined") {
                 var nhso_token = localStorage.getItem("nhso_token");
                 var nhso_cid = localStorage.getItem("nhso_cid");
                 
                 if(nhso_token != '' && nhso_cid != ''){
                $("#nhso_token").val(nhso_token)
                $("#nhso_cid").val(nhso_cid)
            } 
            }                            
                                       
            $("button#subnhso").click(function (e) {
            e.preventDefault();
            modal.modal('hide');
            localStorage.setItem("nhso_token", $("#nhso_token").val());
            localStorage.setItem("nhso_cid", $("#nhso_cid").val());
//                $.cookie("nhso_token", $("#nhso_token").val(),{ expires: 365, path: '/' });
//                $.cookie("nhso_cid", $("#nhso_cid").val(),{ expires: 365, path: '/' });     
            })
});
}