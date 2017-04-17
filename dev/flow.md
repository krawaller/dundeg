
[ ] battle
[ ]     createfromdef
[X]     eachmonster->monsterentry (obs, rally!) // maybe do it like nextplayer is planned as? :D
[ ]     newround->
[X]         *->eachplayer->returnchoice
[X]         *->eachmonster->monstertargetchoice
[ ]         *->nextplayer
[ ]             ?->playerround // TODO - where and when do we select battle target?
[X]                 -> choose stance
[ ]                 -> choose action
[X]                 -> roll battle dice
[X]                 -> escape choice
[X]                 -> bash player (unless escaped!)
[X]                 -> perform action (unless escaped!)
[X]             ?->roundend
[X]                 *->eachplayer->endroundplayer
[X]                 *->eachmonster->endroundmonster
[X]                 ?->newround
[X]                 ?->winbattle
[X]                 ?->losebattle
