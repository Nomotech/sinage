
//screen resize
window.addEventListener('resize', function(){
    var margine = 3;
  renderer.setSize(window.innerWidth-margine, window.innerHeight-margine);
  camera.aspect = (window.innerWidth-margine) / (window.innerHeight-margine);
  camera.updateProjectionMatrix();
  width = window.innerWidth-margine;
  height = window.innerHeight-margine;
}, false );

function length(vin){
  var v = new THREE.Vector3();
  v.copy(vin);
  return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}

//マウス--------------------------------------------------------------------------------------
document.onmousemove = function(e) {
    var rect = e.target.getBoundingClientRect();
    // マウス位置(2D)
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    
    // マウス位置(3D)
    mouseX = (mouseX/width) *2 - 1;
    mouseY =-(mouseY/height)*2 + 1;
    
    // マウスベクトル
    var pos = new THREE.Vector3(mouseX, mouseY, 1);
    //var pos = new THREE.Vector3(1,1,1);
    // pos はスクリーン座標系なので, オブジェクトの座標系に変換
    pos.unproject(camera);

    // 始点, 向きベクトルを渡してレイを作成
    var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
    // 交差判定
    var obj = ray.intersectObjects(targetList);
    
    if (obj.length > 0) {
      //card[obj[0].object.name].card.scale.set(0.00000001,0.0000001,0.0000001);
        forcuscard_m = obj[0].object.name;
        //console.log(forcuscard);
    }
    if(obj.length==0)forcuscard_m = -1;
    // /console.log(obj);
};

document.onmousedown = function(e) {  
};

document.onmouseup = function (e){
  if(!e) e = window.event; // レガシー
  key[48] = key[49] = key[50] = key[51] = key[52] = 0;
  selectmenu = card_num;

  var rect = e.target.getBoundingClientRect();
    // マウス位置(2D)
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    
    // マウス位置(3D)
    mouseX = (mouseX/width) *2 - 1;
    mouseY =-(mouseY/height)*2 + 1;
    
    // マウスベクトル
    var pos = new THREE.Vector3(mouseX, mouseY, 1);
    // pos はスクリーン座標系なので, オブジェクトの座標系に変換
    pos.unproject(camera);
    
    // 始点, 向きベクトルを渡してレイを作成
    var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
    // 交差判定
    var obj = ray.intersectObjects(targetList);
    
    if (obj.length > 0 && forcuscard_m<=card_num) {
        //console.log(obj[0].object.name);
        //card[obj[0].object.name].card.scale.set(0.00000001,0.0000001,0.0000001);
        //console.log(card[obj[0].object.name]);
        if(obj[0].object.name!=selectcard && Number(obj[0].object.name)<=card_num){
          selectcounter=0;
          pre_selectcard = selectcard;
          selected = 0;
        }
        selectcard = obj[0].object.name;
    }
    if (obj.length >0 && forcuscard_m > card_num) {
      if(forcuscard_m!=selectmenu){
        pre_selectmenu = selectmenu;
      }
      selectmenu = forcuscard_m;
    }
    if(obj.length==0){
        selectcounter=0;
        pre_selectcard = selectcard;
        selectcard = -1;
        selected = 0;
    }
  // 出力テスト
  //console.log(e);
};

document.addEventListener("wheel" , function (e){
  var rect = e.target.getBoundingClientRect();
  // マウス位置(2D)
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;
  
  // マウス位置(3D)
  mouseX = (mouseX/width) *2 - 1;
  mouseY =-(mouseY/height)*2 + 1;
  
  // マウスベクトル
  var pos = new THREE.Vector3(mouseX, mouseY, 1);
  // pos はスクリーン座標系なので, オブジェクトの座標系に変換
  pos.unproject(camera);
  pos.sub(camera.position).normalize();
  camera_x -= pos.x*e.deltaY;
  camera_y -= pos.y*e.deltaY;
  camera_z -= pos.z*e.deltaY;
});

