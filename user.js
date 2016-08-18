function ajax_call(url,data)
{
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if(xhttp.readyState == 4 && xhttp.status == 200)
    {
      data = JSON.parse(xhttp.responseText);

      if(!data.resp)
      {
        console.log(data.error);
        return false;
      }
      else
        return true;
    }
  }
  xhttp.open("POST", window.location.protocol + "//" + window.location.host + url, true);
  if(data)
    xhttp.send(data);
  else
    xhttp.send();
}

var player = GetPlayer();

if(ajax_call("/dyn/course/storyline/email/ajax/get/token",0))
{
  var database_parameters = [
    'name',
    'course',
    'company',
    'grade',
    're',
    'state',
    'isAhtd'
  ];
  var player_parameters = [
    'AHTDName',
    'course',
    'NONcompany',
    g_oContentResults.nScore,
    'AHTDRE',
    'NONstate',
    'isAHTD'
  ];

  postString = '';

  for(z=0;z<database_parameters.length;z++)
  {
    if(database_parameters[z] == 'grade')
      postString += database_parameters[z] + "=" + player_parameters[z] + "&";
    else
      postString += database_parameters[z] + "=" + player.GetVar(player_parameters[z]) + "&";
  }

  ajax_call("/dyn/course/storyline/email/ajax/use/token",postString);
}
