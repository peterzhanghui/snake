// 计分牌的类
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number; 
    levelScore: number;
    constructor(maxLevel: number = 10,levelScore: number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.levelScore = levelScore;
    }
    // 加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        if (this.score % this.levelScore === 0){
            this.addLevel()
        }
    }
    addLevel() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        } 
        
    }
}
export default ScorePanel