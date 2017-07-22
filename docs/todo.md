properties
    height/width multipliers (to make giants/shrimps)
    height/width ratio (to make squat or stringy chars)

gen
    - refactor with dbslate

char preview and dressup
- hover shows on preview
- keys 1-9 and onward with shift toggle the opening of the various categories, so you can quickly focus on the thing you care about (better than tabs, maximize info shown)
    - or have some dynamically resorting list based on the last time you went to it! maybe weighted even more if you clicked on something ni it? or no, just simple nav history?
    - "any" category that legs you choose any from any category, layered on top of your avatar (and positioned? hmmm..32px...so show cut off in preview, but sure why not?)
- create, save, share avatars (chars)
- unlock things via progress/achievements
- demigods have the dragon wings, and gods get the dragon heads
- some base types cannot wear pants (functional constraint)
- smartly collapse - as you choose a base, it goes on to the next, but if you uncollapse base then it doesn't collapse when you choose (or does it? because preview)
- use hash for state (no router)
    - store `route` state object on reducer
- click item to filter that type
- use transform animations with scaling, bit of rotation maybe
- somehow display names more prominently, without it being ugly
- search filter by partial match (not fuzzy)
- show m/f toggle more clearly, maybe visually?
- zoom
- use quokka as 11th cat, 12th is none -- /public/assets/dcss/mon/animals/quokka

- render chars in worlds
    - render with scale using size/weight stats/multipliers - trolls are like 2.5x, ogres 2x, orcs 1.5x (density stat..? play with all values at once Bret Victor style, would need to lock some)

fork/edit pixels of anything
- use stuff created by the community (publish step prevents unintended spam, approval feature probably needed as well)

other things
- create spaces, invite people to them
- extend crowdsourced graphics to all categories (after starting focused just on character creation)
    - call them actors and actresses? short for characters? charactresses?
- death/respawning
- ai for npcs, including hostiles
- item system
- progression system
- add descriptions to each race. maybe different description categories - history, food, mating, etc. jackcat-like. show audit history.
- isaac-like with multiplayer
    - different forms of multiplayer
        - co-op
        - dungeon master
    - 60fps lockstep for deterministic playback
- social - permissions, coms, xp passup, perks, guild  spells, guild faction, 
- individual faction
- generate docs for creatures with beautiful large pics,
    so you can browse/sort/search, using criteria like species/height/weight

hydate reducer state, with things like image element? or let react take care of all that?

context menus are just crystallized versions of searching the contextual command space
    they suck

reducers - condensing the vast fact/opinionspheres
