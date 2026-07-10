const g_ids = Object.freeze({
    stone: 0,
    dirt: 1,
    grass: 2
});

export function initTiles() {
    const indices = [];

    indices[g_ids.stone] = 1;
    indices[g_ids.dirt] = 4;
    indices[g_ids.grass] = 0;

    return {
        ids: g_ids,
        numberOfIds: Object.keys(g_ids).length,
        indices: indices
    };
}

