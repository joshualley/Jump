
cc.Class({
    extends: cc.Component,

    properties: {
        player: {
        	type: cc.Node,
        	default: null,
        },

        block_prefab: {
        	default: [],
        	type: cc.Prefab,
        },

        block_root: {
        	default: null,
        	type: cc.Node,
        },

        left_org: cc.v2(0, 0),

        map_root: {
        	type: cc.Node,
        	default: null,
        },

		y_radio: 0.5560472,
		
		checkout: {
			type: cc.Node,
			default: null,
		},

    },

    
    // onLoad () {},

    start () {
    	var index = Math.floor(Math.random()*3);
    	this.cur_block = cc.instantiate(this.block_prefab[index]);
    	this.block_root.addChild(this.cur_block);
    	this.cur_block.setPosition(this.block_root.convertToNodeSpaceAR(this.left_org));
    	
    	var w_pos = this.cur_block.getChildByName("mid").convertToWorldSpaceAR(cc.v2(0, 0));
    	this.player.setPosition(this.map_root.convertToNodeSpaceAR(w_pos));
		//cc.log("位置：", this.player.getPosition()+"");
		this.player_component = this.player.getComponent("player");
		this.block_zorder = -1;
		this.add_block();
		
    },

    add_block(){
    	var index = Math.floor(Math.random()*3);
    	this.next_block = cc.instantiate(this.block_prefab[index]);
		this.block_root.addChild(this.next_block);
		this.next_block.zIndex = this.block_zorder;
		this.block_zorder --;

    	var x_distance = 200 + Math.random() * 200;
    	var y_distance = x_distance * this.y_radio;
    	var next_pos = this.cur_block.getPosition();
    	next_pos.x += (x_distance * this.player_component.direction);
    	next_pos.y += y_distance;
		this.next_block.setPosition(next_pos);
		//利用玩家组件的接口设置下一个方块
		this.player_component.set_next_block(this.next_block.getComponent("block"));

		this.cur_block = this.next_block;
		
		// 删除无用的block
		var children = this.block_root.children;
		if(children.length > 10){
			//for (var i=0; i<5; ++i){
			//	var child = children[i];
			//	this.block_root.removeChild(child);
			//}
		}
		// end
    },

    move_map(offset_x, offset_y) {
    	var m1 = cc.moveBy(0.5, offset_x, offset_y);
    	cc.log("offset:", offset_x+","+offset_y);
    	var end_func = cc.callFunc(function(){
    		this.add_block();
    	}.bind(this));
    	var seq = cc.sequence(m1, end_func);
    	this.map_root.runAction(seq);
	},
	
	on_checkout_game: function(){
		this.checkout.active = true;
    },

    on_game_again: function(){
        cc.director.loadScene("main_scene");
    },

    // update (dt) {},
});
