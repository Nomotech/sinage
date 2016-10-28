



var flag=0;
var output = document.getElementById('stage');
var frameString = "", handString = "", fingerString = "";
var hand, finger;
var options = { enableGestures: true };
// Main Leap Loop
// Leap.loop(options, function(frame) {
//   // ここで各フレームで認識した結果をハンドリングします．とりあえず先端位置座標を表示しましょう．
  
//   handalive =0;
//   for (var i = 0, len = frame.hands.length; i < len; i++) {
//     // 「手」単位の処理

//     var handtype;
//     if(frame.hands[i].type=="right"){handtype = 0;handalive+=1;}
//     else {handtype =1;handalive+=2;}
    
//     handobj[handtype].finger_counter = 0b100000;
//     hand = frame.hands[i];

//     //if(frame.hands[i].type=="right")handobj[i].type = 0;
//     //else handobj[i].type = 1;

//     // if(frame.hands[i].type=="right"){handobj[i].type = 0;righthand = i;}
//     // else if(frame.hands[i].type=="left"){handobj[i].type = 1;lefthand=i;}
//     handobj[handtype].grabradius = hand.sphereRadius;
//     if(handobj[handtype].grabradius<50)handobj[handtype].grabradius=50;
//     if(handobj[handtype].grabradius>80)handobj[handtype].grabradius=100;
//     handobj[handtype].grabradius = (handobj[handtype].grabradius-50)/30;
    
//     handobj[handtype].grab = hand.grabStrength;
//     handobj[handtype].pitch = hand.pitch();
//     handobj[handtype].roll = hand.roll();
//     handobj[handtype].yaw = hand.yaw();
//     handobj[handtype].direction = new THREE.Vector3(hand.direction[2],hand.direction[1],hand.direction[0]);
//     handobj[handtype].palmnormal =  new THREE.Vector3(hand.palmNormal[2],hand.palmNormal[1],hand.palmNormal[0]);
//     hand_posi[handtype] = new THREE.Vector3(hand.palmPosition[2],hand.palmPosition[1],hand.palmPosition[0]);

//     //for(j=0;j<5;j++)finger_pos[i][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//     for (var j = 0; j < hand.fingers.length; j++) {
//       // 「指」単位の処理
//       finger = hand.fingers[j];
      
//       var tip_vec =  new THREE.Vector3(finger.tipPosition[2] - hand.palmPosition[2],finger.tipPosition[1] - hand.palmPosition[1],finger.tipPosition[0] - hand.palmPosition[0]);
//       var dip_vec =  new THREE.Vector3(finger.dipPosition[2] - hand.palmPosition[2],finger.dipPosition[1] - hand.palmPosition[1],finger.dipPosition[0] - hand.palmPosition[0]);
//       var pip_vec =  new THREE.Vector3(finger.pipPosition[2] - hand.palmPosition[2],finger.pipPosition[1] - hand.palmPosition[1],finger.pipPosition[0] - hand.palmPosition[0]);
//       var mcp_vec =  new THREE.Vector3(finger.mcpPosition[2] - hand.palmPosition[2],finger.mcpPosition[1] - hand.palmPosition[1],finger.mcpPosition[0] - hand.palmPosition[0]);
//       finger_tip[handtype][finger.type] = new THREE.Vector3(hand_posi[handtype].x + tip_vec.x/2, hand_posi[handtype].y + tip_vec.y/2, hand_posi[handtype].z + tip_vec.z/2);
//       finger_dip[handtype][finger.type] = new THREE.Vector3(hand_posi[handtype].x + dip_vec.x/2, hand_posi[handtype].y + dip_vec.y/2, hand_posi[handtype].z + dip_vec.z/2);
//       finger_pip[handtype][finger.type] = new THREE.Vector3(hand_posi[handtype].x + pip_vec.x/2, hand_posi[handtype].y + pip_vec.y/2, hand_posi[handtype].z + pip_vec.z/2);
//       finger_mcp[handtype][finger.type] = new THREE.Vector3(hand_posi[handtype].x + mcp_vec.x/2, hand_posi[handtype].y + mcp_vec.y/2, hand_posi[handtype].z + mcp_vec.z/2);
      
