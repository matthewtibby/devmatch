/* global $, Stripe */
//Document ready function.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set stripe public key.
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks submit button prevent default behaviour.
  submitBtn.click(function(event){
    event.preventDefault();
   //Collect credit card fields.  
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
  
  //Send Card info to Stripe.
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
});




  //Stripe to send back card token.
  //Inject card token as a hidden field into form
  //Submit form to rails app.
});


