function loginJSON(str)
{
    webix.ready(function ()
    {
        $.ajax({
            url: "login",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            data: {"json":JSON.stringify(str)},
            success:function(data){
                var id = JSON.parse(data[0]);
                var id_employee = JSON.parse(data[0]);
                loginResult(id, id_employee);
            }
        });
    });
}
