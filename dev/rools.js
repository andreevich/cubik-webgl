/**
 * Created by andreevich on 26.08.2016.
 */
import EDGE_SIZE from './edgeSize';
var cubs = [];
for (var i = 0; i < 27; i++) {
    cubs.push(
        {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    );
}
cubs[0].position.x = 0;
cubs[0].position.y = EDGE_SIZE;
cubs[0].position.z = 0;

cubs[1].position.x = EDGE_SIZE;
cubs[1].position.y = EDGE_SIZE;
cubs[1].position.z = 0;

cubs[2].position.x = -EDGE_SIZE;
cubs[2].position.y = EDGE_SIZE;
cubs[2].position.z = 0;
//top level:line 2
cubs[3].position.x = 0;
cubs[3].position.y = EDGE_SIZE;
cubs[3].position.z = EDGE_SIZE;

cubs[4].position.x = EDGE_SIZE;
cubs[4].position.y = EDGE_SIZE;
cubs[4].position.z = EDGE_SIZE;

cubs[5].position.x = -EDGE_SIZE;
cubs[5].position.y = EDGE_SIZE;
cubs[5].position.z = EDGE_SIZE;
//top level:line 3
cubs[6].position.x = 0;
cubs[6].position.y = EDGE_SIZE;
cubs[6].position.z = -EDGE_SIZE;

cubs[7].position.x = EDGE_SIZE;
cubs[7].position.y = EDGE_SIZE;
cubs[7].position.z = -EDGE_SIZE;

cubs[8].position.x = -EDGE_SIZE;
cubs[8].position.y = EDGE_SIZE;
cubs[8].position.z = -EDGE_SIZE;

//middle level:line 1- central

/*//Central block
cubs[9].position.x = 0;
cubs[9].position.y = 10;
cubs[9].position.z = 0;*/

cubs[10].position.x = EDGE_SIZE;
cubs[10].position.y = 0;
cubs[10].position.z = 0;

cubs[11].position.x = -EDGE_SIZE;
cubs[11].position.y = 0;
cubs[11].position.z = 0;
//middle level:line 2
cubs[12].position.x = 0;
cubs[12].position.y = 0;
cubs[12].position.z = EDGE_SIZE;

cubs[13].position.x = EDGE_SIZE;
cubs[13].position.y = 0;
cubs[13].position.z = EDGE_SIZE;

cubs[14].position.x = -EDGE_SIZE;
cubs[14].position.y = 0;
cubs[14].position.z = EDGE_SIZE;
//middle level:line 3
cubs[15].position.x = 0;
cubs[15].position.y = 0;
cubs[15].position.z = -EDGE_SIZE;

cubs[16].position.x = EDGE_SIZE;
cubs[16].position.y = 0;
cubs[16].position.z = -EDGE_SIZE;

cubs[17].position.x = -EDGE_SIZE;
cubs[17].position.y = 0;
cubs[17].position.z = -EDGE_SIZE;

//bottom level:line 1- central
cubs[18].position.x = 0;
cubs[18].position.y = -EDGE_SIZE;
cubs[18].position.z = 0;

cubs[19].position.x = EDGE_SIZE;
cubs[19].position.y = -EDGE_SIZE;
cubs[19].position.z = 0;

cubs[20].position.x = -EDGE_SIZE;
cubs[20].position.y = -EDGE_SIZE;
cubs[20].position.z = 0;
//bottom level:line 2
cubs[21].position.x = 0;
cubs[21].position.y = -EDGE_SIZE;
cubs[21].position.z = EDGE_SIZE;

cubs[22].position.x = EDGE_SIZE;
cubs[22].position.y = -EDGE_SIZE;
cubs[22].position.z = EDGE_SIZE;

cubs[23].position.x = -EDGE_SIZE;
cubs[23].position.y = -EDGE_SIZE;
cubs[23].position.z = EDGE_SIZE;
//bottom level:line 3
cubs[24].position.x = 0;
cubs[24].position.y = -EDGE_SIZE;
cubs[24].position.z = -EDGE_SIZE;

cubs[25].position.x = EDGE_SIZE;
cubs[25].position.y = -EDGE_SIZE;
cubs[25].position.z = -EDGE_SIZE;

cubs[26].position.x = -EDGE_SIZE;
cubs[26].position.y = -EDGE_SIZE;
cubs[26].position.z = -EDGE_SIZE;

export default cubs;