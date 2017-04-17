
battle
    createfromdef
    eachmonster->monsterentry (obs, rally!) // maybe do it like nextplayer is planned as? :D
    newround->
        *->eachplayer->returnchoice
        *->eachmonster->monstertargetchoice
        *->nextplayer
            ?->playerround
            ?->roundend
                ?->newround
                ?->battleend
    



battle
    init (entry skills, must happen now)
    roundloop
        rejoin
        assign targetless enemies (in whichever order?), players decide draws
        playerloop (perception order)
            choose stance
            choose action (might req choosing target)