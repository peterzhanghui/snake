class Snake{
    // 蛇的元素
    element: HTMLElement;
    bodies: HTMLCollection;
    head: HTMLElement;
    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }
    // 获取蛇头坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    // 设置蛇头坐标
    set X (value: number) {
        // 如果新值和旧值相同，则直接返回不再修改
        if(value === this.X){
            return;
        }
        // 限制蛇在墙内移动
        if (value <0 || value>290){
            throw new Error('蛇撞墙了，game over!')
        } 
        // 限制蛇不能掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            console.log('水平方向发生掉头');
            // 如果发生掉头不做处理
            if (value > this.X){
                // 如果新值大于旧值说明，在向右掉头，应该继续向左走
                value = this.X - 10
            } else{
                value = this.X + 10
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkBodyHead();

    }
    // 设置蛇头坐标
    set Y (value: number) {
        if(value === this.Y){
            return;
        }
        else if (value <0 || value>290){
            throw new Error('蛇撞墙了，game over!')
        }
        // 限制蛇不能掉头
        else if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            console.log('水平方向发生掉头');
            // 如果发生掉头不做处理
            if (value > this.Y){
                // 如果新值大于旧值说明，在向右掉头，应该继续向左走
                value = this.Y - 10
            } else{
                value = this.Y + 10
            }
        } 
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkBodyHead();

    }
    // 增加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend','<div></div>')
    }
    moveBody(){
        for(let i = this.bodies.length-1; i>0;i--){
            // huo
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkBodyHead(){
        for(let i = 1; i<this.bodies.length;i++){
            
            let bd = this.bodies[i] as HTMLElement;
            if (bd.offsetLeft === this.X && bd.offsetTop === this.Y){
                throw new Error('撞上了自己')
            }
        }
    }
}
export default Snake;