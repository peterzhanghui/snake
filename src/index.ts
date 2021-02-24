import './style/index.less';
class Food{
    // 定义一个属性，表示食物所对应的方法
    element: HTMLElement;
    constructor(){
        // 获取页面中food元素应将其赋值给element
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取食物x轴坐标的方法
    get x(){
        return this.element.offsetLeft;
    }
    // 定义一个获取食物y轴坐标的方法

    get y(){
        return this.element.offsetTop;
    }
    // 修改食物位置
    change(){
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
const food = new Food();
console.log(food.x, food.y);

food.change()