/**
 * @class NameGenerator
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @fileOverview NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.NameGenerator = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loading...");
    
    /*
     * @description Holds company name data used for name generation. The format is {adjectives:[], nouns:[], suffixes:[]}
     * @property
     * @type object
     * @private
    */
    var companyNamesData = {
        adjectives: [
                        "Digital", "Online", "Loud", "Quiet",
                        "Black", "White", "Red", "Blue", "Yellow", "Green", "Pink",
                        "Hard", "Soft", "Round", "Fast", "Slow", "Easy", "Tricky",
                        "Tiny", "Big", "Giant", "Large", "Puny", "Heavy", "Light", "Dark",
                        "Fast", "Speedy", "One",
                        "Angry", "Happy", "Sad", "Mad", "Glad", "Rad", "Joy", "Love", "Naughty",
                        "Flying", "Jumping", "Soaring", "Falling", "Dying", "Edible",
                        "Undone", "Lonely", "Cracked", "Broken", "Found", "Lost",
                        "North", "South", "East", "West", 
                        "Late", "Early", "Never", "Always", "Midnight",
                        "Upper", "Lower", "Inner", "Outer",
                        "Rendered", "Rotten", "Fresh", "Altered", "Organic", "Sour",
                        "Coastal", "Chill", "Healing", "Damaged"
                        ],
        nouns:  [
                         "Method", "Function", 
                         "Bomb", "Missile", "Gun", "Weapon", "Tank", "Rocket",
                         "Terminal", "Connection", "Joint", "Machine", "Engine",
                         "Starship", "Sandwich", "Plane", "Saucer", "Airship", "Jet", "Boat", "Ship",
                         "Window", "Screen", "Man", "Computer",
                         "Happiness", "Sadness", "Anger",
                         "Spoon", "Knife", "Fork", 
                         "Island", "Village", "City", "Town", "Mountain", "River", "Ocean", "Sea", "Coast",
                         "Space", "World", "Earth", "Planet", "Night", "Day", "Star", "Sun",
                         "Voyage", "Journey", "Time", "Destruction", "Ideas", "Everything",
                         "King", "Queen", "Daughter", "Son", "Prince", "Princess",
                         "Hangar", "Rainbow", "Signal", "Book", "Lawn",
                         "Dog", "Cat", "Lion", "Horse", "Elephant", "Sloth", "Panda",
                         "Turkey", "Possum", "Skunk", "Walrus", "Bear", 
                         "Wizard", "Warrior", "Knight", "Dragon", "Goblin", "Mage",
                         "Soul", "Music", "Country", "Enemy", "History",
                         "Doctor", "Scientist", "Engineer", "Janitor", "Landlord", "Butcher", 
                         "Astronaut", "Spaceman",
                         "Hallway", "Ghost",  "Spirit", "Visions",
                         "Hour", "Day", "Month", "Year", "Second", "Minute", "Age",
                         "Men", "Women", "Boys", "Girls", "Uncle", "Aunt", "Mother", "Father",
                         "Yard", "Room",
                         "Banana", "Apple", "Melon", "Cake", "Pie", 
                         "Tomato", "Celery", 
                         "Sawblade", "Drill", "Hammer", "Nail", "Knife", "Knives",
                         "Graveyard", "Highway", "Midnight", "Death", "Tragedy", "Tomb", "Progress", "Tree",
                         "Gem", "Diamond", "Ruby", "Pearl", "Sparkle"
                ],
        suffixes:  [    "Collective", "United", "Studio", "Interactive", "Games", "Group",
                        "Team", "Community", "Alliance", "Company", "Direction"
                   ]
    };
    
    /*
     * @description Holds player name data used for name generation (male and female). The format is {male:{firstNames:[]}, female:{firstNames:[]}, lastNames:[]}
     * @property
     * @type object
     * @private
    */    
    var playerNamesData = {
        male:{
                firstNames: ['John', 'Mike', 'Marc', 'Mark', 'Will', 'Bill', 
                             'Patrick', 'Daniel', 'Frank', 'Chad', 'Francesco', 
                             'Charles', 'Justin', 'Bas', 'Matthijs', 'Alessandro', 
                             'Eugene', 'Mohammed', 'Yuri', 'Ali', 'Tarkan', 'Juan', 
                             'Chico', 'Loco', 'Francis', 'Peter', 'Robert', 'Knut', 
                             'Manfred', 'Johann', 'Karim', 'Christian', 'Ronald', 
                             'Roland', 'Igor', 'Ivan', 'Marek']
        },
        female:{
                firstNames: ['Joanna', 'Abigail', 'Jasmine', 'Monica', 'Janette', 'Chantal', 
                             'Maria', 'Conny', 'Marijane', 'Jane', 'Charlie', 
                             'Charlize', 'April', 'May', 'June', 'Chelsea', 
                             'Benedetta', 'Antje', 'Maraike', 'Mary', 'Nicole', 'Sandra', 
                             'Caroline', 'Elisabeth', 'Beth', 'Kate', 'Dorothee', 'Cornelia', 
                             'Eve', 'Anne', 'Marie', 'Hannah', 'Helene', 
                             'Lotte', 'Julia', 'Jolanda', 'Jennifer']
        },
        lastNames:  ['Wilders', 'Carmack', 'Jones', 'Bush', 'Kennedy', 
                     'Williams', 'McLoud', 'Alas', 'Popovic', 'Markos', 
                     'Cross', 'Van der Wiel', 'Van Bonkrost', 'Rosek', 
                     'Klug', 'Schlau', 'Dost', 'Van der Keen', 'Johnsson', 
                     'Kerry', 'Miller', 'Garcia', 'Lee', 'Gonzales', 'Young', 
                     'Allen', 'Peterson', 'Morgan', 'Freeman', 'Howard', 'Cox']
    }
    
    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
    };
    
    self.generateCompanyName = function(){
        function getItem(array) {
            return array[Math.floor(Math.random()*array.length)];
        }

        var name = "";
        
        if(Math.random() < 0.7) {
            name += ""  + getItem(companyNamesData.adjectives);
            name += " " + getItem(companyNamesData.nouns);
        }
        else  {
            name += ""  + getItem(companyNamesData.nouns);
            name += " " + getItem(companyNamesData.nouns);
        }

        if(Math.random() < 0.3) {
            name += " " + getItem(companyNamesData.suffixes);
        }
        
        return name;
    
    };
    
    self.generatePlayerName = function(male){
        function getItem(array) {
            return array[Math.floor(Math.random()*array.length)];
        }
        
        
        var firstNames  = male ? playerNamesData.male.firstNames : playerNamesData.female.firstNames;
        var name = ""  + getItem(firstNames);
            name += " " + getItem(playerNamesData.lastNames);

        if(Math.random() < 0.3) {
            name += "-" + getItem(playerNamesData.lastNames);
        }
        
        return name;
    
    };
        
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
    

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loaded :-)");

    return self;    
})(UltimateLib.NameGenerator || {});
