var scene;
var camera;
var renderer;
var width = 1200;
var height = 800;
width = 1670;
height = 850;
width = window.innerWidth-3;
height =window.innerHeight-3;
//センサーからディスプレイまでの高さ
//var screen_height = 130;//ノートパソコン用
var screen_height = 230;//24インチディスプレイ用

//scene ステージ
scene = new THREE.Scene();

//renderer 実際に描画を行う
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width,height);
renderer.setClearColor(0x000025);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('stage').appendChild(renderer.domElement);

var data = csv2Array('carddata.csv');
var mapdata = csv2Array('filtered.csv');
//console.log(data);

var loader=new THREE.TextureLoader();
var texture=loader.load('TakashiNomoto2.JPG');
var launch = new THREE.Object3D();

//camera
camera = new THREE.PerspectiveCamera(45, width / height,1,50000);
camera.position.set(5600,1000,0);
camera.lookAt(scene.position);
//camera.lookAt(0,0,0);
camera.up.set(0, 1, 0); // カメラの上方向ベクトルの設定
//camera.lookAt({x: 0, y: 0, z: 0}); // カメラ視野の中心座標の設定
//controlを追加し、マウスによるカメラコントロールを追加
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.lookAt(scene.position);

//点光源
// light
var light = new THREE.DirectionalLight( 0xffffff,0.5 );
light.position.set(0, 100, 0 );
scene.add( light );

// 環境光を追加
var ambient = new THREE.AmbientLight(0x999999);
scene.add(ambient);

// 影
renderer.shadowMapEnabled = true; 

//keycode
var key = new Array(300);


var i;
var j;
var mode_num=5;
var card_num = 56;
var card = new Array(card_num);
for(i=0;i<=card_num;i++){
	card[i]={};
}

var menu_num = 6;
var menu = new Array(menu_num);
for(i=0;i<=menu_num;i++){
	menu[i]={};
}

var user_menu_num = 6;
var user_menu = new Array(user_menu_num);
for(i=0;i<=user_menu_num;i++){
	user_menu[i]={};
}

var mapobj_num=42;
var mapobj = new Array(mapobj_num);
for(i=0;i<=mapobj_num;i++){
	mapobj[i]={};
}

var handobj = new Array(20);
for(i=0;i<=20;i++){
	handobj[i]={};
}

hand_num = 2;
var hand_posi = new Array(hand_num);
for(i=0;i<hand_num;i++)hand_posi[i] = new THREE.Vector3();
var finger_tip = new Array(hand_num);
for(i=0;i<hand_num;i++){
  finger_tip[i] = new Array(5);
  for(j=0;j<5;j++)finger_tip[i][j] = new THREE.Vector3();
}
var finger_dip = new Array(hand_num);
for(i=0;i<hand_num;i++){
  finger_dip[i] = new Array(5);
  for(j=0;j<5;j++)finger_dip[i][j] = new THREE.Vector3();
}
var finger_pip = new Array(hand_num);
for(i=0;i<hand_num;i++){
  finger_pip[i] = new Array(5);
  for(j=0;j<5;j++)finger_pip[i][j] = new THREE.Vector3();
}
var finger_mcp = new Array(hand_num);
for(i=0;i<hand_num;i++){
  finger_mcp[i] = new Array(5);
  for(j=0;j<5;j++)finger_mcp[i][j] = new THREE.Vector3();
}

var rot_obj_x=0;
var rot_obj_y=0;
var rot_obj_z=0;

//オブジェクト格納グローバル変数
var targetList = [];         
var mode_camera;
mode_camera = new Array(mode_num);
mode_camera[0]=[5600,0,0];
mode_camera[1]=[5600,1000,0];
mode_camera[2]=[6500,1000,0];
mode_camera[3]=[5600,0,0];
mode_camera[4]=[20000,7000,0];
mode_camera[5]=[5600,0,0];

var camera_angle_z=0;
var camera_angle_y=0;

var mode = 0;
var mode_num = 6;
var premode = 0;
var nextmode = 0;
var transcounter = 0;
var selectcounter = 0;
var selected = 0;
var pre_selectcounter = 0;
var transtime = 100;
var forcuscard_m = -1; //mouse用
var forcuscard_hr = -1; //hand用
var forcuscard_hl = -1; //hand用
var selectcard = -1;	 //選択したcard
var pre_selectcard = -1; //選択していたcard
var selectmenu = -1;	 //選択したmenu
var pre_selectmenu = -1; //選択していたmenu
var camera_x = mode_camera[0][0];
var camera_y = mode_camera[0][1];
var camera_z = mode_camera[0][2];
var camera_vec = new THREE.Vector3(camera_x,camera_y,camera_z).normalize();
var camera_pos = new THREE.Vector3(camera_x,camera_y,camera_z);
var camera_now = new THREE.Vector3(0,0,0);
var camera_keep = new THREE.Vector3(0,0,0);
var camera_look = new THREE.Vector3(0,0,0);
camera_look.sub(camera_vec);
var righthand = 3;
var lefthand = 3;
transtime = 50;

var menucounter = 0;
var menucounter_limit = 80;
var menu_open = false;
var menu_opened = false;
var user_menucounter = 0;
var user_menucounter_limit = 10;
var user_menu_open = false;
var user_menu_opened = false;
var opentime = 20; 
var opencounter=0;
var user_opentime = 20; 
var user_opencounter=0;
var theta_now = 3600;
var theta_pre = 0;
var handmode = "Cursor";
var handalive = 0;

var zoomed = 1;
var zoom_point = new THREE.Vector3();
var zoom_start_position = new THREE.Vector3();
var zoom_righthand_pos;
var zoom_lefthand_pos;
var zoom_length = 0;
var zoom_old_length = 0;
var zoom_vec = new THREE.Vector3();

var hand_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)hand_vec[i] = new THREE.Vector3();
var tip_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)tip_vec[i] = new THREE.Vector3();
var dip_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)dip_vec[i] = new THREE.Vector3();
var pip_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)pip_vec[i] = new THREE.Vector3();
var mcp_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)mcp_vec[i] = new THREE.Vector3();
var cursor_vec = new Array(hand_num);
for(i=0;i<hand_num;i++)cursor_vec[i] = new THREE.Vector3();



//軸
var axis_x=[1,0,0];
var axis_y=[0,1,0];
var axis_z=[0,0,1];

//screenvector
var window_r_top 	= new THREE.Vector3(1,1,1);
var window_r_bottom = new THREE.Vector3(1,-1,1);
var window_l_top 	= new THREE.Vector3(-1,1,1);
var window_l_bottom = new THREE.Vector3(-1,-1,1);

var window_vec_x;
var window_vec_y;

var window_center;
var window_vec_x_n;
var window_vec_y_n;


