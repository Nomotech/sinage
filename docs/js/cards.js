

mode_camera = new Array(mode_num);
mode_camera[0]=[5600,0,0];
mode_camera[1]=[5600,1000,0];
mode_camera[2]=[6500,1000,0];
mode_camera[3]=[5600,0,0];
mode_camera[4]=[20000,7000,0];
mode_camera[5]=[5600,0,0];
mode_camera[6]=[5600,0,0];



var objects= new THREE.Object3D();

card[0].object= new THREE.Object3D();
card[0].canvas = document.createElement('canvas');
card[0].canvas.width = 600; 
card[0].canvas.height =500;
var ctx = card[0].canvas.getContext('2d');
ctx.fillStyle = '#00FFFF';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = "80px sans-serif";
ctx.fillText(data[0][0],300,200);
ctx.fillText(data[0][1],300,300);
card[0].texture = new THREE.Texture(card[0].canvas);
card[0].texture.needsUpdate = true;
card[0].mesh = new THREE.Mesh(
	new THREE.BoxGeometry(10,500,600),
	new THREE.MeshBasicMaterial( {
		//color: 0x00FFFF ,
		//wireframe: true, 
		//transparent:true,
		//opacity:0.5,
		map:card[0].texture
	} )
);
card[0].mesh.position.set(0,0,0);
card[0].mesh.receiveShadow = true;
card[0].mesh.castShadow = true;
card[0].object.add(card[0].mesh);
objects.add(card[0].object);

