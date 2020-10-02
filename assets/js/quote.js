let quoteArr = [

    '"Focus on being productive instead of busy."',

    '“Do the hard jobs first. The easy jobs will take care of themselves.”',

    '“Productivity is being able to do things that you were never able to do before.”',

    '“It’s not always that we need to do more but rather that we need to focus on less.”',
    
    '“My goal is no longer to get more done, but rather to have less to do.”',

    
    '“You can fool everyone else, but you can’t fool your own mind.”',
    
    '“You miss 100% of the shots you don’t take.”',
    
    '“Simplicity boils down to two steps: Identify the essential. Eliminate the rest.”',
    
    '“Strive not to be a success, but rather to be of value.”',
    
    '“Sometimes, things may not go your way, but the effort should be there every single night.”',
    
    '“The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.”',
    
    '“If you spend too much time thinking about a thing, you’ll never get it done.”',
    
    '“Until we can manage time, we can manage nothing else.”',
    
    '“The way to get started is to quit talking and begin doing.”',
    
    '“You don’t need a new plan for next year. You need a commitment.”',
    
    '“No matter how great the talent or efforts, some things just take time. You can’t produce a baby in one month by getting nine women pregnant.”',
    
    '“Real integrity is doing the right thing, knowing that nobody’s going to know whether you did it or not.”',
    
    '“It’s not that I’m so smart, it’s just that I stay with problems longer.”',
    
    '“Lost time is never found again.”',
    
    '“Gentleness doesn’t get work done unless you happen to be a hen laying eggs.”',
    
    '“The only thing to do with good advice is to pass it on. It is never of any use to oneself.”',
    
    '“He who is not courageous enough to take risks will accomplish nothing in life.”',
    
    '“Action is the foundational key to all success.”',
    
    '“Efficiency is doing things right. Effectiveness is doing the right things.”',
    
    '“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.”',
    
    '“The best minds are not in government. If any were, business would steal them away.”',
    
    '“We have a strategic plan. It’s called doing things.”',
    
    '“You see, in life, lots of people know what to do, but few people actually do what they know. Knowing is not enough! You must take action.”',
    
    '“If there are nine rabbits on the ground, if you want to catch one, just focus on one.”',
    
    '“Why do anything unless it is going to be great?”',
    
    '“Once you have mastered time, you will understand how true it is that most people overestimate what they can accomplish in a year – and underestimate what they can achieve in a decade!”',
    
    '“Computers are useless. They can only give you answers.”',
    
    '“Efficiency is doing better what is already being done.”',
    
    '“Absorb what is useful, reject what is useless, add what is specifically your own.”',
    
    '“Ordinary people think merely of spending time, great people think of using it.”',
    
    '“The key is not to prioritize what’s on your schedule, but to schedule your priorities.”',
    
    '“Discussion is an exchange of knowledge an argument an exchange of ignorance.”',
    
    '“When you combine ignorance and leverage, you get some pretty interesting results.”',
    
    '“Work gives you meaning and purpose and life is empty without it.”',
];


let quote = document.querySelector(".quote-text")
let i = 0;
let len = quoteArr.length;

function doNext() {
    let randomIndex = Math.floor(Math.random()*len);
    let entry = quoteArr[randomIndex];
    quote.textContent = entry;
    setTimeout(doNext, 5000);
}
doNext();