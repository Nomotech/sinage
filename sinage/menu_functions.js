function menu_set(){
	for(i=0;i<=menu_num;i++){
		if(menu_open==true && menu_opened == false){
			if(i == menu_num && menucounter < menucounter_limit)menucounter++;
			if(menucounter >= menucounter_limit){
				menu_opened = true;
				menucounter = menucounter_limit;
			}
		}
		else if(menu_open==false && menu_opened == true){
			if(i == menu_num && menucounter > menucounter_limit/2)menucounter-=10;
			else if(i == menu_num && menucounter > 0)menucounter-=1;
			if(menucounter <=0){
				menu_opened = false;
				menucounter = 0;
			}
		}
		if( menucounter < i*menucounter_limit /(menu_num+opentime) )																		opencounter = 0;
		else if(menucounter > i*menucounter_limit/(menu_num + opentime) && menucounter < i*menucounter_limit/(menu_num+opentime)+opentime)	opencounter=menucounter - i*menucounter_limit/(menu_num+opentime);
		else if(menucounter > i*menucounter_limit/(menu_num + opentime)+opentime)															opencounter=opentime;
		//console.log(menucounter + " " + menucounter_limit);
		//console.log(menu_open + " " + menu_opened);

	    
		menu[i].obj.rotation.z = camera_angle_z;
		menu[i].obj.rotation.y = camera_angle_y;
		menu[i].obj.position.set(camera.position.x + window_r_top.x*600 + (menu_height * 2)*(i)*window_vec_y.x + window_vec_x.x *(menu_width *1.5 * easeOutElastic(opencounter/opentime)-menu_width) ,
								 camera.position.y + window_r_top.y*600 + (menu_height * 2)*(i)*window_vec_y.y + window_vec_x.y *(menu_width *1.5 * easeOutElastic(opencounter/opentime)-menu_width) ,
								 camera.position.z + window_r_top.z*600 + (menu_height * 2)*(i)*window_vec_y.z + window_vec_x.z *(menu_width *1.5 * easeOutElastic(opencounter/opentime)-menu_width)
		);
		
		
		//focus--------------------------------------------------------------------------------------------------------------------------
		if(i+card_num+1==forcuscard_m||i+card_num+1==forcuscard_hr){
			menu[i].frame_mesh.material.color.r = menu[i].mesh.material.color.r =  225/225;
			menu[i].frame_mesh.material.color.g = menu[i].mesh.material.color.g = 172/225;
			menu[i].frame_mesh.material.color.b = menu[i].mesh.material.color.b = 28/225;
			//console.log(card[i].line_mesh);
			//card[i].img.scale.set(1,1,1);
			menu[i].obj.position.set(camera.position.x + window_r_top.x*600 + (menu_height * 2)*(i)*window_vec_y.x + window_vec_x.x *(menu_width *1.55 * easeOutElastic(opencounter/opentime)-menu_width) ,
								 	 camera.position.y + window_r_top.y*600 + (menu_height * 2)*(i)*window_vec_y.y + window_vec_x.y *(menu_width *1.55 * easeOutElastic(opencounter/opentime)-menu_width) ,
								 	 camera.position.z + window_r_top.z*600 + (menu_height * 2)*(i)*window_vec_y.z + window_vec_x.z *(menu_width *1.55 * easeOutElastic(opencounter/opentime)-menu_width)
			);
		}else{
			menu[i].frame_mesh.material.color.r = menu[i].mesh.material.color.r = 0/225;
			menu[i].frame_mesh.material.color.g = menu[i].mesh.material.color.g = 225/225;
			menu[i].frame_mesh.material.color.b = menu[i].mesh.material.color.b = 225/225;
		}
		if(i==0){
			menu[i].obj.position.set(camera.position.x + window_r_top.x*600 + (menu_height * 2)*(3)*window_vec_y.x + window_vec_x.x *(menu_width *1.1 * easeInExpo(1-opencounter/opentime)-menu_width) ,
									 camera.position.y + window_r_top.y*600 + (menu_height * 2)*(3)*window_vec_y.y + window_vec_x.y *(menu_width *1.1 * easeInExpo(1-opencounter/opentime)-menu_width) ,
									 camera.position.z + window_r_top.z*600 + (menu_height * 2)*(3)*window_vec_y.z + window_vec_x.z *(menu_width *1.1 * easeInExpo(1-opencounter/opentime)-menu_width)
			);
		}		
	}
}

