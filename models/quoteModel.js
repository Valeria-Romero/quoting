const mongoose = require( 'mongoose' );

const QuoteSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000
    },
    created_at: {
        type: Date
    } 
});

const Quote = mongoose.model( 'quotes', QuoteSchema );

const QuoteModel = {
    createQuote: function( newQuote ){
        return Quote.create( newQuote );
    },
    getQuotes: function(){
        return Quote.find().sort( { created_at: -1 } );
    }
};

module.exports = {QuoteModel};