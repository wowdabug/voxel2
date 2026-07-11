import { game } from "./main.js";

export function initTiles() {
    const tiles = [
        {
            id: 0,
            index: 1,
            name: "stone",
        },
        {
            id: 1,
            index: 4,
            name: "dirt",
        },
        {
            id: 2,
            index: 0,
            name: "grass"
        },
        {
            id: 3,
            index: 9,
            name: "sand"
        }
    ];

    const ids = tiles.map(x => x.id);
    const indices = tiles.map(x => x.index);
    const names = tiles.map(x => x.name);

    return {
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
