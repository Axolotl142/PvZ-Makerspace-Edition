namespace SpriteKind {
    export const Plants = SpriteKind.create()
    export const pea = SpriteKind.create()
    export const shooter = SpriteKind.create()
    export const wall = SpriteKind.create()
    export const soon = SpriteKind.create()
    export const player2 = SpriteKind.create()
    export const Pult = SpriteKind.create()
    export const MelonProjectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.wall, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -0.05
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
        sprite.setVelocity(-3, 0)
    }
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile6`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.MelonProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.spray, 100)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -3
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value == 0) {
        sprites.destroy(otherSprite)
        kill += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.soon, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        sprites.destroy(otherSprite, effects.warmRadial, 100)
        info.changeScoreBy(25)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game2 == 1 || game2 == 2) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), assets.tile`myTile5`)) {
            if (info.score() >= 100) {
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . f f f f f f . . . . . . 1 
                    . . f 7 7 7 7 7 7 f . . . . . . 
                    . f 7 7 f 1 7 1 f 7 f . . . . . 
                    . f 7 7 f f 7 f f 7 f . . . . . 
                    . f 7 7 f f 7 f 7 f f f . . . . 
                    . f 6 7 7 7 7 7 f 7 7 7 f . . . 
                    . . f 6 7 7 7 7 f 7 f 7 f . . . 
                    . . f f 6 6 6 6 f 6 7 7 f . . . 
                    . . . f f f f f . f f f . . . . 
                    1 . . . f 7 f . . . . . . . . 1 
                    1 . . . f 7 f . . . . . . . . 1 
                    1 . f f 7 7 f f . . . . . . . 1 
                    1 1 1 1 7 f 7 7 f . . . 1 1 1 1 
                    `)
                Peashooter += 1
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), sprites.castle.tileGrass1)) {
            if (Peashooter >= 1) {
                mySprite2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f f f f f f . . . . . . . 
                    . . f 7 7 7 7 7 7 f . . . . . . 
                    . f 7 7 f 1 7 1 f 7 f . . . . . 
                    . f 7 7 f f 7 f f 7 f . . . . . 
                    . f 7 7 f f 7 f 7 f f f . . . . 
                    . f 6 7 7 7 7 7 f 7 7 7 f . . . 
                    . . f 6 7 7 7 7 f 7 f 7 f . . . 
                    . . f f 6 6 6 6 f 6 7 7 f . . . 
                    . . . f f f f f . f f f . . . . 
                    . . . . f 7 f . . . . . . . . . 
                    . . . . f 7 f . . . . . . . . . 
                    . . . f 7 7 f f . . . . . . . . 
                    . . f 7 7 f 7 7 f . . . . . . . 
                    `, SpriteKind.shooter)
                mySprite2.setPosition(mySprite.x, mySprite.y)
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    `)
                statusbar = statusbars.create(20, 4, StatusBarKind.Health)
                statusbar.max = 4
                statusbar.attachToSprite(mySprite2)
                statusbar.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-100)
                Peashooter = 0
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), assets.tile`myTile7`)) {
            if (info.score() >= 50) {
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . f f . . f f . . . 1 
                    1 . . . . f f 5 f f 5 5 f f f 1 
                    1 . . f f f 5 5 f 5 5 5 f 5 f 1 
                    . . . f 5 5 f f f f f f 5 5 5 f 
                    . . . f 5 f e e 1 e e 1 e f f 5 
                    . . f 5 f e e e f e e f e e f 5 
                    . . f f e e e f e e e e f e e f 
                    . . f 5 f e e e f f f f e e f 5 
                    . . f f f f e e e e e e e f 5 5 
                    . . . . f 5 f f f f f f f 5 f f 
                    . . . . f f f f 5 f 5 5 f f f . 
                    1 . . . . f 6 f f 7 f f f f . 1 
                    1 . . . f 6 f f 7 7 7 f f 6 f 1 
                    1 . . f 6 f 7 7 7 f 7 7 7 f 6 1 
                    1 1 1 1 f f f f f f f f 1 1 1 1 
                    `)
                Sunflower += 1
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), sprites.castle.tileGrass1)) {
            if (Sunflower >= 1) {
                mySprite2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f . . f f . . . . 
                    . . . . . f f 5 f f 5 5 f f f . 
                    . . . f f f 5 5 f 5 5 5 f 5 f . 
                    . . . f 5 5 f f f f f f 5 5 5 f 
                    . . . f 5 f e e 1 e e 1 e f f 5 
                    . . f 5 f e e e f e e f e e f 5 
                    . . f f e e e f e e e e f e e f 
                    . . f 5 f e e e f f f f e e f 5 
                    . . f f f f e e e e e e e f 5 5 
                    . . . . f 5 f f f f f f f 5 f f 
                    . . . . f f f f 5 f 5 5 f f f . 
                    . . . . . f 6 f f 7 f f f f . . 
                    . . . . f 6 f f 7 7 7 f f 6 f . 
                    . . . f 6 f 7 7 7 f 7 7 7 f 6 f 
                    . . . f f f f f f f f f f f f f 
                    `, SpriteKind.Plants)
                mySprite2.setPosition(mySprite.x, mySprite.y)
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    `)
                statusbar = statusbars.create(20, 4, StatusBarKind.Health)
                statusbar.max = 4
                statusbar.attachToSprite(mySprite2)
                statusbar.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-50)
                Sunflower = 0
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), assets.tile`myTile8`)) {
            if (info.score() >= 50) {
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . f f f f f f f f f . . . . 1 
                    1 f e f d 4 e e e e e f . . . 1 
                    1 e f d e e e e e e e e f . . 1 
                    e e f d e e e e e e e e f . . . 
                    e f d 4 e e e e e e e e e f . . 
                    e f 4 e e e 1 f e 1 f e e f . . 
                    e f e e e e f f e f f e e f . . 
                    e f e e e e e e e e e e e f . . 
                    e f e e e e e e f e e e e f . . 
                    e f e e e e e e e e e e e f . . 
                    e f e e e e e e e e e e e f . . 
                    1 e f e e e e e e e e e f . . 1 
                    1 e f e e e e e e e e e f . . 1 
                    1 f e f e e e e e e e f . . . 1 
                    1 1 1 1 f f f f f f f . 1 1 1 1 
                    `)
                Wallnut += 1
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), sprites.castle.tileGrass1)) {
            if (Wallnut >= 1) {
                mySprite2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . f f f f f f f f f . . . . . 
                    . f e f d 4 e e e e e f . . . . 
                    f e f d e e e e e e e e f . . . 
                    e e f d e e e e e e e e f . . . 
                    e f d 4 e e e e e e e e e f . . 
                    e f 4 e e e 1 f e 1 f e e f . . 
                    e f e e e e f f e f f e e f . . 
                    e f e e e e e e e e e e e f . . 
                    e f e e e e e e f e e e e f . . 
                    e f e e e e e e e e e e e f . . 
                    e f e e e e e e e e e e e f . . 
                    e e f e e e e e e e e e f . . . 
                    f e f e e e e e e e e e f . . . 
                    . f e f e e e e e e e f . . . . 
                    . . f f f f f f f f f . 1 . . . 
                    `, SpriteKind.wall)
                mySprite2.setPosition(mySprite.x, mySprite.y)
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    `)
                statusbar = statusbars.create(20, 4, StatusBarKind.Health)
                statusbar.max = 18
                statusbar.attachToSprite(mySprite2)
                statusbar.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-50)
                Wallnut = 0
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), assets.tile`kabbagePult`)) {
            if (info.score() >= 125) {
                mySprite.setImage(img`
                    1 1 1 1 f f . . . . . . 1 1 1 1 
                    1 7 7 7 7 7 f . . . . . . . . 1 
                    1 7 6 6 6 6 7 f . . . . . . . 1 
                    1 f 7 6 6 6 f . . . . . . . . 1 
                    . . f f 7 f f . . . . . . . . . 
                    . . . . f 7 f . . . . . . . . . 
                    . . . . f f f f f f f f f . . . 
                    . . . f 7 6 7 7 7 7 7 6 6 f . . 
                    . . f 7 7 7 6 7 6 6 6 7 7 7 f . 
                    . . f 6 6 6 6 6 7 7 7 6 6 6 f . 
                    . . f 7 7 7 6 7 1 f 6 1 f 7 f . 
                    . . f 6 6 6 6 6 f f 7 f f 6 f . 
                    1 . f 7 7 7 6 7 7 7 6 6 7 7 f 1 
                    1 . . f 6 6 7 6 6 6 7 7 7 f . 1 
                    1 . . . f f f f f f f f f . . 1 
                    1 1 1 1 6 7 7 f . f 6 7 1 1 1 1 
                    `)
                MelonPult += 1
            }
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(grid.spriteCol(mySprite), grid.spriteRow(mySprite)), assets.tile`myTile3`)) {
            if (MelonPult >= 1) {
                mySprite2 = sprites.create(img`
                    . f f f f f . . . . . . . . . . 
                    f 7 7 7 7 7 f . . . . . . . . . 
                    f 7 6 6 6 6 7 f . . . . . . . . 
                    f f 7 6 6 6 f . . . . . . . . . 
                    . . f f 7 f f . . . . . . . . . 
                    . . . . f 7 f . . . . . . . . . 
                    . . . . f f f f f f f f f . . . 
                    . . . f 7 6 7 7 7 7 7 6 6 f . . 
                    . . f 7 7 7 6 7 6 6 6 7 7 7 f . 
                    . . f 6 6 6 6 6 7 7 7 6 6 6 f . 
                    . . f 7 7 7 6 7 1 f 6 1 f 7 f . 
                    . . f 6 6 6 6 6 f f 7 f f 6 f . 
                    . . f 7 7 7 6 7 7 7 6 6 7 7 f . 
                    . . . f 6 6 7 6 6 6 7 7 7 f . . 
                    . . . . f f f f f f f f f . . . 
                    . . . f 6 7 7 f . f 6 7 6 f . . 
                    `, SpriteKind.Pult)
                mySprite2.setPosition(mySprite.x, mySprite.y)
                mySprite.setImage(img`
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    . . . . . . . 1 . . . . . . . . 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 . . . . . . . . . . . . . . 1 
                    1 1 1 1 . . . . . . . . 1 1 1 1 
                    `)
                statusbar = statusbars.create(20, 4, StatusBarKind.Health)
                statusbar.max = 4
                statusbar.attachToSprite(mySprite2)
                statusbar.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-125)
                MelonPult = 0
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Plants, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -0.05
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
        sprite.setVelocity(-3, 0)
        sprites.destroy(otherSprite)
    }
})
info.onCountdownEnd(function () {
    let m = 0
    if (m != 1 && game2 == 1) {
        wave = 1
    } else if (m != 1 && game2 == 2) {
        wave = 2
    } else {
        P2 = 1
    }
})
function wave1 () {
    mySprite5 = sprites.create(img`
        . . . f f f f f . . . . 
        . . f e e e e e f f . . 
        . f e e e e e e e f f . 
        f e e e e e e e f f f f 
        f e e 7 e e e f f f f f 
        f e e 7 7 e e e f f f f 
        f f e 7 7 7 7 7 f f f f 
        f f e 7 7 f f 7 e 7 f f 
        . f f 7 7 7 7 7 7 7 f . 
        . . f b b 7 7 7 f f f . 
        . . f 1 2 e e e e f . . 
        . . f 2 e e e 7 7 f . . 
        . . f 1 e e e 7 7 e . . 
        . . f 8 8 8 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `, SpriteKind.Enemy)
    grid.snap(mySprite5)
    grid.place(mySprite5, tiles.getTileLocation(9, randint(1, 5)))
    mySprite5.vx = -3
    ZombieHp = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ZombieHp.value = 8
    ZombieHp.attachToSprite(mySprite5)
    ZombieHp.setFlag(SpriteFlag.Invisible, true)
}
function wave2 () {
    Conehead = sprites.create(img`
        . . . . . . f f f f f f 
        . . f f f f 4 4 1 4 f f 
        . f e 4 4 1 4 4 4 1 4 f 
        f e e e f 4 1 4 4 4 1 f 
        f e e 7 e f 4 1 1 4 1 f 
        f e e 7 7 e f f 1 4 4 f 
        f f e 7 7 7 7 7 4 1 1 f 
        f f e 7 7 f f 7 f f f f 
        . f f 7 7 7 7 7 7 7 f . 
        . . f b b 7 7 7 f f f . 
        . . f 1 2 e e e e f . . 
        . . f 2 e e e 7 7 f . . 
        . . f 1 e e e 7 7 e . . 
        . . f 8 8 8 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `, SpriteKind.Enemy)
    grid.snap(Conehead)
    grid.place(Conehead, tiles.getTileLocation(9, randint(1, 5)))
    Conehead.vx = -1
    ConeheadHp = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ConeheadHp.value = 22
    ConeheadHp.attachToSprite(Conehead)
    ConeheadHp.setFlag(SpriteFlag.Invisible, true)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value == 0) {
        sprites.destroy(otherSprite)
        kill += 1
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.shooter, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -0.05
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
        sprite.setVelocity(0, -3)
        sprites.destroy(otherSprite)
    }
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile3`, function (sprite, location) {
    game.over(false)
})
let projectile: Sprite = null
let sun: Sprite = null
let ConeheadHp: StatusBarSprite = null
let Conehead: Sprite = null
let ZombieHp: StatusBarSprite = null
let mySprite5: Sprite = null
let P2 = 0
let wave = 0
let MelonPult = 0
let statusbar: StatusBarSprite = null
let mySprite2: Sprite = null
let kill = 0
let Wallnut = 0
let Sunflower = 0
let Peashooter = 0
let mySprite: Sprite = null
let game2 = 0
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999669999999999999999999999999999999999999966999999999999999999999999999999999999996699999999999999999999999999999999999999669
    9999999999999999999999999999999999999669999999999999999999999999999999999999966999999999999999999999999999999999999996699999999999999999999999999999999999999669
    9999999999999999999999999999999999999676999999999999999999999999999999999999967699999999999999999999999999999999999996769999999999999999999999999999999999999676
    9999999999966999999999999999999999999676999999999996699999999999999999999999967699999999999669999999999999999999999996769999999999966999999999999999999999999676
    9999999999967699999999999999999996699676999999999996769999999999999999999669967699999999999676999999999999999999966996769999999999967699999999999999999996699676
    9996996669996769999966999999996696769676999699666999676999996699999999669676967699969966699967699999669999999966967696769996996669996769999966999999996696769676
    9966999676996776999676966999967696769676996699967699677699967696699996769676967699669996769967769996769669999676967696769966999676996776999676966999967696769676
    6676999967699676999676667699677696776677667699996769967699967666769967769677667766769999676996769996766676996776967766776676999967699676999676667699677696776677
    6676669996769677696776667769676696676677667666999676967769677666776967669667667766766699967696776967766677696766966766776676669996769677696776667769676696676677
    6776769996776667696766666766776666677677677676999677666769676666676677666667767767767699967766676967666667667766666776776776769996776667696766666766776666677677
    6766776996667767667766666776766666677677676677699666776766776666677676666667767767667769966677676677666667767666666776776766776996667767667766666776766666677677
    7766676966677667667667766676766776667677776667696667766766766776667676677666767777666769666776676676677666767667766676777766676966677667667667766676766776667677
    7766677666776667777666776677767766667777776667766677666777766677667776776666777777666776667766677776667766777677666677777766677666776667777666776677767766667777
    7666667666776767777666676677667666767777766666766677676777766667667766766676777776666676667767677776666766776676667677777666667666776767777666676677667666767777
    7667667767766777776677677677677667766777766766776776677777667767767767766776677776676677677667777766776776776776677667777667667767766777776677677677677667766777
    7667767767766777776776667677677667666777766776776776677777677666767767766766677776677677677667777767766676776776676667777667767767766777776776667677677667666777
    7666767767666777676766667b776776b766677b7666767767666777676766667b776776b766677b7666767767666777676766667b776776b766677b7666767767666777676766667b776776b7666777
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbebbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbebbbbbbbbbb
    bbbeeeeebbbbbbbbbbbebbbeeeebbbbbbbbebbbbbbbeeeeebbbbbbbbbbbebbbeeeebbbbbbbbebbbbbbbeeeeebbbbbbbbbbbebbbeeeebbbbbbbbebbbbbbbeeeeebbbbbbbbbbbebbbeeeebbbbbbbbebbbb
    beeeebeeeebbbbeebbbbbeeeeeeeebbeebbbbbebbeeeebeeeebbbbeebbbbbeeeeeeeebbeebbbbbebbeeeebeeeebbbbeebbbbbeeeeeeeebbeebbbbbebbeeeebeeeebbbbeebbbbbeeeeeeeebbeebbbbbeb
    eeeeeeeeeeebbbeebbbbeebeeeeeeebeebbbbbbbeeeeeeeeeeebbbeebbbbeebeeeeeeebeebbbbbbbeeeeeeeeeeebbbeebbbbeebeeeeeeebeebbbbbbbeeeeeeeeeeebbbeebbbbeebeeeeeeebeebbbbbbb
    ebbeeeeeeeeebbbbbbbeeeeeeeeeeeebbbbbbbbeebbeeeeeeeeebbbbbbbeeeeeeeeeeeebbbbbbbbeebbeeeeeeeeebbbbbbbeeeeeeeeeeeebbbbbbbbeebbeeeeeeeeebbbbbbbeeeeeeeeeeeebbbbbbbbe
    ebbeeeeeeeeeeebbbeeeeeeeeeebbeeeebbbbeeeebbeeeeeeeeeeebbbeeeeeeeeeebbeeeebbbbeeeebbeeeeeeeeeeebbbeeeeeeeeeebbeeeebbbbeeeebbeeeeeeeeeeebbbeeeeeeeeeebbeeeebbbbeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbeeeeeeeeeee
    eeeeeeeeeebbeeeeeebbeeeeeeeeeeebeeeeeebeeeeeeeeeeebbeeeeeebbeeeeeeeeeeebeeeeeebeeeeeeeeeeebbeeeeeebbeeeeeeeeeeebeeeeeebeeeeeeeeeeebbeeeeeebbeeeeeeeeeeebeeeeeebe
    eeeeeeeeeebbeeeeeebbeeeeeeeeeeeeeebbeeeeeeeeeeeeeebbeeeeeebbeeeeeeeeeeeeeebbeeeeeeeeeeeeeebbeeeeeebbeeeeeeeeeeeeeebbeeeeeeeeeeeeeebbeeeeeebbeeeeeeeeeeeeeebbeeee
    eeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeebbeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeebbeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeefdbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeee
    eeeeeeeeffbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdbfeeeeeeeeeeeeeeeeeeee
    eeeeeeeefddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbddfeeeeeeeeeeeeeeeeeeee
    eeeeeeeefbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddddffeeeeeeeeeeeeeeeeeee
    eeeeeeeeffffbdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddbffeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeffddfffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffddffeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffbdddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeee
    eeeeeeeeeeeeeefddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffdbffffeeeeeeeeeeee
    eeeeeeeeeeeeeefbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffdddbfeeeeeeeeeeee
    eeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddddfeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbffeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdfeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeefffddddddddddddffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeffddddddddffffdddffdddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeffdddfffddfffffdddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeffdddfffffdffffddddddbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeffdddffffffddddddddbfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeefddddfffffdddddddfdffdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeefdddddfffddddfffdffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeefdddddddddffffefffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeffdddbbbbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeefffffbddddbbffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeefdffefdddddddddffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeefddfffddddddddddffddddfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeefffbbdfffdddddddddddddddbdbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeefffddfffffeffddddddddddddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeefdbbdddfbfeeffffddddddffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeefddbbfffdfeeeeeffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffffdddfefdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeefbbfffffffddffeeeeffffeeeeefffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffbbbfffdbdddffffefddbfffffbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeefffffdfdbbdddddfefdddddddbbbbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffbbbfdbddbbbffffefffffdddbddbfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeefbbfffdbbdddffffffeeeeffffbbbdfffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeefffffbddbbdddddddfeeeeeeeffdbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeefbbfdbbddbbfffffffeeeeeeffddfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeefbffdbbbdddddddfeeeeeeeefddffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbdddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffffdddbbfffffffeeeeeeeeffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddfffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeffdffdddfeeeeeeeeeeeeeeeeeeffdffdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeffddffffffeeeeeeeeeeeeeeeeeefddffdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeefddbffffeeeeeeeeeefffffffeeffddffdbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffbdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeffbbfddfeeeeeeeeeefddbbdffefddfffddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eefeeeeeeeeefdddbbffeeeeeeeeffddbdddfefdffffbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeefddddfeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeefefffbbddfeeeeeeeefddfffddfffffeffbffeeefeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeefeffbddfeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeefeeeeeeeeee
    eeefffffeeeeeefdddbffeeffffffddfeffddfffeefdbfffeeeeeeeeeeefeeeffffeeeeeeeefeeeeeeefffffeeeeeefdbfefeeeffffeeeeeeeefeeeeeeefffffeeeeefffffefeeeffffeeeeeeeefeeee
    effffeffffeeeefdfbbdfffffffbddfffeffdffeeffddfffffeeeeffeeeeeffffffffeeffeeeeefeeffffeffffeeeeffffeeeffffffffeeffeeeeefeeffffeffffeeefbdbfeeeffffffffeeffeeeeefe
    fffffffffffeeefffbdbffddddffbdfffeefffeefffbdffffffeeeffeeeeffefffffffeffeeeeeeefffffffffffeeeffeeeeffefffffffeffeeeeeeeffffffffffffffdddfeeffefffffffeffeeeeeee
    feefffffffffeeeefddffbdffddfbbfeeeeeeeefffdbbfffffffeeeeeeeffffffffffffeeeeeeeeffeefffffffffeeeeeeeffffffffffffeeeeeeeeffeefffffffffbdddbffffffffffffffeeeeeeeef
    feefffffffffffeefffffddfffdefffffeeeeffffbddffffffffffeeeffffffffffeeffffeeeeffffeefffffffffffeeeffffffffffeeffffeeeeffffeefffffffffddddddbffffffffeeffffeeeefff
    fffffffffffffffffffffdddffdddfffffffffffdbbdfffffffffffffffffffbdbfeeffffffffffffffffffffffffffffffffffffffeefffffffffffffffffffffffbddbddddbfffffffefffffffffff
    ffffffffffeeffffffeefffddddddffffffffdbddfffffffffeeffffffeefffdddfffffeffffffefffffffffffeeffffffeefffffffffffeffffffefffffffffffeffffffbddddbbddbffffeffffffef
    ffffffffffeeffffffeefffddddddfffddbbddbdffffffffffeeffffffeefffbdddbffffffeeffffffffffffffeeffffffeeffffffffffffffeeffffffffffffffeefffffffbdddddddfffffffeeffff
    ffffffffffffffefffffffffdddddffddfbddfffffffffffffffffeffffffbddddddffffffeeffffffffffffffffffefffffffffffffffffffeeffffffffffffffffffefffffffdddddfffffffeeffff
    fffffffffffffffffffffffffdddfffffffffffffffffffffffffffffffbddddbddbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddbffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffbddbbddddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbddfffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffbdddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffddbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
pause(2000)
story.printCharacterText("Welcome to PVZ Makerspace Edition", "Mika")
pause(2000)
story.showPlayerChoices("solo", "multiplayer")
if (story.checkLastAnswer("solo")) {
    story.showPlayerChoices("Day 1", "Day 2")
    if (story.checkLastAnswer("Day 1")) {
        game2 = 1
        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `)
        tiles.setCurrentTilemap(tilemap`level2`)
        scene.setBackgroundColor(7)
        scene.cameraFollowSprite(mySprite)
        mySprite = sprites.create(img`
            1 1 1 1 . . . . . . . . 1 1 1 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 1 1 1 . . . . . . . . 1 1 1 1 
            `, SpriteKind.Player)
        grid.snap(mySprite)
        grid.moveWithButtons(mySprite)
        grid.place(mySprite, tiles.getTileLocation(0, 0))
        Peashooter = 0
        Sunflower = 0
        Wallnut = 0
        kill = 0
        info.setScore(50)
        info.startCountdown(30)
    }
    if (story.checkLastAnswer("Day 2")) {
        story.printCharacterText("Warning! Day 2 is a lot harder than Day one, With stronger Zombies. If you don't want to continue press Quit", "Mika")
        game2 = 2
        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `)
        tiles.setCurrentTilemap(tilemap`level2`)
        scene.setBackgroundColor(7)
        scene.cameraFollowSprite(mySprite)
        mySprite = sprites.create(img`
            1 1 1 1 . . . . . . . . 1 1 1 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . . 1 
            1 1 1 1 . . . . . . . . 1 1 1 1 
            `, SpriteKind.Player)
        grid.snap(mySprite)
        grid.moveWithButtons(mySprite)
        grid.place(mySprite, tiles.getTileLocation(0, 0))
        Peashooter = 0
        Sunflower = 0
        Wallnut = 0
        kill = 0
        info.setScore(50)
        info.startCountdown(60)
    }
}
if (story.checkLastAnswer("multiplayer")) {
    story.printCharacterText("Sorry but Multiplayer doesn't work yet. Just Quit the game")
}
game.onUpdateInterval(200, function () {
    if (P2 == 1) {
        info.player2.changeScoreBy(1)
    }
})
game.onUpdateInterval(20000, function () {
    sun = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . 5 . 5 . . . . . . 
        . . . 5 . 5 5 5 5 5 5 . 5 . . . 
        . . . . 5 5 5 5 5 5 5 5 . . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . . 5 5 5 5 5 5 5 5 . . . . 
        . . . 5 . 5 5 5 5 5 5 . 5 . . . 
        . . . . . 5 . 5 . 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.soon)
    grid.place(sun, tiles.getTileLocation(randint(3, 10), 0))
    sun.setVelocity(0, 3)
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.shooter)) {
        projectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 7 7 7 f . . . . . . 
            . . . . . f 7 7 7 f . . . . . . 
            . . . . . f 7 7 7 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        projectile.setPosition(value.x, value.y)
        projectile.setVelocity(50, 0)
        projectile.lifespan = 2000
    }
})
game.onUpdateInterval(2500, function () {
    for (let value of sprites.allOfKind(SpriteKind.Pult)) {
        projectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f . . . . 
            . . . f 7 7 7 7 7 7 7 6 f . . . 
            . . . f 6 6 6 6 6 6 6 7 f . . . 
            . . . f 7 7 7 7 7 7 7 6 f . . . 
            . . . f 6 6 6 6 6 6 6 7 f . . . 
            . . . . f f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.MelonProjectile)
        projectile.setPosition(value.x, value.y)
        projectile.setVelocity(50, 0)
        projectile.lifespan = 2000
    }
})
game.onUpdateInterval(15000, function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Plants)) {
        animation.runImageAnimation(
        value2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f . . f f . . . . 
            . . . . . f f 1 f f 1 1 f f f . 
            . . . f f f 1 1 f 1 1 1 f 1 f . 
            . . . f 1 1 f f f f f f 1 1 1 f 
            . . . f 1 f e e 1 e e 1 e f f 1 
            . . f 1 f e e e f e e f e e f 1 
            . . f f e e e f e e e e f e e f 
            . . f 1 f e e e f f f f e e f 1 
            . . f f f f e e e e e e e f 1 1 
            . . . . f 1 f f f f f f f 1 f f 
            . . . . f f f f 1 f 1 1 f f f . 
            . . . . . f 6 f f 7 f f f f . . 
            . . . . f 6 f f 7 7 7 f f 6 f . 
            . . . f 6 7 7 7 7 f 7 7 7 f 6 f 
            . . . f f f f f f f f f f f f f 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f . . f f . . . . 
            . . . . . f f 5 f f 5 5 f f f . 
            . . . f f f 5 5 f 5 5 5 f 5 f . 
            . . . f 5 5 f f f f f f 5 5 5 f 
            . . . f 5 f e e 1 e e 1 e f f 5 
            . . f 5 f e e e f e e f e e f 5 
            . . f f e e e f e e e e f e e f 
            . . f 5 f e e e f f f f e e f 5 
            . . f f f f e e e e e e e f 5 5 
            . . . . f 5 f f f f f f f 5 f f 
            . . . . f f f f 5 f 5 5 f f f . 
            . . . . . f 6 f f 7 f f f f . . 
            . . . . f 6 f f 7 7 7 f f 6 f . 
            . . . f 6 7 7 7 7 f 7 7 7 f 6 f 
            . . . f f f f f f f f f f f f f 
            `],
        700,
        false
        )
        sun = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 5 . 5 . 5 . . . . . . 
            . . . 5 . 5 5 5 5 5 5 . 5 . . . 
            . . . . 5 5 5 5 5 5 5 5 . . . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . . . 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 . 5 5 5 5 5 5 . 5 . . . 
            . . . . . 5 . 5 . 5 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, value2, 0, 0)
        sun.setKind(SpriteKind.soon)
    }
})
game.onUpdateInterval(15000, function () {
    if (wave == 1) {
        wave1()
        pause(500)
    } else if (wave == 2) {
        wave2()
        pause(1000)
    }
    if (kill == 10) {
        game.gameOver(true)
    }
})
