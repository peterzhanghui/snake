import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'
class GameContral{
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;
    constructor(){
        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel(10,2);
        this.init()
    }
    init(){
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run()
    }
    /*
        Chrome       IE
        ArrowUp      Up
        ArrowDown    Down
        ArrowLeft    Left
        ArrowRight   Right
    */
    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }
    // 蛇移动的方法
    run(){
        // 获取蛇的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键方向计算移动
        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;

        }
        this.checkedFood(X,Y)
        try {
            this.snake.X = X;
            this.snake.Y = Y;
            
        } catch (error) {
            // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert(error.message + ' GAME OVER!');
            // 将isLive设置为false
            this.isLive = false;
            
        }
        // 开启一个定时器

        this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30)
    }
    // 验证有没有吃到食物
    checkedFood(X: number, Y:number){
        if (X === this.food.x && Y === this.food.y){
            console.log('吃到食物了');
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        } 
    }

}
export default GameContral