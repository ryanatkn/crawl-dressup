properties
    height/width multipliers (to make giants/shrimps)
    height/width ratio (to make squat or stringy chars)

ui
    decide on a css solution
        typestyle? (raw css with refactor-friendly class names?)
        styled components?
        something else?

gen
    - refactor with dbslate

char preview and dressup
- hover shows on preview
- keys 1-9 and onward with shift toggle the opening of the various categories, so you can quickly focus on the thing you care about (better than tabs, maximize info shown)
    - or have some dynamically resorting list based on the last time you went to it! maybe weighted even more if you clicked on something ni it? or no, just simple nav history?
    - "any" category that legs you choose any from any category, layered on top of your character (and positioned? hmmm..32px...so show cut off in preview, but sure why not?)
- create, save, share characters (chars)
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
- tweak attributes
    - scale (and give a default to each type - so gnomes and dwarves are smaller by default, maybe golden ratio)
- mega pointer
    - option to fork/copy/edit the image, renaming it and adding it to your personal collection, shows up in the list with the rest immediately, next to where you clicked, and marked with your avatar to show that it's yours (avatar rendered 32x32 or maybe smaller, not obstructing... or maybe that's impossible, perhaps highlight it (outline? dotted?) with your personal color)

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

possibly scope ui actions somehow (better history efficiency? tagged?)

json schema
    default
        is this a contextual concept? or an intrinsic-to-the-definition concept? both?
        so we could define a default on definitions, but also
            TODO shouldn't that ref/type just be a recursive type render?

    possibly add all the base definitions like "Title", "Tag", "Name" (where Tag+Name is unique)

modes as first-class shareable, createable, toggleable concepts

generic rework
    from the app component, update the different entities that represent the character's actual avatar and the hover preview
        `state.activeCharacter.avatar` or `state.characterActiveAvatar`
        `state.ui.avatar.preview` or `state.uiPreviewAvatar`
    design leap of faith - `state.entities` ought to be a map of entity ids (ulids) or _names_ (or namespaces, like `ui`)
        this allows us to colocate static and dynamic data in the same object and unify operations
