export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public name: string;
    public status: string;
    public createdAt: Date;

    constructor() {
        for(let i = 1; i < 14; i++ ) {
            this.stack.push('spades_' + i)
            this.stack.push('hearts_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('clubs_' + i)
        }
        this.shuffle();

        this.name = "New Game"; // Default name, or could be parameterized
        this.status = "pending"; // Default status
        this.createdAt = new Date(); // Set current date as creation date
    }

    shuffle() {
        for (let i = this.stack.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }
}