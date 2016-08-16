window.player_parameters = [
  'AHTDName',
  'course',
  'NONcompany',
  'g_oContentResults.nScore',
  'AHTDRE',
  'NONstate',
  'isAHTD'
];

window.database_parameters = [
  'name',
  'course',
  'company',
  'grade',
  're',
  'state',
  'isAhtd'
];

var token = 0;
var xhttp = new XMLHttpRequest();
var base_url = window.location.protocol + "//" + window.location.host;

xhttp.onreadystatechange = function()
{
  if(xhttp.readyState == 4 && xhttp.status == 200)
  {
    //converts responseText into JSON array/obj
    data = JSON.parse(xhttp.responseText);

    //gets token from response
    window.token = data.token;

    //second ajax request
    var xhttptwo = new XMLHttpRequest();

    xhttptwo.onreadystatechange = function()
    {
      if(xhttptwo.readyState == 4 && xhttptwo.status == 200)
      {
        data = JSON.parse(xhttptwo.responseText);

        if(!data.resp)
        {
          console.log(data.error);
        }
        else
        {
          console.log('Success');
        }
      }
    };

    var player = GetPlayer();

    postString = '';

    for(z=0;z<database_parameters.length;z++)
    {
      if(database_parameters[z] == 'grade')
      {
        //value is hardcoded
        postString += database_parameters[z] + "=" + g_oContentResults.nScore + "&";
      }
      else
      {
        postString += database_parameters[z] + "=" + player.GetVar(player_parameters[z]) + "&";
      }
    }

    xhttptwo.open("POST", base_url + "/dyn/course/storyline/email/ajax/use/token", true);
    xhttptwo.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttptwo.send(postString);
  }
};
xhttp.open("POST", base_url + "/dyn/course/storyline/email/ajax/get/token", true);
xhttp.send();
