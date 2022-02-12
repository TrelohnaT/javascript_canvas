
/** Chess
 * autor: Václav Doleček
 * datum: 20.03.2021
 */

    var border_accessable = "green";
    var border_accesunable = "lightgray";
    var border_obstacle_killable = "orange";


class Pieces
{
    constructor()
    {
        this.dark = Array();
        this.white = Array();


    }

    add_dark(new_piece)
    {
        this.dark.push(new_piece);

    }

    add_white(new_piece)
    {
        this.white.push(new_piece);

    }

    draw_all()
    {
        for(var i = 0; i < this.dark.length; i++)
        {
            this.dark[i].draw();

        }

        for(var i = 0; i < this.white.length; i++)
        {
            this.white[i].draw();

        }

    }

    /**
     * Funkce pro prenastaveni obrazku figurky na prazdny
     */
    clear()
    {
        for(var i = 0; i < this.dark.length; i++)
        {
            this.dark[i].img = "img/blank_50x50.png";

        }

        for(var i = 0; i < this.white.length; i++)
        {
            this.white[i].img = "img/blank_50x50.png";

        }

    }

    /**
     * Funkce pro nalezeni konkretni figurky na predanych souradnicich
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    find_at(x, y)
    {
        for(var i = 0; i < this.dark.length; i++)
        {
            if(this.dark[i].position.x == x && this.dark[i].position.y == y)
            {
                return this.dark[i];

            }

        }

        for(var i = 0; i < this.white.length; i++)
        {
            if(this.white[i].position.x == x && this.white[i].position.y == y)
            {
                return this.white[i];

            }

        }

        return false;


    }

    // zde se pro kazdou figurku definuji pohyby
    set_movements()
    {
        for(var i = 0; i < this.dark.length; i++)
        {  
            this.dark[i].set_moves();

        }

        for(var i = 0; i < this.white.length; i++)
        {
            this.white[i].set_moves();

        }


    }

}


class Piece
{
    constructor(name, color, x, y, size_of_movement, directions)
    {
        this.name = name;
        this.color = color;
        this.is_alive = true;
        this.is_danger = false;
        this.position = new Position(x, y);
        this.movements = new Movement(size_of_movement, directions);
        this.obstacles = Array();

        this.img = "img/" + name + "_" + color + "_50x50.png";

    }

    /**
     * Funkce k odstraneni vykresleni figurky
     */
    delete()
    {
        document.getElementById(this.position.x + "_" + this.position.y + "_p").src = "img/blank_50x50.png";

    }

    /**
     * Funkce pro vykresleni figurky
     */
    draw()
    {
        document.getElementById(this.position.x + "_" + this.position.y + "_p").src = this.img;

    }

    /**
     * Funkce pro pohyb postavicky
     * @param {*} x 
     * @param {*} y 
     */
    move(x,y)
    {
        this.position.x_set = x;
        this.position.y_set = y;

    }
    /**
     * Funkce pro pridani prekazky kterou ma tato figurka v ceste
     * @param {*} obstacle 
     */
    add_obstacle(obstacle)
    {
        this.obstacles.push(obstacle);

    }

    /**
     * Funkcej pro odstraneni prekazek
     */
    delete_obsatcles()
    {
        //delete this.obstacles;

        for(var i = 0; i < this.obstacles.length; i++)
        {
            this.obstacles.pop();

        }

    }

    /**
     * Funkce pro vykresleni moznych pozic kam se muze figurka hnout
     */
    show_moves()
    {
        // provede se tolikrat o kolik se figurka muze pohout
        for(var i = 1; i < this.movements.times; i++)
        {
            // urcuje kolik pohybovych vektoru figurka ma (ziskani velikosti pole techto vektoru se mi z nejakeho duvodu nedarilo, takze jsem to vyresil takto)
            for(var j = 0; j < this.movements.directions; j++)
            {
               var x_show = this.position.x + (this.movements.moves[j].x_get * i);
               var y_show = this.position.y + (this.movements.moves[j].y_get * i);

                // toto hlida, aby vykreslovani moznych pohybu nepresahlo hraci polochu
                if((0 <= x_show && x_show <= 7) && (0 <= y_show && y_show <= 7))
                {
                    var no_obstacle_in_direcion = true;
                    // projede vsechny nalezene prekazky u teto figurky
                    for(var k = 0; k < this.obstacles.length; k++)
                    {
                        // pokud je nalezena shoda ve smeru prekazky k teto figurce
                        // dal se v tomto smeru nepokracuje ve vykreslovani
                        if(this.obstacles[k].direction == j)
                        {
                            console.log("heree");
                            no_obstacle_in_direcion = false;

                            // dostani instance na tomto policku


                        }
                        else
                        {
                            
                            
                        
                        
                        }

                    }

                    if(no_obstacle_in_direcion)
                    {
                        document.getElementById(x_show + "_" + y_show).style.borderColor = border_accessable;

                    }

                    // detekce prekazek ve smeru pohybu
                    if(here_is(x_show, y_show) != false)
                    {
                        
                        var obstacle = here_is(x_show, y_show);
                        console.log("Obstacle: " + x_show + " " + y_show);
                        this.add_obstacle(new Obstacle(x_show, y_show, j, obstacle.name));

                        document.getElementById(x_show + "_" + y_show).style.borderColor = border_obstacle_killable;
                    
                        
                        console.log(obstacle.name);

                    }

                }
                
            }

        }

    }