for(i=1;i<=card_num;i++){

	card[i].object= new THREE.Object3D();
	card[i].height=500;
	card[i].width =600;
	card[i].card = new THREE.Object3D();
	card[i].x_axis = [1,0,0];
	card[i].y_axis = [0,1,0];
	card[i].z_axis = [0,0,1];
	card[i].r = 2000;
	card[i].sphere = [1,0,0];
	
	
	card[i].canvas = document.createElement('canvas');
	card[i].canvas.width = 600; 
	card[i].canvas.height =500;
	var ctx = card[i].canvas.getContext('2d');
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = "30px sans-serif";
	ctx.fillText(data[i][0] + "    " + data[i][1],card[i].width/2,50);
	ctx.font = "30px sans-serif";
	ctx.fillText(data[i][5],card[i].width*3/4,150);
	ctx.fillText(data[i][6],card[i].width*3/4,200);
	ctx.fillText(data[i][7],card[i].width*3/4,250);
	ctx.fillText(data[i][8],card[i].width*3/4,300);
	//console.log(data[i][5]);
			 
	// テクスチャを作成
	
	card[i].texture1 = loader.load("sozai/"+data[i][10]);
	card[i].texture2 = loader.load("sozai/"+data[i][11]);
	card[i].texture3 = new THREE.Texture(card[i].canvas);
	card[i].texture3.needsUpdate = true;

	// card[i].x=objposition.geometry.vertices[i].x;
	// card[i].y=objposition.geometry.vertices[i].y;
	// card[i].z=objposition.geometry.vertices[i].z;
	card[i].x = card[i].x_axis[0]*card[i].r;
	card[i].y = card[i].x_axis[1]*card[i].r;
	card[i].z = card[i].x_axis[2]*card[i].r;
	card[i].x = 0;
	card[i].y = 0;
	card[i].z = 0;
	card[i].mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(card[i].width,card[i].height),
		new THREE.MeshPhongMaterial({
			//color: 0x00FFFF ,
			color: 0x00FFFF ,
			transparent:true,
			map: card[i].texture1,
			opacity:0.99999,
			side:THREE.DoubleSide,
		})
	);
	card[i].mesh.rotation.y = 90 * Math.PI / 180;
	//card[i].mesh.position.set(card[i].x,card[i].y,card[i].z); // 位置を調整 rotate,scale
	//card[i].mesh.rotation.x = 90 * Math.PI / 180;// 初期状態だと縦になっているので、横になるように回転
	card[i].mesh.receiveShadow = true;
	card[i].mesh.castShadow = true;
	card[i].mesh.name = i;

	card[i].frame_material = new THREE.LineBasicMaterial( { 
		linewidth: 1,
		transparent:true,
		opacity:0.5,
		color: 0x00FFFF 
	} );
    card[i].frame_geometry = new THREE.Geometry();
    card[i].frame_geometry.vertices.push(new THREE.Vector3(0, card[i].height/2, card[i].width/2));
    card[i].frame_geometry.vertices.push(new THREE.Vector3(0, card[i].height/2,-card[i].width/2));
    card[i].frame_geometry.vertices.push(new THREE.Vector3(0,-card[i].height/2,-card[i].width/2));
    card[i].frame_geometry.vertices.push(new THREE.Vector3(0,-card[i].height/2, card[i].width/2));
    card[i].frame_geometry.vertices.push(new THREE.Vector3(0, card[i].height/2, card[i].width/2));
	card[i].frame_mesh = new THREE.Line( card[i].frame_geometry, card[i].frame_material );
	
	card[i].img = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(card[i].width*5/10,card[i].height*5/10),
		new THREE.MeshPhongMaterial({
			color: 0xFFFFFF ,
			//transparent:true,
			map:card[i].texture2,
			opacity:0.9,
			side:THREE.DoubleSide,
		})
	);
	card[i].img.rotation.y = 90 * Math.PI / 180;
	card[i].img.position.set(-5,0,card[i].width/4);

	card[i].info= new THREE.Mesh(
		new THREE.PlaneBufferGeometry(card[i].width,card[i].height),
		new THREE.MeshPhongMaterial({
			color: 0xFFFFFF ,
			transparent:true,
			map:card[i].texture3,
			opacity:0.99999,
			side:THREE.DoubleSide,
		})
	);
	card[i].info.rotation.y = 90 * Math.PI / 180;
	card[i].info.position.set(5,0,0);

	//card------------------------------------------------------------------------
	
	card[i].mode_vec = new Array(mode_num);
	card[i].mode_vec[0]=[card[i].r,0,0];
	card[i].mode_vec[1]=[card[i].r,0,0];
	card[i].mode_vec[2]=[card[i].r,0,0];
	card[i].mode_vec[3]=[card[i].r,0,0];
	card[i].mode_vec[4]=[card[i].r,0,0];
	card[i].mode_vec[5]=[0,0,0];
	card[i].mode_vec[6]=[card[i].r,0,0];

	card[i].mode_rot = new Array(mode_num);
	card[i].mode_rot[0] = new Array(3);
	card[i].mode_rot[1] = new Array(3);
	card[i].mode_rot[2] = new Array(3);
	card[i].mode_rot[3] = new Array(3);
	card[i].mode_rot[4] = new Array(3);
	card[i].mode_rot[5] = new Array(3);
	card[i].mode_rot[6] = new Array(3);

	card[i].mode_r = new Array(mode_num);
	card[i].mode_r[0]=0;
	card[i].mode_r[1]=2000;
	card[i].mode_r[2]=2500;
	card[i].mode_r[3]=0;
	card[i].mode_r[4]=0;
	card[i].mode_r[5]=4900;
	card[i].mode_r[6]=0;

	//cenrter----------------------------------------------------------------------
	card[i].mode_rot[0][0] = 0;
	card[i].mode_rot[0][1] = 0;
	card[i].mode_rot[0][2] = 0;
	
	//sphere---------------------------------------------------------------------
	card[i].sphere_objvec=[0,0,0];
	//4 10 14 14 10 4
	if(i<=4){
		card[i].mode_rot[1][2] = 70 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/4 + 15) * Math.PI / 180;
	}
	else if(i<=14){
		card[i].mode_rot[1][2] = 40 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/10 + 10) * Math.PI / 180;
	}
	else if(i<=28){
		card[i].mode_rot[1][2] = 15 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/14 + 5) * Math.PI / 180;
	}
	else if(i<=42){
		card[i].mode_rot[1][2] = -15 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/14 - 5) * Math.PI / 180;
	}
	else if(i<=52){
		card[i].mode_rot[1][2] = -40 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/10 - 10) * Math.PI / 180;
	}
	else if(i<=56){
		card[i].mode_rot[1][2] = -70 * Math.PI / 180;
		card[i].mode_rot[1][1] = (i * 360/4 - 15) * Math.PI / 180;
	}

	
	
	card[i].card.position.set(card[i].r,0,0);
	
	//helix-------------------------------------------------------------------------
	card[i].mode_rot[2][0] = -10 * Math.PI / 180;
	card[i].mode_rot[2][1] = (i * 360/20) * Math.PI / 180;
	card[i].mode_rot[2][2] = 0;

	//genre------------------------------------------------------------------------
	card[i].mode_rot[3][0] = 0;
	card[i].mode_rot[3][1] = 90 * Math.PI / 180;
	card[i].mode_rot[3][1] = 0;
	card[i].mode_rot[3][2] = 0;

	//map--------------------------------------------------------------------------
	card[i].mode_rot[4][0] = 0;
	card[i].mode_rot[4][1] = 0;
	card[i].mode_rot[4][2] = 0;
	card[i].mode_vec[4] =[	10000-Number(data[i][13]),
							-300,
							10000-Number(data[i][14])]
	

	//手前
	card[i].mode_rot[5][0] = 0;
	card[i].mode_rot[5][1] = 90 * Math.PI / 180;
	card[i].mode_rot[5][2] = 0;

	card[i].img.scale.set(0.00000001,0.0000001,0.0000001);
	card[i].info.scale.set(0.00000001,0.0000001,0.0000001);

	//sceneに追加
	card[i].card.add(card[i].img);
	card[i].card.add(card[i].info);
	card[i].card.add(card[i].mesh);
	card[i].card.add(card[i].frame_mesh);
	card[i].object.add(card[i].card);
	//targetList.push(card[i].card);
	objects.add(card[i].object);
	targetList.push(card[i].mesh);
}


