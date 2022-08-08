
class Grid {
    constructor() {
        this.grid = Array(HEIGHT).fill().map(() => Array(WIDTH).fill(null))
        this.#generateMine()
        this.minePosition = []
    }

    #generateMine() {
        let bag = Array(HEIGHT * WIDTH).fill().map((_, i) => i)

        for (let i = 0; i < MINESCNT; i++) {
            this.minePosition.push(...bag.splice(Math.floor(Math.random() * bag.length), 1))
        }
    }

    #getSurroundingMinesCnt(i, j) {
        // Get 8 surrounding Cell
        let checkingCell = [
            ((i - 1) * WIDTH) + j,
            ((i + 1) * WIDTH) + j,
        ]

        // Fill in make sure does not check if first column (since it will become the previous row last column)
        if (j % WIDTH !== 0) {
            checkingCell.push(
                ((i - 1) * WIDTH) + j - 1,
                (i * WIDTH) + j - 1,
                ((i + 1) * WIDTH) + j - 1,
            )
        }

        // Fill in make sure does not check if last column (since it will become the next row first column)
        if (j % WIDTH !== WIDTH - 1) {
            checkingCell.push(
                ((i - 1) * WIDTH) + j + 1,
                (i * WIDTH) + j + 1,
                ((i + 1) * WIDTH) + j + 1,
            )
        }

        return checkingCell.filter(v => v in this.minePosition).length
    }

    checkMine(i, j) {
        if (this.grid[i][j] !== null) return -1
        if ((i * WIDTH) + j in this.minePosition) {
            this.grid[i][j] = "b"
        } else {
            this.grid[i][j] = this.#getSurroundingMinesCnt(i, j)
        }
        return this.grid[i][j]
    }
}