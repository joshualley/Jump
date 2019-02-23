
var game_scene = require("game_scene");
cc.Class({
    extends: cc.Component,

    properties: {
       init_speed: 150,
       a_power: 600,
       y_radio: 0.5560472,
       game_manager: {
        type: game_scene,
        default: null,
       }
    },


    set_next_block(block){
        this.next_block = block;
    },

    player_jump() {
        var x_distance = this.x_distance * this.direction;
        var y_distance = this.x_distance * this.y_radio;
        var target_pos = this.node.getPosition();
        target_pos.x += x_distance;
        target_pos.y += y_distance;

        this.rotate_node.runAction(cc.rotateBy(0.5, 360));
        //cc.log("位置：", target_pos+"");
        var w_pos = this.node.parent.convertToWorldSpaceAR(target_pos);
        if(this.next_block.is_jump_on_block(w_pos, this.direction)){
            target_pos = this.node.parent.convertToNodeSpaceAR(w_pos);//target_pos变成了参考点位置
        }else{
            //游戏结束
            this.is_game_over = true;
        }


        var j = cc.jumpTo(0.5, target_pos, 200, 1);

        
        //cc.log("w_pos.x:", w_pos.x);
        this.direction = (Math.random() < 0.5) ? 1 : -1;
        var end_func = cc.callFunc(function(){
            if(this.is_game_over){
                this.game_manager.on_checkout_game();
            }else{
                var init_x = (this.direction === 1) ? 180 : 580;
                this.game_manager.move_map(init_x-w_pos.x, -y_distance);
            }
            
        }.bind(this));
        
        var seq = cc.sequence(j, end_func);
        this.node.runAction(seq);

    },

    

    onLoad(){
        this.next_block = null;
        this.direction = 1; //1方向向右，-1方向向左
    },

    start () {
        this.is_game_over = false;

        this.rotate_node = this.node.getChildByName("rotate");
        this.anim_node = this.rotate_node.getChildByName("anim");

        this.isPowerMode = false;
        this.speed = 0;
        this.x_distance = 0;

        this.anim_node.on(
            cc.Node.EventType.TOUCH_START,
            function(e){
                this.isPowerMode = true;
                this.x_distance = 0;
                this.speed = this.init_speed;

                this.anim_node.stopAllActions();
                this.anim_node.runAction(cc.scaleTo(2, 1, 0.5));

            }.bind(this), this);

        this.anim_node.on(
            cc.Node.EventType.TOUCH_END,
            function(e){
                this.isPowerMode = false;
                this.anim_node.stopAllActions();
                this.anim_node.runAction(cc.scaleTo(0.5, 1, 1));

                this.player_jump();
            }.bind(this), this);

        this.anim_node.on(
            cc.Node.EventType.TOUCH_CANCEL,
            function(e){
                this.isPowerMode = false;

            }.bind(this), this);
    },

    
   update (dt) {
        if(this.isPowerMode){
            this.speed += (this.a_power * dt);
            this.x_distance += (this.speed * dt);
        }
   },
});
