import { game } from "./main.js";

export function initTiles() {
    const tiles = [
        {
            id: 0,
            index: 0,
            name: "void",
        },
        {
            id: 1,
            index: 0,
            name: "void wall",
        },
        {
            id: 2,
            index: 18,
            name: "stone",
        },
        {
            id: 3,
            index: 4,
            name: "dirt",
        },
        {
            id: 4,
            index: 1,
            name: "grass"
        },
        {
            id: 5,
            index: 9,
            name: "sand"
        },
        {
            id: 6,
            index: 10,
            name: "clay"
        },
        {
            id: 7,
            index: 2,
            name: "wood"
        }
    ];

    const ids = tiles.map(x => x.id);
    const indices = tiles.map(x => x.index);
    const names = tiles.map(x => x.name);

    return {
        void: 0,
        voidWall: 1,
        stone: 2,
        dirt: 3,
        grass: 4,
        sand: 5,
        clay: 6,
        wood: 7,

        getIndex,
        getName,
        getIdsFromIndex,
        getIdsFromName,

        ids,
        indices,
        names
    };
}

function getIndex(id) {
    return game.tiles.indices[id];
}

function getName(id) {
    return game.tiles.name[id];
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