//card[13].mesh.material.color.r =1.0;
//card[13].mesh.material.color.g =0.5;
//card[13].mesh.material.color.b =0.5;
//card[13].mesh.material.opacity = 1.0;


//menu---------------------------------------------------------------------------------------------------------------------
menu_width=30;
menu_height=30;

menu[1].text = "Sphere";
menu[2].text = "Helix";
menu[3].text = "Plane";
menu[4].text = "Map";
menu[5].text = "Center";
menu[6].text = "Close";

menu[0].x = 0;
menu[0].y = 0;
menu[0].z = 0;
menu[0].obj = new THREE.Object3D();



menu[0].frame_material = new THREE.LineBasicMaterial( { 
	linewidth: 1,
	transparent:true,
	opacity:0.5,
	color: 0x00FFFF 
} );
menu[0].frame_geometry = new THREE.Geometry();
menu[0].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height*4/2, menu_width/2));
menu[0].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height*4/2,-menu_width/2));
menu[0].frame_geometry.vertices.push(new THREE.Vector3(0,-menu_height*4/2,-menu_width/2));
menu[0].frame_geometry.vertices.push(new THREE.Vector3(0,-menu_height*4/2, menu_width/2));
menu[0].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height*4/2, menu_width/2));
menu[0].frame_mesh = new THREE.Line( menu[0].frame_geometry, menu[0].frame_material );
menu[0].obj.add(menu[0].frame_mesh);

menu[0].canvas = document.createElement('canvas');
menu[0].canvas.width = menu_width*10; 
menu[0].canvas.height = menu_height*40;
var ctx = menu[0].canvas.getContext('2d');
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = "100px sans-serif";
ctx.fillText("M",menu_width*10/2,menu_height*40*1/5);
ctx.fillText("e",menu_width*10/2,menu_height*40*2/5);
ctx.fillText("n",menu_width*10/2,menu_height*40*3/5);
ctx.fillText("u",menu_width*10/2,menu_height*40*4/5);
menu[0].texture = new THREE.Texture(menu[0].canvas);
menu[0].texture.needsUpdate = true;

menu[0].mesh = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(menu_width,menu_height*4),
	new THREE.MeshPhongMaterial({
		color: 0x00FFFF ,
		transparent:true,
		map: menu[0].texture,
		opacity:0.9999,
		side:THREE.DoubleSide,
	})
);
menu[0].mesh.rotation.y = 90 * Math.PI / 180;
menu[0].mesh.receiveShadow = true;
menu[0].mesh.castShadow = true;
menu[0].mesh.name = card_num + 1;
menu[0].obj.add(menu[0].mesh);