//キーボード-----------------------------------------------------------------------------------
document.onkeydown = function (e){
  if(!e)e = window.event;
  //console.log(e);
  key[e.keyCode] = 1;
}
document.onkeyup = function (e){
  if(!e)e = window.event;
  key[e.keyCode] = 0;
}

//クォータニオン-------------------------------------------------------------------------------
function QuaternionRotation(theta, u, v){ //(回転角, 回転軸, 座標ベクトル)
  var P = new quat4.create([v[0],v[1],v[2],0]);
  var Q = new quat4.create([-u[0]*Math.sin(theta/2), -u[1]*Math.sin(theta/2), -u[2]*Math.sin(theta/2), Math.cos(theta/2)]);
  var R = new quat4.create([u[0]*Math.sin(theta/2), u[1]*Math.sin(theta/2), u[2]*Math.sin(theta/2), Math.cos(theta/2)]);
  var S0 = quat4.multiply(P,Q, quat4.create());
  var S =  quat4.multiply(R,S0,quat4.create());  
  var V = [S[0],S[1],S[2]];
  //console.log(V);
  return V;
}


//Easingfunction-------------------------------------------------------------------------------
function easeInOutExpo(t){
    if( t < 0.5 ) {
        return (Math.pow( 2, 16 * t ) - 1) / 510;
    } else {
        return 1 - 0.5 * Math.pow( 2, -16 * (t - 0.5) );
    }
}

function easeInOutQuint(t){
    var t2;
    if( t < 0.5 ) {
        t2 = t * t;
        return 16 * t * t2 * t2;
    } else {
        t2 = (--t) * t;
        return 1 + 16 * t * t2 * t2;
    }
}

function easeInOutStair(t){
    var t2;
    if( t < 0.5 ) {
        t2 = 8*t*t*t - 1;
        return 1/2 * Math.pow(t2,1/3) + 1/2;
    } else {
        t2 = 8*t*t*t - 24*t*t + 24*t -7; 
        return 1/2 * Math.pow(t2,1/3) + 1/2;
    }
}

function easeInOutCir(t){
    if( t <= 0.5 ) {
        return 1/2 * (1-Math.sqrt(1-4*t*t));
    } else {
        return 1/2 * (1+Math.sqrt(-3*8*t-4*t*t));
    }
}

function easeOutExpo(t) {
    return 1 - Math.pow( 2, -8 * t );
}

function easeInExpo(t) {
    return (Math.pow( 2, 8 * t ) - 1) / 255;
}

function easeOutElastic(t) {
    var t2 = (t - 1) * (t - 1);
    return 1 - t2 * t2 * Math.cos( t * Math.PI * 2.0 );
}

function easeInOutElastic(t) {
    var t2;
    if( t < 0.45 ) {
        t2 = t * t;
        return 2 * t2 * t2 * Math.sin( t * Math.PI * 1 );
    } else if( t < 0.55 ) {
        return 0.5 + 0.75 * Math.sin( t * Math.PI * 4 );
    } else {
        t2 = (t - 1) * (t - 1);
        return 1 - 2 * t2 * t2 * Math.sin( t * Math.PI * 1 );
    }
}


//object生成-------------------------------------------------------------------------------------
//円柱
function createCylinder(x0,y0,z0,r0, x1,y1,z1,r1, col, open){
  var v = new THREE.Vector3(x0-x1, y0-y1, z0-z1);
  var len = v.length();
  var material = new THREE.MeshLambertMaterial({ color:col, ambient:col, opacity:1.0 });
  var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, len, 0, 0, open), material);
  cylinder.overdraw = true;

  if (len > 0.001) {
    cylinder.rotation.z = Math.acos(v.y/len);
    cylinder.rotation.y = 0.5*Math.PI + Math.atan2(v.x, v.z);
    cylinder.eulerOrder = 'YZX';
  }
    
  cylinder.position.x = (x1+x0)/2;
  cylinder.position.y = (y1+y0)/2;
  cylinder.position.z = (z1+z0)/2;
    
  return cylinder;
}


