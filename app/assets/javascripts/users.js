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
    submitBtn.val("Processing...").prop('disabled', true);
    
    
   //Collect credit card fields.  
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
  //Use stripe JS libaray to check for errors.   
  var error = false;
  
  //Validate card number.
  if (!Stripe.card.validateCardNumber(ccNum)) {
    error = true ;
    alert('The card number you have entered appears to be invalid');
  }
  
  //Validate CVC number.
    if (!Stripe.card.validateCVC(cvcNum)) {
    error = true ;
    alert('The CVC number you have entered appears to be invalid');
    }
    
  //Validate Expiry Date.  
     if (!Stripe.card.validateExpiry(expMonth, expYear)) {
    error = true ;
    alert('The expiration date you have entered appears to be invalid');
    }
  
  if (error) {
    //If card errors do not send to Stripe.
    submitBtn.prop('disabled', false).val("Sign Up");
  } else {
    //Send Card info to Stripe.
  
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
  }
  
    
    return false;
  });
  
  //Stripe to send back card token.
  function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;
    
    ////Inject card token as a hidden field into form.
    theForm.append( $('<input type="hidden" "name ="user[stripe_card_token]>').val (token) );
  
  
    //Submit form to rails app.
    theForm.get(0).submit();
  }
});


