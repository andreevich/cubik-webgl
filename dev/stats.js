/**
 * Created by andreevich on 26.08.2016.
 */

"use strict";

const stats = function () {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById("stats-output").appendChild(stats.domElement);
    return stats;
};
export default stats;