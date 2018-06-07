Stripe.PublishableKey('#');

var $form = $('#checkout-form');

$form.submit(function(event){
  $form.find('button').prop('disabled',true)
  //
  // stripe.createToken('bank_account', {
  //   country: 'IN',
  //   currency: 'rs',
  //   routing_number: '110000000',
  //   account_number: '000123456789',
  //   account_holder_name: 'Jenny Rosen',
  //   account_holder_type: 'individual',
  // }).then(function(result) {
  //   retrun false
  // })
})


function stripeResponseHeader(status,response){
  if(response.error){

  }
}