menu[0].back = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(menu_width,menu_height*4),
	new THREE.MeshPhongMaterial({
		color: 0x00FFFF ,
		transparent:true,
		//map: card[i].texture1,
		opacity:0.1,
		side:THREE.DoubleSide,
	})
);
menu[0].back.position.set(-1,0,0);
menu[0].back.rotation.y = 90 * Math.PI / 180;
menu[0].back.receiveShadow = true;
menu[0].back.castShadow = true;
menu[0].obj.add(menu[0].back);
scene.add(menu[0].obj);
targetList.push(menu[0].mesh);

menu_width=100;
menu_height=30;
for(i = 1;i<=menu_num;i++){
	menu[i].x = 0;
	menu[i].y = 0;
	menu[i].z = 0;
	menu[i].obj = new THREE.Object3D();

	menu[i].frame_material = new THREE.LineBasicMaterial( { 
		linewidth: 1,
		transparent:true,
		opacity:0.5,
		color: 0x00FFFF 
	} );
    menu[i].frame_geometry = new THREE.Geometry();
    menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height/2, menu_width/2));
    menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height/2,-menu_width/2));
    menu[i].frame_geometry.vertices.push(new THREE.Vector3(0,-menu_height/2,-menu_width/2));
    menu[i].frame_geometry.vertices.push(new THREE.Vector3(0,-menu_height/2, menu_width/2));
    menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, menu_height/2, menu_width/2));
	menu[i].frame_mesh = new THREE.Line( menu[i].frame_geometry, menu[i].frame_material );
	menu[i].obj.add(menu[i].frame_mesh);

	menu[i].canvas = document.createElement('canvas');
	menu[i].canvas.width = menu_width*10; 
	menu[i].canvas.height = menu_height*10;
	var ctx = menu[i].canvas.getContext('2d');
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = "200px sans-serif";
	ctx.fillText(menu[i].text,menu_width*10/2,menu_height*10/2);
	menu[i].texture = new THREE.Texture(menu[i].canvas);
	menu[i].texture.needsUpdate = true;

	menu[i].mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(menu_width,menu_height),
		new THREE.MeshPhongMaterial({
			color: 0x00FFFF ,
			transparent:true,
			map: menu[i].texture,
			opacity:0.9999,
			side:THREE.DoubleSide,
		})
	);
	menu[i].mesh.rotation.y = 90 * Math.PI / 180;
	menu[i].mesh.receiveShadow = true;
	menu[i].mesh.castShadow = true;
	menu[i].mesh.name = card_num+1+i;
	menu[i].obj.add(menu[i].mesh);

	menu[i].back = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(menu_width,menu_height),
		new THREE.MeshPhongMaterial({
			color: 0x00FFFF ,
			transparent:true,
			//map: card[i].texture1,
			opacity:0.1,
			side:THREE.DoubleSide,
		})
	);
	menu[i].back.position.set(-1,0,0);
	menu[i].back.rotation.y = 90 * Math.PI / 180;
	menu[i].back.receiveShadow = true;
	menu[i].back.castShadow = true;
	menu[i].obj.add(menu[i].back);
	scene.add(menu[i].obj);
	targetList.push(menu[i].mesh);
}


user_menu[1].text = "Search";
user_menu[2].text = "Grab";
user_menu[3].text = "Touch";
user_menu[4].text = "Zoom";
user_menu[5].text = "Pen";
user_menu[6].text = "Cursor";
handmode_texture1 = loader.load("sozai/search.png");
handmode_texture2 = loader.load("sozai/grab.png");
handmode_texture3 = loader.load("sozai/touch.png");
handmode_texture4 = loader.load("sozai/zoom.png");
handmode_texture5 = loader.load("sozai/pen.png");
handmode_texture6 = loader.load("sozai/cursor.png");

