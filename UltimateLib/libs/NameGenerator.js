/**
 * @fileOverview NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @author alphabit
 * @version 1.0.0
 * @description NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @constructor
 * @augments UltimateLib
 */
 UltimateLib.NameGenerator = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loading...");
    
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

    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
    };
    
    self.generateCompanyName = function(){
        function getItem(array)
        {
            return array[Math.floor(Math.random()*array.length)];
        }

        var companyName = "";
        
        if(Math.random() < 0.7)
        {
            companyName += ""  + getItem(companyNamesData.adjectives);
            companyName += " " + getItem(companyNamesData.nouns);
        }
        else
        {
            companyName += ""  + getItem(companyNamesData.nouns);
            companyName += " " + getItem(companyNamesData.nouns);
        }

        if(Math.random() < 0.3) {
            companyName += " " + getItem(companyNamesData.suffixes);
        }
        
        return companyName;
    
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
