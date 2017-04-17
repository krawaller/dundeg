
battle
    createfromdef
    eachmonster->monsterentry (obs, rally!) // maybe do it like nextplayer is planned as? :D
    newround->
        *->eachplayer->returnchoice
        *->eachmonster->monstertargetchoice
        *->nextplayer
            ?->playerround
                -> choose stance
                -> choose action
                -> roll battle dice (might mean escaping)
                -> bash player (unless escaped!)
                -> perform action (unless escaped!)
            ?->roundend
                *->eachplayer->endroundplayer
                *->eachmonster->endroundmonster
                ?->newround
                ?->battleend