user_menu_width=30;
user_menu_height=30;
user_menu_pos = new THREE.Object3D();
for(i = 1;i<=user_menu_num;i++){
	user_menu[i].x = 0;
	user_menu[i].y = 0;
	user_menu[i].z = 0;
	user_menu[i].pos = new THREE.Object3D();
	user_menu[i].obj = new THREE.Object3D();


	user_menu[i].frame_material = new THREE.LineBasicMaterial( { 
		linewidth: 1,
		transparent:true,
		opacity:0.5,
		color: 0x00FFFF 
	} );
    user_menu[i].frame_geometry = new THREE.Geometry();
    user_menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, user_menu_height/2, user_menu_width/2));
    user_menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, user_menu_height/2,-user_menu_width/2));
    user_menu[i].frame_geometry.vertices.push(new THREE.Vector3(0,-user_menu_height/2,-user_menu_width/2));
    user_menu[i].frame_geometry.vertices.push(new THREE.Vector3(0,-user_menu_height/2, user_menu_width/2));
    user_menu[i].frame_geometry.vertices.push(new THREE.Vector3(0, user_menu_height/2, user_menu_width/2));
	user_menu[i].frame_mesh = new THREE.Line( user_menu[i].frame_geometry, user_menu[i].frame_material );
	user_menu[i].frame_mesh.position.set(0,40,0);
	//user_menu[i].obj.add(user_menu[i].frame_mesh);

	user_menu[i].canvas = document.createElement('canvas');
	user_menu[i].canvas.width = user_menu_width*10; 
	user_menu[i].canvas.height = user_menu_height*10;
	var ctx = user_menu[i].canvas.getContext('2d');
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = "110px sans-serif";
	ctx.fillText(user_menu[i].text,user_menu_width*10/2,user_menu_height*10/2);
	user_menu[i].texture = new THREE.Texture(user_menu[i].canvas);
	user_menu[i].texture.needsUpdate = true;

	user_menu[i].mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
		new THREE.MeshPhongMaterial({
			color: 0x00FFFF ,
			transparent:true,
			map: user_menu[i].texture,
			opacity:0.9999,
			side:THREE.DoubleSide,
		})
	);
	user_menu[i].mesh.rotation.y = 90 * Math.PI / 180;
	user_menu[i].mesh.position.set(0,40,0);
	user_menu[i].mesh.receiveShadow = true;
	user_menu[i].mesh.castShadow = true;
	user_menu[i].mesh.name = user_menu[i].text;
	user_menu[i].obj.add(user_menu[i].mesh);

	
	user_menu[i].back = new THREE.Mesh(
		//new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
		new THREE.RingGeometry( 20, 50, 50,10, 1* 2/user_menu_num * Math.PI,2/user_menu_num * Math.PI),
		new THREE.MeshPhongMaterial({
			color: 0x00FFFF ,
			transparent:true,
			wireframe:true,
			//map: card[i].texture1,
			opacity:0.1,
			side:THREE.DoubleSide,
		})
	);
	user_menu[i].back.rotation.y = 90 * Math.PI / 180;
	user_menu[i].back.receiveShadow = true;
	user_menu[i].back.castShadow = true;
	user_menu[i].back.position.set(-3,0,0);
	user_menu[i].obj.add(user_menu[i].back);

	user_menu[i].pos.add(user_menu[i].obj);
	//user_menu[i].obj.position.set(0,0,user_menu_width/2+50);
	user_menu[i].obj.position.set(0,2,0);
	//user_menu[i].pos.rotation.x = i * 2 * Math.PI /user_menu_num;
	targetList.push(user_menu[i].mesh);
	user_menu_pos.add(user_menu[i].pos);
}

scene.add(user_menu_pos);

var user_menu_select = new THREE.Object3D();
var user_menu_select1 = new THREE.Mesh(
	//new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
	new THREE.RingGeometry( 18, 19, 40,8, 1* 2/user_menu_num * Math.PI-0.04,2/user_menu_num * Math.PI+0.08),
	new THREE.MeshPhongMaterial({
		color: 0xFF6666 ,
		transparent:true,
		wireframe:true,
		//map: card[i].texture1,
		opacity:0.1,
		side:THREE.DoubleSide,
	})
);
user_menu_select1.rotation.y = 90 * Math.PI / 180;
user_menu_select1.receiveShadow = true;
user_menu_select1.castShadow = true;
user_menu_select1.position.set(-2.9,2,0);
var user_menu_select2 = new THREE.Mesh(
	//new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
	new THREE.RingGeometry( 51, 52, 40,8, 1* 2/user_menu_num * Math.PI-0.04,2/user_menu_num * Math.PI+0.08),
	new THREE.MeshPhongMaterial({
		color: 0xFF6666 ,
		transparent:true,
		wireframe:true,
		//map: card[i].texture1,
		opacity:0.1,
		side:THREE.DoubleSide,
	})
);
user_menu_select2.rotation.y = 90 * Math.PI / 180;
user_menu_select2.receiveShadow = true;
user_menu_select2.castShadow = true;
user_menu_select2.position.set(-2.9,2,0);

