var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://smarthealth.service.moph.go.th/phps/public/api/v3/gettoken",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Postman-Token": "f3b48c26-5304-4dd3-8ea9-4ac6b1134057"
  },
  "processData": false,
  "data": "{\"username\":\"mscarza@gmail.com\",\"password\":\"ScarZ@6529\"}"
}
  $.ajax(settings).done(function (response) {
     var vals;
    if(response.jwt_token==''){
        vals = response.message;
    }else{
        vals = response.jwt_token;
    }
    $("#hdc_token").val(vals);
    $("#hdc_code").val(response.user.code);
    $("#hdc_id").val(response.user.id);
    $("#hdc_name").val(response.user.name+' '+response.user.last_name);
    $("#hdc_posi").val(response.user.job_position);
    $("#hdc_tel").val(response.user.telephone);
    $("#hdc_email").val(response.user.email);
});  
