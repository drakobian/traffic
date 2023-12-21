### The problem
Implement a traffic intersection

Four lanes each way (left, two middle, right)
Traffic light (how fancy do I wanna be, because one light w/ four 'sides' may be easier to keep in sync than four separate lights)
	Plus handle left turn arrow

### Features
- traffic light changes on timer
- cars arrive at intersection and move through it depending on what lane they're in, only while light is green (or flashing orange left)
- coordinate opposite side lights, especially both lefts turning green keeping 'forward' lights red for some time
- traffic sensor - maybe timer on a side only starts if there are cars waiting on that side
- pedestrian 'walk' button

### Design
Console output, birds-eye view of intersection 
something like eh you get the picture lol


okee doke, I'm already seeing how the whole traffic simulator could take a while.

Let's design the traffic light(s) (maybe all controlled by one traffic light controller?)
with cars _in mind_, and try to add cars in later if/when possible :)

### Traffic
I like the idea of one central traffic controller controlling 4 lights
Could be a pub sub, although want controller to be _certain_ the message was received and each light is in correct state...
Too risky! heh.

#### Traffic Controller
##### design thought 1
has 8 Traffic Lights
	4 'regular' lights
	4 left lights
knows which lights are opposite each other and which left lights go w/ which regular light
has a timer for each pair of opposite regular lights
	and for each pair of left lights
hmm how to keep each regular light in sync with its left light
HMM nvm instead of 'regular' light and 'left' light, I think I'll keep them in the same place

##### design thought 2
so instead!
has 4 Traffic Lights
knows whcih lights are opposite each other
has a 60 second timer for each pair of opposite lights
	dedicates first 10 seconds of each timer to only left signals on each opposite side
	then changes to flashing orange left and green forward for 50 seconds
	ensures adjacent lights are red

##### implementation
so want a TrafficController class
	with four traffic lights, probalby labeled NESW
	two timers, one for NS and one for EW

###### timers
thinking of holding two private timers (using setInterval)
	one for NS
	one for EW
hmm but I also need to keep track of the left turn timers...
actually, let's do the forward lights first, and I think I can make the lefts work after that.
My thinking is basically a `run` function that starts one timer and checks back every second
	when starting a timer, change those lights to green
		(so should i keep a map of timers to lights maybe)
	and maybe set the other lights to red for safety
	checking every second, 
		once 4 seconds left, change current green lights to yellow
		once 0 seconds left, change current yellow lights to red
		after two second, change other lights to green
	and loop :) 
maybe instead of holding two timers, I can just keep track of which pair should be green using a idk just a number where 0 means NS and 1 means EW, and toggle that number at the end of timer
Also I need a quick refresher on how setInterval will do this :) 

###### setInterval
not sure if I should use setInterval or setTimeout
trying to decide if this would be a bad idea:
	run method calls  'setGreen' and 'setRed' methods w/ appropriate lights (based on some tracking of which pair of lights to turn green/red)
	setRed just does taht...but hmm optionally calls back to 'run' after an interval?
	setGreen however sets the interval/timeout and at the end of that, calls setYellow
	setYellow calls setRed..
Hmm. sounds plausible, but a little tricky to keep things in sync

what if instead
	`run` sets two intervals
		one interval per TrafficLight pair
		callback will be to call Green, then Yellow, then Red in an order maybe making use of setTimeout?

Ok I am maybe overcomplicating this.
   How would I handle this for just one pair of lights?
   - Set an interval for a pair of lights, probably loop every...let's say 15 seconds for now
	   - interval should call setGreen then set two Timeouts
		   - one for setYellow when 6 seconds remain
		   - one for setRed when 2 seconds remain
	let's start there :) 
	and for now just print the trafficLights every second - loud, but eh i'll deal later

k that works fine-ish for one pair of lights ;) now how about both pairs?
thinking:
	hold variable for which pair of lights to go green
	call `run`
	want this to repeat every 30 seconds:
		turn one pair of lights green (and set the other pair to red)
		after 26 seconds, turn that pair of lights yellow and update `lightPair`
	oh. that's it. I was def overcomplicating it lol
	oh but eh I don't really want the lights to change immediately from red to green, I want there to be like a two second delay
	oh that's fine just set a timeout on the call to green/red lol great

And that works! It's a bit messy, but it works :) 
Now to make it look much much nicer lol

oh and get left turn light integrated

###### left signal
want to have the left signals go green first (for 5ish seconds?)
	then turn yellow for 2 seconds
	then turn red for 2 seconds
	then as forward lights turn green, turn these left signals orange (handle blinking later hopefully :) )
	then when forward lights turn yellow, turn these left signals yellow
	then when forward lights turn red, turn these left signals red

thinking to accomplish this I'll need to:
- start by setting NS left lights to green and _all other lights to red_
- set timeout to set NS left lights to yellow 5 seconds after that
- set timeout to set NS left lights to red 2 seconds after that
- set timeout to set NS left lights to orange 2 seconds after that
- then can proceed w/ regular forwardLights logic
	- but when forward lights get set to yellow then red, also set left lights to follow
ayyyy that worked

but this is a mess - i'm duplicating the check for `this._lightpair` a ton unnecessarily
also the timing isn't exactly right - just a bit too long. need to decide these time lengths as _proportions_ 

#### Traffic light
has a 'regular' and 'left' signal
is really just to keep track of its own 'regular' on and 'left' on - controller will determine the when 
so needs to expose regular and left, and expose methods to turn both on and off
err methods to change the color of each - 
	regular can be green, yellow, red
	left can be green, flashing orange, yellow, red

##### implementation
TrafficLight class
	regular signal color
	left signal color
	getters/setters



#### UI
Thinking for this, 4 circles next to four arrows arranged like an intersection:

		     light | left
		left              light
		-                 -
		light             left
		     left | light

Just print to console - find that pretty color console printer (Chalk.js?)

Need to figure out how to print to console _by replacing what's already there_
- went with a lil' internet hack lol - printing a specific sequence of characters (`\x1B[2J`) clears the console, so how do you do there ya go

#### the doing
Alrighty, I think by this point I've spent ~an hour in the planning phase, let's jump on the implementation

- [x] make repo
- [x] init TS/node project
- [x] make TrafficController class -- oops this item is a lil' big and should be broken down
	- [x] add new class
	- [x] set up traffic lights for the controller
	- [x] implement timers
	- [x] implement left turn signal
- [x] make TrafficLight class
- [x] try out just a console implementation
	- [x] print colors of each signal, let it run for a few minutes and make sure the flow is right/sane
- [x] if I get here, plan out a console UI for this, likely using a colorful console printer

#### final thoughts
I really hoped/thought I'd be able to make more progress on this! but i'm already a little over the 4 hour mark, and I'm happy enough with what it does for now.
I was trying to tweak the design at the last minute to make it look more like actual traffic lights, but I had the strangest time with the arrows - for some reason, the left arrow emoji looks like ⬅, but the right arrow is so small! ➡️ !!
and I don't know why 😂
