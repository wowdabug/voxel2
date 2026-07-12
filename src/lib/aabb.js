function getBox(minX, minY, maxX, maxY) {
    return {
        minX,
        minY,
        maxX,
        maxY
    };
}

function intersects(a, b) {
    return (a.minX < b.maxX &&
            a.maxX > b.minX &&
            a.minY < b.maxY &&
            a.maxY > b.minY
    );
}

function containsPoint(a, x, y) {
    return (x < a.maxX &&
            x > a.minX &&
            y < a.maxY &&
            y > a.minY
    );
}

function move(a, amountX, amountY) {
    a.minX += amountX;
    a.minY += amountY;
    a.maxX += amountX;
    a.maxY += amountY;
}

function getMove(a, amountX, amountY) {
    return {
        minX: a.minX + amountX,
        minY: a.minY + amountY,
        maxX: a.maxX + amountX,
        maxY: a.maxY + amountY
    };
}

function getIntersection(a, b) {
    return {
        minX: Math.max(a.minX, b.minX),
        minY: Math.max(a.minY, b.minY),
        maxX: Math.min(a.maxX, b.maxX),
        maxY: Math.min(a.maxY, b.maxY),
    };
}

function getPenetration(a, b) {
    return {
        x: Math.min(a.maxX, b.maxX) -
           Math.max(a.minX, b.minX),
        y: Math.min(a.maxY, b.maxY) -
           Math.max(a.minY, b.minY)
    };
}

function containsBox(a, b) {
    return (b.minX >= a.minX &&
            b.maxX <= a.maxX &&
            b.minY >= a.minY &&
            b.maxY <= a.maxY
    );
}

function getCenter(a) {
    return {
        x: a.minX + (a.maxX / 2),
        y: a.minY + (a.maxY / 2)
    };
}

function area(a) {
    return (
        (a.maxX - a.minX) *
        (a.maxY - a.minY)
    );
}

function expand(a, amount) {
    a.minX -= amount,
    a.minY -= amount,
    a.maxX += amount,
    a.maxY += amount
}

function getExpand(a, amount) {
    return {
        minX: a.minX - amount,
        minY: a.minY - amount,
        maxX: a.maxX + amount,
        maxY: a.maxY + amount
    }; 
}

function inflate(a, amountX, amountY) {
    a.minX -= amountX,
    a.minY -= amountY,
    a.maxX += amountX,
    a.maxY += amountY
}

function getInflate(a, amountX, amountY) {
    return {
        minX: a.minX - amountX,
        minY: a.minY - amountY,
        maxX: a.maxX + amountX,
        maxY: a.maxY + amountY
    }; 
}

function getUnion(a, b) {
    return {
        minX: Math.min(a.minX, b.minX),
        minY: Math.min(a.minY, b.minY),
        maxX: Math.max(a.maxX, b.maxX),
        maxY: Math.max(a.maxY, b.maxY),
    };
}

function sweep(a, amountX, amountY) {
    a.minX = Math.min(a.minX, a.minX + amountX);
    a.minY = Math.min(a.minY, a.minY + amountY);
    a.maxX = Math.max(a.maxX, a.maxX + amountX);
    a.maxY = Math.max(a.maxY, a.maxY + amountY);
}

function getSweep(a, amountX, amountY) {
    return {
        minX: Math.min(a.minX, a.minX + amountX),
        minY: Math.min(a.minY, a.minY + amountY),
        maxX: Math.max(a.maxX, a.maxX + amountX),
        maxY: Math.max(a.maxY, a.maxY + amountY),
    };
}

export const aabb = {
    getBox,
    intersects,
    containsPoint,
    containsBox,

    move,
    getMove,
    getIntersection,
    getPenetration,

    getCenter,
    area,
    expand,
    getExpand,
    inflate,
    getInflate,

    getUnion,
    sweep,
    getSweep
};