user_menu_select3 = new THREE.Mesh(
	//new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
	new THREE.RingGeometry( 18, 51, 40,8, 1* 2/user_menu_num * Math.PI-0.04,2/user_menu_num * Math.PI+0.08),
	new THREE.MeshPhongMaterial({
		color: 0xFF6666 ,
		transparent:true,
		//wireframe:true,
		//map: card[i].texture1,
		opacity:0.3,
		side:THREE.DoubleSide,
	})
);
user_menu_select3.rotation.y = 90 * Math.PI / 180;
user_menu_select3.receiveShadow = true;
user_menu_select3.castShadow = true;
user_menu_select3.position.set(-2.9,2,0);

user_menu_select.add(user_menu_select1);
user_menu_select.add(user_menu_select2);
user_menu_select.add(user_menu_select3);
scene.add(user_menu_select);

var user_menu_center = new THREE.Object3D();
user_menu_center1 = new THREE.Mesh(
	//new THREE.PlaneBufferGeometry(user_menu_width,user_menu_height),
	new THREE.RingGeometry(18,19,40,8),
	new THREE.MeshPhongMaterial({
		color: 0x00FFFF ,
		transparent:true,
		//wireframe:true,
		//map: card[i].texture1,
		opacity:0.99,
		side:THREE.DoubleSide,
	})
);
user_menu_center1.rotation.y = 90 *Math.PI / 180;
user_menu_center1.receiveShadow = true;
user_menu_center1.castShadow = true;
user_menu_center1.position.set(-2.9,0,0);
var user_menu_center_text = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(20,20),
	new THREE.MeshPhongMaterial({
		color: 0x00FFFF ,
		transparent:true,
		map: handmode_texture1,
		opacity:0.9999,
		side:THREE.DoubleSide,
	})
);
user_menu_center_text.rotation.y = 90 * Math.PI / 180;
user_menu_center_text.position.set(-2.9,0,0);
user_menu_center_text.receiveShadow = true;
user_menu_center_text.castShadow = true;
user_menu_center_text.name = "user_menu";
targetList.push(user_menu_center_text);

user_menu_center.add(user_menu_center_text);
user_menu_center.add(user_menu_center1);
scene.add(user_menu_center);

var map_objects  = new THREE.Object3D();
var mapscale = 0.00000001;
for(i=1;i<=mapobj_num;i++){
	if(mapdata[i][5]=="green"){
		mapobj[i].color = 0x66FF66;
		mapobj[i].height = 500;
	}
	else if(mapdata[i][5]=="red"){
		mapobj[i].color = 0xFF6666;
		mapobj[i].height = 10;	
	}
	mapobj[i].mesh = new THREE.Mesh(
		new THREE.CubeGeometry(mapdata[i][3],mapobj[i].height,mapdata[i][4]),
		new THREE.MeshBasicMaterial( {
			color: mapobj[i].color ,
			//wireframe: true, 
			transparent:true,
			opacity:0.5,
			side:THREE.DoubleSide,
			combine: THREE.MixOperation,
			reflectivity: 0.7
		} )
	);
	mapobj[i].mesh.position.set((10000-mapdata[i][1]),-1000,(10000-mapdata[i][2]));
	mapobj[i].mesh.receiveShadow = true;
	mapobj[i].mesh.castShadow = true;
	map_objects.add(mapobj[i].mesh);
	mapobj[i].mesh.scale.set(mapscale,mapscale,mapscale);
	//menu[i].mesh.name = card_num+1+i;
	//menu[i].obj.add(menu[i].mesh);
}
objects.add(map_objects);

