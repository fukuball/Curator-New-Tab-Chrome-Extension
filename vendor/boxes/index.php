<!--
Sliding Boxes and Captions with JQuery
March 2009
By Sam Dunn
www.buildinternet.com / www.onemightyroar.com
-->

<html>
	<head>
		<title>Sliding Boxes and Captions with JQuery</title>
		
		<style type="text/css">
		
			*{ padding:0px; margin:0px; }
			body{ background:#D5DEE7; }
			a{ color:#C8DCE5; }
			h3{ margin: 10px 10px 0 10px; color:#FFF; font:18pt Arial, sans-serif; letter-spacing:-1px; font-weight: bold;  }
			
			.boxgrid{ 
				width: 325px; 
				height: 260px; 
				margin:10px; 
				float:left; 
				background:#161613; 
				border: solid 2px #8399AF; 
				overflow: hidden; 
				position: relative; 
			}
				.boxgrid img{ 
					position: absolute; 
					top: 0; 
					left: 0; 
					border: 0; 
				}
				.boxgrid p{ 
					padding: 0 10px; 
					color:#afafaf; 
					font-weight:bold; 
					font:10pt "Lucida Grande", Arial, sans-serif; 
				}
				
			.boxcaption{ 
				float: left; 
				position: absolute; 
				background: #000; 
				height: 100px; 
				width: 100%; 
				opacity: .8; 
				/* For IE 5-7 */
				filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
				/* For IE 8 */
				-MS-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
 			}
 				.captionfull .boxcaption {
 					top: 260;
 					left: 0;
 				}
 				.caption .boxcaption {
 					top: 220;
 					left: 0;
 				}
				
		</style>
		
		<script type="text/javascript" src="http://jqueryjs.googlecode.com/files/jquery-1.3.1.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				//To switch directions up/down and left/right just place a "-" in front of the top/left attribute
				//Vertical Sliding
				$('.boxgrid.slidedown').hover(function(){
					$(".cover", this).stop().animate({top:'-260px'},{queue:false,duration:300});
				}, function() {
					$(".cover", this).stop().animate({top:'0px'},{queue:false,duration:300});
				});
				//Horizontal Sliding
				$('.boxgrid.slideright').hover(function(){
					$(".cover", this).stop().animate({left:'325px'},{queue:false,duration:300});
				}, function() {
					$(".cover", this).stop().animate({left:'0px'},{queue:false,duration:300});
				});
				//Diagnal Sliding
				$('.boxgrid.thecombo').hover(function(){
					$(".cover", this).stop().animate({top:'260px', left:'325px'},{queue:false,duration:300});
				}, function() {
					$(".cover", this).stop().animate({top:'0px', left:'0px'},{queue:false,duration:300});
				});
				//Partial Sliding (Only show some of background)
				$('.boxgrid.peek').hover(function(){
					$(".cover", this).stop().animate({top:'90px'},{queue:false,duration:160});
				}, function() {
					$(".cover", this).stop().animate({top:'0px'},{queue:false,duration:160});
				});
				//Full Caption Sliding (Hidden to Visible)
				$('.boxgrid.captionfull').hover(function(){
					$(".cover", this).stop().animate({top:'160px'},{queue:false,duration:160});
				}, function() {
					$(".cover", this).stop().animate({top:'260px'},{queue:false,duration:160});
				});
				//Caption Sliding (Partially Hidden to Visible)
				$('.boxgrid.caption').hover(function(){
					$(".cover", this).stop().animate({top:'160px'},{queue:false,duration:160});
				}, function() {
					$(".cover", this).stop().animate({top:'220px'},{queue:false,duration:160});
				});
			});
		</script>
		
	</head>
	<body>

			<div class="boxgrid captionfull">
				<img src="jareck.jpg"/>
				<div class="cover boxcaption">
					<h3>Jarek Kubicki</h3>
					<p>Artist<br/><a href="http://www.nonsensesociety.com/2009/03/art-by-jarek-kubicki/" target="_BLANK">More Work</a></p>
				</div>		
			</div>
			
			<div class="boxgrid caption">
				<img src="kamil.jpg"/>
				<div class="cover boxcaption">
					<h3>Kamil Smala</h3>
					<p>Artist<br/><a href="http://www.nonsensesociety.com/2009/03/the-art-of-kamil-smala/" target="_BLANK">More Work</a></p>
				</div>
			</div>
				
			<div class="boxgrid slideright">
				<img class="cover" src="martin.jpg"/>
				<h3>Martin Stranka</h3>
				<p>Photographer<br/><a href="http://www.nonsensesociety.com/2009/03/photography-by-martin-stranka/" target="_BLANK">More Work</a></p>
			</div>
			<div class="boxgrid thecombo">
				<img class="cover" src="florian.jpg"/>
				<h3>Florian Nicolle</h3>
				<p>Graphic Designer<br/><a href="http://www.nonsensesociety.com/2009/03/portrait-week-florian-nicolle/" target="_BLANK">More Work</a></p>
			</div>
			
			<div class="boxgrid slidedown">
				<img class="cover" src="nonsense.jpg"/>
					<h3>The Nonsense Society</h3>
					<p>Art, Music, Word<br/><a href="http://www.nonsensesociety.com" target="_BLANK">Website</a></p>	
			</div>
			<div class="boxgrid peek">
				<a href="http://feeds2.feedburner.com/buildinternet" target="_BLANK"><img src="birss.jpg"/></a>
				<a href="http://www.buildinternet.com" target="_BLANK"><img class="cover" src="buildinternet.jpg"/></a>
			</div>

	
	</body>
</html>