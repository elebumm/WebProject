<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Skalez Games</title>
	<link rel="stylesheet" href="themes/mobile.min.css" />
	<link rel="stylesheet" href="themes/jquery.mobile.icons.min.css" />
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.3/jquery.mobile.structure-1.4.3.min.css" />
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.3/jquery.mobile-1.4.3.min.js"></script>
	<link rel="stylesheet" href="css/carousel.css">
	<link rel="stylesheet" href="css/carousel-style.css">
	<link rel="stylesheet" href="css/mobileLogin.css">
</head>
<body>
	<!-- HOME PAGE -->
	<div data-role="page" href="#home" data-url="home" data-theme="a">
		<div data-role="header" style="overflow:hidden;">
			<h1>Skalez Games</h1>
			<a href="#signup" data-icon="gear" class="ui-btn-right">Sign Up</a>
			<div data-role="navbar">
				<ul>
					<li><a href="#home" class="ui-btn-active" data-icon="home">Home</a></li>
					<li><a href="#games" data-icon="shop">Games</a></li>
					<li><a href="#about" data-icon="info">About</a></li>
					<li><a href="#Account" data-icon="user">Account</a></li>
				</ul>
			</div><!-- /navbar -->
		</div>
		<!-- carousel area -->
		
		<section data-role="content">
			<h4>Computer &amp; Video Games | Best Sellers | New &amp; Future Releases | Deals </h4>
			<h4>Popular on SkalezGames</h4>
			<section class="ui-grid-a">
				<div class="ui-block-a">					
					<a href="#games">
						<img src="img/CP103.jpg" title="BioShock Infinite" alt="BioShock Infinite" width="230"/>
						<p>BIOSHOCK INFINITE for PC<br />
							Available now</p>
					</a>
					<a href="#games">
						<img src="img/NO101.jpg" title="Bayonetta 2" alt="Bayonetta 2" width="230"/>
						<p>Bayonetta 2<br />
						   Shop now</p>
					</a>
					<a href="#games">
						<img src="img/PS103.jpg" title="GTA V" alt="GTA V" width="230"/>
						<p>Grand Theft Auto V<br />
						   Available now</p>
					</a>
					<a href="#games">
						<img src="img/NO107.jpg" title="Super Smash Bros." alt="Super Smash Bros." width="230"/>
						<p>Super Smash Bros.<br />
						   Available now</p>	
					</a>
					<a href="#games">
						<img src="img/bloodborne.jpg" title="Bloodborne" alt="Bloodborne" width="230"/>
						<p>Bloodborne<br />
						   Pre-order now</p>
					</a>
				</div>
				<div class="ui-block-b">
					<a href="#games">
						<img src="img/PS109.jpg" title="Assassin's Creed Unity" alt="Assassin's Creed Unity" width="230"/>
						<p>Assassin's Creed Unity<br />
							Order now</p>
					</a>
					<a href="#games">
						<img src="img/XB105.jpg" title="Diablo" alt="Diablo" width="230"/>
						<p>Diablo: Reaper of Souls<br />
						   Get it now</p>
					</a>
					<a href="#games">
						<img src="img/PS115.jpg" title="Final Fantasy X" alt="Final Fantasy X" width="230"/>
						<p>Final Fantasy X|X-2<br />
						   Available now</p>
					</a>
					<a href="#games">
						<img src="img/XB111.jpg" title="Batman Arkham Knight" alt="Batman Arkham Knight" width="230"/>
						<p>Batman: Arkham Knight<br />
						   Buy now</p>
					</a>
					<a href="#games">
						<img src="img/NO113.jpg" title="Animal Crossing" alt="Animal Crossing" width="230"/>
						<p>Animal Crossing<br />
						   Shop now</p>
					</a>
				</div>
			</section>
		</section>
			
	</div>
	
	<!-- ABOUT -->
	<div data-role="page" href="#about" data-url="about" data-theme="a">
		<div data-role="header" style="overflow:hidden;">
			<h1>Skalez Games</h1>
		    <a href="#signup" data-icon="gear" href="signup" class="ui-btn-right">Sign Up</a>
		    <div data-role="navbar">
		        <ul>
		            <li><a href="#home" data-icon="home">Home</a></li>
		            <li><a href="#games" data-icon="shop">Games</a></li>
		            <li><a href="#about" class="ui-btn-active" data-icon="info">About</a></li>
					<li><a href="#Account" data-icon="user">Account</a></li>
		        </ul>
		    </div><!-- /navbar -->
		</div>
		<div data-role="content" data-theme="a">
			<h1>Who are we?</h1>
			<p>We are Skalez Games. We are 3 students at Lambton College developing a mock website for a video game retailer. We are located at Lambton College at N208 coding our lives away.</p>
		</div>
			 
	</div>


	<!-- GAMES PAGE -->
	<div data-role="page" href="#games" data-url="games" data-theme="a">
		<div data-role="header" style="overflow:hidden;">
			<h1>Skalez Games</h1>
		    <a href="#signup" data-icon="gear" class="ui-btn-right">Sign Up</a>
		    <div data-role="navbar">
		        <ul>
		            <li><a href="#home" data-icon="home">Home</a></li>
		            <li><a href="#games"  class="ui-btn-active" data-icon="shop">Games</a></li>
		            <li><a href="#about" data-icon="info">About</a></li>
					<li><a href="#Account" data-icon="user">Account</a></li>
		        </ul>
		    </div><!-- /navbar -->
		</div>
		<div data-role="content" data-theme="a">
			<h1>Games</h1>
			<table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke">
			     <thead>
			       <tr>
			         <th data-priority="2">Price</th>
			         <th>Title</th>
			         <th data-priority="3">Platform</th>
			         <th data-priority="1">ESRB</th>
			         <th data-priority="5">Genre</th>
			       </tr>
			     </thead>
			     <tbody>
			       <tr>
			         <th>69.99</th>
			         <td>NHL 15</td>
			         <td>PS3</td>
			         <td>E</td>
			         <td>Sports</td>
			       </tr>
			       <tr>
			         <th>54.02</th>
			         <td>Grand Theft Auto 5</td>
			         <td>PS3</td>
			         <td>M</td>
			         <td>Action</td>
			       </tr>
			       <tr>
			         <th>39.99</th>
			         <td>The Last of Us</td>
			         <td>PS3</td>
			         <td>M</td>
			         <td>Survival-Action</td>
			       </tr>
			       <tr>
			         <th>69.99</th>
			         <td>Destiny</td>
			         <td>PS4</td>
			         <td>T</td>
			         <td>Action-Adventure</td>
			       </tr>
			       <tr>
			         <th>69.99</th>
			         <td>Assassins Creed: Unit</td>
			         <td>PS4</td>
			         <td>M</td>
			         <td>Action-Adventure</td>
			       </tr>
			       <tr>
			         <th>62.99</th>
			         <td>Little Big Planet 3</td>
			         <td>PS4</td>
			         <td>E</td>
			         <td>Adventure</td>
			       </tr>
			       <tr>
			         <th>19.83</th>
			         <td>Minecraft: Xbox 360 Edition</td>
			         <td>Xbox 360</td>
			         <td>E</td>
			         <td>Puzzle</td>
			       </tr>
			       <tr>
			         <th>44.99</th>
			         <td>Diablo: Reaper of Souls</td>
			         <td>Xbox One</td>
			         <td>M</td>
			         <td>Action</td>
			       </tr>
			       <tr>
			         <th>69.99</th>
			         <td>Mortal Kombat X</td>
			         <td>PS4</td>
			         <td>M</td>
			         <td>Fighter</td>
			       </tr>
			       <tr>
			         <th>59.99</th>
			         <td>Mario Kart 8</td>
			         <td>Wii U</td>
			         <td>E</td>
			         <td>Racing</td>
			       </tr>
			     </tbody>
			</table>			
		</div>
			 
	</div>



	<!--SIGN UP PAGE -->
	<div data-role="page" href="#signup" data-url="signup" data-theme="a">
		<div data-role="header" style="overflow:hidden;">
			<h1>Skalez Games</h1>
		    <a href="#" data-icon="gear" class=" ui-btn-active ui-btn-right">Sign Up</a>
		    <div data-role="navbar">
		        <ul>
		            <li><a href="#home" data-icon="home">Home</a></li>
		            <li><a href="#games" data-icon="shop">Games</a></li>
		            <li><a href="#about"  data-icon="info">About</a></li>
					<li><a href="#Account" data-icon="user">Account</a></li>
		        </ul>
		    </div><!-- /navbar -->
		</div>
		<div data-role="content" data-theme="a">
			<h1>Sign Up</h1>
			<form  action="register.php" autocomplete="on" method="post"> 
			<label for="text-basic">First Name:</label>
			<input type="text" name="fName" id="fName" value="">
			<label for="text-basic">Last Name:</label>
			<input type="text" name="lName" id="lName" value="">
			<label for="text-basic">Username:</label>
			<input type="text" name="uName" id="uName" value="">
			<label for="text-basic">Password:</label>
			<input type="text" name="password" id="password" value="">
			<label for="text-basic">Confirm Password:</label>
			<input type="text" name="password_confirm" id="password_confirm" value="">
			<label for="text-basic">E-mail Address:</label>
			<input type="text" name="email" id="email" placeholder="example@domain.com" value="">
			<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
    <legend>Gender:</legend>
        <select name="gender">
		<input type="radio" name="radio-choice-b" id="radio-choice-c" value="list" checked="checked">
        <label for="radio-choice-c">Male</label>
        <input type="radio" name="radio-choice-b" id="radio-choice-d" value="grid">
        <label for="radio-choice-d">Female</label>
		</select>
