    <script src="<?php echo TEMPLATE_DIR ?>/js/vendors/angular/angular.js"></script>
    <script src="<?php echo TEMPLATE_DIR ?>/js/vendors/angular-sanitize/angular-sanitize.js"></script>
    <script src="<?php echo TEMPLATE_DIR ?>/js/src/app.js"></script>
	<?php wp_footer(); ?>	
	<a id="footerToggle" href="#">
		<i class="fa fa-comment"></i>
	</a>
	<div id="footer">
	    <ul>
	    	<li>
	    		<h4>Address</h4>
	    		<p>1043 Gainesville Hwy</p> 
	    		<p>Winder GA, 30680</p>
				<br>
				<p>
					<a href="tel:678-671-7166"><i class="fa fa-phone-square"></i> &nbsp; 678.671.7166</a>
				</p>
	    	</li>
	    	<li id="social">
	    		<h4>Social</h4>
	    		<div id="twitter">
	    			<a class="twitter-timeline" href="https://twitter.com/storage53"  data-chrome="noborders noheader" data-widget-id="676442151807414272">Tweets by @storage53</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	    		</div>	
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