<?php
require('fpdf/fpdf.php');
require('htmlPHP.php'); 
$html = $_POST['data'];
$html = ('"<b id="msg" style="display: none;">No Sectors Recorded</b><table id="sumSecD"><thead><tr> <td colspan="10"></td><td colspan="2">engine hours</td> <td colspan="2">engine cycles</td> <td colspan="5"></td> </tr> <tr> <td>ID</td> <td>from</td> <td>to</td> <td>dist(nm)</td> <td>pic</td> <td>sic</td> <td>h c/a</td> <td>block time</td> <td>flight time</td> <td>airframe</td> <td>#1</td> <td>#2</td> <td>#1</td> <td>#2</td> <td>lnds</td> <td>fuel</td> <td>pax</td> <td>nature</td> <td>client</td> </tr> </thead> <tbody id="sectordetails"><tr><td>1</td><td align="center">DNAA</td><td align="center">DNCA</td><td align="center">123</td><td align="center">R.M</td><td align="center">G.V</td><td align="center">K.S</td><td align="center">1.5</td><td align="center">1.0</td><td align="center">1.0</td><td align="center">1.0</td><td align="center">1.0</td><td align="center">1.5</td><td align="center">1.5</td><td align="center">1</td><td align="center">34</td><td align="center">2</td><td align="center">Demonstration</td><td align="center">NPC Oil</td></tr><tr><td>2</td><td align="center">DNCA</td><td align="center">DNAA</td><td align="center">123</td><td align="center">R.M</td><td align="center">G.V</td><td align="center">K.S</td><td align="center">1.6</td><td align="center">1.2</td><td align="center">1.2</td><td align="center">1.2</td><td align="center">1.2</td><td align="center">1.6</td><td align="center">1.6</td><td align="center">1</td><td align="center">211</td><td align="center">2</td><td align="center">Demonstration</td><td align="center">NPC Oil</td></tr><tr><td colspan="7" align="right"><b><i>Sub-Total:&nbsp;&nbsp;</i></b></td><td style="margin-right:5px">3.1</td><td style="margin-right:5px">2.2</td><td>2.2</td><td>2.2</td><td>2.2</td><td>3.1</td><td>3.1</td><td>2</td><td>245</td><td>4</td><td colspan="2"></td></tr></tbody> <tfoot></tfoot> </table>"');
//class instantiation
$pdf=new PDF("P","in","Letter");
 
$pdf->SetMargins(1,1,1);
 
$pdf->AddPage();
$pdf->SetFont('Times','',12);
 

$pdf->SetFillColor(240, 100, 100);
$pdf->SetFont('Times','BU',12);
  
//Cell(float w[,float h[,string txt[,mixed border[,
//int ln[,string align[,boolean fill[,mixed link]]]]]]])
$pdf->Cell(0, .25, "Sector Details", 1, 2, "C", 1);
  
//$pdf->SetFont('Times','',12);
//MultiCell(float w, float h, string txt [, mixed border [, string align [, boolean fill]]])
$doe = $pdf->WriteHTML($html);
$pdf->Cell(0, .25, $doe, 1, 2, "C", 1);

  
$pdf->Output();
?>