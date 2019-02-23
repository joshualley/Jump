
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

   
    start () {
        this.mid = this.node.getChildByName("mid");
        this.up = this.node.getChildByName("up");
        this.left = this.node.getChildByName("left");
        this.down = this.node.getChildByName("down");
        this.right = this.node.getChildByName("right");

    },

    is_jump_on_block(w_dst_pos, dir){
        //dir = 1 右边跳, dir = -1 左边跳
        var mid_pos = this.mid.convertToWorldSpaceAR(cc.v2(0,0));
        var mdir = w_dst_pos.sub(mid_pos);
        var min_len = mdir.mag();
        var min_pos = mid_pos;
        if (dir === 1){
            var up_pos = this.up.convertToWorldSpaceAR(cc.v2(0,0));
            mdir = w_dst_pos.sub(up_pos);
            var len = mdir.mag();
            if(min_len > len){
                min_len = len;
                min_pos = up_pos;
            }

            var down_pos = this.down.convertToWorldSpaceAR(cc.v2(0,0));
            mdir = w_dst_pos.sub(down_pos);
            var len = mdir.mag();
            if(min_len > len){
                min_len = len;
                min_pos = down_pos;
            }
        }else{
            var left_pos = this.left.convertToWorldSpaceAR(cc.v2(0,0));
            mdir = w_dst_pos.sub(left_pos);
            var len = mdir.mag();
            if(min_len > len){
                min_len = len;
                min_pos = left_pos;
            }

            var right_pos = this.right.convertToWorldSpaceAR(cc.v2(0,0));
            mdir = w_dst_pos.sub(right_pos);
            var len = mdir.mag();
            if(min_len > len){
                min_len = len;
                min_pos = right_pos;
            }
        }

        mdir = w_dst_pos.sub(min_pos);
        if(mdir.mag() < 100){
            //距离参考点的距离为100内时，此次跳跃有效
            w_dst_pos.x = min_pos.x;
            w_dst_pos.y = min_pos.y;
            return true;
        }else{
            return false;
        }
        
        

    },

    // update (dt) {},
});