    /**
     * Funkce nasta pohyb
     */
    set_moves()
    {
        // nastaveni pohybovych vektoru kralovny
        if(this.name == "queen")
        {
            this.movements.add_move(1,0);
            this.movements.add_move(1 ,1);
            this.movements.add_move(0, 1);
            this.movements.add_move(-1, 1);
            
            this.movements.add_move(-1, 0);
            this.movements.add_move(-1, -1);
            this.movements.add_move(0, -1);
            this.movements.add_move(1, -1);

        }

        // nastaveni pohybovych vektoru pesce
        if(this.name == "pawn")
        {
            if(this.color == "white")
            {
                this.movements.add_move(0, -1);

            }
            else if(this.color == "dark")
            {
                this.movements.add_move(0, 1);

            }
            else
            {
                console.log("set_movement pawn color Error")


            }


        }

    }

}

class Obstacle
{
    /**
     * 
     * @param {*} x             // X souradnice prekazky
     * @param {*} y             // Y souradnice prekazky
     * @param {*} direction     // smer k prekazce od figurky
     */
    constructor(x, y, direction, name)
    {
        this.name = "";
        this.color = "";
        this.x = x;
        this.y = y;
        this.direction = direction;

    }

    set_name(name)
    {
        this.name = name;

    }

    set_color(color)
    {
        this.color = color

    }




}

// trida pro modelovani pozice figurky
class Position
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.enemy = false;
    }

    get x_get()
    {
        return this.x;
    }
    set x_set(x)
    {
        this.x = x;
    }

    get y_get()
    {
        return this.y;
    }
    set y_set(y)
    {
        this.y = y;
    }

    get enemy_get()
    {
        return this.enemy;
    }
    set enemy_set(enemy)
    {
        this.enemy = enemy;
    }

}

// trida pro modelovani jednotlivych smeru
// jelikoz toto modeluj
class Movement
{
    constructor(times, directions)
    {
        this.moves = Array();
        this.times = times;
        this.directions = directions;
    }

    /**
     * Funkce pro pridani pohyboveho vektoru
     * @param {*} vector_x 
     * @param {*} vector_y 
     */
    add_move(vector_x, vector_y)
    {
        this.moves.push(new Position(vector_x, vector_y));

    }


}

//#########################################################################
//#########################################################################

var pieces = new Pieces();

/**
 * Funkce pro nacteni figurek a jejich pohybovych vektoru
 */
function load()
{
    clean_move_indicators();

    pieces.add_dark(new Piece("queen", "dark", 4, 4, 8, 8));

    pieces.add_white(new Piece("pawn", "white", 3, 3, 2, 1));

    pieces.set_movements();
    pieces.draw_all();


}

/**
 * Funkce pro vraceni intance figurky na predanych souradnicich
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function here_is(x, y)
{
    
    return pieces.find_at(x, y);

}

// funkce pro zobrazeni legalnich dalsich pozic
function draw_legal_pozitions(piece_par)
{




}


/**
 * Funkce pro sekencovani volani funkci pro pohyb postavicky
 * @param {*} x 
 * @param {*} y 
 * @param {*} piece_par 
 * @returns 
 */
function move_piece(x, y, piece_par)
{
    // smazani ze stare pozice
    piece_par.delete();

    piece_par.delete_obsatcles();

    // zmena souradnic na nove
    piece_par.move(x, y);

    // vykresleni na novych souradnicich
    piece_par.draw();

    
    return null;


}






