'use strict';
console.debug = function(){/* NOP */};
console.info = function(){/* NOP */};
//console.log = function(){/* NOP */};
console.warn = function(){/* NOP */};
//console.error = function(){/* NOP */};


function render() {
	camera_now = new THREE.Vector3(camera_x,camera_y,camera_z);
	camera.position.set(camera_x,camera_y,camera_z);
	camera.lookAt(camera_now.add(camera_look));
	
	//hand関係
	//hand_mode(theta_now);
	//cursor();
	//cursor_l();
	
	//モードの変更とモードごとのステータス更新
	mode_select()
	mode_position();

	//カード
	for(i=1;i<=card_num;i++){
		mode_change();
		card_select();
	}
	if(mode*10%10==0)for(i=1;i<=card_num;i++)card[i].r = card[i].mode_r[mode];
	if(mode*10%10>0) camera_set();

	//mapmode
	map_mode();
	
	//現在のscreen座標系を取得
	screen_vec_generation();

	//手を描画
	//hand_draw();

	menu_set();
	user_menu_set();

	//menu選択
	menu_select()

	//objects.rotation.x +=0.01;
	//rot_obj_x = objects.rotation.x;

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();