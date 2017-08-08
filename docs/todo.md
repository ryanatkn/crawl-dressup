scratchlist
    - mock tests
    - elucidate defs vs props in all usage
        - like `helpers#getSubtypes`, should that take a prop?
        - prop/def confusion, see `any` cast in `renderRandomValue`
        - possibly remove distinction and make schema a union type (primitive, etc, based on the tsHelpers patterns already in use)
    - dress up ui enhancements (manage existing choices)
    - more docs

open questions
    - figure out storage with entities
    - clientState.entities type
    - how to make id refs to an entity of a particular type? needed to validate -- "$ref": "#/definitions/Id" should encode the underlying type
    - improve type safety, especially around entities
    - the clay name `app` is problematic - it's hardcoded all over the writers, consider removing it completely
    - how to use `ulid` in mock for id?
    - how to implement enum without string literal values?

new avatar categories
    - ears
    - eyes
    - mouth
new avatar properties
    - name
    - familiar name
    - height/width multipliers (to make giants/shrimps)
    - height/width ratio (to make squat or stringy chars)

ui
    - decide on a css solution
        - typestyle? (raw css with refactor-friendly class names?)
        - styled components?
        - something else?
        - possibly stick with raw css in js and classnames, and have a centralized typesafe place to access all classes (should these be data definitions?)

gen
    - refactor with dbslate

char preview and dressup
    - hover shows on preview
    - keys 1-9 and onward with shift toggle the opening of the various categories, so you can quickly focus on the thing you care about (better than tabs, maximize info shown)
        - or have some dynamically resorting list based on the last time you went to it! maybe weighted even more if you clicked on something ni it? or no, just simple nav history?
        - "any" category that legs you choose any from any category, layered on top of your character (and positioned? hmmm..32px...so show cut off in preview, but sure why not?)
    - create, save, share characters (chars)
    - unlock things via progress/achievements
    - demigods (mods) have the dragon wings, and gods (admins) get the dragon heads as well
    - some base types cannot wear pants (functional constraint - how to express this?)
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
    - improve ui
        - make pallette area scroll separately, so the main image doesn't leave the screen
    - render chars in worlds
        - render with scale using size/weight stats/multipliers - trolls are like 2.5x, ogres 2x, orcs 1.5x (density stat..? play with all values at once Bret Victor style, would need to lock some)

fork/edit pixels of anything
    - use stuff created by the community (publish step prevents unintended spam, approval feature probably needed as well)
    - use api to create pull requests with image assets to the `enti-life/enti` repo?

other things
    - create spaces, invite people to them
    - extend crowdsourced graphics to all categories (after starting focused just on character creation)
        - call them actors and actresses? short for characters? charactresses?
    - death/respawning
    - ai for npcs, including hostiles
    - item system
    - progression system
    - add descriptions to each image. maybe different description categories - history, food, etc. jackcat-like. show audit history.
    - isaac-like with multiplayer
        - different forms of multiplayer
            - co-op
            - dungeon master
        - 60fps lockstep for deterministic playback
    - social - permissions, coms, xp passup, perks, guild  spells, guild faction, 
    - individual faction
    - generate docs for creatures with beautiful large pics,
        - so you can browse/sort/search, using criteria like species/height/weight

hydate reducer state, with things like image element? or let react take care of all that?

context menus are just crystallized versions of searching the contextual command space
    - they suck

reducers - condensing the vast fact/opinionspheres

possibly scope ui actions somehow (better history efficiency? tagged?)

json schema
    - default
        - is this a contextual concept? or an intrinsic-to-the-definition concept? both?
        - so we could define a default on definitions, but also
            - TODO shouldn't that ref/type just be a recursive type render?

    - possibly add all the base definitions like "Title", "Tag", "Name" (where Tag+Name is unique)

modes as first-class shareable, createable, toggleable concepts

generic rework
    - from the app component, update the different entities that represent the character's actual avatar and the hover preview
        - `state.activeCharacter.avatar` or `state.characterActiveAvatar`
        - `state.ui.avatar.preview` or `state.uiPreviewAvatar`
    - design leap of faith - `state.entities` ought to be a map of entity ids (ulids) or _names_ (or namespaces, like `ui`)
        - this allows us to colocate static and dynamic data in the same object and unify operations

generic rework done - minimal beginnings at least
    - we now want a container type, or a hardcoded workaround.
problem: need to store a map of `CharacterCategory` to `ImageData`
    - possibly namespace it like:
         - `character/${characterId}/avatar/${avatarId}/category/${characterCategory}/imageIndex/${index}`
         - .. or is index the value to that key?
         - `{[`character/${characterId}/avatar/${avatarId}/category/${characterCategory}/imageIndex`]: index}`
         - character is like a virtual shortcut to the currently active character
            - punting on multiple characters for now
        - simplify? one avatar id should be enough
            - need to be able to get a list of all avatar ids for a user
        - make these paths first class? like immutable.js keypaths?
            - use immutable.js here for efficiency?
                - not just efficiency, but also content addressing? hash map, o(n) lookup, compat with nosql patterns
            - can we keep type safety? (genning after all)
    - consider namespacing all entities under `id/${entityId}` so they can be worked on at a higher level