//       if(finger.extended){
//         switch(finger.type){
//           case 0:handobj[handtype].finger_counter +=0b010000; break; 
//           case 1:handobj[handtype].finger_counter +=0b001000; break;
//           case 2:handobj[handtype].finger_counter +=0b000100; break;
//           case 3:handobj[handtype].finger_counter +=0b000010; break;
//           case 4:handobj[handtype].finger_counter +=0b000001; break;
//           default: break;
//         }
//       }
//     }
//     //console.log(finger_counter.toString(2));
//   }
  
//   if(handalive<1){//右手
//     hand_posi[0] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//     for (var j = 0; j < 5; j++) {
//       finger_tip[0][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_dip[0][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_pip[0][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_mcp[0][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);  
//     }
//   }
//   if(handalive<2){//左手
//     hand_posi[1] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//     for (var j = 0; j < 5; j++) {
//       finger_tip[1][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_dip[1][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_pip[1][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);
//       finger_mcp[1][j] = new THREE.Vector3(camera_x*2,camera_y*2,camera_z*2);  
//     }
//   }
//   //console.log(handobj[0].pitch);
//   zoom();
  

//   if(handobj[0].pre_finger_counter>0b101111 && handobj[0].finger_counter < 0b101111)select_action();
  
//   var dot = handobj[1].palmnormal.dot(new THREE.Vector3(0,1,0).normalize());//v_vecと射影ベクトルとの内積
//   handobj[1].palmangle_y = Math.acos(dot);//内積から角度を
//   var dot = handobj[1].palmnormal.dot(new THREE.Vector3(1,0,0).normalize());//v_vecと射影ベクトルとの内積
//   handobj[1].palmangle_x = Math.acos(dot);//内積から角度を
//   //console.log(palmangle);
//   if(user_menu_opened == false && forcuscard_hl == "user_menu")user_menu_open = true;
//   if(user_menu_opened == true  && (handobj[1].finger_counter&0b001111) <  0b000111 && forcuscard_hl != "user_menu")user_menu_open = false;

//   if(frame.gestures.length) {
//     for(var i=0, len=frame.gestures.length; i<len; i++){
//       //console.log(frame.gestures[i].type);
//       switch (frame.gestures[i].type) {
//         case "swipe":
//           if(selected==1 && frame.gestures[0].speed>300){release_action();console.log("release");}
//           else if(menu_opened == false && (finger.tipVelocity[0]<-700))menu_open = true;
//           else if(menu_opened == true  && (finger.tipVelocity[0]>700))menu_open = false;
          
//           //leap座標系　0...x 横 1...y 高さ 2...z 奥行
//           //console.log(frame.gestures[0].speed);
//           //console.log(finger.tipVelocity);
//           //motionObj.swipeAction(i,frame);
//           break;
//         case "circle":
         
//           break;
//         case "keyTap":
//           //click_action();
//           break;
//         case "screenTap":
//           //motionObj.screenTapAction(i,frame);
//           break;
//         default:
//           break;
//       }
//     }
//   }
//   //output.innerHTML = frameString;
//   //console.log(frameString);
//   for(i=0;i<hand_num;i++)handobj[i].pre_finger_counter = handobj[i].finger_counter;
  
// });

function hand_mode(r){
  var step = 360/user_menu_num; 
  var r2 = (Math.floor(r/step-0.5))%6 + 1;
  
  switch(r2){
    case 1: handmode = "Search";    user_menu_center_text.material.map = handmode_texture1; break;
    case 2: handmode = "Grab";      user_menu_center_text.material.map = handmode_texture2; break;  
    case 3: handmode = "Touch";     user_menu_center_text.material.map = handmode_texture3; break;
    case 4: handmode = "Zoom";      user_menu_center_text.material.map = handmode_texture4; break;
    case 5: handmode = "Pen";       user_menu_center_text.material.map = handmode_texture5; break;
    case 6: handmode = "Cursor";    user_menu_center_text.material.map = handmode_texture6; break;
    default: break;
  }
}

