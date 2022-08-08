class Player {
    constructor(grid) {
        this.brain = new NeuralNetwork(
            [HEIGHT * WIDTH, HEIGHT * WIDTH, 2]
        )
        this.lose = false
        this.grid = grid.grid
        this.score = 0
    }
    update() {
        if (this.lose) return
        const outputs = NeuralNetwork.feedForward(grid.flat(), this.brain)
        let value = this.grid.checkMine(outputs[0], outputs[1])

        console.table(this.grid)

        switch (value) {
            case 'b':
                this.lose = true
                break;
            case -1:
                break;
            default:
                this.score++
        }
    }
}
