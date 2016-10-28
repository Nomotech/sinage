function mode_select(){
	if(key[48] == 1){//0
	if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0;			 transcounter=0; break;
			case 1: premode = 1; mode = 0.1; transcounter=0; break;
			case 2: premode = 2; mode = 0.2; transcounter=0; break;
			case 3: premode = 3; mode = 0.2; transcounter=0; break;
			case 4: premode = 4; mode = 0.2; transcounter=0; break;
			case 5: premode = 5; mode = 0.2; transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
	else if(key[49] == 1){//1
		if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0; mode = 1.1; transcounter=0; break;
			case 1: premode = 1; 			 transcounter=0; break;
			case 2: premode = 2; mode = 1.2; transcounter=0; break;
			case 3: premode = 3; mode = 1.2; transcounter=0; break;
			case 4: premode = 4; mode = 1.2; transcounter=0; break;
			case 5: premode = 5; mode = 1.2; transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
	else if(key[50]==1){//2
		if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0; mode = 2.1; transcounter=0; break;
			case 2: premode = 2; 			 transcounter=0; break;
			case 1: premode = 1; mode = 2.2; transcounter=0; break;
			case 3: premode = 3; mode = 2.2; transcounter=0; break;
			case 4: premode = 4; mode = 2.2; transcounter=0; break;
			case 5: premode = 5; mode = 2.2; transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
	else if(key[51]==1){//3
		if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0; mode = 3.1; transcounter=0; break;
			case 2: premode = 2; mode = 3.2; transcounter=0; break;
			case 1: premode = 1; mode = 3.1; transcounter=0; break;
			case 3: premode = 3; 			 transcounter=0; break;
			case 4: premode = 4; mode = 3.1; transcounter=0; break;
			case 5: premode = 5; mode = 3.1; transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
	else if(key[52]==1){//4
		if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0; mode = 4.1; transcounter=0; break;
			case 2: premode = 2; mode = 4.2; transcounter=0; break;
			case 1: premode = 1; mode = 4.2; transcounter=0; break;
			case 3: premode = 3; mode = 4.1; transcounter=0; break;
			case 4: premode = 4;			 transcounter=0; break;
			case 5: premode = 5; mode = 4.1; transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
	else if(key[53]==1){//5
		if(mode*10%10==0)camera_keep = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
		switch(mode){
			case 0: premode = 0; mode = 5.1; transcounter=0; break;
			case 2: premode = 2; mode = 5.2; transcounter=0; break;
			case 1: premode = 1; mode = 5.1; transcounter=0; break;
			case 3: premode = 3; mode = 5.1; transcounter=0; break;
			case 4: premode = 4; mode = 5.1; transcounter=0; break;
			case 5: premode = 5; 			 transcounter=0; break;
			default: break;
		}
		selectmenu = 0;
	}
}

function mode_position(){
	var v_vec = new THREE.Vector3(0,0,0);
	v_vec.copy(camera_look);
	var dot = v_vec.dot(new THREE.Vector3(0,-1,0).normalize());//v_vecと射影ベクトルとの内積
	camera_angle_z = 90 * Math.PI / 180 -Math.acos(dot);//内積から角度を

	v_vec = new THREE.Vector3(camera_look.x,0,camera_look.z);
	var dot = v_vec.dot(new THREE.Vector3(0,0,1).normalize());//v_vecと射影ベクトルとの内積
	camera_angle_y = 90 * Math.PI / 180 -Math.acos(dot);//内積から角度を

	for(i=1;i<=card_num;i++){
		//sphere--------------------------------------------------------------------------------
		card[i].mode_vec[0] = [card[i].r,0,0];
		card[i].mode_vec[1] = QuaternionRotation(card[i].mode_rot[1][2] ,axis_z,card[i].mode_vec[0]);
		card[i].mode_vec[1] = QuaternionRotation(card[i].mode_rot[1][1] ,axis_y,card[i].mode_vec[1]);
		card[i].mode_rot[1][1] += 0.001;
		//console.log(card[1].sphere_vec);
		

		//helix---------------------------------------------------------------------------------
		card[i].mode_vec[2] = [card[i].mode_vec[0][0],card[i].mode_vec[0][1] + (card_num-i) * 30 - 500,card[i].mode_vec[0][2]]
		card[i].mode_vec[2] = QuaternionRotation(card[i].mode_rot[2][2] ,axis_z,card[i].mode_vec[2]);
		card[i].mode_vec[2] = QuaternionRotation(card[i].mode_rot[2][1] ,axis_y,card[i].mode_vec[2]);
		card[i].mode_rot[2][1] += 0.001;
		

		//genre---------------------------------------------------------------------------------
		card[i].mode_vec[3] = [
			0,
			(3.5-Math.floor((i-1)/8))*(card[i].height+30),
			(3-(i-1)%8)*(card[i].width+30)
		];
		card[i].mode_rot[3] = [0,0,0];
		
		//card[i].card.position.set(card[i].mode_vec[3][0],card[i].mode_vec[3][1],card[i].mode_vec[3][2]);
		
		//map----------------------------------------------------------------------------------
		//card[i].mode_vec[4] = [card[i].r,0,0];
		var card_vec = new THREE.Vector3(camera_x-card[i].mode_vec[4][0],
										 camera_y-card[i].mode_vec[4][1],
										 camera_z-card[i].mode_vec[4][2]).normalize();
		var dot = card_vec.dot(new THREE.Vector3(0,1,0).normalize());//v_vecと射影ベクトルとの内積
		var mode4_angle_z = 90 * Math.PI / 180 -Math.acos(dot);//内積から角度を
		var card_vec = new THREE.Vector3(camera_x-card[i].mode_vec[4][0],
										 0,
										 camera_z-card[i].mode_vec[4][2]
		).normalize();
		var dot = card_vec.dot(new THREE.Vector3(camera_x,0,camera_z).normalize());//v_vecと射影ベクトルとの内積
		var mode4_angle_y = Math.acos(dot);//内積から角度を
		if(card_vec.z>0)mode4_angle_y *=-1;
		card[i].mode_rot[4] = [0,mode4_angle_y,mode4_angle_z];
		//手---------------------------------------------------------------------------------
		card[i].mode_rot[5] = [0,0,camera_angle_z];
		card[i].mode_vec[5] = [camera_x+800*camera_look.x,camera_y+800*camera_look.y,camera_z+800*camera_look.z];
		//card[i].mode_vec[5] = QuaternionRotation(card[i].mode_rot[5][2] ,axis_z,card[i].mode_vec[5])
		//card[i].mode_vec[5] = QuaternionRotation(card[i].mode_rot[5][1] ,axis_y,card[i].mode_vec[5]);

		//手前------------------------------------------------------------------------------------
		
		card[i].mode_rot[6] = [0,camera_angle_y,camera_angle_z];
		card[i].mode_vec[6] = [camera.position.x+800*camera_look.x,camera.position.y+800*camera_look.y,camera.position.z+800*camera_look.z];

		//card[i].mesh.scale.set(0,0,0);
	}
}

function mode_change(){
	switch(mode){
		case 0.1:
			card[i].mode_rot[1][1] +=0.1;
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[0]) *  easeInExpo(transcounter*2/transtime);
			card[i].card.rotation.x = 0;
			card[i].card.rotation.z = card[i].mode_rot[1][2];
			card[i].card.rotation.y = card[i].mode_rot[1][1];
			card[i].card.position.set(card[i].mode_vec[1][0],card[i].mode_vec[1][1],card[i].mode_vec[1][2]);
			//if(card[i].r<card[i].mode_r[0] && i>=card_num)mode =0;
			if(i>=card_num)transcounter++;
			if(transcounter>transtime/2){
				transcounter=0;
				mode = 0;
			}
			card[0].mesh.scale.set(1,1,1);
			break;
		case 0.2:
			card[i].mode_rot[premode][1] +=0;
			card[i].mode_rot[2][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			var transtime_01 = 5;
			var transcounter_01;
			if( transcounter < i*transtime/(card_num+transtime_01) )transcounter_01 = 0;
			else if(transcounter > i*transtime/(card_num + transtime_01) && transcounter < i*transtime/(card_num+transtime_01)+transtime_01)transcounter_01=transcounter - i*transtime/(card_num+transtime_01);
			else if(transcounter > i*transtime/(card_num + transtime_01)+transtime_01)transcounter_01=transtime_01;
			card[i].r  = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[0]) * easeInOutExpo(transcounter_01/transtime_01);
			card[i].card.rotation.z = card[i].mode_rot[premode][2] ;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] ;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[0][2]-card[i].mode_rot[premode][2]) * transcounter_01/transtime_01;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[0][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInExpo(transcounter_01/transtime_01);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[0][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter_01/transtime_01);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[0][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter_01/transtime_01);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[0][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter_01/transtime_01);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 0;
			}
			card[0].mesh.scale.set(1,1,1);
			//card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 0://normal
			card[i].r = card[i].mode_r[0];
			card[i].card.position.set(card[i].mode_vec[0][0],card[i].mode_vec[0][1],card[i].mode_vec[0][2]);
			card[i].card.rotation.z = card[i].mode_rot[0][2];
			card[i].card.rotation.y = card[i].mode_rot[0][1];
			card[0].mesh.scale.set(1,1,1);
			mode = 0;
			break;

		case 1.1:
			card[i].mode_rot[1][1] +=0.1;
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[1]) * easeInExpo(transcounter*2/transtime);
			card[i].card.rotation.x = 0;
			card[i].card.rotation.z = card[i].mode_rot[1][2];
			card[i].card.rotation.y = card[i].mode_rot[1][1];
			card[i].card.position.set(card[i].mode_vec[1][0],card[i].mode_vec[1][1],card[i].mode_vec[1][2]);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime/2){
				transcounter=0;
				mode = 1;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 1.2:
			card[i].mode_rot[premode][1] +=0.04;
			card[i].mode_rot[1][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[1][1] +=0.01;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[1]) * transcounter/transtime;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[1][2]-card[i].mode_rot[premode][2]) * easeInOutExpo(transcounter/transtime);
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[1][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInOutExpo(transcounter/transtime);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[1][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter/transtime);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[1][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter/transtime);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[1][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter/transtime);
			
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 1;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 1:
			card[i].card.rotation.x = 0;
			card[i].card.rotation.z = card[i].mode_rot[1][2];
			card[i].card.rotation.y = card[i].mode_rot[1][1];
			card[i].card.position.set(card[i].mode_vec[1][0],card[i].mode_vec[1][1],card[i].mode_vec[1][2]);
			premode = 1;
			break;

		case 2.1:
			card[i].mode_rot[premode][1] +=0;
			card[i].mode_rot[2][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			var transtime_21 = 30; 
			var transcounter_21;
			if( transcounter < i*transtime/(card_num+transtime_21) )transcounter_21 = 0;
			else if(transcounter > i*transtime/(card_num + transtime_21) && transcounter < i*transtime/(card_num+transtime_21)+transtime_21)transcounter_21=transcounter - i*transtime/(card_num+transtime_21);
			else if(transcounter > i*transtime/(card_num + transtime_21)+transtime_21)transcounter_21=transtime_21;
			//card[i].card.rotation.z = card[i].mode_rot[2][2] ;
			//card[i].card.rotation.y = card[i].mode_rot[2][1] ;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[2][2]-card[i].mode_rot[premode][2]) * transcounter_21/transtime_21;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[2][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInOutExpo(transcounter_21/transtime_21);
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[2]) * easeInOutExpo(transcounter_21/transtime_21);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[2][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter_21/transtime_21);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[2][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter_21/transtime_21);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[2][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter_21/transtime_21);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 2;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 2.2:
			card[i].mode_rot[premode][1] +=0.03;
			card[i].mode_rot[2][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[2]) * transcounter/transtime;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[2][2]-card[i].mode_rot[premode][2]) * transcounter/transtime;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[2][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInOutExpo(transcounter/transtime);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[2][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter/transtime);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[2][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter/transtime);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[2][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter/transtime);
			
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 2;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 2:
			card[i].r = 2500;
			card[i].card.rotation.z = card[i].mode_rot[2][2];
			card[i].card.rotation.y = card[i].mode_rot[2][1];
			card[i].card.position.set(card[i].mode_vec[2][0],card[i].mode_vec[2][1],card[i].mode_vec[2][2]);
			premode = 2; 
			break;

		case 3.1:
			card[i].mode_rot[premode][1] +=0;
			//card[i].mode_rot[2][1] +=0.01;
			var transtime_31 = 30; 
			var transcounter_31;
			if( transcounter < i*transtime/(card_num+transtime_31) )transcounter_31 = 0;
			else if(transcounter > i*transtime/(card_num + transtime_31) && transcounter < i*transtime/(card_num+transtime_31)+transtime_31)transcounter_31=transcounter - i*transtime/(card_num+transtime_31);
			else if(transcounter > i*transtime/(card_num + transtime_31)+transtime_31)transcounter_31=transtime_31;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[3][2]-card[i].mode_rot[premode][2]) * easeInOutExpo(transcounter_31/transtime_31);
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[3][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInOutExpo(transcounter_31/transtime_31);
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[3]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[3][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[3][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[3][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter_31/transtime_31);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 3;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 3.2:
			//card[i].mode_rot[premode][1] +=0.03;
			//card[i].mode_rot[3][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[3]) * transcounter/transtime;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[3][2]-card[i].mode_rot[premode][2]) * transcounter/transtime;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[3][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeInOutExpo(transcounter/transtime);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[3][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter/transtime);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[3][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter/transtime);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[3][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter/transtime);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 3;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 3:
			card[i].r = 0;
			card[i].card.rotation.z = 0;
			card[i].card.rotation.y = 0;
			card[i].card.position.set(card[i].mode_vec[3][0],card[i].mode_vec[3][1],card[i].mode_vec[3][2]);
			premode = 3; 
			break;

		case 4.1:
			//card[i].mode_rot[premode][1] +=0;
			card[i].card.rotation.y = 0;
			//card[i].mode_rot[2][1] +=0.01;
			var transtime_41 = 30; 
			var transcounter_41;
			if( transcounter < i*transtime/(card_num+transtime_41) )transcounter_41 = 0;
			else if(transcounter > i*transtime/(card_num + transtime_41) && transcounter < i*transtime/(card_num+transtime_41)+transtime_41)transcounter_41=transcounter - i*transtime/(card_num+transtime_41);
			else if(transcounter > i*transtime/(card_num + transtime_41)+transtime_41)transcounter_41=transtime_41;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[4][2]-card[i].mode_rot[premode][2]) * easeInOutExpo(transcounter_41/transtime_41);
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[4][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeOutExpo(transcounter_41/transtime_41);
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[4]) * easeInOutExpo(transcounter_41/transtime_41);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[4][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter_41/transtime_41);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[4][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter_41/transtime_41);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[4][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter_41/transtime_41);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 4;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 4.2:
			//card[i].mode_rot[premode][1] +=0.03;
			card[i].card.rotation.y = 0;
			//card[i].mode_rot[3][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[4][2]-card[i].mode_rot[premode][2]) * transcounter/transtime;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[4][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeOutExpo(transcounter/transtime);
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[4]) * transcounter/transtime;
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[4][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter/transtime);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[4][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter/transtime);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[4][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter/transtime);
			
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 4;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 4:
			card[i].r = card[i].mode_r[4];
			card[i].card.rotation.z = card[i].mode_rot[4][2];
			card[i].card.rotation.y = card[i].mode_rot[4][1];
			card[i].card.position.set(card[i].mode_vec[4][0],card[i].mode_vec[4][1],card[i].mode_vec[4][2]);
			premode = 4; 
			break;

		case 5.1:
			//card[i].mode_rot[premode][1] +=0;
			card[i].card.rotation.y = 0;
			//card[i].mode_rot[2][1] +=0.01;
			var transtime_31 = 30; 
			var transcounter_31;
			if( transcounter < i*transtime/(card_num+transtime_31) )transcounter_31 = 0;
			else if(transcounter > i*transtime/(card_num + transtime_31) && transcounter < i*transtime/(card_num+transtime_31)+transtime_31)transcounter_31=transcounter - i*transtime/(card_num+transtime_31);
			else if(transcounter > i*transtime/(card_num + transtime_31)+transtime_31)transcounter_31=transtime_31;
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[5][2]-card[i].mode_rot[premode][2]) * easeInOutExpo(transcounter_31/transtime_31);
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[5][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeOutExpo(transcounter_31/transtime_31);
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[5]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[5][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[5][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter_31/transtime_31);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[5][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter_31/transtime_31);
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 5;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 5.2:
			//card[i].mode_rot[premode][1] +=0.03;
			card[i].card.rotation.y = 0;
			//card[i].mode_rot[3][1] +=0.01;
			//card[i].mode_rot[premode][1] +=0.01;
			//card[i].mode_rot[2][1] +=0.01;
			card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[5]) * transcounter/transtime;
			//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
			card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[5][2]-card[i].mode_rot[premode][2]) * transcounter/transtime;
			card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[5][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeOutExpo(transcounter/transtime);
			var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[5][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(transcounter/transtime);
			var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[5][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(transcounter/transtime);
			var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[5][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(transcounter/transtime);
			
			card[i].card.position.set(card_x,card_y,card_z);
			if(i>=card_num)transcounter++;
			if(transcounter>transtime){
				transcounter=0;
				mode = 5;
			}
			card[0].mesh.scale.set(0.00000001,0.0000001,0.0000001);
			break;
		case 5:
			card[i].r = card[i].mode_r[5];
			card[i].card.rotation.z = 0;
			card[i].card.rotation.y = 0;
			card[i].card.position.set(card[i].mode_vec[5][0],card[i].mode_vec[5][1],card[i].mode_vec[5][2]);
			premode = 5; 
			break;

		default:
			break;
	}
}

function map_mode(){
	//map
	if(mode==4.1||mode==4.2)mapscale=easeOutExpo(transcounter/transtime);
	else if(mode==4)mapscale=1;
	else if(mode!=4&&premode==4&&transcounter>0&&transcounter<transtime)mapscale=1.00001-easeOutExpo(transcounter/transtime);
	else mapscale=0.0000001;
	for(j=1;j<=mapobj_num;j++)mapobj[j].mesh.scale.set(mapscale,mapscale,mapscale);
}

function card_select(){
	//focus--------------------------------------------------------------------------------------------------------------------------
	if(i==forcuscard_m||i==forcuscard_hr){
		card[i].frame_mesh.material.color.r = card[i].mesh.material.color.r =  225/225;
		card[i].frame_mesh.material.color.g = card[i].mesh.material.color.g = 172/225;
		card[i].frame_mesh.material.color.b = card[i].mesh.material.color.b = 28/225;
		//console.log(card[i].line_mesh);
		//card[i].img.scale.set(1,1,1);
	}else{
		card[i].frame_mesh.material.color.r = card[i].mesh.material.color.r = 0/225;
		card[i].frame_mesh.material.color.g = card[i].mesh.material.color.g = 225/225;
		card[i].frame_mesh.material.color.b = card[i].mesh.material.color.b = 225/225;
	}
	//select-------------------------------------------------------------------------------------------------------------------------
	if(i==selectcard){
		//card[i].mode_rot[premode][1] +=0.03;
		card[i].card.rotation.x = 0;
		card[i].card.rotation.y = 0;
		card[i].card.rotation.z = 0;
		card[i].r = card[i].mode_r[premode] - (card[i].mode_r[premode] - card[i].mode_r[6]) * selectcounter/transtime;
		//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
		card[i].card.rotation.z = card[i].mode_rot[premode][2] + (card[i].mode_rot[6][2]-card[i].mode_rot[premode][2]) * selectcounter/transtime;
		card[i].card.rotation.y = card[i].mode_rot[premode][1] + ((card[i].mode_rot[6][1]-card[i].mode_rot[premode][1] + Math.PI)%(2*Math.PI) - Math.PI) * easeOutExpo(selectcounter/transtime);
		var card_x = card[i].mode_vec[premode][0] + (card[i].mode_vec[6][0] - card[i].mode_vec[premode][0]) * easeInOutExpo(selectcounter/transtime);
		var card_z = card[i].mode_vec[premode][2] + (card[i].mode_vec[6][2] - card[i].mode_vec[premode][2]) * easeInOutExpo(selectcounter/transtime);
		var card_y = card[i].mode_vec[premode][1] + (card[i].mode_vec[6][1] - card[i].mode_vec[premode][1]) * easeInOutExpo(selectcounter/transtime);
		
		
		selectcounter++;
		if(selectcounter>transtime && selected == 0){selected = 1;selectcounter = 0;}
		if(selected == 1){
			if(selectcounter>0.3*transtime)selectcounter=0.3*transtime;
			card[i].r = card[i].mode_r[6];
			card[i].card.rotation.z = camera_angle_z;
			card[i].card.rotation.y = camera_angle_y;
			card_x = card[i].mode_vec[6][0];
			card_y = card[i].mode_vec[6][1];
				card_z = card[i].mode_vec[6][2];
				card[i].img.scale.set(1,1,1);
				card[i].info.scale.set(1,1,1);
				var scale = 1.0 - easeOutExpo(selectcounter/(transtime*0.3));
				card[i].mesh.scale.set(scale,scale,scale);
				//console.log(scale);
			}
		card[i].card.position.set(card_x,card_y,card_z);
	}
	if(i==pre_selectcard){
		//card[i].mode_rot[premode][1] +=0.03;
		card[i].card.rotation.y = 0;
		//card[i].mode_rot[3][1] +=0.01;
		//card[i].mode_rot[premode][1] +=0.01;
		//card[i].mode_rot[2][1] +=0.01;
		//camera_y = mode_camera[premode][1] - (mode_camera[premode][1] - mode_camera[4][1]) * easeInOutExpo(transcounter/transtime);
		card[i].r = card[i].mode_r[6] - (card[i].mode_r[6] - card[i].mode_r[Math.floor(mode)]) * pre_selectcounter/transtime;
		//card[i].card.rotation.x = card[i].mode_rot[premode][0] + (card[i].mode_rot[premode][0]-card[i].mode_rot[1][0]) * transcounter/transtime; 
		card[i].card.rotation.z = card[i].mode_rot[5][2] + (card[i].mode_rot[Math.floor(mode)][2]-card[i].mode_rot[6][2]) * pre_selectcounter/transtime;
		card[i].card.rotation.y = card[i].mode_rot[5][1] + ((card[i].mode_rot[Math.floor(mode)][1]-card[i].mode_rot[6][1] + Math.PI)%(2*Math.PI) - Math.PI) * /*easeOutExpo*/(pre_selectcounter/transtime);
		var card_x = card[i].mode_vec[6][0] + (card[i].mode_vec[Math.floor(mode)][0] - card[i].mode_vec[6][0]) * easeInOutExpo(pre_selectcounter/transtime);
		var card_z = card[i].mode_vec[6][2] + (card[i].mode_vec[Math.floor(mode)][2] - card[i].mode_vec[6][2]) * easeInOutExpo(pre_selectcounter/transtime);
		var card_y = card[i].mode_vec[6][1] + (card[i].mode_vec[Math.floor(mode)][1] - card[i].mode_vec[6][1]) * easeInOutExpo(pre_selectcounter/transtime);
		

		pre_selectcounter++;
		var scale = 1.0 * easeOutExpo(pre_selectcounter/transtime);
		card[i].img.scale.set(1-scale,1-scale,1-scale);
		card[i].info.scale.set(1-scale,1-scale,1-scale);
		if(pre_selectcounter>transtime){
			pre_selectcounter = 0;
			pre_selectcard = -1;
		}
			card[i].mesh.scale.set(scale,scale,scale);
		card[i].card.position.set(card_x,card_y,card_z);
	}
	if(i!=pre_selectcard && i!=selectcard){
		card[i].img.scale.set(0.00001,0.00001,0.00001);
		card[i].info.scale.set(0.00001,0.00001,0.00001);
		card[i].mesh.scale.set(1,1,1);
	}
}
		