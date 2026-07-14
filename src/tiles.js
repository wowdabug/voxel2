import { game } from "./main.js";

function grassUpdate(layer, x, y) {
    if (game.level.getTile(layer + 1, x, y) !== game.tiles.void) {
        game.level.setTile(layer, x, y, game.tiles.dirt);
    }
}

function trunkRemove(layer, x, y) {
    const height = 5;
    if (layer == game.level.ground) {
        if (game.level.getTile(game.level.above, x, y) == game.tiles.log) {
            for (let i = 0; i < height - 2; ++i) {
                game.level.setTile(game.level.above, x, y - i, game.tiles.void);
            }
            for (let i = height - 2; i < height; ++i) {
                game.level.setTile(game.level.above, x, y - i, game.tiles.leaves);
            }
        }
    }
}

export function initTiles() {
    const tiles = [
        {
            index: 0,
            name: "void",
            solid: false,
            opaque: false
        },
        {
            index: 0,
            name: "void wall"
        },
        {
            index: 18,
            name: "stone"
        },
        {
            index: 4,
            name: "dirt"
        },
        {
            index: 1,
            name: "grass",
            update: grassUpdate
        },
        {
            index: 9,
            name: "sand"
        },
        {
            index: 10,
            name: "clay"
        },
        {
            index: 2,
            name: "wood"
        },
        {
            index: 34,
            name: "trunk",
            remove: trunkRemove
        },
        {
            index: 35,
            name: "log"
        },
        {
            index: 36,
            name: "branches"
        },
        {
            index: 37,
            name: "leaves",
            solid: false,
            opaque: false
        }
    ];

    const indices = [];
    const names = [];
    const solid = [];
    const opaque = [];

    const addBehaviors = [];
    const removeBehaviors = [];
    const updateBehaviors = [];
    const tickBehaviors = [];

    const defaultIndex = 18;
    const defaultName = "missingno";
    const defaultSolid = true;
    const defaultOpaque = true;

    const defaultAdd = (layer, x, y) => {}
    const defaultRemove = (layer, x, y) => {}
    const defaultUpdate = (layer, x, y) => {}
    const defaultTick = (layer, x, y) => {}

    for (let i = 0; i < tiles.length; ++i) {
        indices[i] = tiles[i].index ?? defaultIndex;
        names[i] = tiles[i].name ?? defaultName;
        solid[i] = tiles[i].solid ?? defaultSolid;
        opaque[i] = tiles[i].opaque ?? defaultOpaque;
        
        addBehaviors[i] = tiles[i].add ?? defaultAdd;
        removeBehaviors[i] = tiles[i].remove ?? defaultRemove;
        updateBehaviors[i] = tiles[i].update ?? defaultUpdate;
        tickBehaviors[i] = tiles[i].tick ?? defaultTick;
    }

    return {
        void: 0,
        voidWall: 1,
        stone: 2,
        dirt: 3,
        grass: 4,
        sand: 5,
        clay: 6,
        wood: 7,
        trunk: 8,
        log: 9,
        branches: 10,
        leaves: 11,
        numberOfTiles: tiles.length,

        getIdsFromIndex,
        getIdsFromName,

        indices,
        names,
        solid,
        opaque,

        addBehaviors,
        removeBehaviors,
        updateBehaviors,
        tickBehaviors
    };
}

function getIdsFromIndex(index) {
    const matchingIds = [];
    for (let i = 0; i < game.tiles.indices.length; ++i) {
        if (game.tiles.indices[i] == index) {
            matchingIds.push(i);
        }
    }
    return matchingIds;
}

function getIdsFromName(name) {
    const matchingIds = [];
    for (let i = 0; i < game.tiles.indices.length; ++i) {
        if (game.tiles.names[i] == name) {
            matchingIds.push(i);
        }
    }
    return matchingIds;
}
