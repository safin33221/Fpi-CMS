export const printCredentialSlip = () => {
  const content = document.getElementById("credential-slip");

  if (!content) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) return;

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>

<title>Student Credential</title>

<style>
*{
box-sizing:border-box;
}

html,body{
margin:0;
padding:0;
background:white;
font-family:Arial,sans-serif;
}

@page{
size:A4;
margin:12mm;
}
</style>

</head>

<body>
${content.outerHTML}

<script>
window.onload=function(){
window.print();
window.onafterprint=function(){
window.close();
}
}
</script>

</body>
</html>
`);

  printWindow.document.close();
};