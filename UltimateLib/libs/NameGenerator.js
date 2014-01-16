 /**
 * @class NameGenerator
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @fileOverview NameGenerator provides different name generating providers for easy and variable generation of various name types. 
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.NameGenerator = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loading...");
    
    /*
     * @private
     * @property companyNamesData
     * @description Company name data object used for name generation. 
     * @type Object
     * @example
        companyNamesData format: 
        {
            adjectives:[], 
            nouns:[], 
            suffixes:[]
        }
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
                        "North", "South", "East", "West", 
                        "Late", "Early", "Never", "Always", "Midnight",
                        "Upper", "Lower", "Inner", "Outer",
                        "Rendered", "Rotten", "Fresh", "Altered", "Organic", "Sour",
                        "Coastal", "Chill", "Healing", "Damaged",
                        "Omatic", "PlayMaker", "GameMaker", "Makadam",
                        "Cradle", "Sim", "Makers of", "Rooster", "Animal",
                        "Squared", "Round", "Lined", "Cubed", "Triangled", "Sphered",
                        "Great", "Awesome", "Best", "Über", 
                        
                        ],
        nouns:  [
                         "Method", "Function", "Struct", "Class", "Library",
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
                         "Gem", "Diamond", "Ruby", "Pearl", "Sparkle",
                         "Crown", "Unitrends", "Highwall", "Tran",
                         "ColdLight", "Tableau","Mobile", "Tablet", "Processor", "Cooler",
                         "Geek", "Nerd", "Pro", 
                         "Redheart", "Blueheart", "Yellowheart", "Azureheart", "Pinkheart",
                         "Momentum", "Dicendum", "Morendum", "Addendum", "Lorendum",
                         "Mind", "Brain", "Idea", "Synapse","Neuron", "Neuronal",
                         "Monkey", "Gorilla", "Ape", "Orangutan",
                         "iPipeline", "iProcess", "iDevelop", "iBest", "iWok",
                         "Nitro", "Booster", "Turbo"
                         
                         
                ],
        suffixes:  [    "Collective", "United", "Studio", "Interactive", "Games", "Group",
                        "Team", "Community", "Alliance", "Company", "Direction", "Software", 
                        "Media", "Labs", "Ltd.", "Global", "Solutions", "Apps", "Technologies",
                        "Park", "Systems", "Logic", "Services", "Associates", "Consulting"
                   ]
    };
    
    /*
     * @private
     * @property companyNamesData
     * @description Company player name data object used for name generation. 
     * @type Object
     * @example
        companyNamesData format: 
        {
            male:{
                firstNames:[]
            },
            
            female:{
                firstNames:[]
            },
            
            lastNames:[]
        }
    */
    var playerNamesData = {
        male:{
                firstNames: [ 'Alessandro', 'Ali', 'Aaron', 'Abdul', 'Abe', 'Abraham', 'Adam', 'Alex', 'Alexander', 'Arnold', 'Austin', 
                              'Bill','Bas', 'Barry', 'Ben', 'Benton', 'Blair', 'Boris', 'Bobby', 'Bradley', 'Brain', 'Bruno', 'Buster', 
                              'Chad', 'Charles', 'Christian', 'Chico', 'Carl', 'Cedric', 'Carlton', 'Carlos', 'Chang', 'Claudio', 'Colin', 'Curtis',
                              'Daniel', 'Damian', 'Darrell', 'Dan', 'Davis', 'David', 'Dean', 'Dennis', 'Devin', 'Devon', 'Diego', 'Don', 'Dylan',
                              'Eugene', 'Earl', 'Edison', 'Edmondo', 'Edgar', 'Eddy', 'Ed', 'Elijah', 'Elliot', 'Edwin', 'Elvin', 'Elvis', 'Emanuel', 'Emilio', 'Evan',
                              'Francesco', 'Frank', 'Francis','Felipe', 'Felix', 'Floyd', 'Fletcher', 'Franklin', 'Fred', 'Frederick', 'Freeman', 'Fritz',
                              'Garry', 'Gastone', 'Gary', 'Gavin', 'Gino', 'Giovanni', 'Graham', 'Grant', 'Greg', 'Gregg', 'Gregory', 'Gus', 'Guy',
                              'Hank', 'Hal', 'Harold', 'Harris', 'Harrison', 'Herbert', 'Homer', 'Horace', 'Horacio', 'Hugo', 'Hunter', 'Hugh',
                              'Ivan', 'Igor', 'Ian', 'Ismael', 'Isaac', 'Isaiah', 'Irwin', 'Irving',
                              'John', 'Justin', 'Johann', 'Juan', 'Jake', 'Jasper', 'Jay', 'Jeff', 'Jefferson', 'Jeffrey', 'Jerome', 'Joan', 'Jonathan', 'Jose', 'Junior',
                              'Karim', 'Knut', 'Kasey', 'Kenneth', 'Ken', 'Kenny', 'Kermit', 'Kim', 'King', 'Kris', 'Kristofer',
                              'Loco', 'Lee', 'Long', 'Lino', 'Levi', 'Lou', 'Loyd', 'Lucas', 'Lorenzo', 'Lynn', 'Luther',
                              'Mohammed', 'Matthijs', 'Mike', 'Marc', 'Mark', 'Manfred', 'Marek', 'Marcellus', 'Mario', 'Marlon', 'Marlin', 'Merlin', 'Marshall', 'Michael', 'Miguel', 'Murray',
                              'Nigel', 'Nicolas', 'Noah', 'Nolan', 'Nick', 'Nicklas', 'Noel', 'Norris',
                              'Oscar', 'Oskar', 'Osvald', 'Omar', 'Oliver', 'Ollie', 'Otto', 'Owen', 'Orlando',
                              'Peter', 'Patrick', 'Pablo', 'Paul', 'Pedro', 'Philip', 'Phillip', 'Preston', 'Porter', 'Paolo', 'Pinto', 
                              'Quincy', 'Quinn', 'Quinton',
                              'Roland', 'Ronald', 'Robert',  'Rafael', 'Roger', 'Robin', 'Ralf', 'Ralph', 'Rufus', 'Renaldo', 'Ridge', 'Reuben', 'Rene', 
                              'Sam', 'Scott', 'Samuel', 'Seth', 'Seymour', 'Shaun', 'Shawn', 'Sergio', 'Sean', 'Saul', 'Scot', 'Scott', 'Sid', 'Spencer', 'Stefan', 'Stephan', 'Stuart', 'Steve',
                              'Tarkan', 'Ted', 'Tom', 'Todd', 'Tomas', 'Thomas', 'Tobias', 'Toby', 'Tommy', 'Ty', 'Tyron', 'Tyrese', 'Tyrell', 'Truman', 'Troy', 
                              'Van', 'Vance', 'Vernon', 'Vicente', 'Virgil', 'Vito',                               
                              'Will', 'Wayne', 'Wilbert', 'Walther', 'Walter', 'Weston', 'Wesley', 'Winfried', 'Woodrow', 'Winston',
                              'Xavier',                              
                              'Yuri', 'Yong', 'Young', 
                              'Zack', 'Zachery', 'Zane'
                                ]
        },
        female:{
                firstNames: [ 'Abbey', 'Abigail', 'Adela', 'Adaline','Adina', 'Ariel', 'Adriana', 'Aiko', 'Alana', 'Alberta', 'Alda', 'Alanis', 'Alannis', 'Alexa', 'Alice', 'Alisa', 'Amber', 'Anna', 'Angel', 'Annie', 'Ashley', 'Aurora', 
                              'Barbara', 'Bambi', 'Becky', 'Bee', 'Bea', 'Belinda', 'Beth', 'Betsy', 'Bertha', 'Bianca', 'Brandi', 'Brandie', 'Bobbi', 'Bonita', 'Bridget', 'Britt', 'Brittany', 'Buffy',
                              'Camelia', 'Carla', 'Caren', 'Candi', 'Candy', 'Candice', 'Caroline', 'Carol', 'Cary', 'Carry', 'Catherina', 'Cathy', 'Celia', 'Chanel', 'Chantal', 'Chang', 'Charlie', 'Cheryl', 'Christina', 'Chris', 'Crystal', 'Curtis',
                              'Dacia', 'Debby', 'Deborah', 'Daniela', 'Dany', 'Denice', 'Denise', 'Destiny', 'Dolly', 'Doria', 'Dori', 'Doreen', 
                              'Easter', 'Eda', 'Eleonora', 'Emy', 'Elia', 'Elena', 'Elsa', 'Ena', 'Etha', 'Eva', 'Exie', 
                              'Fae', 'Fay', 'Fawn', 'Felipa', 'Felicia', 'Felicitas', 'Flavia', 'Fiona', 'Francie', 'Florence', 'Frida',
                              'Gabrielle', 'Galina', 'Gary', 'Gina', 'Gerri', 'Gia', 'Gloria', 'Glory', 'Goldie', 'Grace', 'Gwyn',
                              'Hannah', 'Ha', 'Hazel', 'Heather', 'Heidi', 'Hilary', 'Holly', 'Hyo', 'Hyun', 'Hui',
                              'Ida', 'Ina', 'Inge', 'Inga', 'Ingrid', 'Ines',  'Irene', 'Iris', 'Isabel', 'Iva', 'Ivy', 'Ivory',
                              'Jackelyn', 'Jaqueline', 'Jada', 'Jane', 'Joanna', 'Joel', 'Jeanette', 'Jeanice', 'Jenni', 'Jennifer', 'Jessie', 'Jessy', 'Jessica', 'Jolanda', 'Judie', 'Judith', 'Juliette', 'Julia', 
                              'Ka', 'Kacey', 'Kandi', 'Kandice', 'Karen', 'Karolyn', 'Karol', 'Karrie', 'Kate', 'Katja', 'Keira', 'Kesha', 'Kia', 'Kimberly', 'Kirstin', 'Kimber', 'Kris', 'Klara', 'Krystal', 'Kyle', 'Kylee', 'Kym',
                              'Lacey', 'Laine', 'Laila', 'Lane', 'Lang', 'Larue', 'Latricia', 'Latina', 'Laura', 'Laureen', 'Lavina', 'Lea', 'Leah', 'Lela', 'Lenni', 'Lia', 'Lina', 'Linda', 'Lindsay', 'Loan', 'Lola', 'Lorrie', 'Love', 'Lydia',
                              'Ma', 'Mable', 'Macy', 'Madeleine', 'Maggie', 'Maureen', 'Marie', 'Mary', 'Maria', 'Manuela', 'Margaret', 'Meg', 'Meredith', 'Melody', 'Mia', 'Michaela', 'Millie', 'Melissa', 'Molly', 
                              'Nadine', 'Nada', 'Naomi', 'Noemi', 'Nancy', 'Ngan', 'Nia', 'Nicole', 'Nikki', 'Nola', 'Nu',
                              'Ola', 'Olga', 'Olivia', 'Ora',
                              'Paige', 'Pamela', 'Patricia', 'Peggie', 'Penny', 'Pia', 'Prudence',
                              'Queen', 'Qiana',
                              'Rae', 'Ramona', 'Randee', 'Reagan', 'Ragina', 'Rebecca', 'Rhonda', 'Ricki', 'Robin', 'Rosalba', 'Rose', 'Rosa', 'Roxie', 'Roxanne', 'Ruby', 'Ruth',
                              'Sabine', 'Sabrina', 'Sandy', 'Sandra', 'Sally', 'Sandra', 'Sarah', 'Serena', 'Shakira', 'Shanta', 'Sheryl', 'Shirley', 'Silvya', 'Silvana', 'Sofia', 'Sophie', 'Stephanie', 'Summer', 'Sue', 'Suzy',
                              'Tabeah', 'Tabatha', 'Thea', 'Tami', 'Tarah', 'Theresa', 'Tesha', 'Tia', 'Tiara', 'Trisha', 'Tracey', 'Tyra', 
                              'Ula', 'Ute', 'Ulrike', 
                              'Valerie', 'Valeria', 'Vanessa', 'Vanda', 'Verona', 'Veronique', 'Vickie', 'Victoria', 'Violett', 'Vivian', 'Vivienne',
                              'Wanda', 'Wonda', 'Willow', 'Wynona',
                              'Xamara', 'Xenia', 'Xiao',
                              'Yadira', 'Yang', 'Yasmin', 'Yi', 'Yolanda', 'Yukiko', 'Yuriko', 'Yuki', 'Yuonne',
                              'Zelda', 'Zenia', 'Zandra', 'Zora'
                              
                              
                            
                
                
                            ]
        },
        lastNames:  [ 
                        'Alas', 'Abair', 'Abate', 'Abell', 'Abeles', 'Aben', 'Abbattista', 'Abitz', 'Ablao', 'Abney', 'Abraham', 'Abrahams', 'Albrecht','Abramovich', 'Abrey', 'Abrew', 'Ace', 'Achs', 'Acon','Adas', 'Adelstein', 'Adham', 'Aggen',
                        'Agueros', 'Aguilar', 'Ahlborn', 'Ahl', 'Anders', 'Ahrendt', 'Airy', 'Ajmeri', 'Akashi', 'Akeo', 'Allen',
                        'Baab', 'Baah','Babe', 'Baban', 'Babich', 'Baca', 'Babinyks', 'Babson', 'Bacani', 'Babor', 'Bachinsky', 'Bachelor', 'Backfisch', 'Backhus', 'Bradley', 'Baglione', 'Bahns', 'Burns', 'Browe', 'Bruston', 
                        'Brailey', 'Baldwin', 'Bricks', 'Brausil', 'Brookes', 'Broken', 'Brick', 'Bricks', 'Bristol', 'Bentley', 'Bush', 'Books', 'Bunils',
                        'Chan', 'Caan', 'Cabato', 'Cassis', 'Cabal', 'Cada','Caden', 'Cagg', 'Cahen', 'Cohen', 'Cahill', 'Caires', 'Cail', 'Campsey', 'Charleston', 'Colpas', 'Can', 'Cannington', 'Caetil', 'Canterbury',
                        'Cap', 'Coasts', 'Coalson', 'Coates', 'Cocks', 'Cockrell', 'Codd', 'Cole', 'Coles', 'Corson', 'Cox', 'Carmack', 'Cross',
                        'Dallas', 'Dost', 'Dabek', 'Dabrowski', 'Dafoe', 'Dahlenburg', 'Dahl', 'Daniels', 'Danilson','Danial', 'Datz', 'Dauby', 'Decurtis', 'Ded', 'Dedio', 'Dellon', 'Dilan', 'Dillons', 'Dmitriev', 
                        'Doak', 'Dobin', 'Dominsky', 'Domon', 'Dors', 'Dorosz', 'Dorsa', 'Druhan', 'Drugs', 'Drose', 'Durham', 'Duirieux', 'Durette', 'Dyroff', 
                        'Eagler', 'Eam', 'Eames', 'Eakens', 'Eck', 'Ekels', 'Echt', 'Echler', 'Ehringer', 'Ehrle', 'Erhardt', 'Einstein', 'Ekholm', 'Enquist', 'Ek', 'Ekstrom', 'Elarton', 'Enneking', 'Enriquez',
                        'Emiliano', 'Ennis', 'Engine', 'Eschbach', 'Esswein', 'Esher', 'Eyers', 'Eyestone',
                        'Freeman', 'Faaborg', 'Fabi', 'Fattore', 'Faue', 'Fauber', 'Feltch', 'Felsman', 'Felz', 'Felson', 'Felser', 'Felux', 'Feuer', 'Fire', 'Fiddes', 'Fiddler', 'Fiedler', 'Fidell', 'Fleck', 
                        'Fleagle', 'Flavell', 'Floro', 'Florke', 'Flower', 'Flunder', 'Fluth', 'Fly',
                        'Gaal', 'Gaber', 'Gabelle', 'Garic', 'Garlick','Garland', 'Garlock', 'Garmon', 'Gimple', 'Gindi', 'Gim', 'Giltner', 'Gilster', 'Gleave', 'Gleiser', 'Glazer', 'Glynn', 'Gnade', 'Graham', 
                        'Granmlich', 'Grames', 'Gramberg', 'Garcia', 'Gonzales', 'Granada', 'Grett', 'Grey', 'Greyhound', 'Gravius', 'Guinn', 'Guth', 'Guzek',
                        'Howard', 'Hack', 'Haan', 'Haahr', 'Haagen', 'Hamrock', 'Hampshire', 'Hashi', 'Heacox', 'Headington', 'Hedge', 'Hefton', 'Hefler', 'Heggan', 'Hecnk', 'Hendler', 'Heinz', 'Hepker', 'Hepinstall', 
                        'Hentzel', 'Hermosa', 'Hernandez', 'Hermus', 'Hguyen', 'Hickel', 'Hilbert', 'Holter', 'Holthaus', 'Holtrey', 'House', 'Houton', 'Huffin', 'Hug', 'Huryn', 'Hurston',
                        'Iansen', 'Ianni', 'Iannini', 'Iames', 'Imel', 'Imbler', 'Infield', 'Ineson', 'Ingleheart', 'Ingraham', 'Ingles', 'Isler', 'Ita', 'Itterly', 'Izzo',
                        'Jones', 'Jacks', 'Jabs', 'Jamison', 'Johnsson', 'Jandrik', 'Jance', 'Jancek','Jamros', 'Jefferson', 'Jemal', 'Jelleron', 'Jewison', 'Jewitt', 'Jew', 'Jolly', 'Jonassen', 'Johanson', 
                        'Juco', 'Jue', 'Jung', 'Jungmeier', 'Junkert', 'Junez',
                        'Klug', 'Keating', 'Kerry', 'Kennedy', 'Kaahanui', 'Kabak', 'Kaat', 'Kadric', 'Kaehr', 'Kallenberg', 'Kalosky', 'Kowalski', 'Kallmeyer', 'Kanagy', 'Kendric', 'Keagy', 'Keeney', 'Keem', 
                        'Keep', 'Keefover', 'Kessler', 'Ketelaar', 'Kilcup', 'Kilgus', 'Kile', 'Klein', 'Kleinow', 'Klopp', 'Kloman', 'Klosek', 'Knife', 'Knisley', 'Knill', 'Kotarksi', 'Kothe', 'Kruss',
                        'Lee', 'Laboe', 'Laborn', 'Labit', 'Larew', 'Lardin', 'Larch', 'Large', 'Lawell', 'Leach', 'Lockley', 'Leafty', 'Leaming', 'Lemmings', 'Leagan', 'Lepping', 'Ler', 'Lhereux', 'Liam', 
                        'Lofthouse', 'Logdes', 'Locked', 'Lohans', 'Logan', 'Lua', 'Luber', 'Liberow', 'Lux',
                        'Morgan', 'Markos', 'McLoud', 'Miller', 'Mables', 'Maat', 'Maas', 'Marbles', 'Maestro', 'Magary', 'Magao', 'Malcot', 'Malinovski', 'Managhan', 'Manas', 'Mauser', 'McAbee',
                        'McIvory', 'McCroy', 'McCullar', 'McCuin', 'Malchin', 'McMananamon', 'Melan', 'Melder', 'Mullins', 'Moulder', 'Money', 'Mocarksi', 'Moates', 'Motts', 'Murty',
                        'Nabi', 'Nacci', 'Nabers', 'Neighbours', 'Neiner', 'Neihardt', 'Newling', 'Newitt', 'Newill', 'Newmark', 'Nicholson', 'Nickelsen', 'Nickey', 'Nichols', 'Nixon', 'Nivala', 'Northway', 
                        'Northern', 'North', 'Norse', 'Norvelle',
                        'Oaks', 'Oakley', 'Oertel', 'Oettel', 'Oetting', 'Ogg', 'Oggs', 'Ogles', 'Olejarz', 'Oldson', 'Oldridge', 'Oldman', 'Oldmixon', 'Ondrey', 'Onal', 'Onaka', 'Oms', 'Orlandi', 'Orlowski',
                        'Orlic', 'Otto', 'Ouelette', 'Ouchida', 'Ozoa',
                        'Peterson', 'Popovic', 'Paananen', 'Pabst', 'Paetzold', 'Paganucci', 'Pavarotti', 'Paeth', 'Payor', 'Paulson', 'Patterson', 'Peace', 'Peacemaker', 'Pearch', 'Pearl', 'Pearlstone', 
                        'Peebles', 'Peddy', 'Peers', 'Peerson', 'Pearson', 'Pernot', 'Perl', 'Petering', 'Poach', 'Poates', 'Picard', 'Piccolo', 'Picek', 'Pigg', 'Pegg', 'Piggot', 'Polster', 'Pritschett',
                        'Qi', 'Quade', 'Quebec', 'Quelle', 'Quong', 'Quiz', 'Quitoriano',
                        'Rosek', 'Raab', 'Rabenau', 'Rabourn', 'Rachor', 'Rackham', 'Radcliff', 'Ramirez', 'Ramler', 'randie', 'Randle', 'Randale', 'Razzo', 'Readling', 'Readman', 'Reilly', 'Reinberg', 
                        'Remington', 'Remos', 'Remster', 'Reynaurd', 'Rhee', 'Rhames', 'Ribble', 'Richards', 'Richardson', 'Roan', 'Roaks', 'Rob', 'Roaden', 'Roachford', 'Rollet', 'Ruff', 'Rugg', 'Rugen',
                        'Schlau', 'Sadler', 'Saed', 'Salzberg', 'Salvetti', 'Salveson', 'Sawdon', 'Saxby', 'Scanlin', 'Scanner', 'Scarbord', 'Schmidt', 'Schnaars', 'Scolari', 'Scramlin', 'Seabert', 'Seacrest',
                        'Seadler', 'Seidl', 'Settle', 'Seum', 'Shakles', 'Shacklock', 'Shadle', 'sharrock', 'Shatley', 'Shoe', 'Showmaker', 'Shy', 'Siciliani', 'Siddons', 'Slates', 'Stiffler', 'Slark', 'Small', 'Smeets',
                        'Solt', 'Solus', 'Sparks', 'Spalla', 'Spin', 'Spinnler', 'Spinoza', 'Springs', 'Springwater', 'Stack', 'Stade', 'Stecz', 'Steeger', 'Stedge', 'Stephenson', 'Stepp', 'Stickle', 'Stieg', 
                        'Stow', 'Stoye', 'Strock', 'Stunts', 'Styler', 'Sublette', 'Suchon', 'Suby', 'Swait', 'Swag', 'Swalley', 'Swick', 'Swetz', 'Szynal', 
                        'Tabas', 'Tabarez', 'Takvorian', 'Taratuta', 'Tarber', 'Tarbill', 'Tardiff', 'Tarkenton', 'Tardo', 'Taugher', 'Taubmann', 'Tee', 'Ted', 'Teufel', 'Tempel', 'Thai', 'Thang', 'Thaggard', 
                        'Thomasson', 'Thomson', 'Thompson', 'Thys', 'Thyberg', 'Tok', 'Townsend', 'Tozzo', 'Toxey', 'Trinity', 'Trines', 'Trucks',
                        'Uchida', 'Udd', 'Umbro', 'Umsted', 'Umbenhower', 'Unsicker', 'Unnerstall', 'Uth', 'Utter', 'Uzzle',
                        'Van der Wiel', 'Van Bonkrost', 'Van der Keen', 'Vaeth', 'Vagt', 'Vaughn', 'Vadell', 'Vanavery', 'Van Bemmel', 'Van Auken', 'Vazquez', 'Vayo', 'Viada', 'Vryhof', 'Vikings', 'Valdez',
                        'Wilders', 'Williams', 'Wacker', 'Walcott', 'Wilshire', 'Willis', 'Walsworth', 'Walters', 'Warney', 'Warrenberg', 'Woodfort', 'Woods', 'Winters', 'Wenners', 'Werner', 'Werbelow', 
                        'Wheatle', 'Wheller', 'Weelis', 'Wheels', 'Wheet', 'Weeds', 'Wheeler', 'Westinghouse', 'Westham', 'Wheaton', 'Whitmore', 'Whittaker', 'Whitting', 'Wice', 'Wichner', 'Winkey', 
                        'Winks', 'Winker', 'Wooden', 'Woodhull', 'Woodhill', 'Wyatt', 'Wust', 'Wyan', 'Wurz', 'Wydnick',
                        'Xander', 'Xu', 'Xuan', 'Xi', 'Xia', 'Xavier', 'Xue', 'Ximenez', 'Xenos', 'Xanthos',
                        'Young', 'Younes', 'Yabes', 'Yale', 'Yada', 'Yacob', 'Yamasaki', 'Yan', 'Yell', 'Yellows', 'Yelton', 'Yelland', 'Yonas', 'Yonko', 'Yu', 'Yule','Yvon',
                        'Zaback', 'Zaborski', 'Zaccharias', 'Zackery', 'Zadnik', 'Zanetti', 'Zenz', 'Zerbe','Zebra', 'Zhai', 'Zalas', 'Zhi', 'Zinninger', 'Zinzi', 'Zucchero', 'Zukic'
                       ]
    }
    
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
    };
    
    /**
     * @method generateCompanyName
     * @description Returns an randomly generated company name
     * @return {String} A string containing a randomly generated company name.
    */     
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
    
    /**
     * @method generatePlayerName
     * @param {String} male True for a male name, false for a female name (yes, I'm a man, so I use MAN as unique var, that's emancipation ;))
     * @description Generates a random player name for the specified gender
     * @return {String} A string containing a randomly generated player name.
    */     
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
