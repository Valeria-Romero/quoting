const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes_db', {useNewUrlParser: true});

const {QuoteModel} = require( './models/quoteModel' );

const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.use( express.urlencoded({extended:true}) );

app.get('/', function(request, response){
    return response.render('index');
});


app.post('/quotes', function(request, response){
    const creator = request.body.creator;
    const quote = request.body.quote;
    const created_at = new Date();

    const newQuote = {
        creator,
        quote,
        created_at
    };

    console.log(newQuote);

    QuoteModel
        .createQuote( newQuote )
        .then( result =>{
            console.log(result);
        })
        .catch( err => {
            console.log("Somethign went wrong!");
            console.log(err);
        })
    response.redirect('/quotes')
});

app.get('/quotes', function( request, response){
    QuoteModel
        .getQuotes()
        .then( result =>{
            if (result === null){
                throw new Error("There are no quotes here, add one!");
            }
            response.render('quotes', {found: true, quote: result});
        })
        .catch(error => {
            console.log(error);
            response.render('quotes', {found: false});
        });
});

app.listen( 8080, function(){
    console.log( "The users server is running in port 8080." );
});