import { game } from "./main.js";

export function initTiles() {
    const ids = Object.freeze({
        stone: 0,
        dirt: 1,
        grass: 2
    });

    const numberOfIds = Object.keys(ids).length;

    const indices = [];
    const names = [];

    indices[ids.stone] = 1;
    indices[ids.dirt] = 4;
    indices[ids.grass] = 0;
    names[ids.stone] = "stone";
    names[ids.dirt] = "dirt";
    names[ids.grass] = "grass";

    for (let i = 0; i < numberOfIds; ++i)  {
        if (indices[i] == null) console.error(`no index for id ${i}`);
        if (names[i] == null) console.error(`no name for id ${i}`);
    }

    return {
        getIndex,
        getName,
        getIdsFromIndex,
        getIdsFromName,

        ids,
        numberOfIds,
        indices
    };
}

function getIndex(id) {
    return game.tiles.indices[id];
}

function getName(id) {
    return game.tiles.name[id];
}

function getIdsFromIndex(index) {

}

function getIdsFromName(name) {

}