//csv読み取り------------------------------------------------------------------------------------
function getCSVFile() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    createArray(xhr.responseText);
    };
 
    xhr.open("get", "sozai/carddata.csv", true);
    xhr.send(null);
}
getCSVFile();
 
function createXMLHttpRequest() {
    var XMLhttpObject = null;
    XMLhttpObject = new XMLHttpRequest();
    return XMLhttpObject;
}
 
function createArray(csvData) {
    var tempArray = csvData.split("\n");
    var csvArray = new Array();
    for(var i = 0; i<tempArray.length;i++){
    csvArray[i] = tempArray[i].split(",");
    }
    
}

function csv2Array(filePath) { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
  var csvData = new Array();
  var data = new XMLHttpRequest();  
  data.open("GET", filePath, false); //true:非同期,false:同期
  data.send(null);

  var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
  var lines = data.responseText.split(LF);
  for (var i = 0; i < lines.length;++i) {
    var cells = lines[i].split(",");
    if( cells.length != 1 ) {
      csvData.push(cells);
    }
  }
  return csvData;
}

function screen_vec_generation(){
  var camera_axis = new THREE.Vector3();
  var camera_axis_z = new THREE.Vector3();
  var camera_axis_y = new THREE.Vector3();

  //「上」方向と法線ベクトルとの外積を計算。正規化。
  camera_axis_z.crossVectors(camera_vec, new THREE.Vector3(0,1,0)).normalize();
  camera_axis_y.crossVectors(camera_vec,camera_axis_z).normalize();
  
  camera_vec = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z).normalize();
  camera_pos = new THREE.Vector3(camera_x,camera_y,camera_z);
  window_r_top  = new THREE.Vector3(1,1,1);
  window_r_bottom = new THREE.Vector3(1,-1,1);
  window_l_top  = new THREE.Vector3(-1,1,1);
  window_l_bottom = new THREE.Vector3(-1,-1,1);
  // pos はスクリーン座標系なので, オブジェクトの座標系に変換
  window_r_top.unproject(camera);
  window_r_bottom.unproject(camera);
  window_l_top.unproject(camera);
  window_l_bottom.unproject(camera);
  window_r_top.sub(camera_pos).normalize();
  window_r_bottom.sub(camera_pos).normalize();
  window_l_top.sub(camera_pos).normalize();
  window_l_bottom.sub(camera_pos).normalize();

  window_vec_y = new THREE.Vector3(); 
  window_vec_y = window_r_bottom;
  window_vec_y.sub(window_r_top);
  
  window_vec_x = new THREE.Vector3(); 
  window_vec_x = window_l_top;
  window_vec_x.sub(window_r_top);

  window_center = new THREE.Vector3();  
  window_center.x =  window_r_top.x + window_vec_y.x/2 + window_vec_x.x/2;
  window_center.y =  window_r_top.y + window_vec_y.y/2 + window_vec_x.y/2;
  window_center.z =  window_r_top.z + window_vec_y.z/2 + window_vec_x.z/2;

  window_vec_x_n = new THREE.Vector3();
  window_vec_x_n.copy(window_vec_x);
  window_vec_x_n.normalize();

  window_vec_y_n = new THREE.Vector3();
  window_vec_y_n.copy(window_vec_y);
  window_vec_y_n.normalize();
}

function camera_set(){
  camera_look = new THREE.Vector3(0-camera_x,0-camera_y,0-camera_z);
  camera_look.normalize();
  camera_x = camera_keep.x - (camera_keep.x - mode_camera[Math.floor(mode)][0]) * (transcounter/transtime);
  camera_y = camera_keep.y - (camera_keep.y - mode_camera[Math.floor(mode)][1]) * (transcounter/transtime);
  camera_z = camera_keep.z - (camera_keep.z - mode_camera[Math.floor(mode)][2]) * (transcounter/transtime);
}