function user_menu_set(){
	for(i=1;i<=user_menu_num;i++){
		//user_menu[i].pos.scale.set(1,easeInExpo(user_menucounter/user_menucounter_limit),easeInExpo(user_menucounter/user_menucounter_limit));
		user_menu[i].pos.scale.set(1,easeOutExpo(user_menucounter/user_menucounter_limit),easeOutExpo(user_menucounter/user_menucounter_limit));
		var step =  360/user_menu_num ;
		var theta = 3*(handobj[1].yaw) * 180/Math.PI + 5*360;
		var d_theta = 0;
		if(handobj[1].palmangle_x>2 && user_menu_opened == true && handobj[1].grabradius>0.9) d_theta = theta - theta_pre;
		theta_now += d_theta;
		theta_pre = theta;
		//user_menu[i].pos.scale.set(1,easeOutExpo(handobj[1].grabradius),easeOutExpo(handobj[1].grabradius));
		
		user_menu[i].pos.rotation.x = (i * step  - Math.floor(theta_now/step)*step - step*easeInOutQuint((theta_now%step)/step)) * Math.PI /180;
		if(user_menu_open == false)user_menu[i].pos.rotation.x = (i * step  - Math.floor(theta_now/step+0.5)*step  )* Math.PI /180;

		//focus--------------------------------------------------------------------------------------------------------------------------
		if(i+card_num+menu_num+1==forcuscard_m||i+card_num+menu_num+1==forcuscard_hr){
			user_menu[i].frame_mesh.material.color.r = user_menu[i].mesh.material.color.r =  225/225;
			user_menu[i].frame_mesh.material.color.g = user_menu[i].mesh.material.color.g = 172/225;
			user_menu[i].frame_mesh.material.color.b = user_menu[i].mesh.material.color.b = 28/225;
			//console.log(card[i].line_mesh);
			//card[i].img.scale.set(1,1,1);
		}else{
			user_menu[i].frame_mesh.material.color.r = user_menu[i].mesh.material.color.r = 0/225;
			user_menu[i].frame_mesh.material.color.g = user_menu[i].mesh.material.color.g = 225/225;
			user_menu[i].frame_mesh.material.color.b = user_menu[i].mesh.material.color.b = 225/225;
		}		


		if(user_menu_open==true && user_menu_opened == false){
			if(i == user_menu_num && user_menucounter < user_menucounter_limit)user_menucounter++;
			if(user_menucounter >= user_menucounter_limit){
				user_menu_opened = true;
				user_menucounter = user_menucounter_limit;
			}
		}
		else if(user_menu_open==false && user_menu_opened == true){
			if(i == user_menu_num && user_menucounter > 0)user_menucounter-=1;
			if(user_menucounter <=0){
				user_menu_opened = false;
				user_menucounter = 0;
			}
		}
		if( user_menucounter < i*user_menucounter_limit /(user_menu_num+user_opentime) )																								user_opencounter = 0;
		else if(user_menucounter > i*user_menucounter_limit/(user_menu_num + user_opentime) && user_menucounter < i*user_menucounter_limit/(user_menu_num+user_opentime)+user_opentime)	user_opencounter=user_menucounter - i*user_menucounter_limit/(user_menu_num+user_opentime);
		else if(user_menucounter > i*user_menucounter_limit/(user_menu_num + user_opentime)+user_opentime)																				user_opencounter=user_opentime;
	}
	
	user_menu_pos.position.set(	camera.position.x + (window_l_bottom.x*600 - window_vec_x_n.x * 52 - window_vec_y_n.x * 52),
						 		camera.position.y + (window_l_bottom.y*600 - window_vec_x_n.y * 52 - window_vec_y_n.y * 52),
						 		camera.position.z + (window_l_bottom.z*600 - window_vec_x_n.z * 52 - window_vec_y_n.z * 52)
	);
	user_menu_pos.rotation.z = camera_angle_z;
	user_menu_pos.rotation.y = camera_angle_y;
	user_menu_select.position.set(	camera.position.x + (window_l_bottom.x*600 - window_vec_x_n.x * 52 - window_vec_y_n.x * 52),
							 		camera.position.y + (window_l_bottom.y*600 - window_vec_x_n.y * 52 - window_vec_y_n.y * 52),
							 		camera.position.z + (window_l_bottom.z*600 - window_vec_x_n.z * 52 - window_vec_y_n.z * 52)
	);
	//user_menu_select.scale.set(1,easeOutExpo(handobj[1].grabradius),easeOutExpo(handobj[1].grabradius));
	user_menu_select.scale.set(1,easeOutExpo(user_menucounter/user_menucounter_limit),easeOutExpo(user_menucounter/user_menucounter_limit));
	user_menu_select.rotation.z = camera_angle_z;
	user_menu_select.rotation.y = camera_angle_y;
	user_menu_center.position.set(	camera.position.x + (window_l_bottom.x*600 - window_vec_x_n.x * 52 - window_vec_y_n.x * 52),
							 		camera.position.y + (window_l_bottom.y*600 - window_vec_x_n.y * 52 - window_vec_y_n.y * 52),
							 		camera.position.z + (window_l_bottom.z*600 - window_vec_x_n.z * 52 - window_vec_y_n.z * 52)
	);
	user_menu_center.rotation.z = camera_angle_z;
	user_menu_center.rotation.y = camera_angle_y;


	// var vec = new THREE.Vector3(handobj[1].direction.x,handobj[1].direction.y,-handobj[1].direction.z).normalize();
	// var dir = new THREE.Vector3();
	// dir.crossVectors(vec, new THREE.Vector3(-1,0,0)).normalize();
	// var dot = vec.dot(new THREE.Vector3(-1,0,0));
	// var rad =/* 90 * Math.PI / 180*/ -1 *Math.acos(dot)%Math.PI;//内積から角度を
	// var q = new THREE.Quaternion();
	// q.setFromAxisAngle(dir,rad);
	// user_menu_pos.rotation.setFromQuaternion(q);
}

function menu_select(){
	switch(selectmenu){
		case card_num + 1: key[48] = key[49] = key[50] = key[51] = key[52] = 0; menu_opened = false;menu_open=true; break;
		case card_num + 2: key[49] = 1; key[48] = key[50] = key[51] = key[52] = 0; break;
		case card_num + 3: key[50] = 1; key[48] = key[49] = key[51] = key[52] = 0; break;
		case card_num + 4: key[51] = 1; key[48] = key[49] = key[50] = key[52] = 0; break;
		case card_num + 5: key[52] = 1; key[48] = key[49] = key[50] = key[51] = 0; break;
		case card_num + 6: key[48] = 1; key[49] = key[50] = key[51] = key[52] = 0; break;
		case card_num + 7: menu_opened = true;menu_open = false;selectmenu=-1;
		default: key[48] = key[49] = key[50] = key[51] = key[52] = 0; break;
	}
}