function cursor(){  
  // マウスベクトル
  var pos = cursor_vec[0];
  
  var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
  // 交差判定
  var obj = ray.intersectObjects(targetList);

  if (handmode == "Cursor"){
    //card[obj[0].object.name].card.scale.set(0.00000001,0.0000001,0.0000001);
    for(j=0;j<5;j++){
      handobj[0].finger_tip[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_dip[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_pip[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_mcp[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_bone1[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_bone2[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].finger_bone3[j].scale.set(0.00001,0.00001,0.00001);
      handobj[0].palm.scale.set(0.00001,0.00001,0.00001);
      handobj[0].cursor.scale.set(1,1,1);
    }
    handobj[0].cursor.material.color.r =  225/225;
    handobj[0].cursor.material.color.g =  36/225;
    handobj[0].cursor.material.color.b =  0/225;
    if (obj.length >0) forcuscard_hr = obj[0].object.name;
    //console.log(forcuscard);
  }
  else{
    for(j=0;j<5;j++){
      handobj[0].finger_tip[j].scale.set(1,1,1);
      handobj[0].finger_dip[j].scale.set(1,1,1);
      handobj[0].finger_pip[j].scale.set(1,1,1);
      handobj[0].finger_mcp[j].scale.set(1,1,1);
      handobj[0].finger_bone1[j].scale.set(1,1,1);
      handobj[0].finger_bone1[j].scale.set(1,1,1);
      handobj[0].finger_bone1[j].scale.set(1,1,1);
      handobj[0].palm.scale.set(1,1,1);
      handobj[0].cursor.scale.set(0.00001,0.00001,0.00001);
    }
    handobj[0].cursor.material.color.r =  225/225;
    handobj[0].cursor.material.color.g =  102/225;
    handobj[0].cursor.material.color.b =  0/225;
  } 
  if(obj.length==0)forcuscard_hr = -1;
}

function cursor_l(){  
  // マウスベクトル
  var pos = cursor_vec[1];
  var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
  var obj = ray.intersectObjects(targetList);

  if (obj.length >0) forcuscard_hl = obj[0].object.name; 
  if(obj.length==0)forcuscard_hl = -1;
}

function select_action(){
  if (forcuscard_hr>0 && forcuscard_hr<=card_num) {
    //console.log(obj[0].object.name);
    //card[obj[0].object.name].card.scale.set(0.00000001,0.0000001,0.0000001);
    //console.log(card[obj[0].object.name]);
    if(forcuscard_hr!=selectcard){
      selectcounter=0;
      pre_selectcard = selectcard;
      selected = 0;
    }
    selectcard = forcuscard_hr;
  }
  if (forcuscard_hr>0 && forcuscard_hr>=card_num) {
    //console.log(obj[0].object.name);
    //card[obj[0].object.name].card.scale.set(0.00000001,0.0000001,0.0000001);
    //console.log(card[obj[0].object.name]);
    if(forcuscard_hr!=selectmenu){
      pre_selectmenu = selectmenu;
    }
    selectmenu = forcuscard_hr;
  }
 
};
function release_action(){
  selectcounter=0;
  pre_selectcard = selectcard;
  selectcard = -1;
  selected = 0;
}

function zoom(){
  if(handmode == "Zoom"){
    zoom_center.scale.set(1,1,1);
    //if(handalive == 3 && (handobj[1].finger_counter&0b001111)<0b001111 && (handobj[0].finger_counter&0b001111)<0b001111){
    if(handalive == 3 && (handobj[0].pre_finger_counter&0b001111)<0b001111 && (handobj[0].finger_counter&0b001111)==0b001111){
    //if(handobj[0].pitch>0.8){
    //if(handalive==3 ){
      console.log("zoom");
      if(zoomed){
        zoom_start_position.copy(camera.position);
        zoom_set();
      }
    }
    if(handalive < 3 || (handobj[0].finger_counter&0b001111)<0b001111)zoomed = 1;
    if(zoomed==1){
      zoom_center.material.color.r =  20/225;
      zoom_center.material.color.g =  255/225;
      zoom_center.material.color.b =  60/225;
      zoom_center.position.set((cursor_vec[0].x+cursor_vec[1].x)/2,(cursor_vec[0].y+cursor_vec[1].y)/2,(cursor_vec[0].z+cursor_vec[1].z)/2);
    }
    if(zoomed==0){
      zoom_action();
      zoom_center.position.set(zoom_point.x,zoom_point.y,zoom_point.z);
      zoom_center.material.color.r =  225/225;
      zoom_center.material.color.g =  255/225;
      zoom_center.material.color.b =  60/225;
    }
  }
  else{
    zoom_center.scale.set(0.0001,0.0001,0.0001);
  }
}

function zoom_set(){
  zoom_righthand_pos = cursor_vec[0];
  zoom_lefthand_pos  = cursor_vec[1];
  var v = new THREE.Vector3();
  v.copy(zoom_righthand_pos);
  v.sub(zoom_lefthand_pos);
  zoom_length = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  //console.log(zoom_length);
  zoom_point.copy(zoom_righthand_pos);
  zoom_point.add(zoom_lefthand_pos);
  zoom_point.multiplyScalar(0.5);
  zoom_vec.copy(zoom_point);
  zoom_vec.sub(camera.position).normalize();
  zoomed = 0;
  zoom_old_length = zoom_length;
  //console.log(zoom_point)
}
function zoom_action(){
  
  var len = new THREE.Vector3();
  len.copy(cursor_vec[0]);
  len.sub(cursor_vec[1]);
  //var length = Math.sqrt(len.x*len.x + len.y*len.y + len.z*len.z)/2;

  var length = Math.sqrt(len.x*len.x + len.y*len.y + len.z*len.z);
  var scale = (zoom_length - length);
  var scale = (length - zoom_old_length);
  if(scale > 30 || scale < -30)scale = 0;
  //var scale = length - zoom_old_length;
  //console.log(scale);
  //camera_x = zoom_start_position.x - 10*vec.x * scale;
  //camera_y = zoom_start_position.y - 10*vec.y * scale;
  //camera_z = zoom_start_position.z - 10*vec.z * scale;
  camera_x += 10 * zoom_vec.x * scale;
  camera_y += 10 * zoom_vec.y * scale;
  camera_z += 10 * zoom_vec.z * scale;
  camera.position.set(camera_x,camera_y,camera_z);
  zoom_old_length = length;
}

function hand_draw(){
  for(i=0;i<hand_num;i++){
    //if(handobj[i].type==0)righthand=i;
    //else if(handobj[i].type==1)lefthand=i;
    hand_vec[i] = new THREE.Vector3(
      camera_x + 400 * (window_center.x + camera_vec.x*(hand_posi[i].x)/300 -(window_vec_x.x/2) *(hand_posi[i].z)/200 - window_vec_y.x/2 * (hand_posi[i].y-screen_height)/120),
      camera_y + 400 * (window_center.y + camera_vec.y*(hand_posi[i].x)/300 -(window_vec_x.y/2) *(hand_posi[i].z)/200 - window_vec_y.y/2 * (hand_posi[i].y-screen_height)/120),
      camera_z + 400 * (window_center.z + camera_vec.z*(hand_posi[i].x)/300 -(window_vec_x.z/2) *(hand_posi[i].z)/200 - window_vec_y.z/2 * (hand_posi[i].y-screen_height)/120)
    ); 
    handobj[i].palm.position.set(hand_vec[i].x,hand_vec[i].y,hand_vec[i].z);
    
    // hand_vec[i] = new THREE.Vector3(
    //  camera_x + 400 * (window_center.x + camera_vec.x*(hand_posi[i].x)/300 -(window_vec_x.x/2) *(hand_posi[i].z)/200 - window_vec_y.x/2 * (hand_posi[i].y-230)/120 + handobj[i].direction.x/2),
    //  camera_y + 400 * (window_center.y + camera_vec.y*(hand_posi[i].x)/300 -(window_vec_x.y/2) *(hand_posi[i].z)/200 - window_vec_y.y/2 * (hand_posi[i].y-230)/120 + handobj[i].direction.y/2),
    //  camera_z + 400 * (window_center.z + camera_vec.z*(hand_posi[i].x)/300 -(window_vec_x.z/2) *(hand_posi[i].z)/200 - window_vec_y.z/2 * (hand_posi[i].y-230)/120 - handobj[i].direction.z/2)
    // ); 
    handobj[i].cursor.position.set(hand_vec[i].x,hand_vec[i].y,hand_vec[i].z);
    cursor_vec[i] = hand_vec[i];
    for(j = 0;j<5;j++){
      tip_vec[i] = new THREE.Vector3(
        camera_x + 400 * (window_center.x + camera_vec.x*(finger_tip[i][j].x)/300 -(window_vec_x.x/2) *(finger_tip[i][j].z)/200 - window_vec_y.x/2 * (finger_tip[i][j].y-screen_height)/120),
        camera_y + 400 * (window_center.y + camera_vec.y*(finger_tip[i][j].x)/300 -(window_vec_x.y/2) *(finger_tip[i][j].z)/200 - window_vec_y.y/2 * (finger_tip[i][j].y-screen_height)/120),
        camera_z + 400 * (window_center.z + camera_vec.z*(finger_tip[i][j].x)/300 -(window_vec_x.z/2) *(finger_tip[i][j].z)/200 - window_vec_y.z/2 * (finger_tip[i][j].y-screen_height)/120)
      );
      handobj[i].finger_dip[j].position.set(tip_vec[i].x,tip_vec[i].y,tip_vec[i].z);
      dip_vec[i] = new THREE.Vector3(
        camera_x + 400 * (window_center.x + camera_vec.x*(finger_dip[i][j].x)/300 -(window_vec_x.x/2) *(finger_dip[i][j].z)/200 - window_vec_y.x/2 * (finger_dip[i][j].y-screen_height)/120),
        camera_y + 400 * (window_center.y + camera_vec.y*(finger_dip[i][j].x)/300 -(window_vec_x.y/2) *(finger_dip[i][j].z)/200 - window_vec_y.y/2 * (finger_dip[i][j].y-screen_height)/120),
        camera_z + 400 * (window_center.z + camera_vec.z*(finger_dip[i][j].x)/300 -(window_vec_x.z/2) *(finger_dip[i][j].z)/200 - window_vec_y.z/2 * (finger_dip[i][j].y-screen_height)/120)
      );
      handobj[i].finger_pip[j].position.set(dip_vec[i].x,dip_vec[i].y,dip_vec[i].z);
      pip_vec[i] = new THREE.Vector3(
        camera_x + 400 * (window_center.x + camera_vec.x*(finger_pip[i][j].x)/300 -(window_vec_x.x/2) *(finger_pip[i][j].z)/200 - window_vec_y.x/2 * (finger_pip[i][j].y-screen_height)/120),
        camera_y + 400 * (window_center.y + camera_vec.y*(finger_pip[i][j].x)/300 -(window_vec_x.y/2) *(finger_pip[i][j].z)/200 - window_vec_y.y/2 * (finger_pip[i][j].y-screen_height)/120),
        camera_z + 400 * (window_center.z + camera_vec.z*(finger_pip[i][j].x)/300 -(window_vec_x.z/2) *(finger_pip[i][j].z)/200 - window_vec_y.z/2 * (finger_pip[i][j].y-screen_height)/120)
      );
      handobj[i].finger_tip[j].position.set(pip_vec[i].x,pip_vec[i].y,pip_vec[i].z);
      mcp_vec[i] = new THREE.Vector3(
        camera_x + 400 * (window_center.x + camera_vec.x*(finger_mcp[i][j].x)/300 -(window_vec_x.x/2) *(finger_mcp[i][j].z)/200 - window_vec_y.x/2 * (finger_mcp[i][j].y-screen_height)/120),
        camera_y + 400 * (window_center.y + camera_vec.y*(finger_mcp[i][j].x)/300 -(window_vec_x.y/2) *(finger_mcp[i][j].z)/200 - window_vec_y.y/2 * (finger_mcp[i][j].y-screen_height)/120),
        camera_z + 400 * (window_center.z + camera_vec.z*(finger_mcp[i][j].x)/300 -(window_vec_x.z/2) *(finger_mcp[i][j].z)/200 - window_vec_y.z/2 * (finger_mcp[i][j].y-screen_height)/120)
      );
      handobj[i].finger_mcp[j].position.set(mcp_vec[i].x,mcp_vec[i].y,mcp_vec[i].z);
    
      //handobj[i].finger_bone1[j].position.set((tip_vec[i].x+dip_vec[i].x)/2,(tip_vec[i].y+dip_vec[i].y)/2,(tip_vec[i].z+dip_vec[i].z)/2);
      //handobj[i].finger_bone2[j].position.set((dip_vec[i].x+pip_vec[i].x)/2,(dip_vec[i].y+pip_vec[i].y)/2,(dip_vec[i].z+pip_vec[i].z)/2);
      //handobj[i].finger_bone3[j].position.set((pip_vec[i].x+mcp_vec[i].x)/2,(pip_vec[i].y+mcp_vec[i].y)/2,(pip_vec[i].z+mcp_vec[i].z)/2);
    }
  }
}

