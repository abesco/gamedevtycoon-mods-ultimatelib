/**
 * @file  
 * @fileOverview UltimateLib is a library that aims to leverage and empower the development of plugin modules for GameDevTycoon
 * @author alphabit and SirEverard
 * @version 1.0.0
 */

/**
* @namespace The Ultimate Library for GameDevTycoon. Access all the related libraries from here. This class hooks into GDT.
*/
var UltimateLib = UltimateLib || {};

/*
// Create the markov chain and specify the Order of the markov chain.
// The order (an integer > 0) indicates how many previous letters are 
// taken into account when selecting the next. A smaller order will
// result in more randomized less recognizeable output. Conversely a
// higher order will result in words which resemble more closely those
// in the original dictionary.
var chain = new foswig.MarkovChain(3);

// add words into the markov chain one at a time
chain.addWordToChain("random");

//OR add all the words in an array at once
var dictionary = ["hello","foswig"];
chain.addWordsToChain(dictionary);

// generate a random word with a minimum of 5 characters, a maximum of 10 letters, 
// and that cannot be a match to any of the input dictionaries words
var randomWord = chain.generateWord(5,10,false);
*/