</fieldset>
<label for="slider2">Would you like to recieve emails from us?</label>
<select name="newsletter" id="slider2" data-role="slider">
    <option value="off">No</option>
    <option value="on">Yes</option>
</select>
			<br>
			<input type="submit" value="Submit">
			</form>
		</div>			  			 
	</div>




	<!-- ACCOUNT PAGE -->
	<div data-role="page" href="#Account" data-url="Account" data-theme="a">
		<div data-role="header" style="overflow:hidden;">
			<h1>Skalez Games</h1>			
			<a href="#signup" data-icon="gear" class="ui-btn-right">Sign Up</a>
			<!-- /navbar -->
			<div data-role="navbar">
				<ul>
					<li><a href="#home" data-icon="home">Home</a></li>
					<li><a href="#games" data-icon="shop">Games</a></li>
					<li><a href="#about" data-icon="info">About</a></li>
					<li><a href="#Account" class="ui-btn-active" data-icon="user">Account</a></li>
				</ul>
			</div>
		</div>
		<h2>Log In</h2>
		<form action="login.php" method="post" id="login">
		  <label for="username">Username <span>*</span></label>
		  <input type="text" id="username" name="username" require="required" />
		  <label for="password">Password <span>*</span></label>
		  <input type="password" id="password" name = "password" require="required" />
		  <input type="submit" value="Log in" id="submitButton"/>	
		</form>
	</div>
	
	<!-- include zepto.js or jquery.js -->
	<script src="JS/jquery-1.11.1.min.js"></script>
	<!-- include carousel.js -->
	<script src="JS/carousel.js"></script>
	<!-- construct the carousel -->
	<script>$('.m-carousel').carousel()</script>
</body>
</html>