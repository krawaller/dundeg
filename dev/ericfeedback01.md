Hi David, thanks for working on this! I played through a fight and it worked great. It was clear to me what was going on at every point, thanks to the verbose debug text! Of course someone who hasn't played the game would need a bit more guidance about what is going on - a lot of which could be provided by UI. I'll play through it more to see if I spot anything else, but so far I have a few notes based on my first fight that should be useful!

> you can only use Luck to re-roll an “attribute Test”, so you could remove the luck prompt from the shrapnel bomb's damage rolls:
40 WillSoldier of Fortuneaccept the result or spend luck to reroll a die? => accept
    39 Soldier of FortunerolledATK{4}
    38 Roll for Shrapnel Bomb damage vsratThing => roll

> I’ve changed the ‘Escape’ rules to be less arbitrary about when you can escape a fight. Attempting to Escape is now a Combat Action requiring Guard stance -- a ‘Combat Action’ is done in place of an Attack. You make an AGI Test & if you pass you escape the fight after resolving any damage from monsters targeting you this turn. If you fail, you’re stuck in the fight but you can try again next turn. I think this is the only major change that’s been made to the combat sequence!

> 'defence stance' is actually called 'Guard stance' although I think I've accidentally called it 'defence' in the videos

> 75 WillSoldier of Fortuneuse POW to defend (can do once per round when fail defence) againstfootPad? => no 

Since he’s not in Guard stance, he doesn’t get to block any damage.
Here’s the current text from the Rulebook:
Each monster targeting you inflicts damage on you equal to its ATT value (which may be modified by abilties, status conditions, etc.). This is reduced by your ARM value.
Having rolled your Combat dice, first compare your Defence dice score to your AGI to determine how well you were able to avoid the attacks of your adversaries.
If the total of your green Defence dice is equal to or less than your AGI, reduce the damage from each monster targeting you by your highest single Defence dice value.
If you are in Guard 󰀔 stance, you may instead reduce the damage from each monster by your highest single Power dice score.
For example, if you pass your Defence Test by rolling {d4}{d3}{p5}, reduce the damage from each monster attacking you by 4. In Guard 󰀔 stance, you would instead reduce the damage from each monster by 5 (using your Power dice).
If your Defence dice total is greater than your AGI, you take full damage from monsters this round (each monster’s ATT is reduced only by your ARM). However, if you are in Guard 󰀔 stance, you may use each of your Power dice to reduce damage from one monster.  If you have multiple Power dice, after rolling them, you may assign each to an enemy targeting you. These reduce damage from that monster only. You cannot assign multiple power dice to the same monster.
For example, if you are in Guard 󰀔 stance & fail a Defence Test with {d4}{d6}{p5}, reduce the damage from one monster by 5. If you fail the Test with {d4}{d6}{p5}{p2}, avoid 2 damage from one monster & 5 from another.)




// DAVID QUESTIONS

Excellent feedback Eric, thank you ever so much for taking the time to write that up! I'll get right on working through the mistakes. 

There are a few points where I could use some further guidance, for when you have a moment to spare:

1) Spending luck to reroll, is that allowed for the "battle dice" too? Including the power dice?
2) Exactly when are Quick Actions (like Flash) allowed? Do we have a PER-ordered cycle for Quick actions, and then one for Combat Actions?
3) Is there a default attack action? I've coded the Luncheon Truncheon, but since the hero can throw it away, he ended up with no available actions afterwards and things got weird. :)

Forgot one, sorry:

4) If I escape or try to escape, is DEF always 0?


// DAVID SUGGESTION:

Also - apologies if this is too presumptuous - I took the liberty of writing up a suggestion for an alternate structure of the rulebook extract on defence that you gave me. Basically I introduced DEF as a concept, and extracted the 4 different ways of calculating it into bullet points:

---

Each monster targeting you inflicts damage on you equal to its ATT value (which may be modified by abilties, status conditions, etc.). This is reduced by your ARM value, and then also by your DEF value. The DEF value is basically an AGI test with the defence dice, but with a few twists when in guard stance. Here's how to calculate DEF in detail: 

* In assault stance, if the test passed (defence dice total is less or equal to AGI), DEF is the highest defence die.
* In assault stance, if the test failed (defence dice total is more than AGI), DEF is 0.
* In guard stance, if the test passed, DEF is the highest defence die or the highest Power die, whichever is best.
* In guard stance, if the test failed, DEF is 0 but you may use each of your Power dice as DEF versus one single monster. If you have multiple Power dice you may assign each to an enemy targeting you. These reduce damage from that monster only. You cannot assign multiple power dice to the same monster. For example, if you are in Guard stance & fail a Defence Test with {d4}{d6}{p5}, reduce the damage from one single monster by 5. If you fail the Test with {d4}{d6}{p5}{p2}, avoid 2 damage from one monster & 5 from another.
