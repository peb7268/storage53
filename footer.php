    <script src="<?php echo TEMPLATE_DIR ?>/js/vendors/angular/angular.js"></script>
    <script src="<?php echo TEMPLATE_DIR ?>/js/src/app.js"></script>
	
	<a id="footerToggle" href="#">
		<i class="fa fa-comment"></i>
	</a>
	<div id="footer">
	    <ul>
	    	<li>
	    		<h4>Address</h4>
	    		<p>2095 Highway 211 NW</p> 
	    		<p>Suite 2F-161</p> 
	    		<p>Braselton GA, 30517</p>
				<br>
				<p>
					<a href="tel:404-867—3431"><i class="fa fa-phone-square"></i> &nbsp; (404)—867—3431</a>
				</p>
	    	</li>
	    	<li id="social">
	    		<h4>Social</h4>
	    	</li>
	    	<li id="contact">
	    		<h4>Get in touch</h4>

				<div id="form">
					<form action="http://skilltouch.com/wp-content/themes/skilltouch/formHandler.php" method="POST" class="contact ng-pristine ng-valid">
						<input type="text" name="name" placeholder="What's your name?" required="">
						<input type="text" name="subject" placeholder="What can we help you with?" required="">
						<input type="email" name="email" placeholder="Email" required="">
						<input type="phone" name="phone" placeholder="Phone">
						<textarea name="message" id="message" cols="30" rows="10" placeholder="Your message" required=""></textarea>

						<input type="submit" value="Submit">
					</form>
				</div>
	    	</li>
	    </ul>
    </div>
</body>
</html>