for(i=0;i<hand_num;i++){
	handobj[i].obj = new THREE.Object3D();
	handobj[i].finger_counter = 0b100000;
	handobj[i].palmnormal =  new THREE.Vector3();
	handobj[i].direction = new THREE.Vector3()
	handobj[i].palm = new THREE.Mesh(
		new THREE.IcosahedronGeometry(4,1),
		new THREE.MeshBasicMaterial( {
			color: 0xFF6600 ,
			wireframe: true, 
			transparent:true,
			opacity:0.2,
			side:THREE.DoubleSide,
			combine: THREE.MixOperation,
			reflectivity: 0.7
		} )
	);
	handobj[i].palm.receiveShadow = true;
	handobj[i].palm.castShadow = true;
	//scene.add(handobj[i].palm);
	handobj[i].obj.add(handobj[i].palm);

	handobj[i].cursor = new THREE.Mesh(
		new THREE.IcosahedronGeometry(2,1),
		new THREE.MeshBasicMaterial( {
			color: 0xFF6600 ,
			wireframe: true, 
			transparent:true,
			opacity:0.2,
			side:THREE.DoubleSide,
			combine: THREE.MixOperation,
			reflectivity: 0.7
		} )
	);
	handobj[i].cursor.receiveShadow = true;
	handobj[i].cursor.castShadow = true;
	//scene.add(handobj[i].cursor);
	handobj[i].obj.add(handobj[i].cursor);

	handobj[i].finger_tip = new Array(5);
	handobj[i].finger_dip = new Array(5);
	handobj[i].finger_pip = new Array(5);
	handobj[i].finger_mcp = new Array(5);
	handobj[i].finger_bone1 = new Array(5);
	handobj[i].finger_bone2 = new Array(5);
	handobj[i].finger_bone3 = new Array(5);

	for(j = 0;j<5;j++){
		handobj[i].finger_tip[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(2,1),
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);
		handobj[i].finger_dip[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(2,1),
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);

		handobj[i].finger_pip[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(2,1),
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);
		
		handobj[i].finger_mcp[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(2,1),
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);

		// 上面半径2,下面半径20,高さ40,円周分割数50     
		handobj[i].finger_bone1[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(1,1),
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);

		// 上面半径2,下面半径20,高さ40,円周分割数50     
		handobj[i].finger_bone2[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(1,1),    
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);

		// 上面半径2,下面半径20,高さ40,円周分割数50     
		handobj[i].finger_bone3[j] = new THREE.Mesh(
			new THREE.IcosahedronGeometry(1,1), 
			new THREE.MeshBasicMaterial( {
				color: 0xFF6600 ,
				wireframe: true, 
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
				combine: THREE.MixOperation,
				reflectivity: 0.7
			} )
		);



		//handobj[i].obj.add(handobj[i].finger_bone1[j]);
		//handobj[i].obj.add(handobj[i].finger_bone2[j]);
		//handobj[i].obj.add(handobj[i].finger_bone3[j]);
	
		handobj[i].obj.add(handobj[i].finger_tip[j]);
		handobj[i].obj.add(handobj[i].finger_dip[j]);
		handobj[i].obj.add(handobj[i].finger_pip[j]);
		handobj[i].obj.add(handobj[i].finger_mcp[j]);	
		
	}
	//scene.add(handobj[i].obj);
}

var zoom_center= new THREE.Mesh(
	new THREE.IcosahedronGeometry(2,1),
	new THREE.MeshBasicMaterial( {
		color: 0xFF6600 ,
		wireframe: true, 
		transparent:true,
		opacity:0.2,
		side:THREE.DoubleSide,
		combine: THREE.MixOperation,
		reflectivity: 0.7
	} )
);
zoom_center.scale.set(0.0001,0.0001,0.0001);
scene.add(zoom_center);

var base_text = "手をかざしてください";
var base_canvas = document.createElement('canvas');
base_canvas.width = 600; 
base_canvas.height =500;
var ctx = base_canvas.getContext('2d');
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = "40px sans-serif";
ctx.fillText(base_text,200,200);
base_texture = new THREE.Texture(base_canvas);
base_texture.needsUpdate = true;


var base = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(card[1].width,card[1].height),
	new THREE.MeshPhongMaterial({
		color: 0xFFFFFF,
		transparent:true,
		map:base_texture,
		opacity:0.999,
		side:THREE.DoubleSide,
	})
);
base.rotation.y = 90 * Math.PI / 180;


scene.add(objects);

