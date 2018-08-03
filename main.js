//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';
    
    //Show lodaer
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate Results
function calculateResults(){
    //UI vars
    var amount = document.getElementById('amount');
    var interest = document.getElementById('interest');
    var years = document.getElementById('years');
    var monthlyPayment = document.getElementById('monthly-payment');
    var totalPayment = document.getElementById('total-payment');
    var totalInterest = document.getElementById('total-interest');

    var principal = parseFloat(amount.value);
    var calculatedInterest = parseFloat(interest.value) / 100 / 12; //presantage/month
    var calculatedPayment = parseFloat(years.value) * 12; // month

    //Compute monthly payment
    var x = Math.pow(1 + calculatedInterest, calculatedPayment);
    var monthly = (principal * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
        
        //Show results
        document.getElementById('results').style.display = 'block'; 
        
        //hide lodaer
        document.getElementById('loading').style.display = 'none';

    }else{
        showError('Please check your numbers');
    }
}

//Show Error
function showError(error){
    //Hide results
    document.getElementById('results').style.display = 'none'; 
    
    //hide lodaer
    document.getElementById('loading').style.display = 'none';
    
    //Create a div
    var errorDiv = document.createElement('div');

    //Get elements
    var card = document.querySelector('.card');
    var heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create a text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv,heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}


//Clear error 
function clearError(){
    document.querySelector('.alert').remove();
}