pixel editing
    - get a color pallette from all of the player images
        - generate pallette from single image (on the fly)

consider defining mappings from values to values
    - so given two objects, one with firstname and lastname, and a second, with lastname, we can solve for any missing value, and it infers that relationship automatically given all of the inputs (algebraic solver)

consider making `UpdateEntityAction` take one less param,
    - exchanging `key` and `value` for a single `updateSpec` modelled after mongo. (except maybe fix the $set terribleness, top level patch/merge by default?)

omnipointer/omnimenu
    - dig into anything, any time
        - including the running instance data, and code defining it!
        - visualize the relationships in multiple ways, all of which are editable.
            - "default" visualization alongside others are a new row to the existing textual header menus
        - which way to view/edit things? all of them!
    - grab a color any where, any time
    - everything is an object and actions are always loadable contextually, based on a parameter search in memory (neat)
    - search within the context for all possible actions, which appear with - details (and pickers for their values to create the action)
        - these ad-hoc "searched" actions (specs) can filter the possible actions
            - they can also be used to search through histories
omnimessage
    - thought/text bubbles, persit
            
attributes
    - speed
        - obv centaurs are fastest
        - octopus are fast on water
        - snakes are unaffected by water/land and other speed differentials

multiplayer/collaboration
    - how to work this in?

unify file paths? maybe `public/${userName}/...` entities are written to filesystem on server, namespacing permissions
    - we already have a deep hierarchy of namespaces/keys
        - account
        - character (or settings)
        - [characterNameOrId]
        - 
    - permissions locked down by default
        - permission grants are special objects, created by actions, managed like other resources
            - (resources/entities ui?)

export/import
    - is going to help elucidate how we store the data
    - ecs with id/name as keys - need a handle on things
        - namespaced possibly under `character/${activeCharacter}/etc`
    - what are we exporting? a single complete avatar definition?
        - `{[key: t.CharacterCategory]: imageIndex}`
        - or `imageId`?
    
could paginate avatars 

history
    - an artifact, data, that you can explore/replay/step through
    - if you control history, you control time
    - you can branch anywhere
    - (memory cost? immutable.js?)
        - `id: {key: value}`
        - `id.key: value`

contribute with whatever skills you have
    - pixel art
    - naming things (aggregate votes, voting periods, voting schemes)
    - writing delightful descriptions
    - creating items

unified path theory?
    - seems we have similar problems with entity storage and assets.
    - keypaths? easy to use with immutable.js?

immutable.js
    - made nicer with generated code?
    - what does that generated code look like?

long view
    - publishing tools
    - creativity tools
        - strict confines like `rooms`
    - being real, this will likely be, at best, an influence on better things to come
        -  one factor is that the tools intend to foster iterative innovation
        -  github is the blockchain, creativity unbounded, normal dev workflow with streamlined tutorials

worlds
    - bg is world map by default.
    - controllable properties
        - water level
        - create structures, plant (and name?) plants,
    - avatars occupy about 1 tile (or 61%)
    - 424x212? gives 89888 tiles
    - user-contributable content
        - worlds manage what assets are available
            - single place to manage the assets available within a world
    - default world
        - the world of insect
        - brutal, cold, indifferent, except...is it? we make it what it is.
            - easy to ignore - your character just chills where it is unless you instruct it
        - water level
            - combination of voting and 
                - it's like a wave, so at certain parts of the cycle,
                    it takes either way less or way more than a majority
                    of voters to make it one way or another,
                    and it takes something including the median
                    to encourage more consensus, so there is more
                    power in creating consensus clusters


ecs
    - do we do key/value lookup? type-safe functions that return string keys?
        - or something more formalized, like a tree?
            - keypath immutable.js concept?


path aliases
    - all entities are definition instances that have a key, an id, along with any arbitrary paths the user might have
    - so `activeCharacter/activeInventory`, or simply `activeInventory`,
        gets whatever id for the active account's active character's inventory,
        or `inventory/ULID890123JLDOU89312ASDJK3` or simply `ULID890123JLDOU89312ASDJK3`
        or heck just `inventory` because what else should it be?
    - entity is is optional part of it, always the lone identifier if seen?

procedural characters
    - avatar has some set of affordances/appendages/modules that allow for some set of held inventory items
        - held vs packed inventory items - different sets, different effects on gameplay

alert queue (like items picked up, items sold or won at auction, etc)

look at protocols
    - matrix
    - scuttlebutt

mmo
    - serves as an implementation metaphor for identity, aliases, permissions and ownership,
        content, sharing, social structure, deployed persistent code/scripts/agents, 
    - platform for exploring ideas through implementations at various scales,
        with openly published data

long term
    - infer definitions from data set

Tools for creating apps and other interactive computations.
The background game is for metaphors. Moving files, executing processes, running programs,
all of these things are more readily understood when applied within a metaphor.

terminology
    - *characters* can take the form of one of their many *avatars*
        - so to play "dress up", you can keep the same character (same name, etc) but change costume
    -

features
    - companion server runs alongside your app to update `app.clay.json`)

tradeoffs
    - pros
        - defining the app becomes a process of describing its nouns and verbs (definitions and actions)
    - cons
        - debugging writers is potentially nightmareish
        - need to define a lot of validators for bad data, until a UI is put on things
