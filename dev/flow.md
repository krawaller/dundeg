
[ ] battle
[ ]     createfromdef
[/]     eachmonster->monsterentry (obs, rally!) // maybe do it like nextplayer is planned as? :D
[ ]     newround->
[X]         *->eachplayer->returnchoice
[X]         *->eachmonster->monstertargetchoice
[X]         *->nextplayer
[/]             ?->playerround
[X]                 -> choose stance
[X]                 -> choose action
[X]                 -> roll battle dice
[X]                 -> escape choice
[X]                 -> bash player (unless escaped!) (including defence choice)
[X]                 -> perform action (unless escaped!)
                    -> nextplayer
[X]             ?->roundend
[X]                 *->eachplayer->endroundplayer
[X]                 *->eachmonster->endroundmonster
                    ?->newround
[X]                 ?->winbattle
[X]                 ?->losebattle
